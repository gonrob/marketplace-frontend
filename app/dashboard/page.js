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
      setMsg(err.response?.data?.error || 'Error al crear cuenta.');
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

  const handleVerificar = async () => {
    try {
      const res = await api.post('/api/stripe/verify/identity');
      window.location.href = res.data.url;
    } catch (err) {
      alert('Error al iniciar verificacion');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
  };

  if (loading) return <div className="spinner">Cargando...</div>;

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="nav-logo">Argen<span>talk</span></span>
        </Link>
        <div className="nav-links">
          <Link href="/explorar">Explorar</Link>
          <button onClick={handleLogout} style={{ width: 'auto', padding: '6px 14px', fontSize: 13, background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}>Salir</button>
        </div>
      </nav>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '24px 20px' }}>
        {msg && <div className="error">{msg}</div>}

        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#EBF2FF', color: '#003DA5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, fontWeight: 700, margin: '0 auto 12px' }}>
            {(user?.nombre || user?.email || 'A')[0].toUpperCase()}
          </div>
          <div style={{ fontWeight: 600, fontSize: 18 }}>{user?.nombre || 'Sin nombre'}</div>
          <div style={{ color: '#888', fontSize: 14, marginTop: 4 }}>{user?.email}</div>
          <div style={{ marginTop: 8 }}>
            <span className="badge badge-blue">{user?.role === 'seller' ? 'Anfitrion' : 'Viajero'}</span>
          </div>
        </div>

        {user?.role === 'seller' && (
          <div>
            <div className="card">
              <h2 style={{ marginBottom: 14 }}>Tu cuenta Stripe</h2>
              {!stripeStatus?.hasAccount && (
                <div>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>Conecta tu cuenta de Stripe para recibir pagos. Argentalk cobra 15% por cada contacto.</p>
                  <button className="btn-orange" onClick={handleCreateSellerAccount}>Conectar con Stripe</button>
                </div>
              )}
              {stripeStatus?.hasAccount && !stripeStatus?.onboardingComplete && (
                <div>
                  <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>Tu cuenta esta pendiente de verificacion.</p>
                  <button className="btn-orange" onClick={handleResumeOnboarding}>Completar verificacion</button>
                </div>
              )}
              {stripeStatus?.onboardingComplete && (
                <div className="success">Tu cuenta esta activa. Ya podes recibir pagos.</div>
              )}
            </div>

            <Link href="/perfil">
              <button style={{ marginBottom: 12 }}>Editar mi perfil de anfitrion</button>
            </Link>

            {!user?.verificado && (
              <button className="btn-secondary" style={{ marginBottom: 12 }} onClick={handleVerificar}>
                Verificar identidad (DNI o Pasaporte)
              </button>
            )}

            {user?.verificado && (
              <div className="success" style={{ marginBottom: 12 }}>Identidad verificada</div>
            )}
          </div>
        )}

        {user?.role === 'buyer' && (
          <div className="card">
            <h2 style={{ marginBottom: 14 }}>Que queres hacer?</h2>
            <Link href="/explorar">
              <button className="btn-orange" style={{ marginBottom: 12 }}>Buscar anfitriones</button>
            </Link>
            <Link href="/cultura/mate">
              <button className="btn-secondary">Aprender sobre la cultura argentina</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}