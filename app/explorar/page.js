'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../lib/api';

const FILTROS = ['Todos', 'Guia', 'Profesor', 'Cocinero', 'Truco', 'Mate', 'Futbol', 'Musica'];

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
        </div>
      </nav>

      <div style={{ background: '#003DA5', padding: '20px 20px 40px' }}>
        <div style={{ maxWidth: 480, margin: '0 auto' }}>
          <input placeholder="Buscar por nombre o interes..." style={{ borderRadius: 24, padding: '12px 18px', border: 'none', width: '100%', fontSize: 15 }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 4 }}>
            {FILTROS.map(f => (
              <button key={f} onClick={() => setFiltro(f)} style={{ width: 'auto', padding: '6px 14px', borderRadius: 20, background: filtro === f ? '#F4A020' : 'rgba(255,255,255,0.2)', color: 'white', border: 'none', fontSize: 13, flexShrink: 0 }}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '20px' }}>
        {loading && <div className="spinner">Cargando anfitriones...</div>}

        {!loading && hosts.length === 0 && (
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🧉</div>
            <p style={{ color: '#666' }}>Todavia no hay anfitriones registrados.</p>
            <Link href="/register">
              <button className="btn-orange" style={{ marginTop: 16 }}>Ser el primero</button>
            </Link>
          </div>
        )}

        {!loading && hosts.map((host, i) => (
          <div key={host._id} className="host-card">
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div className="avatar" style={{ background: i % 2 === 0 ? '#EBF2FF' : '#FFF3E0', color: i % 2 === 0 ? '#003DA5' : '#F4A020' }}>
                {(host.nombre || host.email)[0].toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{host.nombre || host.email.split('@')[0]}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}><span className="dot-green"></span>{host.ciudad || 'Argentina'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#003DA5' }}>USD {host.precio || 10}</div>
                    <div style={{ fontSize: 11, color: '#888' }}>por contacto</div>
                  </div>
                </div>
                {host.bio && <p style={{ fontSize: 13, color: '#555', marginTop: 8 }}>{host.bio.slice(0, 80)}...</p>}
                <div style={{ marginTop: 8 }}>
                  {(host.habilidades || ['Charla', 'Cultura']).map(h => (
                    <span key={h} className="skill-tag">{h}</span>
                  ))}
                </div>
              </div>
            </div>
            <Link href={`/pay?seller=${host._id}&precio=${host.precio || 10}&nombre=${host.nombre || host.email.split('@')[0]}`}>
              <button className="btn-orange" style={{ marginTop: 12 }}>
                Contactar - USD {host.precio || 10}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
