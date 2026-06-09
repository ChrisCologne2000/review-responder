import { createClient } from '@/lib/supabase'
import { fetchReviews, replyToReview } from '@/lib/google'
import { generateReply } from '@/lib/claude'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = createClient()
  const { data: connections } = await supabase
    .from('connections')
    .select('*')
    .eq('platform', 'google_business')

  let totalReplied = 0

  for (const conn of connections ?? []) {
    const { data: locations } = await supabase
      .from('locations')
      .select('*')
      .eq('user_id', conn.user_id)

    for (const location of locations ?? []) {
      const { reviews } = await fetchReviews(
        conn.access_token,
        location.google_name
      )

      for (const review of reviews ?? []) {
        if (review.reviewReply) continue

        const reply = await generateReply(
          review.comment ?? '(kein Text)',
          review.starRating === 'FIVE' ? 5 :
          review.starRating === 'FOUR' ? 4 :
          review.starRating === 'THREE' ? 3 : 2,
          location.business_name,
          conn.tone ?? 'friendly'
        )

        const replyResult = await replyToReview(
          conn.access_token,
          review.name,
          reply
        )

        const replyState = replyResult?.state ?? 'PENDING'

        await supabase.from('reply_log').insert({
          user_id: conn.user_id,
          review_id: review.name,
          reply_text: reply,
          platform: 'google_business',
          reply_state: replyState,
          location_name: location.business_name,
          replied_at: new Date().toISOString()
        })

        totalReplied++
        await new Promise(r => setTimeout(r, 500))
      }
    }
  }

  return NextResponse.json({ replied: totalReplied })
}