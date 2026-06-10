"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Onboarding() {
  const router = useRouter()
  const [businessName, setBusinessName] = useState('')
  const [locationId, setLocationId] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!businessName || !locationId) {
      setError('Bitte alle Felder ausfüllen')
      return
    }
    setLoading(true)

    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, locationId })
    })

    if (res.ok) {
      router.push('/dashboard')
    } else {
      setError('Fehler beim Speichern — bitte nochmal versuchen')
      setLoading(false)
    }
  }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#f5f5f5;min-height:100vh;display:flex;align-items:center;justify-content:center}
    .wrap{max-width:480px;width:100%;padding:40px 24px}
    .logo{font-size:20px;font-weight:700;color:#fff;margin-bottom:40px}
    .logo span{color:#22c55e}
    h1{font-size:28px;font-weight:800;margin-bottom:8px;letter-spacing:-.5px}
    .sub{font-size:15px;color:#888;margin-bottom:32px;line-height:1.6}
    label{font-size:13px;font-weight:500;color:#aaa;display:block;margin-bottom:6px}
    input{width:100%;padding:12px 14px;border-radius:10px;border:1px solid #333;background:#111;color:#fff;font-size:15px;font-family:'Inter',sans-serif;margin-bottom:20px}
    input:focus{outline:none;border-color:#22c55e}
    .hint{font-size:12px;color:#555;margin-top:-16px;margin-bottom:20px;line-height:1.5}
    .btn{width:100%;padding:14px;border-radius:10px;background:#22c55e;color:#fff;border:none;font-size:15px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif}
    .btn:hover{background:#16a34a}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    .error{font-size:13px;color:#f87171;margin-bottom:16px}
    .help{background:#111;border:1px solid #222;border-radius:12px;padding:16px;margin-bottom:24px;font-size:13px;color:#888;line-height:1.7}
    .help strong{color:#ccc}
    .steps{counter-reset:step;list-style:none;padding:0}
    .steps li{counter-increment:step;padding:6px 0 6px 28px;position:relative;color:#888;font-size:13px}
    .steps li::before{content:counter(step);position:absolute;left:0;top:6px;width:18px;height:18px;background:#22c55e20;color:#22c55e;border-radius:50%;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;text-align:center;line-height:18px}
  `

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div className="logo">Antwort<span>Bot</span></div>
        <h1>Fast fertig!</h1>
        <p className="sub">Trag deinen Unternehmensnamen und deine Google Business ID ein.</p>

        <div className="help">
          <strong>Wie finde ich meine Google Business ID?</strong>
          <ol className="steps">
            <li>Geh zu <strong>business.google.com</strong></li>
            <li>Klick auf dein Unternehmen</li>
            <li>Geh zu <strong>Einstellungen → Erweiterte Einstellungen</strong></li>
            <li>Kopiere die <strong>Unternehmensprofil-ID</strong> (z.B. 16490524042311479009)</li>
          </ol>
        </div>

        <label>Name deines Unternehmens</label>
        <input
          type="text"
          placeholder="z.B. Café Central Wien"
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
        />

        <label>Unternehmensprofil-ID</label>
        <input
          type="text"
          placeholder="z.B. 16490524042311479009"
          value={locationId}
          onChange={e => setLocationId(e.target.value)}
        />
        <p className="hint">Zu finden unter business.google.com → Einstellungen → Erweiterte Einstellungen</p>

        {error && <p className="error">{error}</p>}

        <button className="btn" onClick={handleSubmit} disabled={loading}>
          {loading ? '⟳ Wird gespeichert...' : 'Loslegen →'}
        </button>
      </div>
    </>
  )
}