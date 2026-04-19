import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Conocer gente en Buenos Aires | KNOWAN',
  description: 'Conocé argentinos reales en Buenos Aires. Recorrés Palermo, San Telmo, La Boca con un local. Tu primer contacto es GRATIS.',
  keywords: 'conocer gente buenos aires, amigos buenos aires, guía local buenos aires, turismo buenos aires',
};

export default function ConocerGenteBuenosAires() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Conocer gente en Buenos Aires 🇦🇷
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          Buenos Aires es una ciudad enorme, pero con <strong>KNOWAN</strong> podés conocer porteños reales que te muestran su ciudad, sus bares favoritos, sus barrios y su forma de vida.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 40, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Tu primer contacto es GRATIS
          </button>
        </Link>

        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Barrios que podés explorar con un local</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {[
            { barrio: 'Palermo', desc: 'Bares, restaurantes, parques y la movida nocturna porteña.' },
            { barrio: 'San Telmo', desc: 'Historia, tango, ferias y el mercado más famoso de Buenos Aires.' },
            { barrio: 'La Boca', desc: 'El Caminito, Boca Juniors y el arte callejero.' },
            { barrio: 'Recoleta', desc: 'Cultura, museos, cafés históricos y arquitectura europea.' },
            { barrio: 'Belgrano', desc: 'Barrio residencial con vida local auténtica.' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 12, padding: 16, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#4B6CB7', marginBottom: 4 }}>📍 {b.barrio}</div>
              <div style={{ fontSize: 14, color: '#666' }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>¿Querés conocer Buenos Aires como local?</h2>
          <p style={{ fontSize: 15, margin: '0 0 24px', opacity: 0.9 }}>Registrate gratis y conectá con tu primer porteño sin costo.</p>
          <Link href="/register"><button style={{ padding: '14px 36px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Empezar gratis →</button></Link>
        </div>
      </div>
    </>
  );
}
