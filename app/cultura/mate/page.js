'use client';

import Link from 'next/link';

export default function Mate() {
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
        <div style={{ fontSize: 64 }}>🧉</div>
        <h1 style={{ color: 'white', marginTop: 12 }}>El mate</h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: 8, fontSize: 15 }}>
          Mucho más que una bebida — es un ritual de amistad
        </p>
      </div>

      <div style={{ maxWidth: 480, margin: '-24px auto 0', padding: '0 20px 40px' }}>
        <div className="card">
          <h2>¿Qué es el mate?</h2>
          <p style={{ color: '#555', lineHeight: 1.7, fontSize: 15 }}>
            El mate es la infusión más popular de Argentina. Se prepara con yerba mate dentro de un recipiente (también llamado mate) y se toma con una bombilla de metal. Es una bebida amarga, aunque se puede endulzar.
          </p>
        </div>

        <div className="card">
          <h2>El ritual</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>1️⃣</div>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>El cebador llena el mate con yerba y agua caliente (no hirviendo, entre 70-80°C)</p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>2️⃣</div>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>Se pasa al siguiente en la ronda. Se toma todo el líquido y se devuelve sin decir gracias</p>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>3️⃣</div>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>Cuando ya no querés más, decís "gracias" — esa es la señal para que no te sirvan más</p>
            </div>
          </div>
        </div>

        <div className="card" style={{ background: '#FFF8E1', border: '1px solid #FFE082' }}>
          <h2>Dato curioso 🤔</h2>
          <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7 }}>
            En Argentina se consume más mate per cápita que café. Es común verlo en oficinas, plazas, estadios y hasta en la playa. Compartir el mate es un gesto de confianza y amistad.
          </p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <p style={{ color: '#555', marginBottom: 16 }}>
            ¿Querés aprender a cebar mate con un argentino real?
          </p>
          <Link href="/explorar">
            <button className="btn-orange">Buscar anfitrión de mate</button>
          </Link>
        </div>
      </div>
    </>
  );
}