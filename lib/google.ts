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
    // Account Management API
    const accountsRes = await fetch(
      'https://mybusinessaccountmanagement.googleapis.com/v1/accounts',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
    )

    const contentType = accountsRes.headers.get('content-type') ?? ''
    if (!contentType.includes('application/json')) {
      console.error('Accounts API non-JSON:', await accountsRes.text())
      return locations
    }

    const accountsData = await accountsRes.json()
    console.log('Accounts response:', JSON.stringify(accountsData))

    for (const account of accountsData.accounts ?? []) {
      // Business Information API für Standorte
      const locRes = await fetch(
        `https://mybusinessbusinessinformation.googleapis.com/v1/${account.name}/locations?readMask=name,title`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          }
        }
      )

      const locContentType = locRes.headers.get('content-type') ?? ''
      if (!locContentType.includes('application/json')) {
        console.error('Locations API non-JSON')
        continue
      }

      const locData = await locRes.json()
      console.log('Locations response:', JSON.stringify(locData))

      for (const loc of locData.locations ?? []) {
        locations.push({
          google_name: loc.name,
          business_name: loc.title ?? loc.locationName ?? 'Unbekannt'
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

  const contentType = res.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    console.error('fetchReviews non-JSON response')
    return { reviews: [] }
  }

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