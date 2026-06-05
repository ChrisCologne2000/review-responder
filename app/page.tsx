"use client"
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#f5f5f5}
        .nav{display:flex;justify-content:space-between;align-items:center;padding:20px 40px;border-bottom:1px solid #1a1a1a}
        .logo{font-size:18px;font-weight:700;color:#fff}
        .logo span{color:#22c55e}
        .nav-btn{font-size:14px;padding:8px 18px;border-radius:8px;cursor:pointer;font-family:'Inter',sans-serif;font-weight:500;border:none}
        .btn-ghost{background:transparent;color:#aaa;border:1px solid #333}
        .btn-ghost:hover{color:#fff;border-color:#555}
        .btn-green{background:#22c55e;color:#fff;margin-left:8px}
        .btn-green:hover{background:#16a34a}
        .hero{text-align:center;padding:100px 24px 80px}
        .badge{display:inline-block;font-size:12px;background:#22c55e15;color:#22c55e;border:1px solid #22c55e30;padding:5px 14px;border-radius:20px;margin-bottom:24px;font-weight:500}
        .h1{font-size:clamp(40px,6vw,72px);font-weight:900;line-height:1.05;letter-spacing:-2px;margin-bottom:20px}
        .h1 span{color:#22c55e}
        .sub{font-size:18px;color:#888;max-width:560px;margin:0 auto 40px;line-height:1.7}
        .cta-row{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
        .cta-main{font-size:16px;padding:14px 28px;border-radius:10px;background:#22c55e;color:#fff;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600}
        .cta-main:hover{background:#16a34a}
        .cta-sec{font-size:16px;padding:14px 28px;border-radius:10px;background:transparent;color:#f5f5f5;border:1px solid #333;cursor:pointer;font-family:'Inter',sans-serif;font-weight:500}
        .cta-sec:hover{border-color:#555}
        .social-proof{font-size:13px;color:#555;margin-top:20px}
        .features{padding:80px 24px;max-width:1000px;margin:0 auto}
        .features-title{font-size:clamp(28px,4vw,40px);font-weight:800;text-align:center;margin-bottom:12px;letter-spacing:-1px}
        .features-sub{text-align:center;color:#888;font-size:16px;margin-bottom:56px}
        .grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:20px}
        .feat-card{background:#111;border:1px solid #1e1e1e;border-radius:16px;padding:28px}
        .feat-icon{font-size:28px;margin-bottom:16px}
        .feat-title{font-size:17px;font-weight:600;margin-bottom:8px;color:#fff}
        .feat-desc{font-size:14px;color:#888;line-height:1.7}
        .how{background:#0d0d0d;padding:80px 24px}
        .how-inner{max-width:700px;margin:0 auto;text-align:center}
        .how-title{font-size:clamp(28px,4vw,40px);font-weight:800;margin-bottom:48px;letter-spacing:-1px}
        .steps{display:flex;flex-direction:column;gap:24px;text-align:left}
        .step{display:flex;gap:20px;align-items:flex-start}
        .step-num{min-width:40px;height:40px;border-radius:50%;background:#22c55e;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:16px;flex-shrink:0}
        .step-body h3{font-size:16px;font-weight:600;margin-bottom:4px;color:#fff}
        .step-body p{font-size:14px;color:#888;line-height:1.6}
        .cta-section{text-align:center;padding:80px 24px}
        .cta-title{font-size:clamp(28px,4vw,44px);font-weight:800;margin-bottom:16px;letter-spacing:-1px}
        .cta-desc{color:#888;font-size:16px;margin-bottom:36px}
        .footer{border-top:1px solid #1a1a1a;padding:24px 40px;display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#555}
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="logo">Antwort<span>Bot</span></div>
        <div>
          <button className="nav-btn btn-ghost" onClick={() => router.push('/dashboard')}>Login</button>
          <button className="nav-btn btn-green" onClick={() => router.push('/pricing')}>Kostenlos testen</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="badge">✦ KI-gestützte Bewertungsantworten</div>
        <h1 className="h1">Nie wieder<br/><span>manuell antworten.</span></h1>
        <p className="sub">AntwortBot beantwortet deine Google-Bewertungen automatisch — personalisiert, professionell, rund um die Uhr.</p>
        <div className="cta-row">
          <button className="cta-main" onClick={() => router.push('/pricing')}>14 Tage kostenlos starten</button>
          <button className="cta-sec" onClick={() => router.push('/dashboard')}>Demo ansehen</button>
        </div>
        <p className="social-proof">Keine Kreditkarte nötig · Kündigung jederzeit</p>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h2 className="features-title">Alles automatisch.</h2>
        <p className="features-sub">Einmal einrichten — dann läuft alles von selbst.</p>
        <div className="grid3">
          <div className="feat-card">
            <div className="feat-icon">⚡</div>
            <h3 className="feat-title">Vollautomatisch</h3>
            <p className="feat-desc">Neue Bewertungen werden alle 4 Stunden geprüft und automatisch beantwortet — ohne dein Zutun.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🤖</div>
            <h3 className="feat-title">KI-personalisiert</h3>
            <p className="feat-desc">Jede Antwort bezieht sich konkret auf den Inhalt der Bewertung. Kein Copy-Paste, keine Floskeln.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">⭐</div>
            <h3 className="feat-title">Google Business</h3>
            <p className="feat-desc">Direkte Integration mit Google Business Profile. Einmal verbinden — fertig.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🎯</div>
            <h3 className="feat-title">Dein Ton</h3>
            <p className="feat-desc">Formell oder locker — du bestimmst wie dein Unternehmen klingt. Die KI hält sich daran.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">📊</div>
            <h3 className="feat-title">Monatlicher Report</h3>
            <p className="feat-desc">Übersicht über alle Bewertungen, Antworten und deine Bewertungsentwicklung — automatisch per E-Mail.</p>
          </div>
          <div className="feat-card">
            <div className="feat-icon">🔒</div>
            <h3 className="feat-title">Freigabe-Modus</h3>
            <p className="feat-desc">Optional: Antworten werden dir zur Genehmigung geschickt bevor sie veröffentlicht werden.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how">
        <div className="how-inner">
          <h2 className="how-title">In 3 Schritten live</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <div className="step-body">
                <h3>Google Business verbinden</h3>
                <p>Einmalig mit deinem Google-Account einloggen. Dauert 2 Minuten.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <div className="step-body">
                <h3>Ton konfigurieren</h3>
                <p>Formell oder locker? Du entscheidest wie dein Unternehmen klingt.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <div className="step-body">
                <h3>Fertig — läuft automatisch</h3>
                <p>Ab sofort werden alle neuen Bewertungen automatisch beantwortet. 24/7.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2 className="cta-title">Bereit loszulegen?</h2>
        <p className="cta-desc">14 Tage kostenlos testen — keine Kreditkarte nötig.</p>
        <button className="cta-main" onClick={() => router.push('/pricing')}>Jetzt kostenlos starten</button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div>© 2026 AntwortBot</div>
        <div style={{display:'flex',gap:20}}>
          <a href="/privacy" style={{color:'#555',textDecoration:'none'}}>Datenschutz</a>
          <a href="/terms" style={{color:'#555',textDecoration:'none'}}>AGB</a>
          <a href="/pricing" style={{color:'#555',textDecoration:'none'}}>Preise</a>
        </div>
      </footer>
    </>
  )
}