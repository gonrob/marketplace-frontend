'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Nav from '../components/Nav';
import useLang from '../../lib/useLang';
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

const T = {
  es:{titulo:'Comprar ticket',servicio:'Gastos de servicio',porque:'¿Por qué USD 1.00?',explicacion:'KNOWAN cobra USD 1.00 de gasto de gestión por conectarte con los mejores eventos en Argentina. Luego te redirigimos al sitio oficial.',pagar:'Pagar USD 1.00 · Gastos de servicio',procesando:'Procesando...',preparando:{t.preparando}},
  en:{titulo:'Buy ticket',servicio:'Service fee',porque:'Why USD 1.00?',explicacion:'KNOWAN charges USD 1.00 as a management fee for connecting you with the best events in Argentina. We then redirect you to the official site.',pagar:'Pay USD 1.00 · Service fee',procesando:'Processing...',preparando:'Preparing payment...'},
  pt:{titulo:'Comprar ingresso',servicio:'Taxa de serviço',porque:'Por que USD 1.00?',explicacion:'KNOWAN cobra USD 1.00 como taxa de gestão. Em seguida, redirecionamos para o site oficial.',pagar:'Pagar USD 1.00 · Taxa de serviço',procesando:'Processando...',preparando:'Preparando...'},
  fr:{titulo:'Acheter un billet',servicio:'Frais de service',porque:'Pourquoi USD 1.00?',explicacion:"KNOWAN facture USD 1.00 comme frais de gestion. Nous vous redirigeons ensuite vers le site officiel.",pagar:'Payer USD 1.00 · Frais de service',procesando:'Traitement...',preparando:'Préparation...'},
  it:{titulo:'Acquista biglietto',servicio:'Costi di servizio',porque:'Perché USD 1.00?',explicacion:"KNOWAN addebita USD 1.00 come spese di gestione. Ti reindirizziamo poi al sito ufficiale.",pagar:'Paga USD 1.00 · Costi di servizio',procesando:'Elaborazione...',preparando:'Preparazione...'},
  de:{titulo:'Ticket kaufen',servicio:'Servicegebühr',porque:'Warum USD 1.00?',explicacion:'KNOWAN berechnet USD 1.00 als Verwaltungsgebühr. Wir leiten Sie dann zur offiziellen Website weiter.',pagar:'USD 1.00 zahlen · Servicegebühr',procesando:'Verarbeitung...',preparando:'Vorbereitung...'},
  zh:{titulo:'购票',servicio:'服务费',porque:'为什么USD 1.00?',explicacion:'KNOWAN收取USD 1.00作为管理费。然后我们将您重定向到官方网站。',pagar:'支付USD 1.00 · 服务费',procesando:'处理中...',preparando:'准备中...'},
  ru:{titulo:'Купить билет',servicio:'Плата за обслуживание',porque:'Почему USD 1.00?',explicacion:'KNOWAN взимает USD 1.00 в качестве платы за управление. Затем мы перенаправляем вас на официальный сайт.',pagar:'Оплатить USD 1.00 · Плата за обслуживание',procesando:'Обработка...',preparando:'Подготовка...'},
};

function TicketsContent() {
  const params = useSearchParams();
  const router = useRouter();
  const eventoNombre = decodeURIComponent(params.get('evento') || '');
  const eventoUrl = decodeURIComponent(params.get('url') || '');
  const { lang } = useLang();
  const t = T[lang] || T.es;
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
          <p style={{ fontSize: 14, color: '#555', margin: '0 0 10px', lineHeight: 1.7, fontWeight: 600 }}>
            ℹ️ ¿Por qué USD 1.00?
          </p>
          <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.7 }}>
            KNOWAN cobra <strong>USD 1.00 de gasto de gestión</strong> por conectarte con los mejores eventos en Argentina. Este pago cubre la búsqueda, verificación y acceso a los links oficiales de compra de entradas. Luego te redirigimos directamente al sitio oficial para que compres tu entrada de forma segura.
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
