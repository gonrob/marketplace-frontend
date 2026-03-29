'use client';

import Link from 'next/link';

export default function Futbol() {
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
        <div style={{ fontSize: 64 }}>⚽</div>
        <h1 style={{ color: 'white', marginTop: 12 }}>El Fútbol</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: 15 }}>
          Una religión con millones de fieles
        </p>
      </div>

      <div style={{ maxWidth: 480, margin: '-24px auto 0', padding: '0 20px 40px' }}>
        <div className="card">
          <h2>El fútbol en Argentina</h2>
          <p style={{ color: '#555', lineHeight: 1.7, fontSize: 15 }}>
            En Argentina el fútbol no es un deporte, es una pasión. Desde chicos los argentinos eligen su equipo y lo siguen toda la vida. La Selección Argentina es tricampeona del mundo: 1978, 1986 y 2022.
          </p>
        </div>

        <div className="card">
          <h2>Los grandes equipos</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { equipo: 'Boca Juniors', apodo: 'Los Xeneizes', ciudad: 'Buenos Aires' },
              { equipo: 'River Plate', apodo: 'Los Millonarios', ciudad: 'Buenos Aires' },
              { equipo: 'San Lorenzo', apodo: 'El Ciclón', ciudad: 'Buenos Aires' },
              { equipo: 'Racing Club', apodo: 'La Academia', ciudad: 'Avellaneda' },
              { equipo: 'Independiente', apodo: 'El Rojo', ciudad: 'Avellaneda' },
            ].map(e => (
              <div key={e.equipo} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{e.equipo}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{e.ciudad}</div>
                </div>
                <span className="badge badge-blue">{e.apodo}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: '#FFF8E1', border: '1px solid #FFE082' }}>
          <h2>Dato curioso 🤔</h2>
          <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>
            El Superclásico entre Boca y River es considerado el partido de fútbol más apasionante del mundo. Cuando se juega, Argentina prácticamente se detiene.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#555', marginBottom: 16 }}>
            ¿Querés hablar de fútbol con un argentino fanático?
          </p>
          <Link href="/explorar">
            <button className="btn-orange">Buscar anfitrión de fútbol</button>
          </Link>
        </div>
      </div>
    </>
  );
}