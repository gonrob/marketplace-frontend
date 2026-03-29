'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';

const ADMIN_EMAIL = 'gonrobtor@gmail.com';

export default function Admin() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }

    const load = async () => {
      try {
        const me = await api.get('/api/auth/me');
        if (me.data.email !== ADMIN_EMAIL) {
          router.push('/dashboard');
          return;
        }
        const sellers = await api.get('/api/users/sellers');
        setUsers(sellers.data);
        setStats({
          anfitriones: sellers.data.length,
          verificados: sellers.data.filter(u => u.verificado).length,
          disponibles: sellers.data.filter(u => u.disponible).length,
        });
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="spinner">Cargando...</div>;

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        </Link>
        <div className="nav-links">
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <div className="container">
        <h1 style={{ marginBottom: 20 }}>Panel Admin</h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div className="card" style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#003DA5' }}>{stats?.anfitriones}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Anfitriones</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#22c55e' }}>{stats?.verificados}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Verificados</div>
          </div>
          <div className="card" style={{ textAlign: 'center', padding: 16 }}>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#F4A020' }}>{stats?.disponibles}</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Disponibles</div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: 16 }}>Anfitriones registrados</h2>
          {users.length === 0 && <p style={{ color: '#888' }}>No hay anfitriones todavia.</p>}
          {users.map(u => (
            <div key={u._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f0f0f0' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>{u.nombre || u.email}</div>
                <div style={{ fontSize: 12, color: '#888' }}>{u.ciudad || 'Sin ciudad'} · USD {u.precio}/contacto</div>
                <div style={{ marginTop: 4 }}>
                  {u.verificado && <span className="badge badge-green" style={{ marginRight: 4 }}>Verificado</span>}
                  {u.disponible && <span className="badge badge-blue">Disponible</span>}
                </div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#003DA5' }}>
                USD {u.precio}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}