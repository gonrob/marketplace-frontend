import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Viajar a Bariloche y conocer gente local | KNOWAN',
  description: 'Conectá con barilochenses reales. Lagos, ski, trekking y chocolate artesanal. Tu primer contacto es GRATIS.',
  keywords: 'viajar bariloche, conocer gente bariloche, anfitriones bariloche, turismo bariloche, ski bariloche',
};

export default function ViajarBariloche() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Viajar a Bariloche y conocer gente local ⛷️
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          ¿Querés viajar a Bariloche y vivirla como un local? Con <strong>KNOWAN</strong> conectás con barilochenses reales que te muestran los mejores lagos, senderos y secretos de la Suiza argentina.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 48, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Tu primer contacto es GRATIS — Empezá ahora
          </button>
        </Link>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>¿Qué podés hacer en Bariloche con un local?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '⛷️', titulo: 'Ski en Catedral', desc: 'El mejor centro de ski de Sudamérica' },
            { emoji: '🥾', titulo: 'Trekking', desc: 'Senderos únicos con guías locales' },
            { emoji: '🍫', titulo: 'Chocolate artesanal', desc: 'La tradición chocolatera de Bariloche' },
            { emoji: '🚣', titulo: 'Kayak en lagos', desc: 'Lago Nahuel Huapi y sus aguas turquesas' },
            { emoji: '🌲', titulo: 'Bosques de araucarias', desc: 'Naturaleza patagónica única' },
            { emoji: '🍺', titulo: 'Cerveza artesanal', desc: 'La escena cervecera más grande del sur' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 14, padding: 20, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.titulo}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 12px' }}>¿Listo para viajar a Bariloche?</h2>
          <p style={{ margin: '0 0 20px', opacity: 0.9 }}>Conectá con locales reales. Tu primer contacto es GRATIS.</p>
          <Link href="/register">
            <button style={{ padding: '14px 32px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Empezá ahora →</button>
          </Link>
        </div>
      </div>
    </>
  );
}
