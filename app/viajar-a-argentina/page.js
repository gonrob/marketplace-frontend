import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Viajar a Argentina y conocer gente local | KNOWAN',
  description: 'Conectá con argentinos reales para viajar por Argentina. Asados, fútbol, tango, mate y mucho más. Tu primer contacto es GRATIS.',
  keywords: 'viajar a argentina, conocer gente argentina, viaje argentina, anfitriones argentina, turismo argentina',
};

export default function ViajarArgentina() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>

        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Viajar a Argentina y conocer gente local 🇦🇷
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          ¿Querés viajar a Argentina y vivirlo como un local? Con <strong>KNOWAN</strong> podés conectar con argentinos reales que te muestran su cultura, su ciudad y sus experiencias auténticas.
        </p>

        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 48, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Tu primer contacto es GRATIS — Empezá ahora
          </button>
        </Link>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>¿Qué podés hacer con KNOWAN?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '🔥', titulo: 'Asado argentino', desc: 'Viví un asado real en una casa argentina' },
            { emoji: '⚽', titulo: 'Fútbol', desc: 'Andá a ver un partido o jugá con locales' },
            { emoji: '🌹', titulo: 'Tango', desc: 'Aprendé tango con un porteño de verdad' },
            { emoji: '🧉', titulo: 'Mate', desc: 'La experiencia del mate como tradición' },
            { emoji: '🏙️', titulo: 'Barrios de Buenos Aires', desc: 'Palermo, San Telmo, La Boca con un guía local' },
            { emoji: '🌿', titulo: 'Patagonia y Bariloche', desc: 'Excursiones y senderismo con locales' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 14, padding: 20, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.titulo}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>¿Cómo funciona?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {[
            { n: 1, titulo: 'Creá tu cuenta gratis', desc: 'Registrate como viajero en menos de 2 minutos.' },
            { n: 2, titulo: 'Explorá los anfitriones', desc: 'Filtrá por ciudad, experiencia e idioma.' },
            { n: 3, titulo: 'Tu primer contacto es GRATIS', desc: 'Conectá con tu primer anfitrión sin pagar nada.' },
            { n: 4, titulo: 'Viví Argentina como local', desc: 'Asados, fútbol, tango, barrios y mucho más.' },
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

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>¿Por qué KNOWAN?</h2>
        <div style={{ background: '#f0f4ff', borderRadius: 14, padding: 24, marginBottom: 40 }}>
          <p style={{ fontSize: 15, color: '#333', lineHeight: 1.8, margin: 0 }}>
            Argentina no se entiende sin sus personas. El lunfardo, el asado del domingo, el partido de Boca, el mate a las 6 de la tarde — todo eso solo lo podés vivir con un local. <strong>KNOWAN</strong> conecta viajeros con argentinos reales que quieren compartir su cultura y su vida cotidiana.
          </p>
        </div>

        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>Ciudades disponibles</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
          {['Buenos Aires','Bariloche','Mendoza','Córdoba','Salta','Mar del Plata','Ushuaia','Rosario','Tucumán'].map(c => (
            <span key={c} style={{ background: '#fff', border: '1.5px solid #d1d5db', borderRadius: 20, padding: '6px 16px', fontSize: 14, fontWeight: 500, color: '#333' }}>📍 {c}</span>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 12px' }}>¿Listo para viajar a Argentina?</h2>
          <p style={{ fontSize: 16, margin: '0 0 24px', opacity: 0.9 }}>Tu primer contacto con un anfitrión es completamente GRATIS.</p>
          <Link href="/register">
            <button style={{ padding: '16px 40px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 18, cursor: 'pointer' }}>
              Registrarme gratis →
            </button>
          </Link>
        </div>

      </div>
    </>
  );
}
