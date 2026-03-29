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
        <span className="nav-logo">Argentalk</span>
        <div className="nav-links">
          {loggedIn ? (
            <Link href="/dashboard">Dashboard</Link>
          ) : (
            <>
              <Link href="/login">Entrar</Link>
              <Link href="/register">Registrarse</Link>
            </>
          )}
        </div>
      </nav>

      <div className="container" style={{ textAlign: 'center', marginTop: 80 }}>
        <h1 style={{ fontSize: 36, marginBottom: 16 }}>
          Charlá con argentinos reales
        </h1>
        <p style={{ color: '#666', marginBottom: 32, fontSize: 18 }}>
          Conectá con argentinos, practicaespañol y viví la cultura..<br />
          
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/register">
            <button style={{ width: 'auto', padding: '12px 28px' }}>
              Empezar gratis
            </button>
          </Link>
          <Link href="/pay">
            <button className="btn-secondary" style={{ width: 'auto', padding: '12px 28px' }}>
              Hacer un pago
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
