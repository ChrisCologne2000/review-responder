import { google } from 'googleapis'

export function getOAuthClient() {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  )
}

export function getAuthUrl() {
  const client = getOAuthClient()
  return client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/business.manage',
      'https://www.googleapis.com/auth/userinfo.email',
    ]
  })
}

// Alle Google Business Accounts + Standorte automatisch abrufen
export async function fetchLocations(accessToken: string) {
  const locations: { google_name: string; business_name: string }[] = []

  try {
    const accountsRes = await fetch(
      'https://mybusiness.googleapis.com/v4/accounts',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    )
    const accountsData = await accountsRes.json()

    for (const account of accountsData.accounts ?? []) {
      const locRes = await fetch(
        `https://mybusiness.googleapis.com/v4/${account.name}/locations`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      )
      const locData = await locRes.json()
      for (const loc of locData.locations ?? []) {
        locations.push({
          google_name: loc.name,
          business_name: loc.locationName ?? loc.title ?? 'Unbekannt'
        })
      }
    }
  } catch (e) {
    console.error('fetchLocations error:', e)
  }

  return locations
}

// Reviews eines Standorts abrufen
export async function fetchReviews(accessToken: string, locationName: string) {
  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/${locationName}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    }
  )
  return res.json()
}

// Auf eine Bewertung antworten
export async function replyToReview(
  accessToken: string,
  reviewName: string,
  comment: string
) {
  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/${reviewName}/reply`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment })
    }
  )
  return res.json()
}

// Review Reply Status abrufen (PENDING / APPROVED / REJECTED)
export async function getReviewReplyState(
  accessToken: string,
  reviewName: string
) {
  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/${reviewName}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      }
    }
  )
  const data = await res.json()
  return data.reviewReply?.state ?? null
}

// Token erneuern wenn abgelaufen
export async function refreshAccessToken(refreshToken: string) {
  const client = getOAuthClient()
  client.setCredentials({ refresh_token: refreshToken })
  const { credentials } = await client.refreshAccessToken()
  return credentials
}