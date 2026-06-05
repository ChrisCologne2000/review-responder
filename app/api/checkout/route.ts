import { createCheckoutSession } from '@/lib/stripe'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json()

    const priceId = plan === 'starter'
      ? process.env.STRIPE_PRICE_STARTER!
      : process.env.STRIPE_PRICE_PRO!

    const session = await createCheckoutSession(
      'demo-user',
      'kunde@email.com',
      priceId
    )

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}