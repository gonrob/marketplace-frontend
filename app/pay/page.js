'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Nav from '../components/Nav';
import api from '../../lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const T = {
  es:{titulo:'Pagar primer contacto',metodo:'Pagar con tarjeta',seguro:'Pago seguro con Stripe. Tus datos bancarios nunca se almacenan en Argentalk.',continuar:'Continuar con el pago',pagar:'Pagar ahora',procesando:'Procesando...',preparando:'Preparando pago...',anfitrion:'Anfitrion',contacto:'Primer contacto',recibe:'El anfitrion recibe',gratis:'Registro gratuito. Solo pagas cuando contactas un anfitrion.',registrate:'Registrate gratis',error:'Error al crear el pago.',emailLabel:'Tu email para recibir los datos del anfitrion'},
  en:{titulo:'Pay for first contact',metodo:'Pay by card',seguro:'Secure payment with Stripe. Your bank details are never stored in Argentalk.',continuar:'Continue to payment',pagar:'Pay now',procesando:'Processing...',preparando:'Preparing payment...',anfitrion:'Host',contacto:'First contact',recibe:'The host receives',gratis:'Free registration. You only pay when you contact a host.',registrate:'Register for free',error:'Error creating payment.',emailLabel:'Your email to receive the host details'},
  pt:{titulo:'Pagar pelo primeiro contato',metodo:'Pagar com cartao',seguro:'Pagamento seguro com Stripe.',continuar:'Continuar para o pagamento',pagar:'Pagar agora',procesando:'Processando...',preparando:'Preparando pagamento...',anfitrion:'Anfitriao',contacto:'Primeiro contato',recibe:'O anfitriao recebe',gratis:'Cadastro gratuito.',registrate:'Cadastrar gratis',error:'Erro ao criar pagamento.',emailLabel:'Seu email para receber os dados do anfitriao'},
  fr:{titulo:'Payer le premier contact',metodo:'Payer par carte',seguro:'Paiement securise avec Stripe.',continuar:'Continuer vers le paiement',pagar:'Payer maintenant',procesando:'Traitement...',preparando:'Preparation...',anfitrion:'Hote',contacto:'Premier contact',recibe:"L'hote recoit",gratis:"Inscription gratuite.",registrate:"S'inscrire",error:'Erreur.',emailLabel:"Votre email pour recevoir les coordonnees de l'hote"},
  it:{titulo:'Paga il primo contatto',metodo:'Paga con carta',seguro:'Pagamento sicuro con Stripe.',continuar:'Continua al pagamento',pagar:'Paga ora',procesando:'Elaborazione...',preparando:'Preparazione...',anfitrion:'Host',contacto:'Primo contatto',recibe:"L'host riceve",gratis:'Registrazione gratuita.',registrate:'Registrati',error:'Errore.',emailLabel:"La tua email per ricevere i dati dell'host"},
  de:{titulo:'Ersten Kontakt bezahlen',metodo:'Mit Karte bezahlen',seguro:'Sichere Zahlung mit Stripe.',continuar:'Weiter zur Zahlung',pagar:'Jetzt bezahlen',procesando:'Verarbeitung...',preparando:'Vorbereitung...',anfitrion:'Gastgeber',contacto:'Erster Kontakt',recibe:'Der Gastgeber erhalt',gratis:'Kostenlose Registrierung.',registrate:'Registrieren',error:'Fehler.',emailLabel:'Ihre E-Mail um die Gastgeberdaten zu erhalten'},
  zh:{titulo:'支付首次联系费用',metodo:'用卡支付',seguro:'通过Stripe安全支付。',continuar:'继续支付',pagar:'立即支付',procesando:'处理中...',preparando:'准备中...',anfitrion:'主人',contacto:'首次联系',recibe:'主人收到',gratis:'免费注册。',registrate:'免费注册',error:'出错了。',emailLabel:'您的电子邮件以接收主人详细信息'},
  ru:{titulo:'Оплатить первый контакт',metodo:'Оплатить картой',seguro:'Безопасная оплата через Stripe.',continuar:'Перейти к оплате',pagar:'Оплатить',procesando:'Обработка...',preparando:'Подготовка...',anfitrion:'Хозяин',contacto:'Первый контакт',recibe:'Хозяин получает',gratis:'Бесплатная регистрация.',registrate:'Зарегистрироваться',error:'Ошибка.',emailLabel:'Ваш email для получения данных хозяина'},
};

function CheckoutForm({ t }) {
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
        {loading ? t.procesando : t.pagar}
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [lang, setLang] = useState('es');
  const [buyerEmail, setBuyerEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLoggedIn(!!token);
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
    if (token) {
      api.get('/api/auth/me').then(r => {
        if (r.data.email) setBuyerEmail(r.data.email);
      }).catch(() => {});
    }
  }, []);

  const t = T[lang] || T.en;

  const initPago = async () => {
    setLoading(true); setError('');
    try {
      const res = await api.post('/api/stripe/pay', {
        amount: Math.round(parseFloat(precio) * 100),
        sellerUserId: sellerId,
        buyerEmail
      });
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      setError(err.response?.data?.error || t.error);
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
          <div style={{fontWeight:600,fontSize:16,marginBottom:4}}>{t.anfitrion}: {nombre}</div>
          <div style={{fontSize:14,color:'#555'}}>{t.contacto}: USD {precio}</div>
          <div style={{fontSize:12,color:'#888',marginTop:4}}>{t.recibe} USD {Math.round(parseFloat(precio)*0.85)} (85%)</div>
        </div>

        {error && <div className="error">{error}</div>}

        <h2 style={{marginBottom:16}}>💳 {t.metodo}</h2>
        <div style={{background:'#f0f4ff',borderRadius:10,padding:12,marginBottom:16,fontSize:13,color:'#555'}}>
          🔒 {t.seguro}
        </div>

        {!clientSecret && !loading && (
          <>
            <div className="form-group" style={{marginBottom:16}}>
              <label style={{fontSize:13,color:'#666',display:'block',marginBottom:6}}>{t.emailLabel}</label>
              <input
                type="email"
                value={buyerEmail}
                onChange={e => setBuyerEmail(e.target.value)}
                placeholder="tu@email.com"
                style={{marginBottom:0}}
              />
            </div>
            <button className="btn-orange" onClick={initPago} disabled={!buyerEmail}>
              {t.continuar}
            </button>
          </>
        )}
        {loading && <div className="spinner">{t.preparando}</div>}
        {clientSecret && (
          <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm t={t} />
          </Elements>
        )}

        {!loggedIn && (
          <div style={{marginTop:20,background:'#f0fff4',borderRadius:10,padding:12,fontSize:13,color:'#065f46'}}>
            ✅ {t.gratis} <Link href="/register" style={{color:'#003DA5',fontWeight:600}}>{t.registrate}</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Pay() {
  const [lang, setLang] = useState('es');
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
  }, []);
  const t = T[lang] || T.en;

  return (
    <>
      <Nav links={[{href:'/explorar',label:'← Back'}]} />
      <Suspense fallback={<div className="spinner">Cargando...</div>}>
        <PayContent />
      </Suspense>
    </>
  );
}