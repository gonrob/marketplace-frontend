'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Compartir() {
  const [copiado, setCopiado] = useState(false);
  const url = 'https://argentalk.vercel.app';

  const copiar = () => {
    navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        </Link>
        <div className="nav-links">
          <Link href="/">Inicio</Link>
        </div>
      </nav>

      <div className="container">
        <div className="card" style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: 8 }}>Compartir Argentalk</h1>
          <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>
            Compartí la app con tus amigos y conocidos
          </p>

          <div style={{ background: '#f0f4ff', borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🧉</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: '#003DA5', marginBottom: 4 }}>
              Argen<span style={{ color: '#F4A020' }}>talk</span>
            </div>
            <div style={{ fontSize: 13, color: '#666' }}>
              Hablá con argentinos reales. Viví la cultura.
            </div>
          </div>

          <div style={{ background: '#f0f4ff', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ flex: 1, fontSize: 13, color: '#003DA5', textAlign: 'left', wordBreak: 'break-all' }}>
              {url}
            </span>
            <button onClick={copiar} style={{ width: 'auto', padding: '8px 16px', fontSize: 13, background: copiado ? '#22c55e' : '#003DA5', flexShrink: 0 }}>
              {copiado ? 'Copiado!' : 'Copiar'}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href={`https://wa.me/?text=Conocé%20Argentalk%20-%20Hablá%20con%20argentinos%20reales%20${url}`} target="_blank" rel="noopener noreferrer">
              <button style={{ background: '#25D366', border: 'none' }}>
                Compartir por WhatsApp
              </button>
            </a>
            <a href={`mailto:?subject=Conocé Argentalk&body=Hablá con argentinos reales en ${url}`}>
              <button className="btn-secondary">
                Compartir por Email
              </button>
            </a>
            <a href={`https://twitter.com/intent/tweet?text=Conocé%20Argentalk%20-%20Hablá%20con%20argentinos%20reales&url=${url}`} target="_blank" rel="noopener noreferrer">
              <button style={{ background: '#000', border: 'none', color: 'white' }}>
                Compartir en X (Twitter)
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}