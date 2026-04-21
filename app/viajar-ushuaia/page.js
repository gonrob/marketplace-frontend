import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Viajar a Ushuaia y conocer gente local | KNOWAN',
  description: 'Conectá con ushuaienses reales. El fin del mundo, pingüinos, glaciares y el Canal Beagle. Tu primer contacto es GRATIS.',
  keywords: 'viajar ushuaia, conocer gente ushuaia, anfitriones ushuaia, turismo ushuaia, fin del mundo',
};

export default function ViajarUshuaia() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Viajar a Ushuaia y conocer gente local 🐧
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          ¿Querés viajar al fin del mundo y vivirlo como un local? Con <strong>KNOWAN</strong> conectás con ushuaienses reales que te muestran los glaciares, pingüinos y paisajes únicos de la Patagonia austral.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 48, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Tu primer contacto es GRATIS — Empezá ahora
          </button>
        </Link>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>¿Qué podés hacer en Ushuaia con un local?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '🐧', titulo: 'Pingüinos', desc: 'Colonias de pingüinos en Isla Martillo' },
            { emoji: '🚢', titulo: 'Canal Beagle', desc: 'Navegación por el canal más austral del mundo' },
            { emoji: '🏔️', titulo: 'Glaciares', desc: 'Glaciar Martial y Parque Nacional Tierra del Fuego' },
            { emoji: '⛷️', titulo: 'Ski', desc: 'Cerro Castor, el ski más austral del mundo' },
            { emoji: '🦊', titulo: 'Fauna patagónica', desc: 'Zorros, cóndores y aves únicas' },
            { emoji: '🌅', titulo: 'Días largos', desc: 'Hasta 20 horas de luz en verano austral' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 14, padding: 20, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.titulo}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 12px' }}>¿Listo para viajar a Ushuaia?</h2>
          <p style={{ margin: '0 0 20px', opacity: 0.9 }}>Conectá con locales reales. Tu primer contacto es GRATIS.</p>
          <Link href="/register">
            <button style={{ padding: '14px 32px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Empezá ahora →</button>
          </Link>
        </div>
      </div>
    </>
  );
}
