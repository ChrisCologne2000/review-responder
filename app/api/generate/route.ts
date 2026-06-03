import { generateReply } from '@/lib/claude'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { reviewText, rating, businessName } = await req.json()
    const reply = await generateReply(reviewText, rating, businessName)
    return NextResponse.json({ reply })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}