"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Onboarding() {
  const router = useRouter()
  const [businessName, setBusinessName] = useState('')
  const [googleName, setGoogleName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit() {
    if (!businessName || !googleName) {
      setError('Bitte alle Felder ausfüllen')
      return
    }
    setLoading(true)
    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ businessName, googleName })
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
    .hint{font-size:12px;color:#666;margin-top:-16px;margin-bottom:20px;line-height:1.5}
    .btn{width:100%;padding:14px;border-radius:10px;background:#22c55e;color:#fff;border:none;font-size:15px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif}
    .btn:hover{background:#16a34a}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    .error{font-size:13px;color:#f87171;margin-bottom:16px}
    .help{background:#111;border:1px solid #222;border-radius:12px;padding:16px;margin-bottom:24px;font-size:13px;color:#888;line-height:1.6}
    .help strong{color:#aaa}
  `

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div className="logo">Antwort<span>Bot</span></div>
        <h1>Fast fertig!</h1>
        <p className="sub">Verbinde jetzt dein Google Business Profil damit AntwortBot automatisch auf deine Bewertungen antworten kann.</p>

        <div className="help">
          <strong>Wo finde ich meinen Google Business Namen?</strong><br/>
          Geh zu <strong>business.google.com</strong> → dein Profil → die URL sieht so aus:<br/>
          <code style={{color:'#22c55e'}}>accounts/123456/locations/456789</code>
        </div>

        <label>Name deines Unternehmens</label>
        <input
          type="text"
          placeholder="z.B. Café Central Wien"
          value={businessName}
          onChange={e => setBusinessName(e.target.value)}
        />

        <label>Google Business Location ID</label>
        <input
          type="text"
          placeholder="accounts/123456789/locations/987654321"
          value={googleName}
          onChange={e => setGoogleName(e.target.value)}
        />
        <p className="hint">Zu finden unter business.google.com → dein Profil → URL kopieren</p>

        {error && <p className="error">{error}</p>}

        <button className="btn" onClick={handleSubmit} disabled={loading}>
          {loading ? '⟳ Wird gespeichert...' : 'Loslegen →'}
        </button>
      </div>
    </>
  )
}