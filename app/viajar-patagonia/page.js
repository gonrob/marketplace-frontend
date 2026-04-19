import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Viajar a la Patagonia con locales | KNOWAN',
  description: 'Descubrí la Patagonia argentina con anfitriones locales. Bariloche, Ushuaia, El Calafate y más. Tu primer contacto es GRATIS.',
  keywords: 'viajar patagonia, bariloche viaje, ushuaia turismo, patagonia argentina, guía local patagonia',
};

export default function ViajarPatagonia() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Viajar a la Patagonia argentina 🏔️
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          La Patagonia es uno de los destinos más impresionantes del mundo. Con <strong>KNOWAN</strong> podés conocer locales de Bariloche, Ushuaia y El Calafate que te muestran los secretos de sus ciudades.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 40, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Tu primer contacto es GRATIS
          </button>
        </Link>

        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Destinos patagónicos con anfitriones locales</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {[
            { ciudad: 'Bariloche', desc: 'Trekking, ski, lagos y chocolates. El corazón de la Patagonia.' },
            { ciudad: 'Ushuaia', desc: 'El fin del mundo. Naturaleza extrema y pingüinos.' },
            { ciudad: 'El Calafate', desc: 'El glaciar Perito Moreno y los mejores asados del sur.' },
            { ciudad: 'San Martín de los Andes', desc: 'Aldea patagónica con lagos y montañas.' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 12, padding: 16, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#4B6CB7', marginBottom: 4 }}>📍 {b.ciudad}</div>
              <div style={{ fontSize: 14, color: '#666' }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>¿Listo para la Patagonia?</h2>
          <p style={{ fontSize: 15, margin: '0 0 24px', opacity: 0.9 }}>Conectá con un local patagónico. Primer contacto GRATIS.</p>
          <Link href="/register"><button style={{ padding: '14px 36px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Empezar gratis →</button></Link>
        </div>
      </div>
    </>
  );
}
