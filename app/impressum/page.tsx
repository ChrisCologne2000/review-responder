export default function Impressum() {
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
        <h1>Impressum</h1>

        <h2>Angaben gemäß § 5 TMG</h2>
        <p>Christopher Ossowski - Vosit e.K.</p>
        <p>Mittelstraße 11/13</p>
        <p>40789 Monheim am Rhein</p>

        <h2>Kontakt</h2>
        <p>Telefon: +49 2173 2640331</p>
        <p>E-Mail: <a href="office@vosit.com">deine@email.de</a></p>

        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>Vosit e.K.</p>
        <p>Mittelstraße 11-13</p>
        <p>40789 Monheim am Rhein</p>

        <h2>Haftungsausschluss</h2>
        <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>

        <h2>Datenschutz</h2>
        <p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten erhoben werden, erfolgt dies auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.</p>
      </div>
    </>
  )
}