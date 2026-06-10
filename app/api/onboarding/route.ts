import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { businessName, locationId } = await req.json()
    const supabase = createClient()

    // Letzten eingeloggten User + Token holen
    const { data: conn } = await supabase
      .from('connections')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!conn) return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })

    // Account ID von Google holen
    const accountsRes = await fetch(
      'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      {
        headers: {
          Authorization: `Bearer ${conn.access_token}`,
          'Content-Type': 'application/json',
        }
      }
    )

    const accountsData = await accountsRes.json()
    console.log('Accounts:', JSON.stringify(accountsData))

    // Ersten Account nehmen
    const account = accountsData.accounts?.[0]
    const accountName = account?.name ?? null

    // Vollständigen Google Location Namen aufbauen
    // Format: accounts/{accountId}/locations/{locationId}
    let googleName: string
    if (accountName) {
      const accountId = accountName.replace('accounts/', '')
      googleName = `accounts/${accountId}/locations/${locationId}`
    } else {
      googleName = `locations/${locationId}`
    }

    console.log('Storing location:', googleName)

    await supabase.from('locations').upsert({
      user_id: conn.user_id,
      google_name: googleName,
      business_name: businessName,
      platform: 'google_business',
      active: true
    })

    return NextResponse.json({ success: true, googleName })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}