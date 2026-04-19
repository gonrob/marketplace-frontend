import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Solo travel to Argentina and meet people | KNOWAN',
  description: 'Traveling solo to Argentina and want to meet people? KNOWAN connects solo travelers with real Argentinians. First contact FREE.',
  keywords: 'solo travel argentina, travel alone buenos aires, meet people solo travel argentina, backpacker argentina',
};

export default function SoloTravelArgentina() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Solo travel to Argentina and meet people 🌍
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          Traveling solo doesn't mean being alone. With <strong>KNOWAN</strong> you can connect with real Argentinians who accompany you, show you their city and make you feel at home from day one.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 40, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Your first contact is FREE
          </button>
        </Link>

        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Why KNOWAN is perfect for solo travelers?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {[
            { titulo: 'Safety', desc: 'All hosts are verified. You know who you are meeting.' },
            { titulo: 'Flexibility', desc: 'Contact when you want, for what you want. No commitments.' },
            { titulo: 'Price', desc: 'Your first contact is free. Then only USD 0.50 per host.' },
            { titulo: 'Languages', desc: 'Many hosts speak English, Portuguese, French and more.' },
            { titulo: 'Unique experiences', desc: 'BBQ, football, tango, neighborhoods — things you won\'t find in any guidebook.' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 12, padding: 16, border: '1.5px solid #e5e7eb', display: 'flex', gap: 12 }}>
              <div style={{ fontSize: 20 }}>✅</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{b.titulo}</div>
                <div style={{ fontSize: 14, color: '#666' }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>Traveling solo to Argentina?</h2>
          <p style={{ fontSize: 15, margin: '0 0 24px', opacity: 0.9 }}>Don't travel alone. Connect with a real Argentinian. First contact FREE.</p>
          <Link href="/register"><button style={{ padding: '14px 36px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Start for free →</button></Link>
        </div>
      </div>
    </>
  );
}
