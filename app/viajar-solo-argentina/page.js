import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Viajar solo a Argentina y conocer gente | KNOWAN',
  description: 'Viajás solo a Argentina y querés conocer gente local? KNOWAN conecta viajeros solitarios con argentinos reales. Primer contacto GRATIS.',
  keywords: 'viajar solo argentina, viaje solo buenos aires, conocer gente viajando solo argentina, turismo mochilero argentina',
};

export default function ViajarSoloArgentina() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Viajar solo a Argentina y conocer gente 🌍
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          Viajar solo no significa estar solo. Con <strong>KNOWAN</strong> podés conectar con argentinos reales que te acompañan, te muestran su ciudad y te hacen sentir en casa desde el primer día.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 40, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Tu primer contacto es GRATIS
          </button>
        </Link>

        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>¿Por qué KNOWAN es perfecto para viajeros solos?</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {[
            { titulo: 'Seguridad', desc: 'Todos los anfitriones están verificados. Sabés con quién vas a salir.' },
            { titulo: 'Flexibilidad', desc: 'Contactás cuando querés, para lo que querés. Sin compromisos.' },
            { titulo: 'Precio', desc: 'Tu primer contacto es gratis. Después solo USD 0.50 por anfitrión.' },
            { titulo: 'Idiomas', desc: 'Muchos anfitriones hablan inglés, portugués, francés y más.' },
            { titulo: 'Experiencias únicas', desc: 'Asados, fútbol, tango, barrios — cosas que no encontrás en ninguna guía.' },
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
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>¿Viajás solo a Argentina?</h2>
          <p style={{ fontSize: 15, margin: '0 0 24px', opacity: 0.9 }}>No viajés solo. Conectá con un argentino real. Primer contacto GRATIS.</p>
          <Link href="/register"><button style={{ padding: '14px 36px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Empezar gratis →</button></Link>
        </div>
      </div>
    </>
  );
}
