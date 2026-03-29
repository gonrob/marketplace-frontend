'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../lib/api';

const HABILIDADES = ['Todos', 'Guía', 'Profesor', 'Cocinero', 'Truco', 'Mate', 'Fútbol', 'Música'];

export default function Explorar() {
  const [hosts, setHosts] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/users/sellers')
      .then(res => setHosts(res.data))
      .catch(() => setHosts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        </Link>
        <div className="nav-links">
          <Link href="/login">Entrar</Link>
          <Link href="/register">Registrarse</Link>
        </div>
      </nav>

      <div style={{ background: '#003DA5', padding: '20px 20px 40px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <input
            placeholder="Buscar por nombre o interés..."
            style={{ borderRadius: 24, padding: '12px 18px', border: 'none', width: '100%', fontSize: 15 }}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 4 }}>
            {HABILIDADES.map(h => (
              <button
                key={h}
                onClick={() => setFiltro(h)}
                style={{
                  width: 'auto',
                  padding: '6px 14px',
                  borderRadius: 20,
                  background: filtro === h ? '#F4A020' : 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: 'none',
                  fontSize: 13,
                  flexShrink: 0,
                  cursor: 'pointer'
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px 20px' }}>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 16 }}>
          Anfitriones disponibles
        </p>

        {loading && <div className="spinner">Cargando anfitriones...</div>}

        {!loading && hosts.length === 0 && (
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🧉</div>
            <p style={{ color: '#666' }}>Todavía no hay anfitriones registrados.</p>
            <p style={{ color: '#888', fontSize: 14, marginTop: 8 }}>¡Sé el primero en registrarte!</p>
            <Link href="/register">
              <button className="btn-orange" style={{ marginTop: 16 }}>Ser anfitrión</button>
            </Link>
          </div>
        )}

        {!loading && hosts.map((host, i) => (
          <div key={host._id} className="host-card">
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div
                className="avatar"
                style={{
                  background: i % 2 === 0 ? '#EBF2FF' : '#FFF3E0',
                  color: i % 2 === 0 ? '#003DA5' : '#F4A020'
                }}
              >
                {host.email[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>
                      {host.nombre || host.email.split('@')[0]}
                    </div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                      <span className="dot-green"></span>Disponible
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="price-tag">
                      USD {host.precio || 10} <span>/contacto</span>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: 8 }}>
                  {(host.habilidades || ['Charla', 'Cultura']).map(h => (
                    <span key={h} className="skill-tag">{h}</span>
                  ))}
                </div>
              </div>
            </div>
            <Link href={`/pay?seller=${host._id}`}>
              <button className="btn-orange" style={{ marginTop: 12 }}>
                Contactar — USD {host.precio || 10}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}