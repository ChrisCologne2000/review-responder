import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createClient()

    // Letzten eingeloggten User holen
    const { data: conn } = await supabase
      .from('connections')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (!conn) {
      return NextResponse.json({ connected: false, reviews: [], stats: null })
    }

    // Standorte holen
    const { data: locations } = await supabase
      .from('locations')
      .select('*')
      .eq('user_id', conn.user_id)

    // Reply Log holen
    const { data: replies } = await supabase
      .from('reply_log')
      .select('*')
      .eq('user_id', conn.user_id)
      .order('replied_at', { ascending: false })
      .limit(50)

    const stats = {
      totalReplied: replies?.length ?? 0,
      locations: locations?.length ?? 0,
    }

    return NextResponse.json({
      connected: true,
      hasLocations: (locations?.length ?? 0) > 0,
      replies: replies ?? [],
      stats,
      userId: conn.user_id,
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}