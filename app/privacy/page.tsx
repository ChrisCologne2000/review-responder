export default function Privacy() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#f5f5f5}
        .wrap{max-width:680px;margin:0 auto;padding:80px 24px}
        .back{font-size:14px;color:#888;text-decoration:none;display:inline-block;margin-bottom:40px}
        .back:hover{color:#fff}
        h1{font-size:36px;font-weight:800;margin-bottom:40px;letter-spacing:-1px}
        h2{font-size:18px;font-weight:600;margin:32px 0 8px;color:#fff}
        p{font-size:15px;color:#aaa;line-height:1.8;margin-bottom:8px}
        ul{font-size:15px;color:#aaa;line-height:1.8;margin-bottom:8px;padding-left:20px}
        a{color:#22c55e;text-decoration:none}
      `}</style>
      <div className="wrap">
        <a href="/" className="back">← Zurück</a>
        <h1>Datenschutzerklärung</h1>

        <h2>1. Verantwortlicher</h2>
        <p>Vosit e.K., Mittelstraße 11-13, 40765 Monheim am Rhein, E-Mail: office@vosit.com</p>

        <h2>2. Welche Daten wir erheben</h2>
        <ul>
          <li>Google Account Daten (Name, E-Mail) bei der Anmeldung</li>
          <li>Google Business Bewertungen deines Unternehmens</li>
          <li>Zahlungsdaten werden ausschließlich von Stripe verarbeitet</li>
        </ul>

        <h2>3. Zweck der Datenverarbeitung</h2>
        <p>Die erhobenen Daten werden ausschließlich zur Erbringung des AntwortBot-Dienstes verwendet — dem automatischen Beantworten von Google-Bewertungen.</p>

        <h2>4. Weitergabe an Dritte</h2>
        <p>Wir geben deine Daten an folgende Dritte weiter:</p>
        <ul>
          <li><strong>Anthropic</strong> — KI-Verarbeitung der Bewertungstexte</li>
          <li><strong>Stripe</strong> — Zahlungsabwicklung</li>
          <li><strong>Supabase</strong> — Datenspeicherung</li>
          <li><strong>Vercel</strong> — Hosting</li>
        </ul>

        <h2>5. Speicherdauer</h2>
        <p>Deine Daten werden gespeichert solange du einen aktiven Account hast. Nach Kündigung werden alle Daten innerhalb von 30 Tagen gelöscht.</p>

        <h2>6. Deine Rechte</h2>
        <p>Du hast das Recht auf Auskunft, Berichtigung, Löschung und Datenübertragbarkeit. Kontakt: <a href="mailto:deine@email.de">deine@email.de</a></p>

        <h2>7. Cookies</h2>
        <p>Wir verwenden technisch notwendige Cookies für die Authentifizierung. Es werden keine Tracking- oder Werbe-Cookies eingesetzt.</p>
      </div>
    </>
  )
}