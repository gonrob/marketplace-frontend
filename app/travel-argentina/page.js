import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Travel to Argentina and meet locals | KNOWAN',
  description: 'Connect with real Argentinians when traveling to Argentina. BBQ, football, tango, mate and more. Your first contact is FREE.',
  keywords: 'travel argentina, meet locals argentina, argentina travel, host argentina, tourism argentina, buenos aires locals',
};

export default function TravelArgentina() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Travel to Argentina and meet real locals 🇦🇷
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          Want to travel to Argentina and experience it like a local? With <strong>KNOWAN</strong> you can connect with real Argentinians who show you their culture, their city and authentic experiences.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 48, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Your first contact is FREE — Start now
          </button>
        </Link>

        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>What can you do with KNOWAN?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '🔥', titulo: 'Argentine BBQ', desc: 'Experience a real asado in an Argentine home' },
            { emoji: '⚽', titulo: 'Football', desc: 'Watch a match or play with locals' },
            { emoji: '🌹', titulo: 'Tango', desc: 'Learn tango with a real porteño' },
            { emoji: '🧉', titulo: 'Mate', desc: 'The mate experience as a tradition' },
            { emoji: '🏙️', titulo: 'Buenos Aires neighborhoods', desc: 'Palermo, San Telmo, La Boca with a local guide' },
            { emoji: '🌿', titulo: 'Patagonia & Bariloche', desc: 'Excursions and hiking with locals' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 14, padding: 20, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.titulo}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>How does it work?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {[
            { n: 1, titulo: 'Create your free account', desc: 'Sign up as a traveler in less than 2 minutes.' },
            { n: 2, titulo: 'Explore hosts', desc: 'Filter by city, experience and language.' },
            { n: 3, titulo: 'Your first contact is FREE', desc: 'Connect with your first host at no cost.' },
            { n: 4, titulo: 'Experience Argentina like a local', desc: 'BBQ, football, tango, neighborhoods and much more.' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 18, flexShrink: 0 }}>{s.n}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{s.titulo}</div>
                <div style={{ fontSize: 14, color: '#666', lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Available cities</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
          {['Buenos Aires','Bariloche','Mendoza','Córdoba','Salta','Mar del Plata','Ushuaia','Rosario'].map(c => (
            <span key={c} style={{ background: '#fff', border: '1.5px solid #d1d5db', borderRadius: 20, padding: '6px 16px', fontSize: 14, fontWeight: 500 }}>📍 {c}</span>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 12px' }}>Ready to travel to Argentina?</h2>
          <p style={{ fontSize: 16, margin: '0 0 24px', opacity: 0.9 }}>Your first contact with a local host is completely FREE.</p>
          <Link href="/register">
            <button style={{ padding: '16px 40px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 18, cursor: 'pointer' }}>
              Sign up for free →
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
