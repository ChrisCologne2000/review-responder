"use client"
import { useState, useEffect } from "react";

export default function ReviewDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetch('/api/dashboard')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#f5f5f5;min-height:100vh}
    .wrap{max-width:800px;margin:0 auto;padding:40px 24px}
    .topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
    .logo{font-size:18px;font-weight:700;color:#fff}.logo span{color:#22c55e}
    .status{font-size:12px;color:#22c55e;background:#22c55e15;border:1px solid #22c55e30;padding:4px 12px;border-radius:20px}
    .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:28px}
    .stat{background:#111;border:1px solid #1e1e1e;border-radius:12px;padding:18px}
    .stat-v{font-size:28px;font-weight:700;color:#fff;font-variant-numeric:tabular-nums}
    .stat-l{font-size:12px;color:#666;margin-top:4px}
    .tabs{display:flex;gap:6px;margin-bottom:16px}
    .tab{font-size:13px;padding:6px 14px;border-radius:8px;border:1px solid #222;background:transparent;color:#888;cursor:pointer;font-family:'Inter',sans-serif}
    .tab.active{background:#1a1a1a;color:#fff;border-color:#333}
    .review{background:#111;border:1px solid #1e1e1e;border-radius:12px;padding:18px;margin-bottom:10px}
    .review-head{display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap}
    .reviewer{font-size:13px;font-weight:600;color:#fff}
    .stars{color:#d97706;font-size:13px}
    .loc{font-size:12px;color:#555}
    .review-text{font-size:13px;color:#666;background:#0d0d0d;padding:10px 12px;border-radius:8px;margin-bottom:8px;line-height:1.6}
    .reply-box{font-size:13px;color:#ccc;background:#0d1f12;border:1px solid #22c55e20;padding:10px 12px;border-radius:8px;line-height:1.6}
    .reply-label{font-size:11px;color:#22c55e;font-weight:600;margin-bottom:4px;text-transform:uppercase;letter-spacing:.05em}
    .reply-time{font-size:11px;color:#444;margin-top:6px}
    .empty{text-align:center;padding:60px 20px;color:#444}
    .empty h3{font-size:18px;font-weight:600;color:#666;margin-bottom:8px}
    .connect-btn{margin-top:20px;padding:12px 24px;background:#22c55e;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif}
    .connect-btn:hover{background:#16a34a}
    .loading{text-align:center;padding:80px;color:#444}
  `

  if (loading) return (
    <>
      <style>{css}</style>
      <div className="loading">Lädt...</div>
    </>
  )

  // Nicht verbunden
  if (!data?.connected) return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div className="topbar">
          <div className="logo">Antwort<span>Bot</span></div>
        </div>
        <div className="empty">
          <h3>Google Business noch nicht verbunden</h3>
          <p style={{fontSize:14,color:'#555',marginBottom:16}}>Verbinde dein Google Business Profil um automatische Antworten zu aktivieren.</p>
          <button className="connect-btn" onClick={() => window.location.href='/api/auth'}>
            Mit Google verbinden →
          </button>
        </div>
      </div>
    </>
  )

  // Verbunden aber keine Standorte
  if (!data?.hasLocations) return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div className="topbar">
          <div className="logo">Antwort<span>Bot</span></div>
        </div>
        <div className="empty">
          <h3>Kein Google Business Profil gefunden</h3>
          <p style={{fontSize:14,color:'#555',marginBottom:16}}>Dein Google Account hat kein verknüpftes Google Business Profil. Bitte trag es manuell ein.</p>
          <button className="connect-btn" onClick={() => window.location.href='/onboarding'}>
            Standort manuell eintragen →
          </button>
        </div>
      </div>
    </>
  )

  const replies = data.replies ?? []
  const filtered = activeTab === 'all' ? replies : replies.filter((r: any) => r.reply_state === activeTab)

  return (
    <>
      <style>{css}</style>
      <div className="wrap">
        <div className="topbar">
          <div className="logo">Antwort<span>Bot</span></div>
          <span className="status">● Läuft automatisch</span>
        </div>

        <div className="stats">
          <div className="stat">
            <div className="stat-v">{data.stats.totalReplied}</div>
            <div className="stat-l">Antworten gesamt</div>
          </div>
          <div className="stat">
            <div className="stat-v">{data.stats.locations}</div>
            <div className="stat-l">Standorte aktiv</div>
          </div>
          <div className="stat">
            <div className="stat-v">Auto</div>
            <div className="stat-l">Modus</div>
          </div>
        </div>

        <div className="tabs">
          {['all','PENDING','APPROVED','REJECTED'].map(t => (
            <button key={t} className={`tab${activeTab===t?' active':''}`} onClick={() => setActiveTab(t)}>
              {t==='all'?'Alle':t==='PENDING'?'⏳ Ausstehend':t==='APPROVED'?'✓ Genehmigt':'✗ Abgelehnt'}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <h3>Noch keine Antworten</h3>
            <p style={{fontSize:14,color:'#555'}}>Der automatische Job läuft täglich und beantwortet neue Bewertungen.</p>
          </div>
        ) : (
          filtered.map((r: any) => (
            <div className="review" key={r.id}>
              <div className="review-head">
                <span className="reviewer">{r.reviewer_name ?? 'Kunde'}</span>
                <span className="stars">{'★'.repeat(r.star_rating ?? 3)}{'☆'.repeat(5-(r.star_rating ?? 3))}</span>
                <span className="loc">{r.location_name}</span>
              </div>
              {r.review_text && (
                <div className="review-text">"{r.review_text}"</div>
              )}
              <div className="reply-box">
                <div className="reply-label">
                  Automatische Antwort
                  {r.reply_state && (
                    <span style={{
                      marginLeft:8,padding:'1px 6px',borderRadius:20,fontSize:10,
                      background: r.reply_state==='APPROVED'?'#dcfce7':r.reply_state==='REJECTED'?'#fee2e2':'#fef9c3',
                      color: r.reply_state==='APPROVED'?'#166534':r.reply_state==='REJECTED'?'#991b1b':'#854d0e'
                    }}>
                      {r.reply_state==='APPROVED'?'✓ Google genehmigt':r.reply_state==='REJECTED'?'✗ Abgelehnt':'⏳ Prüfung'}
                    </span>
                  )}
                </div>
                {r.reply_text}
                <div className="reply-time">{new Date(r.replied_at).toLocaleString('de-DE')}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}