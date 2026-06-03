export async function generateReply(
  reviewText: string,
  rating: number,
  businessName: string,
  tone: 'formal' | 'friendly' = 'friendly'
): Promise<string> {

  const sentiment =
    rating >= 5 ? 'sehr positiv' :
    rating >= 3 ? 'gemischt' : 'negativ'

  const prompt = `Du bist der Inhaber von "${businessName}".
Schreibe eine professionelle Antwort auf diese ${sentiment}e Kundenbewertung (${rating} Sterne).

Bewertung: "${reviewText}"

Regeln:
- Ton: ${tone === 'formal' ? 'formell und höflich' : 'freundlich und persönlich'}
- Maximal 3 Sätze
- Beziehe dich konkret auf den Inhalt der Bewertung
- Bei negativen Bewertungen: entschuldige dich und biete Lösung an
- Keine generischen Floskeln wie "Vielen Dank für Ihr Feedback"
- Antworte auf Deutsch

Antworte NUR mit dem Antworttext, ohne Betreff oder Anrede.`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 300,
      messages: [{ role: 'user', content: prompt }]
    })
  })

  const data = await response.json()
  console.log('Claude response:', JSON.stringify(data))
  return data.content[0].text
}