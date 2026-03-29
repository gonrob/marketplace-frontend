'use client';

import Link from 'next/link';

export default function Truco() {
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
        <div style={{ fontSize: 64 }}>🃏</div>
        <h1 style={{ color: 'white', marginTop: 12 }}>El Truco</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: 15 }}>
          El juego de cartas más popular de Argentina
        </p>
      </div>

      <div style={{ maxWidth: 480, margin: '-24px auto 0', padding: '0 20px 40px' }}>
        <div className="card">
          <h2>¿Qué es el Truco?</h2>
          <p style={{ color: '#555', lineHeight: 1.7, fontSize: 15 }}>
            El Truco es un juego de cartas español muy popular en Argentina, Uruguay y Paraguay. Se juega con una baraja española de 40 cartas y el objetivo es llegar a 30 puntos antes que el rival. Es un juego de estrategia, bluff y mucha picardía.
          </p>
        </div>

        <div className="card">
          <h2>Las cartas más importantes</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { carta: '1 de Espadas', nombre: 'El macho', desc: 'La carta más poderosa del juego' },
              { carta: '1 de Bastos', nombre: 'El mata', desc: 'Segunda carta más fuerte' },
              { carta: '7 de Espadas', nombre: 'El siete', desc: 'Tercera en importancia' },
              { carta: '7 de Oros', nombre: 'El siete de oros', desc: 'Cuarta más poderosa' },
            ].map(c => (
              <div key={c.carta} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.carta}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{c.desc}</div>
                </div>
                <span className="badge badge-blue">{c.nombre}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: '#FFF8E1', border: '1px solid #FFE082' }}>
          <h2>Dato curioso 🤔</h2>
          <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>
            En el Truco se habla, se canta y se miente. Es tan importante la estrategia como engañar al rival con gestos y señas. En Argentina es tradición jugarlo en familia o con amigos los fines de semana.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#555', marginBottom: 16 }}>
            ¿Querés aprender a jugar al Truco con un argentino real?
          </p>
          <Link href="/explorar">
            <button className="btn-orange">Buscar anfitrión de Truco</button>
          </Link>
        </div>
      </div>
    </>
  );
}