'use client';
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '../../components/Nav';

function SuccessContent() {
  const params = useSearchParams();
  const url = decodeURIComponent(params.get('url') || '');

  useEffect(() => {
    if (url) setTimeout(() => window.open(url, '_blank'), 1500);
  }, []);

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>🎟️</div>
        <h2 style={{ color: '#22c55e', marginBottom: 8 }}>✅ {typeof window !== 'undefined' && localStorage.getItem('lang')==='en' ? 'Payment successful' : typeof window !== 'undefined' && localStorage.getItem('lang')==='zh' ? '支付成功' : 'Pago exitoso'}</h2>
        <p style={{ color: '#555', marginBottom: 20 }}>Te estamos redirigiendo al sitio de compra de entradas...</p>
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: 'white', padding: '14px 28px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', marginBottom: 16 }}>
{typeof window !== 'undefined' && localStorage.getItem('lang')==='en' ? 'Buy tickets' : typeof window !== 'undefined' && localStorage.getItem('lang')==='zh' ? '购票' : 'Ir a comprar entradas'}
          </a>
        )}
        <br />
        <Link href="/eventos" style={{ color: '#4B6CB7', fontSize: 13 }}>{typeof window !== 'undefined' && localStorage.getItem('lang')==='en' ? 'Back to events' : 'Volver a eventos'}</Link>
      </div>
    </div>
  );
}

export default function TicketsSuccess() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div className="spinner">Cargando...</div>}>
        <SuccessContent />
      </Suspense>
    </>
  );
}
