"use client"
import { useState } from "react";

const PRICES = {
  starter: { monthly: 59, annual: 49 },
  pro:     { monthly: 99, annual: 79 },
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{flexShrink:0,marginTop:2}}>
      <circle cx="7" cy="7" r="7" fill="#16a34a" opacity=".15"/>
      <path d="M4 7l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

async function startCheckout(plan: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const { url } = await res.json();
  if (url) window.location.href = url;
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(plan: string) {
    setLoading(plan);
    await startCheckout(plan);
    setLoading(null);
  }

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'DM Sans',sans-serif;background:#0e0e0d;color:#f0ede8;min-height:100vh}
    .page{max-width:900px;margin:0 auto;padding:64px 24px 80px}
    .eyebrow{font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#6b7280;margin-bottom:16px;text-align:center}
    .headline{font-family:'Syne',sans-serif;font-size:clamp(32px,5vw,52px);font-weight:800;text-align:center;line-height:1.05;letter-spacing:-1.5px;margin-bottom:12px}
    .headline span{color:#16a34a}
    .sub{text-align:center;color:#9ca3af;font-size:15px;max-width:480px;margin:0 auto 40px;line-height:1.6}
    .toggle-wrap{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:48px}
    .toggle-label{font-size:13px;color:#9ca3af}
    .toggle-label.active{color:#f0ede8;font-weight:500}
    .toggle-track{width:44px;height:24px;background:#1f2937;border-radius:12px;cursor:pointer;position:relative;border:1px solid #374151;transition:background .2s}
    .toggle-track.on{background:#16a34a;border-color:#16a34a}
    .toggle-thumb{position:absolute;top:3px;left:3px;width:16px;height:16px;background:#fff;border-radius:50%;transition:transform .2s}
    .toggle-track.on .toggle-thumb{transform:translateX(20px)}
    .save-badge{font-size:11px;background:#16a34a20;color:#4ade80;border:1px solid #16a34a40;padding:2px 8px;border-radius:20px;font-weight:500}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    @media(max-width:600px){.grid{grid-template-columns:1fr}}
    .plan{background:#161615;border:1px solid #2a2a28;border-radius:16px;padding:28px;position:relative}
    .plan.featured{border-color:#16a34a;background:#0f1f12}
    .plan-badge{position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:11px;background:#16a34a;color:#fff;padding:3px 14px;border-radius:20px;font-weight:600;white-space:nowrap}
    .plan-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:6px;color:#f0ede8}
    .plan-desc{font-size:13px;color:#6b7280;margin-bottom:24px;line-height:1.5}
    .price{font-family:'Syne',sans-serif;font-size:42px;font-weight:800;letter-spacing:-2px;color:#f0ede8}
    .price-unit{font-size:14px;color:#6b7280}
    .billed{font-size:12px;color:#6b7280;margin-bottom:28px;height:18px}
    .cta{width:100%;padding:13px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Syne',sans-serif;transition:all .15s;border:none;margin-bottom:28px}
    .cta-main{background:#16a34a;color:#fff}
    .cta-main:hover{background:#15803d}
    .cta-outline{background:transparent;color:#f0ede8;border:1px solid #2a2a28}
    .cta-outline:hover{border-color:#6b7280}
    .cta:disabled{opacity:.5;cursor:not-allowed}
    .divider{border:none;border-top:1px solid #1f1f1d;margin-bottom:24px}
    .features{display:flex;flex-direction:column;gap:10px}
    .feat{display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#d1d5db;line-height:1.4}
    .feat.muted{color:#4b5563}
    .trial-note{text-align:center;font-size:12px;color:#4b5563;margin-top:36px}
  `;

  return (
    <>
      <style>{css}</style>
      <div className="page">
        <p className="eyebrow">Pricing</p>
        <h1 className="headline">Automatische Antworten.<br/><span>Keine manuelle Arbeit.</span></h1>
        <p className="sub">14 Tage kostenlos testen — keine Kreditkarte nötig.</p>

        <div className="toggle-wrap">
          <span className={`toggle-label${!annual?" active":""}`}>Monatlich</span>
          <div className={`toggle-track${annual?" on":""}`} onClick={() => setAnnual(a => !a)}>
            <div className="toggle-thumb"/>
          </div>
          <span className={`toggle-label${annual?" active":""}`}>Jährlich</span>
          {annual && <span className="save-badge">2 Monate gratis</span>}
        </div>

        <div className="grid">
          <div className="plan">
            <div className="plan-name">Starter</div>
            <div className="plan-desc">Für einzelne Standorte und kleine Betriebe.</div>
            <div style={{display:'flex',alignItems:'baseline',gap:4,marginBottom:4}}>
              <span className="price">€{annual ? PRICES.starter.annual : PRICES.starter.monthly}</span>
              <span className="price-unit">/Monat</span>
            </div>
            <div className="billed">{annual ? `€${PRICES.starter.annual * 12} jährlich` : "monatlich kündbar"}</div>
            <button className="cta cta-outline" onClick={() => handleCheckout("starter")} disabled={loading === "starter"}>
              {loading === "starter" ? "⟳ Laden..." : "14 Tage gratis starten"}
            </button>
            <hr className="divider"/>
            <div className="features">
              <div className="feat"><CheckIcon/> 1 Standort</div>
              <div className="feat"><CheckIcon/> Google Business vollautomatisch</div>
              <div className="feat"><CheckIcon/> Antworten alle 4 Stunden</div>
              <div className="feat"><CheckIcon/> Ton-Konfiguration</div>
              <div className="feat"><CheckIcon/> Monatlicher Report</div>
            </div>
          </div>

          <div className="plan featured">
            <div className="plan-badge">Am beliebtesten</div>
            <div className="plan-name">Pro</div>
            <div className="plan-desc">Für Agenturen und mehrere Standorte.</div>
            <div style={{display:'flex',alignItems:'baseline',gap:4,marginBottom:4}}>
              <span className="price">€{annual ? PRICES.pro.annual : PRICES.pro.monthly}</span>
              <span className="price-unit">/Monat</span>
            </div>
            <div className="billed">{annual ? `€${PRICES.pro.annual * 12} jährlich` : "monatlich kündbar"}</div>
            <button className="cta cta-main" onClick={() => handleCheckout("pro")} disabled={loading === "pro"}>
              {loading === "pro" ? "⟳ Laden..." : "14 Tage gratis starten"}
            </button>
            <hr className="divider"/>
            <div className="features">
              <div className="feat"><CheckIcon/> Bis zu 5 Standorte</div>
              <div className="feat"><CheckIcon/> Google Business vollautomatisch</div>
              <div className="feat"><CheckIcon/> Antworten alle 2 Stunden</div>
              <div className="feat"><CheckIcon/> Ton pro Standort</div>
              <div className="feat"><CheckIcon/> Trustpilot & App Store</div>
              <div className="feat"><CheckIcon/> Team-Zugang (3 Nutzer)</div>
            </div>
          </div>
        </div>
        <p className="trial-note">14 Tage kostenlos — danach automatisch im gewählten Plan. Kündigung per Klick.</p>
      </div>
    </>
  );
}