import { getOAuthClient } from '@/lib/google'
import { fetchLocations } from '@/lib/google'
import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')
  if (!code) return NextResponse.json({ error: 'Kein Code' }, { status: 400 })

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

  // Accounts API direkt aufrufen für Debug
  const accountsRes = await fetch(
    'https://mybusiness.googleapis.com/v4/accounts',
    { headers: { Authorization: `Bearer ${tokens.access_token}` } }
  )
  const accountsData = await accountsRes.json()
  console.log('ACCOUNTS:', JSON.stringify(accountsData))

  // Standorte automatisch abrufen
  try {
    const locations = await fetchLocations(tokens.access_token!)
    console.log('LOCATIONS:', JSON.stringify(locations))

    for (const loc of locations) {
      await supabase.from('locations').upsert({
        user_id: userId,
        google_name: loc.google_name,
        business_name: loc.business_name,
        platform: 'google_business',
        active: true
      })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    if (locations.length > 0) {
      return NextResponse.redirect(`${appUrl}/dashboard`)
    }
    return NextResponse.redirect(`${appUrl}/onboarding`)
  } catch (e) {
    console.error('Location fetch error:', e)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    return NextResponse.redirect(`${appUrl}/onboarding`)
  }
}