'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Compartir() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js';
    script.onload = () => {
      if (canvasRef.current) {
        window.QRCode.toCanvas(canvasRef.current, 'https://argentalk.vercel.app', {
          width: 200, margin: 2,
          color: { dark: '#003DA5', light: '#ffffff' }
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  const copiar = () => {
    navigator.clipboard.writeText('https://argentalk.vercel.app');
    alert('Link copiado!');
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

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
            <canvas ref={canvasRef} style={{ borderRadius: 12 }} />
          </div>

          <div style={{ background: '#f0f4ff', borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            <span style={{ flex: 1, fontSize: 14, color: '#003DA5', textAlign: 'left', wordBreak: 'break-all' }}>
              https://argentalk.vercel.app
            </span>
            <button onClick={copiar} style={{ width: 'auto', padding: '8px 16px', fontSize: 13, background: '#003DA5', flexShrink: 0 }}>
              Copiar
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <a href="https://wa.me/?text=Conocé%20Argentalk%20-%20Hablá%20con%20argentinos%20reales%20https://argentalk.vercel.app" target="_blank" rel="noopener noreferrer">
              <button style={{ background: '#25D366', border: 'none' }}>
                Compartir por WhatsApp
              </button>
            </a>
            <a href="mailto:?subject=Conocé Argentalk&body=Hablá con argentinos reales en https://argentalk.vercel.app" >
              <button className="btn-secondary">
                Compartir por Email
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}