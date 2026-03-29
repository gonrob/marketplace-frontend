'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => { setLoggedIn(!!localStorage.getItem('token')); }, []);

  return (
    <>
      <nav className="nav">
        <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        <div className="nav-links">
          {loggedIn ? <Link href="/dashboard">Mi perfil</Link> : (
            <><Link href="/login">Entrar</Link><Link href="/register">Registrarse</Link></>
          )}
        </div>
      </nav>

      <div style={{ background: '#003DA5', padding: '40px 20px 60px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🧉</div>
        <h1 style={{ color: 'white', fontSize: 32, marginBottom: 10 }}>
          Argen<span style={{ color: '#F4A020' }}>talk</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 8 }}>
          Habla con argentinos reales. Vivi la cultura.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 28 }}>
          Mate - Truco - Futbol - Dulce de leche
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/explorar">
            <button className="btn-orange" style={{ width: 'auto', padding: '13px 28px' }}>Buscar anfitriones</button>
          </Link>
          <Link href="/register">
            <button style={{ width: 'auto', padding: '13px 28px', background: 'transparent', border: '2px solid white', color: 'white' }}>Ser anfitrion</button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '-30px auto 0', padding: '0 20px 40px' }}>
        <div className="cultura-grid" style={{ marginTop: 0 }}>
          <Link href="/cultura/mate" className="cultura-item">
            <span className="cultura-icon">🧉</span>
            <div className="cultura-label">Mate</div>
          </Link>
          <Link href="/cultura/truco" className="cultura-item">
            <span className="cultura-icon">🃏</span>
            <div className="cultura-label">Truco</div>
          </Link>
          <Link href="/cultura/futbol" className="cultura-item">
            <span className="cultura-icon">⚽</span>
            <div className="cultura-label">Futbol</div>
          </Link>
          <Link href="/cultura/dulce" className="cultura-item">
            <span className="cultura-icon">🍮</span>
            <div className="cultura-label">Dulce de leche</div>
          </Link>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h2>Como funciona?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left', marginTop: 16 }}>
            {[
              { n: 1, t: 'Elegi un anfitrion', d: 'Filtra por interes, habilidad o disponibilidad' },
              { n: 2, t: 'Paga el primer contacto', d: 'Pago seguro con Stripe. El anfitrion recibe el 85%' },
              { n: 3, t: 'Conectate!', d: 'A partir del primer contacto, son libres de continuar como quieran' },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.n === 3 ? '#F4A020' : '#003DA5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.t}</div>
                  <div style={{ fontSize: 14, color: '#666' }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
