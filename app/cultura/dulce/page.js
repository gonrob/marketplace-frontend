'use client';
import Link from 'next/link';

export default function Dulce() {
  return (
    <>
      <nav style={{ background: '#003DA5', padding: '14px 20px', display: 'flex', justifyContent: 'space-between' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 700, fontSize: 20 }}>Argen<span style={{ color: '#F4A020' }}>talk</span> 🧉</Link>
        <Link href="/explorar" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14 }}>Ver anfitriones</Link>
      </nav>
      <div style={{ background: '#003DA5', padding: '30px 20px 50px', textAlign: 'center' }}>
        <div style={{ fontSize: 64 }}>🍮</div>
        <h1 style={{ color: 'white', marginTop: 12 }}>Dulce de leche</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8 }}>El sabor mas argentino del mundo</p>
      </div>
      <div style={{ maxWidth: 480, margin: '-24px auto 0', padding: '0 20px 40px' }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Que es el dulce de leche?</h2>
          <p style={{ color: '#555', lineHeight: 1.7 }}>El dulce de leche es una crema espesa hecha a base de leche y azucar. Es el ingrediente estrella de la reposteria argentina: alfajores, facturas, medialunas, tortas y helados.</p>
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 24, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 14 }}>Donde se usa?</h2>
          {[['Alfajor','El snack mas famoso de Argentina'],['Medialuna','Croissant argentino con dulce de leche'],['Helado','El sabor mas pedido en heladerias'],['Tostadas','El desayuno clasico argentino']].map(([c,d]) => (
            <div key={c} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>{c}</div><div style={{ fontSize: 12, color: '#888' }}>{d}</div></div>
              <span style={{ fontSize: 20 }}>🍮</span>
            </div>
          ))}
        </div>
        <div style={{ background: 'white', borderRadius: 16, padding: 24, textAlign: 'center' }}>
          <Link href="/explorar"><button style={{ background: '#F4A020', border: 'none', borderRadius: 10, padding: '13px', color: 'white', fontWeight: 600, fontSize: 15, cursor: 'pointer', width: '100%' }}>Buscar anfitrion cocinero</button></Link>
        </div>
      </div>
    </>
  );
}
