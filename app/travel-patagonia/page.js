import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Travel to Patagonia with locals | KNOWAN',
  description: 'Discover Argentine Patagonia with local hosts. Bariloche, Ushuaia, El Calafate and more. Your first contact is FREE.',
  keywords: 'travel patagonia, bariloche travel, ushuaia tourism, patagonia argentina, local guide patagonia',
};

export default function TravelPatagonia() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Travel to Argentine Patagonia 🏔️
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          Patagonia is one of the most stunning destinations in the world. With <strong>KNOWAN</strong> you can meet locals from Bariloche, Ushuaia and El Calafate who show you the secrets of their cities.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 40, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Your first contact is FREE
          </button>
        </Link>

        <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 16 }}>Patagonian destinations with local hosts</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
          {[
            { ciudad: 'Bariloche', desc: 'Trekking, skiing, lakes and chocolate. The heart of Patagonia.' },
            { ciudad: 'Ushuaia', desc: 'The end of the world. Extreme nature and penguins.' },
            { ciudad: 'El Calafate', desc: 'Perito Moreno glacier and the best BBQ in the south.' },
            { ciudad: 'San Martín de los Andes', desc: 'Patagonian village with lakes and mountains.' },
          ].map((b, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 12, padding: 16, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: '#4B6CB7', marginBottom: 4 }}>📍 {b.ciudad}</div>
              <div style={{ fontSize: 14, color: '#666' }}>{b.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 22, fontWeight: 900, margin: '0 0 12px' }}>Ready for Patagonia?</h2>
          <p style={{ fontSize: 15, margin: '0 0 24px', opacity: 0.9 }}>Connect with a local Patagonian. First contact FREE.</p>
          <Link href="/register"><button style={{ padding: '14px 36px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Start for free →</button></Link>
        </div>
      </div>
    </>
  );
}
