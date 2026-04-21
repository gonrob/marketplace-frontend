import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Viajar a Mendoza y conocer gente local | KNOWAN',
  description: 'Conectá con mendocinos reales. Bodegas, Aconcagua, rafting y el mejor vino del mundo. Tu primer contacto es GRATIS.',
  keywords: 'viajar mendoza, conocer gente mendoza, anfitriones mendoza, turismo mendoza, bodegas mendoza',
};

export default function ViajarMendoza() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Viajar a Mendoza y conocer gente local 🍷
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          ¿Querés viajar a Mendoza y vivirla como un local? Con <strong>KNOWAN</strong> conectás con mendocinos reales que te llevan a las mejores bodegas, rutas del vino y paisajes de montaña.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 48, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Tu primer contacto es GRATIS — Empezá ahora
          </button>
        </Link>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>¿Qué podés hacer en Mendoza con un local?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '🍷', titulo: 'Ruta del vino', desc: 'Bodegas y viñedos con un mendocino de verdad' },
            { emoji: '🏔️', titulo: 'Aconcagua', desc: 'El cerro más alto de América con guía local' },
            { emoji: '🚣', titulo: 'Rafting', desc: 'Aventura en el río Mendoza con locales' },
            { emoji: '🧄', titulo: 'Gastronomía', desc: 'Asado con chivo y empanadas mendocinas' },
            { emoji: '🌅', titulo: 'Vendimia', desc: 'La fiesta del vino más grande de Argentina' },
            { emoji: '🚵', titulo: 'Ciclismo', desc: 'Recorrés los viñedos en bicicleta' },
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
            { n: 2, titulo: 'Explorá anfitriones en Mendoza', desc: 'Filtrá por experiencia e idioma.' },
            { n: 3, titulo: 'Tu primer contacto es GRATIS', desc: 'Conectá con tu primer mendocino sin pagar nada.' },
            { n: 4, titulo: 'Viví Mendoza como local', desc: 'Bodegas, montaña, vino y gastronomía auténtica.' },
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
        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 12px' }}>¿Listo para viajar a Mendoza?</h2>
          <p style={{ margin: '0 0 20px', opacity: 0.9 }}>Conectá con mendocinos reales. Tu primer contacto es GRATIS.</p>
          <Link href="/register">
            <button style={{ padding: '14px 32px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>
              Empezá ahora →
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
