import { getOAuthClient } from '@/lib/google'
import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Kein Code' }, { status: 400 })

  const client = getOAuthClient()
  const { tokens } = await client.getToken(code)

  const supabase = createClient()
  await supabase.from('connections').upsert({
    user_id: 'demo-user',
    platform: 'google_business',
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: tokens.expiry_date,
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
return NextResponse.redirect(`${appUrl}/dashboard`)
}