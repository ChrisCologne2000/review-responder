@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:'Inter',sans-serif;background:#0a0a0a;color:#f5f5f5;min-height:100vh}
    .page{max-width:960px;margin:0 auto;padding:80px 24px 80px}
    .eyebrow{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#888;margin-bottom:20px;text-align:center;font-weight:500}
    .headline{font-family:'Inter',sans-serif;font-size:clamp(36px,5vw,56px);font-weight:800;text-align:center;line-height:1.1;letter-spacing:-1px;margin-bottom:16px;color:#ffffff}
    .headline span{color:#22c55e}
    .sub{text-align:center;color:#aaa;font-size:17px;max-width:500px;margin:0 auto 48px;line-height:1.7;font-weight:400}
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
    .plan-badge{position:absolute;top:-13px;left:50%;transform:translateX(-50%);font-size:12px;background:#22c55e;color:#fff;padding:4px 16px;border-radius:20px;font-weight:600;white-space:nowrap;letter-spacing:.02em}
    .plan-name{font-size:22px;font-weight:700;margin-bottom:8px;color:#fff;letter-spacing:-.3px}
    .plan-desc{font-size:15px;color:#888;margin-bottom:28px;line-height:1.6;font-weight:400}
    .price{font-size:48px;font-weight:800;letter-spacing:-2px;color:#fff}
    .price-unit{font-size:16px;color:#888;font-weight:400}
    .billed{font-size:14px;color:#666;margin-bottom:32px;height:20px;font-weight:400}
    .cta{width:100%;padding:14px;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all .15s;border:none;margin-bottom:32px;letter-spacing:.01em}
    .cta-main{background:#22c55e;color:#fff}
    .cta-main:hover{background:#16a34a}
    .cta-outline{background:transparent;color:#f5f5f5;border:1px solid #333}
    .cta-outline:hover{border-color:#555}
    .cta:disabled{opacity:.5;cursor:not-allowed}
    .divider{border:none;border-top:1px solid #1f1f1f;margin-bottom:28px}
    .features{display:flex;flex-direction:column;gap:12px}
    .feat{display:flex;align-items:flex-start;gap:10px;font-size:15px;color:#ccc;line-height:1.5;font-weight:400}
    .feat.muted{color:#444}
    .trial-note{text-align:center;font-size:14px;color:#555;margin-top:40px;font-weight:400;line-height:1.6}