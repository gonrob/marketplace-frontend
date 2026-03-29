'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  return (
    <>
      <nav className="nav">
        <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        <div className="nav-links">
          {loggedIn ? (
            <Link href="/dashboard">Mi perfil</Link>
          ) : (
            <>
              <Link href="/login">Entrar</Link>
              <Link href="/register">Registrarse</Link>
            </>
          )}
        </div>
      </nav>

      <div style={{ background: '#003DA5', padding: '40px 20px 60px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🧉</div>
        <h1 style={{ color: 'white', fontSize: 32, marginBottom: 10 }}>
          Argen<span style={{ color: '#F4A020' }}>talk</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 8 }}>
          Hablá con argentinos reales. Viví la cultura.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 28 }}>
          Mate · Truco · Fútbol · Dulce de leche · y mucho más
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/explorar">
            <button className="btn-orange" style={{ width: 'auto', padding: '13px 28px' }}>
              Buscar anfitriones
            </button>
          </Link>
          <Link href="/register">
            <button className="btn-secondary" style={{ width: 'auto', padding: '13px 28px', background: 'transparent', color: 'white', borderColor: 'white' }}>
              Ser anfitrión
            </button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '-30px auto 0', padding: '0 20px' }}>
        <div className="cultura-grid" style={{ marginTop: 0 }}>
          <Link href="/cultura/mate" style={{ textDecoration: 'none' }}>
            <div className="cultura-item">
              <span className="cultura-icon">🧉</span>
              <div className="cultura-label">Mate</div>
            </div>
          </Link>
          <Link href="/cultura/truco" style={{ textDecoration: 'none' }}>
            <div className="cultura-item">
              <span className="cultura-icon">🃏</span>
              <div className="cultura-label">Truco</div>
            </div>
          </Link>
          <Link href="/cultura/futbol" style={{ textDecoration: 'none' }}>
            <div className="cultura-item">
              <span className="cultura-icon">⚽</span>
              <div className="cultura-label">Fútbol</div>
            </div>
          </Link>
          <Link href="/cultura/dulce" style={{ textDecoration: 'none' }}>
            <div className="cultura-item">
              <span className="cultura-icon">🍮</span>
              <div className="cultura-label">Dulce de leche</div>
            </div>
          </Link>
        </div>

        <div className="card" style={{ textAlign: 'center', marginBottom: 16 }}>
          <h2>¿Cómo funciona?</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left', marginTop: 16 }}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#003DA5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>1</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Elegí un anfitrión</div>
                <div style={{ fontSize: 14, color: '#666' }}>Filtrá por interés, habilidad o disponibilidad</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#003DA5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>2</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Pagá el primer contacto</div>
                <div style={{ fontSize: 14, color: '#666' }}>Pago seguro con Stripe. El anfitrión recibe el 85%</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#F4A020', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>3</div>
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>¡Conectate!</div>
                <div style={{ fontSize: 14, color: '#666' }}>A partir del primer contacto, son libres de continuar como quieran</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}