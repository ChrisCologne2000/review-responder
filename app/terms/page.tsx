export default function Terms() {
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
        a{color:#22c55e;text-decoration:none}
      `}</style>
      <div className="wrap">
        <a href="/" className="back">← Zurück</a>
        <h1>Allgemeine Geschäftsbedingungen</h1>

        <h2>1. Geltungsbereich</h2>
        <p>Diese AGB gelten für alle Verträge zwischen AntwortBot (Vorname Nachname, Straße, PLZ Ort) und dem Kunden über die Nutzung des AntwortBot-Dienstes.</p>

        <h2>2. Leistungsbeschreibung</h2>
        <p>AntwortBot ist ein SaaS-Dienst der Google Business Bewertungen automatisch mit KI-generierten Antworten beantwortet. Der Dienst wird auf Basis einer monatlichen Abonnementgebühr angeboten.</p>

        <h2>3. Vertragsschluss</h2>
        <p>Der Vertrag kommt durch Registrierung und Auswahl eines Abonnements zustande. Die Mindestlaufzeit beträgt einen Monat.</p>

        <h2>4. Preise und Zahlung</h2>
        <p>Die aktuellen Preise sind auf <a href="/pricing">antwortbot.de/pricing</a> einsehbar. Die Abrechnung erfolgt monatlich im Voraus über Stripe.</p>

        <h2>5. Kündigung</h2>
        <p>Das Abonnement kann jederzeit zum Ende des Abrechnungszeitraums gekündigt werden. Die Kündigung erfolgt über das Dashboard.</p>

        <h2>6. Haftungsbeschränkung</h2>
        <p>AntwortBot haftet nicht für automatisch generierte Antworten. Der Kunde ist verantwortlich für die Aktivierung des Freigabe-Modus wenn gewünscht.</p>

        <h2>7. Anwendbares Recht</h2>
        <p>Es gilt deutsches Recht. Gerichtsstand ist der Sitz des Anbieters.</p>

        <h2>Stand</h2>
        <p>Juni 2026</p>
      </div>
    </>
  )
}