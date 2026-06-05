"use client"
import { useState } from "react";

const PRICES = {
  starter: { monthly: 59, annual: 49 },
  pro:     { monthly: 99, annual: 79 },
};

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{flexShrink:0,marginTop:2}}>
      <circle cx="7" cy="7" r="7" fill="#22c55e" opacity=".15"/>
      <path d="M4 7l2 2 4-4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#f5f5f5;min-height:100vh}
    .page{max-width:960px;margin:0 auto;padding:80px 24px 80px}
    .eyebrow{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#888;margin-bottom:20px;text-align:center;font-weight:500}
    .headline{font-size:clamp(36px,5vw,56px);font-weight:800;text-align:center;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;color:#ffffff}
    .headline span{color:#22c55e}
    .sub{text-align:center;color:#aaa;font-size:17px;max-width:500px;margin:0 auto 48px;line-height:1.7}
    .toggle-wrap{display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:56px}
    .toggle-label{font-size:15px;color:#888;font-weight:500}
    .toggle-label.active{color:#f5f5f5}
    .toggle-track{width:44px;height:24px;background:#222;border-radius:12px;cursor:pointer;position:relative;border:1px solid #333;transition:background .2s}
    .toggle-track.on{background:#22c55e;border-color:#22c55e}
    .toggle-thumb{position:absolute;top:3px;left:3px;width:16px;height:16px;background:#fff;border-radius:50%;transition:transform .2s}
    .toggle-track.on .toggle-thumb{transform:translateX(20px)}
    .save-badge{font-size:12px;background:#22c55e18;color:#22c55e;border:1px solid #22c55e30;padding:3px 10px;border-radius:20px;font-weight:600}
    .grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}
    @media(max-width:600px){.grid{grid-template-columns:1fr}}
    .plan{background:#111;border:1px solid #222;border-radius:16px;padding:32px;position:relative}
    .plan.featured{border-color:#22c55e;background:#0d1f12}
    .plan-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);font-size:12px;background:#22c55e;color:#fff;padding:4px 16px;border-radius:20px;font-weight:600;white-space:nowrap}
    .plan-name{font-size:22px;font-weight:700;margin-bottom:8px;color:#fff}
    .plan-desc{font-size:15px;color:#888;margin-bottom:28px;line-height:1.6}
    .price{font-size:48px;font-weight:800;letter-spacing:-2px;color:#fff}
    .price-unit{font-size:16px;color:#888}
    .billed{font-size:14px;color:#666;margin-bottom:32px;height:20px}
    .cta{width:100%;padding:14px;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all .15s;border:none;margin-bottom:32px}
    .cta-main{background:#22c55e;color:#fff}
    .cta-main:hover{background:#16a34a}
    .cta-outline{background:transparent;color:#f5f5f5;border:1px solid #333}
    .cta-outline:hover{border-color:#555}
    .cta:disabled{opacity:.5;cursor:not-allowed}
    .divider{border:none;border-top:1px solid #1f1f1f;margin-bottom:28px}
    .features{display:flex;flex-direction:column;gap:12px}
    .feat{display:flex;align-items:flex-start;gap:10px;font-size:15px;color:#ccc;line-height:1.5}
    .feat.muted{color:#444}
    .trial-note{text-align:center;font-size:14px;color:#555;margin-top:40px;line-height:1.6}
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