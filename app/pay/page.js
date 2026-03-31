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
  const [step, setStep] = useState(1);
  const [metodoPago, setMetodoPago] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const initPago = async () => {
    setLoading(true); setError('');
    try {
      const res = await api.post('/api/stripe/pay', {
        amount: Math.round(parseFloat(precio) * 100),
        sellerUserId: sellerId
      });
      setClientSecret(res.data.clientSecret);
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al crear el pago.');
    } finally { setLoading(false); }
  };

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
        <div style={{background:'#f0f4ff',borderRadius:10,padding:16,marginBottom:20}}>
          <div style={{fontWeight:600,fontSize:16,marginBottom:4}}>Anfitrion: {nombre}</div>
          <div style={{fontSize:14,color:'#555'}}>Primer contacto: USD {precio}</div>
          <div style={{fontSize:12,color:'#888',marginTop:4}}>El anfitrion recibe USD {Math.round(parseFloat(precio)*0.85)} (85%)</div>
        </div>

        {error && <div className="error">{error}</div>}

        {step === 1 && (
          <>
            <h1 style={{fontSize:20,marginBottom:16}}>Como queres pagar?</h1>
            <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
              <button
                onClick={() => { setMetodoPago('tarjeta'); setStep(2); }}
                style={{background:'white',color:'#003DA5',border:'2px solid #003DA5',borderRadius:12,padding:16,textAlign:'left',cursor:'pointer'}}
              >
                <div style={{fontWeight:700,fontSize:16}}>💳 Tarjeta internacional</div>
                <div style={{fontSize:13,marginTop:4,color:'#666'}}>Visa, Mastercard, Amex — Stripe seguro</div>
              </button>
              <a href="https://www.mercadopago.com.ar/hub/registration/start" target="_blank" rel="noopener noreferrer" style={{textDecoration:'none'}}>
                <button style={{width:'100%',background:'white',color:'#009ee3',border:'2px solid #009ee3',borderRadius:12,padding:16,textAlign:'left',cursor:'pointer'}}>
                  <div style={{fontWeight:700,fontSize:16}}>💙 Crear cuenta Mercado Pago</div>
                  <div style={{fontSize:13,marginTop:4,color:'#666'}}>Para pagar en Argentina con pesos</div>
                </button>
              </a>
            </div>
            {!loggedIn && (
              <div style={{background:'#fff8e1',borderRadius:10,padding:12,fontSize:13,color:'#92400e',marginTop:8}}>
                💡 <Link href="/register" style={{color:'#003DA5',fontWeight:600}}>Registrate gratis</Link> para guardar tu historial de contactos
              </div>
            )}
          </>
        )}

        {step === 2 && metodoPago === 'tarjeta' && (
          <>
            <h1 style={{fontSize:20,marginBottom:16}}>Pagar con tarjeta</h1>
            <div style={{background:'#f0f4ff',borderRadius:10,padding:12,marginBottom:16,fontSize:13,color:'#555'}}>
              🔒 Pago seguro con Stripe. Tus datos bancarios nunca se almacenan en Argentalk.
            </div>
            {loading && <div className="spinner">Preparando pago...</div>}
            {!clientSecret && !loading && (
              <button className="btn-orange" onClick={initPago}>
                Continuar con el pago
              </button>
            )}
            {clientSecret && (
              <Elements stripe={stripePromise} options={{clientSecret}}>
                <CheckoutForm />
              </Elements>
            )}
          </>
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