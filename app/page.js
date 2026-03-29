'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const textos = {
  es: {
    tagline: 'Hablá con argentinos reales. Viví la cultura.',
    sub: 'Mate · Truco · Fútbol · Dulce de leche',
    buscar: 'Buscar anfitriones',
    inscribirse: 'Inscribirse (Anfitriones & Viajeros)',
    como: '¿Cómo funciona?',
    paso1t: 'Elegí un anfitrión',
    paso1d: 'Filtrá por interés, habilidad o disponibilidad',
    paso2t: 'Pagá el primer contacto',
    paso2d: 'Pago seguro con Stripe',
    paso3t: '¡Conectate!',
    paso3d: 'A partir del primer contacto, son libres de continuar como quieran',
    mate: 'Mate',
    truco: 'Truco',
    futbol: 'Fútbol',
    dulce: 'Dulce de leche',
    entrar: 'Entrar',
    miperfil: 'Mi perfil',
    registrarse: 'Registrarse',
  },
  en: {
    tagline: 'Talk with real Argentinians. Live the culture.',
    sub: 'Mate · Truco · Football · Dulce de leche',
    buscar: 'Find hosts',
    inscribirse: 'Sign up (Hosts & Travelers)',
    como: 'How does it work?',
    paso1t: 'Choose a host',
    paso1d: 'Filter by interest, skill or availability',
    paso2t: 'Pay for first contact',
    paso2d: 'Secure payment with Stripe',
    paso3t: 'Connect!',
    paso3d: 'After the first contact, you are free to continue however you want',
    mate: 'Mate',
    truco: 'Truco',
    futbol: 'Football',
    dulce: 'Dulce de leche',
    entrar: 'Log in',
    miperfil: 'My profile',
    registrarse: 'Sign up',
  }
};

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [lang, setLang] = useState('es');
  const t = textos[lang];

  useEffect(() => { setLoggedIn(!!localStorage.getItem('token')); }, []);

  return (
    <>
      <nav className="nav">
        <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        <div className="nav-links" style={{ alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 4, marginRight: 8 }}>
            <button onClick={() => setLang('es')} style={{ width: 'auto', padding: '4px 8px', fontSize: 16, background: lang === 'es' ? 'rgba(255,255,255,0.3)' : 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer' }}>🇦🇷</button>
            <button onClick={() => setLang('en')} style={{ width: 'auto', padding: '4px 8px', fontSize: 16, background: lang === 'en' ? 'rgba(255,255,255,0.3)' : 'transparent', border: 'none', borderRadius: 6, cursor: 'pointer' }}>🇬🇧</button>
          </div>
          {loggedIn ? (
            <Link href="/dashboard">{t.miperfil}</Link>
          ) : (
            <><Link href="/login">{t.entrar}</Link><Link href="/register">{t.registrarse}</Link></>
          )}
        </div>
      </nav>

      <div style={{ background: '#003DA5', padding: '40px 20px 60px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🧉</div>
        <h1 style={{ color: 'white', fontSize: 32, marginBottom: 10 }}>
          Argen<span style={{ color: '#F4A020' }}>talk</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 8 }}>{t.tagline}</p>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 28 }}>{t.sub}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/explorar">
            <button className="btn-orange" style={{ width: 'auto', padding: '13px 28px' }}>{t.buscar}</button>
          </Link>
          <Link href="/register">
            <button style={{ width: 'auto', padding: '13px 28px', background: 'transparent', border: '2px solid white', color: 'white' }}>{t.inscribirse}</button>
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '-30px auto 0', padding: '0 20px 40px' }}>
        <div className="cultura-grid" style={{ marginTop: 0 }}>
          <Link href="/cultura/mate" className="cultura-item">
            <span className="cultura-icon">🧉</span>
            <div className="cultura-label">{t.mate}</div>
          </Link>
          <Link href="/cultura/truco" className="cultura-item">
            <span className="cultura-icon">🃏</span>
            <div className="cultura-label">{t.truco}</div>
          </Link>
          <Link href="/cultura/futbol" className="cultura-item">
            <span className="cultura-icon">⚽</span>
            <div className="cultura-label">{t.futbol}</div>
          </Link>
          <Link href="/cultura/dulce" className="cultura-item">
            <span className="cultura-icon">🍮</span>
            <div className="cultura-label">{t.dulce}</div>
          </Link>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h2>{t.como}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left', marginTop: 16 }}>
            {[
              { n: 1, t: t.paso1t, d: t.paso1d },
              { n: 2, t: t.paso2t, d: t.paso2d },
              { n: 3, t: t.paso3t, d: t.paso3d },
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