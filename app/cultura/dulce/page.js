'use client';

import Link from 'next/link';

export default function Dulce() {
  return (
    <>
      <nav className="nav">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        </Link>
        <div className="nav-links">
          <Link href="/explorar">Ver anfitriones</Link>
        </div>
      </nav>

      <div style={{ background: '#003DA5', padding: '30px 20px 50px', textAlign: 'center' }}>
        <div style={{ fontSize: 64 }}>🍮</div>
        <h1 style={{ color: 'white', marginTop: 12 }}>Dulce de leche</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: 15 }}>
          El sabor más argentino del mundo
        </p>
      </div>

      <div style={{ maxWidth: 480, margin: '-24px auto 0', padding: '0 20px 40px' }}>
        <div className="card">
          <h2>¿Qué es el dulce de leche?</h2>
          <p style={{ color: '#555', lineHeight: 1.7, fontSize: 15 }}>
            El dulce de leche es una crema espesa y dulce hecha a base de leche y azúcar. Es el ingrediente estrella de la repostería argentina y se usa en alfajores, facturas, medialunas, tortas y helados.
          </p>
        </div>

        <div className="card">
          <h2>¿Dónde se usa?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { comida: 'Alfajor', desc: 'El snack más famoso de Argentina' },
              { comida: 'Medialuna', desc: 'Croissant argentino con dulce de leche' },
              { comida: 'Facturas', desc: 'Masas de panadería rellenas' },
              { comida: 'Helado', desc: 'El sabor más pedido en las heladerías' },
              { comida: 'Tostadas', desc: 'El desayuno clásico argentino' },
            ].map(c => (
              <div key={c.comida} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.comida}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{c.desc}</div>
                </div>
                <span className="badge badge-orange">🍮</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: '#FFF8E1', border: '1px solid #FFE082' }}>
          <h2>Dato curioso 🤔</h2>
          <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>
            Argentina y Uruguay se disputan la invención del dulce de leche. Lo que es seguro es que Argentina es el mayor consumidor del mundo — cada argentino consume en promedio 3 kg por año.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#555', marginBottom: 16 }}>
            ¿Querés aprender recetas argentinas con dulce de leche?
          </p>
          <Link href="/explorar">
            <button className="btn-orange">Buscar anfitrión cocinero</button>
          </Link>
        </div>
      </div>
    </>
  );
}