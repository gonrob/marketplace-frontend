import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Travel to Mendoza and meet locals | KNOWAN',
  description: 'Connect with real Mendoza locals. Wine routes, Aconcagua, rafting and the best wine in the world. Your first contact is FREE.',
  keywords: 'travel mendoza argentina, meet people mendoza, locals mendoza, mendoza wine tour, aconcagua',
};

export default function TravelMendoza() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Travel to Mendoza and meet real locals 🍷
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          Want to travel to Mendoza and experience it like a local? With <strong>KNOWAN</strong> you connect with real Mendocinos who take you to the best wineries, mountain trails and hidden gems.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 48, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Your first contact is FREE — Start now
          </button>
        </Link>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>What can you do in Mendoza with a local?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '🍷', titulo: 'Wine Route', desc: 'Wineries and vineyards with a real Mendocino' },
            { emoji: '🏔️', titulo: 'Aconcagua', desc: 'The highest peak in the Americas with local guides' },
            { emoji: '🚣', titulo: 'Rafting', desc: 'Adventure on the Mendoza River with locals' },
            { emoji: '🧄', titulo: 'Gastronomy', desc: 'BBQ with goat and authentic Mendoza empanadas' },
            { emoji: '🌅', titulo: 'Vendimia Festival', desc: 'The biggest wine harvest festival in Argentina' },
            { emoji: '🚵', titulo: 'Cycling', desc: 'Ride through vineyards on a bicycle' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 14, padding: 20, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.titulo}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 12px' }}>Ready to travel to Mendoza?</h2>
          <p style={{ margin: '0 0 20px', opacity: 0.9 }}>Connect with real locals. Your first contact is FREE.</p>
          <Link href="/register">
            <button style={{ padding: '14px 32px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Start now →</button>
          </Link>
        </div>
      </div>
    </>
  );
}
