'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../../lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// ─── Formulario de pago ───────────────────────────────────────────────────────
function CheckoutForm({ onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/pay/success`
      }
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading} style={{ marginTop: 20 }}>
        {loading ? 'Procesando...' : 'Pagar ahora'}
      </button>
    </form>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export default function PayPage() {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState('');
  const [amount, setAmount] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/api/users/sellers')
      .then(res => setSellers(res.data))
      .catch(() => setError('Error al cargar vendedores.'));
  }, []);

  const handleCreatePayment = async (e) => {
    e.preventDefault();
    setError('');

    const amountCents = Math.round(parseFloat(amount) * 100);
    if (isNaN(amountCents) || amountCents < 50) {
      return setError('El importe mínimo es 0.50€');
    }

    setLoading(true);
    try {
      const res = await api.post('/api/stripe/pay', {
        amount: amountCents,
        sellerUserId: selectedSeller
      });
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Realizar pago</h1>

        {error && <div className="error">{error}</div>}

        {!clientSecret ? (
          <form onSubmit={handleCreatePayment}>
            <div className="form-group">
              <label>Vendedor</label>
              <select
                value={selectedSeller}
                onChange={e => setSelectedSeller(e.target.value)}
                required
              >
                <option value="">Selecciona un vendedor</option>
                {sellers.map(s => (
                  <option key={s._id} value={s._id}>{s.email}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Importe (€)</label>
              <input
                type="number"
                min="0.50"
                step="0.01"
                placeholder="10.00"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                required
              />
              {amount && parseFloat(amount) >= 0.5 && (
                <p style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
                  Comisión plataforma (10%): {(parseFloat(amount) * 0.1).toFixed(2)}€ —
                  Vendedor recibe: {(parseFloat(amount) * 0.9).toFixed(2)}€
                </p>
              )}
            </div>

            <button type="submit" disabled={loading || !selectedSeller}>
              {loading ? 'Preparando pago...' : 'Continuar →'}
            </button>
          </form>
        ) : (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}
