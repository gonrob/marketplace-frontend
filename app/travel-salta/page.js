import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Travel to Salta and meet locals | KNOWAN',
  description: 'Connect with real Salta locals. Humahuaca Gorge, Tilcara, empanadas and carnival. Your first contact is FREE.',
  keywords: 'travel salta argentina, meet people salta, locals salta, northwest argentina, humahuaca',
};

export default function TravelSalta() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Travel to Salta and meet real locals 🌵
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          Want to experience northwest Argentina like a local? With <strong>KNOWAN</strong> you connect with real Salteños who show you the colorful canyons, colonial villages and Andean culture.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 48, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Your first contact is FREE — Start now
          </button>
        </Link>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>What can you do in Salta with a local?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '🏔️', titulo: 'Humahuaca Gorge', desc: 'UNESCO World Heritage with local guide' },
            { emoji: '🏺', titulo: 'Tilcara & Purmamarca', desc: 'Magical villages of northwest Argentina' },
            { emoji: '🥟', titulo: 'Salta Empanadas', desc: 'The best empanadas in all of Argentina' },
            { emoji: '🎭', titulo: 'Carnival', desc: 'The most colorful carnival in the country' },
            { emoji: '🚂', titulo: 'Train to the Clouds', desc: 'One of the highest train routes in the world' },
            { emoji: '🌄', titulo: 'Puna Plateau', desc: 'Unique high-altitude landscapes' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 14, padding: 20, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.titulo}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 12px' }}>Ready to travel to Salta?</h2>
          <p style={{ margin: '0 0 20px', opacity: 0.9 }}>Connect with real locals. Your first contact is FREE.</p>
          <Link href="/register">
            <button style={{ padding: '14px 32px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Start now →</button>
          </Link>
        </div>
      </div>
    </>
  );
}
