import { createCheckoutSession } from '@/lib/stripe'
import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { plan, email } = await req.json()

    const priceId = plan === 'starter'
      ? process.env.STRIPE_PRICE_STARTER!
      : process.env.STRIPE_PRICE_PRO!

    // Email aus Request oder Supabase holen
    const supabase = createClient()
    const { data: conn } = await supabase
      .from('connections')
      .select('user_id')
      .eq('user_id', 'demo-user')
      .single()

    const userEmail = email || 'kunde@antwortbot.de'

    const session = await createCheckoutSession(
      conn?.user_id ?? 'demo-user',
      userEmail,
      priceId
    )

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}