"use client"
import { useState } from "react";

const mockStats = {
  totalReplied: 127,
  avgRating: 4.2,
  thisWeek: 23,
  responseRate: 98,
};

const mockLog = [
  { id: 1, reviewer: "Thomas M.", rating: 5, platform: "Google", location: "Café Central, Wien", review: "Einfach fantastisch! Das Essen war hervorragend.", reply: "Vielen Dank, Thomas! Es freut uns sehr, dass Sie sich bei uns wohlgefühlt haben.", repliedAt: "vor 12 Min.", status: "published" },
  { id: 2, reviewer: "Sandra K.", rating: 2, platform: "Google", location: "Café Central, Wien", review: "Wartezeit war viel zu lang, über 30 Minuten für einen Kaffee.", reply: "Liebe Sandra, es tut uns wirklich leid für die lange Wartezeit.", repliedAt: "vor 1 Std.", status: "published" },
  { id: 3, reviewer: "Julia W.", rating: 1, platform: "Google", location: "Café Central, Wien", review: "Absolut enttäuschend. Kalter Kaffee, unfreundliches Personal.", reply: null, repliedAt: null, status: "pending" },
];

export default function ReviewDashboard() {
  const [activeTab, setActiveTab] = useState("all");
  const [log, setLog] = useState(mockLog);
  const [generating, setGenerating] = useState<number | null>(null);

  const filtered = activeTab === "all" ? log
    : activeTab === "pending" ? log.filter(r => r.status === "pending")
    : log.filter(r => r.status === "published");

  async function handleGenerate(id: number) {
    setGenerating(id);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewText: log.find(r => r.id === id)?.review, rating: log.find(r => r.id === id)?.rating, businessName: 'Mein Business' })
    });
    const data = await res.json();
    setLog(prev => prev.map(r => r.id === id ? { ...r, reply: data.reply, repliedAt: 'gerade eben', status: 'published' } : r));
    setGenerating(null);
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: 800, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: 24, marginBottom: 8 }}>ReviewPilot Dashboard</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>● Läuft automatisch</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 24 }}>
        {[['Antworten', mockStats.totalReplied], ['Ø Bewertung', mockStats.avgRating], ['Antwortrate', mockStats.responseRate + '%']].map(([l, v]) => (
          <div key={l as string} style={{ background: '#f9f9f9', border: '1px solid #eee', borderRadius: 8, padding: 16 }}>
            <div style={{ fontSize: 28, fontWeight: 600 }}>{v}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{l}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['all', 'pending', 'published'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #ddd', background: activeTab === t ? '#000' : '#fff', color: activeTab === t ? '#fff' : '#000', cursor: 'pointer' }}>
            {t === 'all' ? 'Alle' : t === 'pending' ? '⏳ Ausstehend' : '✓ Gesendet'}
          </button>
        ))}
      </div>

      {filtered.map(r => (
        <div key={r.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 16, marginBottom: 12 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
            <strong>{r.reviewer}</strong>
            <span style={{ color: '#f59e0b' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
            <span style={{ fontSize: 12, color: '#888' }}>{r.location}</span>
          </div>
          <div style={{ background: '#f9f9f9', padding: 10, borderRadius: 6, fontSize: 13, marginBottom: 8 }}>"{r.review}"</div>
          {r.reply ? (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', padding: 10, borderRadius: 6, fontSize: 13 }}>
              <div style={{ fontSize: 11, color: '#16a34a', marginBottom: 4 }}>AUTOMATISCHE ANTWORT</div>
              {r.reply}
            </div>
          ) : (
            <button onClick={() => handleGenerate(r.id)} disabled={generating === r.id} style={{ padding: '6px 14px', borderRadius: 8, border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}>
              {generating === r.id ? '⟳ Generiert...' : '✦ Jetzt antworten'}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}