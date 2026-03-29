'use client';

import Link from 'next/link';

export default function PaySuccess() {
  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>✅</div>
        <h1>¡Pago completado!</h1>
        <p style={{ color: '#666', margin: '12px 0 24px' }}>
          Tu pago se ha procesado correctamente.
        </p>
        <Link href="/">
          <button>Volver al inicio</button>
        </Link>
      </div>
    </div>
  );
}
