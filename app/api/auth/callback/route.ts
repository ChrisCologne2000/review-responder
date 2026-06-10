import { getOAuthClient } from '@/lib/google'
import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Kein Code' }, { status: 400 })

  const client = getOAuthClient()
  const { tokens } = await client.getToken(code)

  // Google User Info holen
  client.setCredentials(tokens)
  const userInfoRes = await fetch(
    'https://www.googleapis.com/oauth2/v2/userinfo',
    { headers: { Authorization: `Bearer ${tokens.access_token}` } }
  )
  const userInfo = await userInfoRes.json()
  const userId = userInfo.email // echte User-ID = Email

  const supabase = createClient()
  await supabase.from('connections').upsert({
    user_id: userId,
    platform: 'google_business',
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
    expires_at: tokens.expiry_date,
  })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  return NextResponse.redirect(`${appUrl}/onboarding`)
}