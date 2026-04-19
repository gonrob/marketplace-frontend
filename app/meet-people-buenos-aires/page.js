import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Meet people in Buenos Aires | KNOWAN',
  description: 'Meet real locals in Buenos Aires. Explore Palermo, San Telmo, La Boca with a local. Your first contact is FREE.',
  keywords: 'meet people buenos aires, locals buenos aires, friends buenos aires, local guide buenos aires, buenos aires tourism',
};

export default function MeetPeopleBuenosAires() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Meet people in Buenos Aires 🇦🇷
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          Buenos Aires is a huge city, but with <strong>KNOWAN</strong> you can meet real porteños who show you their city, their favourite bars, their neighborhoods and their way of life.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 40, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Your first contact is FREE
          </button>
        </Link>

        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Neighborhoods to explore with a local</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {[
            { barrio: 'Palermo', desc: 'Bars, restaurants, parks and the Buenos Aires nightlife.' },
            { barrio: 'San Telmo', desc: 'History, tango, markets and the most famous market in Buenos Aires.' },
            { barrio: 'La Boca', desc: 'El Caminito, Boca Juniors and street art.' },
            { barrio: 'Recoleta', desc: 'Culture, museums, historic cafes and European architecture.' },
            { barrio: 'Belgrano', desc: 'Residential neighborhood with authentic local life.' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 12, padding: 16, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#4B6CB7', marginBottom: 4 }}>📍 {b.barrio}</div>
              <div style={{ fontSize: 14, color: '#666' }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>Want to meet Buenos Aires locals?</h2>
          <p style={{ fontSize: 15, margin: '0 0 24px', opacity: 0.9 }}>Sign up for free and connect with your first porteño at no cost.</p>
          <Link href="/register"><button style={{ padding: '14px 36px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Start for free →</button></Link>
        </div>
      </div>
    </>
  );
}
