'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import api from '../../lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true); setError('');
    const { error: err } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/pay/success` }
    });
    if (err) { setError(err.message); setLoading(false); }
  };

  return (
    <form onSubmit={submit}>
      {error && <div className="error">{error}</div>}
      <PaymentElement />
      <button type="submit" disabled={!stripe||loading} className="btn-orange" style={{marginTop:20}}>
        {loading ? 'Procesando...' : 'Pagar ahora'}
      </button>
    </form>
  );
}

function PayContent() {
  const params = useSearchParams();
  const sellerId = params.get('seller');
  const precio = params.get('precio') || '10';
  const nombre = decodeURIComponent(params.get('nombre') || 'Anfitrion');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sellerId) return;
    setLoading(true);
    api.post('/api/stripe/pay', { amount: Math.round(parseFloat(precio)*100), sellerUserId: sellerId })
      .then(r => setClientSecret(r.data.clientSecret))
      .catch(err => setError(err.response?.data?.error || 'Error al crear el pago.'))
      .finally(() => setLoading(false));
  }, [sellerId]);

  if (!sellerId) return (
    <div className="container">
      <div className="card" style={{textAlign:'center'}}>
        <p style={{color:'#888'}}>Selecciona un anfitrion desde <Link href="/explorar" style={{color:'#003DA5'}}>Explorar</Link></p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="card">
        <h1>Pagar primer contacto</h1>
        <div style={{background:'#f0f4ff',borderRadius:10,padding:16,marginBottom:20}}>
          <div style={{fontWeight:600,fontSize:16,marginBottom:4}}>Anfitrion: {nombre}</div>
          <div style={{fontSize:14,color:'#555'}}>Primer contacto: USD {precio}</div>
          <div style={{fontSize:12,color:'#888',marginTop:4}}>El anfitrion recibe USD {Math.round(parseFloat(precio)*0.85)} (85%)</div>
        </div>
        {error && <div className="error">{error}</div>}
        {loading && <div className="spinner">Preparando pago...</div>}
        {clientSecret && (
          <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </div>
  );
}

export default function Pay() {
  return (
    <>
      <nav className="nav">
        <Link href="/" style={{textDecoration:'none'}}><span className="nav-logo">Argen<span>talk</span> 🧉</span></Link>
        <div className="nav-links"><Link href="/explorar">Volver</Link></div>
      </nav>
      <Suspense fallback={<div className="spinner">Cargando...</div>}>
        <PayContent />
      </Suspense>
    </>
  );
}
