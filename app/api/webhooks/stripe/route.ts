import Stripe from 'stripe'
import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body, sig, process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch {
    return NextResponse.json({ error: 'Ungültige Signatur' }, { status: 400 })
  }

  const supabase = createClient()

  switch (event.type) {

    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId
      await supabase.from('subscriptions').upsert({
        user_id: userId,
        stripe_customer: session.customer,
        stripe_sub_id: session.subscription,
        plan: session.amount_total === 5900 ? 'starter' : 'pro',
        status: 'active',
      })
      break
    }

    case 'invoice.payment_succeeded': {
  const invoice = event.data.object as Stripe.Invoice
  const subId = (invoice as any).subscription
  await supabase.from('subscriptions')
    .update({ status: 'active', updated_at: new Date().toISOString() })
    .eq('stripe_sub_id', subId)
  break
}

case 'invoice.payment_failed': {
  const invoice = event.data.object as Stripe.Invoice
  const subId = (invoice as any).subscription
  await supabase.from('subscriptions')
    .update({ status: 'past_due' })
    .eq('stripe_sub_id', subId)
  break
}

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await supabase.from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('stripe_sub_id', sub.id)
      break
    }
  }

  return NextResponse.json({ received: true })
}