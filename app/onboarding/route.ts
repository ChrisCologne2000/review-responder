import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { businessName, googleName } = await req.json()
    const supabase = createClient()

    // Letzten eingeloggten User holen
    const { data: conn } = await supabase
      .from('connections')
      .select('user_id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!conn) return NextResponse.json({ error: 'Nicht eingeloggt' }, { status: 401 })

    await supabase.from('locations').upsert({
      user_id: conn.user_id,
      google_name: googleName,
      business_name: businessName,
      platform: 'google_business',
      active: true
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}