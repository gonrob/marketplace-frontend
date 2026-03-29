'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stripeStatus, setStripeStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }

    const fetchData = async () => {
      try {
        const meRes = await api.get('/api/auth/me');
        setUser(meRes.data);

        const statusRes = await api.get('/api/stripe/seller/status');
        setStripeStatus(statusRes.data);
      } catch {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateSellerAccount = async () => {
    try {
      setMsg('');
      const res = await api.post('/api/stripe/seller/create');
      window.location.href = res.data.url;
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error al crear cuenta de vendedor.');
    }
  };

  const handleResumeOnboarding = async () => {
    try {
      setMsg('');
      const res = await api.get('/api/stripe/seller/onboarding');
      window.location.href = res.data.url;
    } catch (err) {
      setMsg(err.response?.data?.error || 'Error al obtener link.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (loading) return <div className="spinner">Cargando...</div>;

  return (
    <>
      <nav className="nav">
        <span className="nav-logo">🛍️ Marketplace</span>
        <div className="nav-links">
          <Link href="/pay">Hacer pago</Link>
          <button
            onClick={handleLogout}
            style={{ width: 'auto', padding: '6px 14px', fontSize: 13, background: '#eee', color: '#444' }}
          >
            Salir
          </button>
        </div>
      </nav>

      <div className="container">
        <div className="card">
          <h1>Dashboard</h1>
          <p style={{ color: '#888', marginBottom: 20, fontSize: 14 }}>{user?.email}</p>

          {msg && <div className="error">{msg}</div>}

          <div className="stat-grid">
            <div className="stat-box">
              <div className="stat-label">Rol</div>
              <div className="stat-value" style={{ fontSize: 16 }}>
                {user?.role === 'seller' ? '🏪 Vendedor' : '🛒 Comprador'}
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Cuenta Stripe</div>
              <div className="stat-value" style={{ fontSize: 14 }}>
                {!stripeStatus?.hasAccount && <span className="badge badge-gray">Sin cuenta</span>}
                {stripeStatus?.hasAccount && !stripeStatus?.onboardingComplete && (
                  <span className="badge badge-yellow">Pendiente</span>
                )}
                {stripeStatus?.onboardingComplete && (
                  <span className="badge badge-green">✓ Activa</span>
                )}
              </div>
            </div>
          </div>

          {/* Vendedor sin cuenta Stripe */}
          {user?.role === 'seller' && !stripeStatus?.hasAccount && (
            <div>
              <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
                Conecta tu cuenta de Stripe para empezar a recibir pagos con comisión del 10%.
              </p>
              <button onClick={handleCreateSellerAccount}>
                Conectar con Stripe →
              </button>
            </div>
          )}

          {/* Vendedor con onboarding pendiente */}
          {stripeStatus?.hasAccount && !stripeStatus?.onboardingComplete && (
            <div>
              <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
                Tu cuenta de Stripe está pendiente de verificación.
              </p>
              <button onClick={handleResumeOnboarding}>
                Completar verificación →
              </button>
            </div>
          )}

          {/* Vendedor activo */}
          {stripeStatus?.onboardingComplete && (
            <div className="success">
              ✅ Tu cuenta de Stripe está activa. Ya puedes recibir pagos.
            </div>
          )}

          {/* Comprador */}
          {user?.role === 'buyer' && (
            <Link href="/pay">
              <button>Hacer un pago →</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
