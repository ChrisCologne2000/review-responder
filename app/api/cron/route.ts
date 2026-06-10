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
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)

  for (const conn of connections ?? []) {
    const { data: locations } = await supabase
      .from('locations')
      .select('*')
      .eq('user_id', conn.user_id)
      .eq('active', true)

    for (const location of locations ?? []) {
      try {
        const data = await fetchReviews(
          conn.access_token,
          location.google_name
        )

        const reviews = data.reviews ?? []

        // Nur letzte 24h + noch nicht beantwortet
        const toProcess = reviews.filter((r: any) => {
          if (r.reviewReply) return false
          const reviewDate = new Date(r.createTime)
          return reviewDate > yesterday
        })

        console.log(`${location.business_name}: ${toProcess.length} neue Bewertungen`)

        for (const review of toProcess) {
          try {
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
              reviewer_name: review.reviewer?.displayName ?? 'Kunde',
              review_text: review.comment ?? '',
              star_rating: review.starRating === 'FIVE' ? 5 :
                           review.starRating === 'FOUR' ? 4 :
                           review.starRating === 'THREE' ? 3 : 2,
              reply_text: reply,
              platform: 'google_business',
              reply_state: replyState,
              location_name: location.business_name,
              replied_at: new Date().toISOString()
            })

            totalReplied++
            await new Promise(r => setTimeout(r, 500))

          } catch (reviewError) {
            console.error('Review error:', reviewError)
          }
        }

      } catch (locationError) {
        console.error('Location error:', locationError)
      }
    }
  }

  return NextResponse.json({ replied: totalReplied })
}