import { getOAuthClient } from '@/lib/google'
import { fetchLocations } from '@/lib/google'
import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Kein Code' }, { status: 400 })

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

  try {
    const client = getOAuthClient()
    const { tokens } = await client.getToken(code)

    // Google User Info holen
    const userInfoRes = await fetch(
      'https://www.googleapis.com/oauth2/v2/userinfo',
      { headers: { Authorization: `Bearer ${tokens.access_token}` } }
    )
    const userInfo = await userInfoRes.json()
    const userId = userInfo.email

    const supabase = createClient()

    // Token speichern
    await supabase.from('connections').upsert({
      user_id: userId,
      platform: 'google_business',
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: tokens.expiry_date,
    })

    // Standorte automatisch abrufen
    const locations = await fetchLocations(tokens.access_token!)

    for (const loc of locations) {
      await supabase.from('locations').upsert({
        user_id: userId,
        google_name: loc.google_name,
        business_name: loc.business_name,
        platform: 'google_business',
        active: true
      })
    }

    if (locations.length > 0) {
      return NextResponse.redirect(`${appUrl}/dashboard`)
    }
    return NextResponse.redirect(`${appUrl}/onboarding`)

  } catch (e) {
    console.error('Callback error:', e)
    return NextResponse.redirect(`${appUrl}/onboarding`)
  }
}