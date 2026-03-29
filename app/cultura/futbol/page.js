'use client';
import Link from 'next/link';

export default function Futbol() {
  return (
    <>
      <nav style={{ background: '#003DA5', padding: '14px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 700, fontSize: 20 }}>Argen<span style={{ color: '#F4A020' }}>talk</span> 🧉</Link>
        <Link href="/explorar" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>Ver anfitriones</Link>
      </nav>
      <div style={{ background: '#003DA5', padding: '30px 20px 50px', textAlign: 'center' }}>
        <div style={{ fontSize: 64 }}>⚽</div>
        <h1 style={{ color: 'white', marginTop: 12 }}>El Futbol</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>Una religion con millones de fieles</p>
      </div>
      <div style={{ maxWidth: 480, margin: '-24px auto 0', padding: '0 20px 40px' }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>El futbol en Argentina</h2>
          <p style={{ color: '#555', lineHeight: 1.7 }}>En Argentina el futbol no es un deporte, es una pasion. La Seleccion Argentina es tricampeona del mundo: 1978, 1986 y 2022.</p>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Los grandes equipos</h2>
          {[['Boca Juniors','Los Xeneizes'],['River Plate','Los Millonarios'],['San Lorenzo','El Ciclon'],['Racing Club','La Academia'],['Independiente','El Rojo']].map(([e,a]) => (
            <div key={e} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{e}</div>
              <span style={{ background: '#dbeafe', color: '#1e40af', padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 600 }}>{a}</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 24, textAlign: 'center' }}>
          <Link href="/explorar"><button style={{ background: '#F4A020', border: 'none', borderRadius: 10, padding: '13px', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer', width: '100%' }}>Buscar anfitrion de futbol</button></Link>
        </div>
      </div>
    </>
  );
}
