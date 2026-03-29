'use client';
import Link from 'next/link';

export default function PaySuccess() {
  return (
    <>
      <nav style={{ background: '#003DA5', padding: '14px 20px' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'white', fontWeight: 700, fontSize: 20 }}>
          Argen<span style={{ color: '#F4A020' }}>talk</span> 🧉
        </Link>
      </nav>
      <div style={{ maxWidth: 480, margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ background: 'white', borderRadius: 16, padding: 32, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <h1 style={{ marginBottom: 12 }}>Pago completado!</h1>
          <p style={{ color: '#666', marginBottom: 24 }}>El anfitrion recibio tu contacto. Ya podes coordinar con el directamente.</p>
          <Link href="/explorar">
            <button style={{ width: 'auto', padding: '12px 28px', background: '#F4A020', color: 'white', border: 'none', borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}>
              Ver mas anfitriones
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
