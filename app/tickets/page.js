'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Nav from '../components/Nav';
import api from '../../lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ eventoUrl }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    const { error: err } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/tickets/success?url=${encodeURIComponent(eventoUrl)}` }
    });
    if (err) { setError(err.message); setLoading(false); }
  };

  return (
    <form onSubmit={submit}>
      {error && <div className="error">{error}</div>}
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading} className="btn-orange" style={{ marginTop: 20 }}>
        {loading ? 'Procesando...' : 'Pagar USD 1.00 · Gastos de servicio'}
      </button>
    </form>
  );
}

function TicketsContent() {
  const params = useSearchParams();
  const router = useRouter();
  const eventoNombre = decodeURIComponent(params.get('evento') || '');
  const eventoUrl = decodeURIComponent(params.get('url') || '');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    api.post('/api/tickets/pagar', { eventoNombre, eventoUrl })
      .then(r => setClientSecret(r.data.clientSecret))
      .catch(err => setError(err.response?.data?.error || 'Error al crear pago.'));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div style={{ background: '#f0f4ff', borderRadius: 12, padding: 16, marginBottom: 20 }}>
          <div style={{ fontSize: 24, marginBottom: 8 }}>🎟️</div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{eventoNombre}</div>
          <div style={{ fontSize: 13, color: '#888' }}>Gastos de servicio: USD 1.00</div>
        </div>

        <div style={{ background: '#fffbea', borderRadius: 12, padding: 14, marginBottom: 20, border: '1.5px solid #fcd34d' }}>
          <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.6 }}>
            ℹ️ Pagás USD 1.00 de gastos de servicio a KNOWAN. Luego te redirigimos al sitio de venta oficial para comprar tu entrada.
          </p>
        </div>

        {error && <div className="error">{error}</div>}

        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm eventoUrl={eventoUrl} />
          </Elements>
        )}

        {!clientSecret && !error && <div className="spinner">Preparando pago...</div>}
      </div>
    </div>
  );
}

export default function Tickets() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div className="spinner">Cargando...</div>}>
        <TicketsContent />
      </Suspense>
    </>
  );
}
