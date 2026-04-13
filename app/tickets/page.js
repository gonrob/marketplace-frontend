'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Nav from '../components/Nav';
import api from '../../lib/api';
import useLang from '../../lib/useLang';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const T = {
  es:{titulo:'Comprar ticket',servicio:'Gastos de servicio: USD 1.00',porque:'Por que USD 1.00?',explicacion:'KNOWAN cobra USD 1.00 de gasto de gestion por conectarte con los mejores eventos en Argentina. Luego te redirigimos al sitio oficial para comprar tu entrada.',pagar:'Pagar USD 1.00 - Gastos de servicio',procesando:'Procesando...',preparando:'Preparando pago...'},
  en:{titulo:'Buy ticket',servicio:'Service fee: USD 1.00',porque:'Why USD 1.00?',explicacion:'KNOWAN charges USD 1.00 as a management fee. We then redirect you to the official site to buy your ticket.',pagar:'Pay USD 1.00 - Service fee',procesando:'Processing...',preparando:'Preparing payment...'},
  pt:{titulo:'Comprar ingresso',servicio:'Taxa de servico: USD 1.00',porque:'Por que USD 1.00?',explicacion:'KNOWAN cobra USD 1.00 como taxa de gestao. Em seguida, redirecionamos para o site oficial.',pagar:'Pagar USD 1.00 - Taxa de servico',procesando:'Processando...',preparando:'Preparando...'},
  fr:{titulo:'Acheter un billet',servicio:'Frais de service: USD 1.00',porque:'Pourquoi USD 1.00?',explicacion:"KNOWAN facture USD 1.00 comme frais de gestion. Nous vous redirigeons ensuite vers le site officiel.",pagar:'Payer USD 1.00 - Frais de service',procesando:'Traitement...',preparando:'Preparation...'},
  it:{titulo:'Acquista biglietto',servicio:'Costi di servizio: USD 1.00',porque:'Perche USD 1.00?',explicacion:"KNOWAN addebita USD 1.00 come spese di gestione. Ti reindirizziamo poi al sito ufficiale.",pagar:'Paga USD 1.00 - Costi di servizio',procesando:'Elaborazione...',preparando:'Preparazione...'},
  de:{titulo:'Ticket kaufen',servicio:'Servicegebuhr: USD 1.00',porque:'Warum USD 1.00?',explicacion:'KNOWAN berechnet USD 1.00 als Verwaltungsgebuhr. Wir leiten Sie dann zur offiziellen Website weiter.',pagar:'USD 1.00 zahlen - Servicegebuhr',procesando:'Verarbeitung...',preparando:'Vorbereitung...'},
  zh:{titulo:'购票',servicio:'服务费: USD 1.00',porque:'为什么USD 1.00?',explicacion:'KNOWAN收取USD 1.00作为管理费。然后我们将您重定向到官方网站。',pagar:'支付USD 1.00 - 服务费',procesando:'处理中...',preparando:'准备中...'},
  ru:{titulo:'Купить билет',servicio:'Плата за обслуживание: USD 1.00',porque:'Почему USD 1.00?',explicacion:'KNOWAN взимает USD 1.00 в качестве платы за управление. Затем мы перенаправляем вас на официальный сайт.',pagar:'Оплатить USD 1.00 - Плата за обслуживание',procesando:'Обработка...',preparando:'Подготовка...'},
};

function CheckoutForm({ eventoUrl, t }) {
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
      confirmParams: { return_url: window.location.origin + '/tickets/success?url=' + encodeURIComponent(eventoUrl) }
    });
    if (err) { setError(err.message); setLoading(false); }
  };

  return (
    <form onSubmit={submit}>
      {error && <div className="error">{error}</div>}
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading} className="btn-orange" style={{ marginTop: 20 }}>
        {loading ? t.procesando : t.pagar}
      </button>
    </form>
  );
}

function TicketsContent() {
  const params = useSearchParams();
  const router = useRouter();
  const { lang } = useLang();
  const t = T[lang] || T.es;
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
          <div style={{ fontSize: 13, color: '#888' }}>{t.servicio}</div>
        </div>

        <div style={{ background: '#fffbea', borderRadius: 12, padding: 14, marginBottom: 20, border: '1.5px solid #fcd34d' }}>
          <p style={{ fontSize: 14, fontWeight: 600, margin: '0 0 8px', color: '#92400e' }}>ℹ️ {t.porque}</p>
          <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.7 }}>{t.explicacion}</p>
        </div>

        {error && <div className="error">{error}</div>}

        {clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm eventoUrl={eventoUrl} t={t} />
          </Elements>
        )}

        {!clientSecret && !error && <div className="spinner">{t.preparando}</div>}
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
