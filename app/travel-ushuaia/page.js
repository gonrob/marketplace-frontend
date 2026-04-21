import Link from 'next/link';
import Nav from '../components/Nav';

export const metadata = {
  title: 'Travel to Ushuaia and meet locals | KNOWAN',
  description: 'Connect with real Ushuaia locals. End of the world, penguins, glaciers and Beagle Channel. Your first contact is FREE.',
  keywords: 'travel ushuaia argentina, meet people ushuaia, end of the world, patagonia ushuaia, penguins argentina',
};

export default function TravelUshuaia() {
  return (
    <>
      <Nav />
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '40px 20px 80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.2 }}>
          Travel to Ushuaia and meet real locals 🐧
        </h1>
        <p style={{ fontSize: 18, color: '#555', marginBottom: 32, lineHeight: 1.7 }}>
          Want to experience the end of the world like a local? With <strong>KNOWAN</strong> you connect with real Ushuaienses who show you glaciers, penguins and the unique landscapes of southern Patagonia.
        </p>
        <Link href="/register">
          <button style={{ padding: '16px 32px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 800, fontSize: 18, cursor: 'pointer', marginBottom: 48, display: 'block', width: '100%', textAlign: 'center' }}>
            🎁 Your first contact is FREE — Start now
          </button>
        </Link>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: '#1a1a1a', marginBottom: 16 }}>What can you do in Ushuaia with a local?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
          {[
            { emoji: '🐧', titulo: 'Penguins', desc: 'Penguin colonies at Isla Martillo' },
            { emoji: '🚢', titulo: 'Beagle Channel', desc: 'Sailing through the world\'s southernmost channel' },
            { emoji: '🏔️', titulo: 'Glaciers', desc: 'Martial Glacier and Tierra del Fuego National Park' },
            { emoji: '⛷️', titulo: 'Skiing', desc: 'Cerro Castor, the world\'s southernmost ski resort' },
            { emoji: '🦊', titulo: 'Patagonian Wildlife', desc: 'Foxes, condors and unique birds' },
            { emoji: '🌅', titulo: 'Long Days', desc: 'Up to 20 hours of daylight in austral summer' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#f8faff', borderRadius: 14, padding: 20, border: '1.5px solid #e5e7eb' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>{item.emoji}</div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{item.titulo}</div>
              <div style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', borderRadius: 16, padding: '32px 24px', textAlign: 'center', color: '#fff' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 12px' }}>Ready to travel to Ushuaia?</h2>
          <p style={{ margin: '0 0 20px', opacity: 0.9 }}>Connect with real locals. Your first contact is FREE.</p>
          <Link href="/register">
            <button style={{ padding: '14px 32px', background: '#fff', color: '#4B6CB7', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 16, cursor: 'pointer' }}>Start now →</button>
          </Link>
        </div>
      </div>
    </>
  );
}
