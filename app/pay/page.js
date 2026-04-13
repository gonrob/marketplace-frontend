'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Nav from '../components/Nav';
import api from '../../lib/api';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const T = {
  es:{titulo:'Contactar anfitrion',gratis:'Primer contacto GRATIS',gratisDesc:'Este es tu primer contacto gratuito. Despues de este, cada contacto cuesta USD 0.50.',creditos:'Tienes {n} contactos disponibles',creditosDesc:'Se usara un credito de tu paquete.',pagar:'Pagar USD 0.50',procesando:'Procesando...',preparando:'Preparando...',anfitrion:'Anfitrion',contactar:'Contactar gratis',usarCredito:'Usar un credito',paquetes:'Comprar paquete de contactos',p5:'5 contactos - USD 2.00',p10:'10 contactos - USD 3.50',p25:'25 contactos - USD 7.00',seguro:'Pago seguro con Stripe.',error:'Error al procesar.',exito:'Contacto exitoso!',volver:'← Volver'},
  en:{titulo:'Contact host',gratis:'First contact FREE',gratisDesc:'This is your free first contact. After this, each contact costs USD 0.50.',creditos:'You have {n} contacts available',creditosDesc:'One credit from your package will be used.',pagar:'Pay USD 0.50',procesando:'Processing...',preparando:'Preparing...',anfitrion:'Host',contactar:'Contact for free',usarCredito:'Use one credit',paquetes:'Buy contact package',p5:'5 contacts - USD 2.00',p10:'10 contacts - USD 3.50',p25:'25 contacts - USD 7.00',seguro:'Secure payment with Stripe.',error:'Error processing.',exito:'Contact successful!',volver:'← Back'},
  pt:{titulo:'Contatar anfitriao',gratis:'Primeiro contato GRATIS',gratisDesc:'Este e seu primeiro contato gratuito.',creditos:'Voce tem {n} contatos disponiveis',creditosDesc:'Um credito do seu pacote sera usado.',pagar:'Pagar USD 0.50',procesando:'Processando...',preparando:'Preparando...',anfitrion:'Anfitriao',contactar:'Contatar gratis',usarCredito:'Usar um credito',paquetes:'Comprar pacote',p5:'5 contatos - USD 2.00',p10:'10 contatos - USD 3.50',p25:'25 contatos - USD 7.00',seguro:'Pagamento seguro.',error:'Erro.',exito:'Contato feito!',volver:'← Voltar'},
  fr:{titulo:"Contacter l'hote",gratis:'Premier contact GRATUIT',gratisDesc:'Ceci est votre premier contact gratuit.',creditos:'Vous avez {n} contacts disponibles',creditosDesc:'Un credit de votre forfait sera utilise.',pagar:'Payer USD 0.50',procesando:'Traitement...',preparando:'Preparation...',anfitrion:'Hote',contactar:'Contacter gratuitement',usarCredito:'Utiliser un credit',paquetes:'Acheter un forfait',p5:'5 contacts - USD 2.00',p10:'10 contacts - USD 3.50',p25:'25 contacts - USD 7.00',seguro:'Paiement securise.',error:'Erreur.',exito:'Contact reussi!',volver:'← Retour'},
  it:{titulo:"Contatta l'host",gratis:'Primo contatto GRATIS',gratisDesc:'Questo e il tuo primo contatto gratuito.',creditos:'Hai {n} contatti disponibili',creditosDesc:'Verra usato un credito del tuo pacchetto.',pagar:'Paga USD 0.50',procesando:'Elaborazione...',preparando:'Preparazione...',anfitrion:'Host',contactar:'Contatta gratis',usarCredito:'Usa un credito',paquetes:'Acquista pacchetto',p5:'5 contatti - USD 2.00',p10:'10 contatti - USD 3.50',p25:'25 contatti - USD 7.00',seguro:'Pagamento sicuro.',error:'Errore.',exito:'Contatto riuscito!',volver:'← Indietro'},
  de:{titulo:'Gastgeber kontaktieren',gratis:'Erster Kontakt KOSTENLOS',gratisDesc:'Dies ist Ihr kostenloser erster Kontakt.',creditos:'Sie haben {n} Kontakte verfugbar',creditosDesc:'Ein Guthaben wird verwendet.',pagar:'USD 0.50 bezahlen',procesando:'Verarbeitung...',preparando:'Vorbereitung...',anfitrion:'Gastgeber',contactar:'Kostenlos kontaktieren',usarCredito:'Guthaben verwenden',paquetes:'Paket kaufen',p5:'5 Kontakte - USD 2.00',p10:'10 Kontakte - USD 3.50',p25:'25 Kontakte - USD 7.00',seguro:'Sichere Zahlung.',error:'Fehler.',exito:'Kontakt erfolgreich!',volver:'← Zurück'},
  zh:{titulo:'联系主人',gratis:'首次联系免费',gratisDesc:'这是您的免费首次联系。',creditos:'您有{n}个联系次数',creditosDesc:'将使用一个套餐积分。',pagar:'支付USD 0.50',procesando:'处理中...',preparando:'准备中...',anfitrion:'主人',contactar:'免费联系',usarCredito:'使用积分',paquetes:'购买套餐',p5:'5次联系 - USD 2.00',p10:'10次联系 - USD 3.50',p25:'25次联系 - USD 7.00',seguro:'安全支付。',error:'错误。',exito:'联系成功！',volver:'← 返回'},
  ru:{titulo:'Связаться с хозяином',gratis:'Первый контакт БЕСПЛАТНО',gratisDesc:'Это ваш бесплатный первый контакт.',creditos:'У вас {n} контактов',creditosDesc:'Будет использован один кредит.',pagar:'Оплатить USD 0.50',procesando:'Обработка...',preparando:'Подготовка...',anfitrion:'Хозяин',contactar:'Связаться бесплатно',usarCredito:'Использовать кредит',paquetes:'Купить пакет',p5:'5 контактов - USD 2.00',p10:'10 контактов - USD 3.50',p25:'25 контактов - USD 7.00',seguro:'Безопасная оплата.',error:'Ошибка.',exito:'Контакт успешен!',volver:'← Назад'},
};

function CheckoutForm({ t, sellerId, tipo }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true); setError('');
    const returnUrl = tipo === 'paquete'
      ? `${window.location.origin}/pay/success?paquete=true`
      : `${window.location.origin}/pay/success?seller=${sellerId}`;
    const { error: err } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl }
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
  const router = useRouter();
  const sellerId = params.get('seller');
  const nombre = decodeURIComponent(params.get('nombre') || 'Anfitrion');
  const [user, setUser] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState('es');
  const [paso, setPaso] = useState('inicio');
  const [tipoPago, setTipoPago] = useState('contacto');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    api.get('/api/auth/me').then(r => setUser(r.data)).catch(() => router.push('/login'));
  }, []);

  const t = T[lang] || T.en;

  const contactarGratis = async () => {
    setLoading(true);
    try {
      const res = await api.post('/api/stripe/pay', { sellerUserId: sellerId });
      if (res.data.gratis || res.data.credito) {
        router.push(`/pay/success?seller=${sellerId}`);
      } else {
        setClientSecret(res.data.clientSecret);
        setTipoPago('contacto');
        setPaso('pago');
      }
    } catch (err) {
      setError(err.response?.data?.error || t.error);
    } finally { setLoading(false); }
  };

  const initPaquete = async (paquete) => {
    setLoading(true);
    try {
      const res = await api.post('/api/stripe/paquete', { paquete });
      setClientSecret(res.data.clientSecret);
      setTipoPago('paquete');
      setPaso('pago');
    } catch (err) {
      setError(err.response?.data?.error || t.error);
    } finally { setLoading(false); }
  };

  if (!user) return <div className="spinner">Cargando...</div>;
  if (!sellerId) return (
    <div className="container">
      <div className="card" style={{textAlign:'center'}}>
        <p>Selecciona un anfitrion desde <Link href="/explorar" style={{color:'#4B6CB7'}}>Explorar</Link></p>
      </div>
    </div>
  );

  const yaContacto = user.anfitrionesContactados?.includes(sellerId);
  const tieneGratis = user.contactosGratis && !yaContacto;
  const tieneCreditos = user.creditosContacto > 0;

  return (
    <div className="container">
      {paso === 'inicio' && (
        <div className="card">
          <div style={{background:'#f0f4ff',borderRadius:10,padding:16,marginBottom:20}}>
            <div style={{fontWeight:600,fontSize:16}}>{t.anfitrion}: {nombre}</div>
          </div>

          {error && <div className="error">{error}</div>}

          {tieneGratis && (
            <div style={{background:'#f0fff4',borderRadius:10,padding:16,marginBottom:16,border:'2px solid #22c55e'}}>
              <div style={{fontWeight:700,color:'#065f46',fontSize:16,marginBottom:6}}>🎉 {t.gratis}</div>
              <p style={{color:'#555',fontSize:14,margin:'0 0 12px'}}>{t.gratisDesc}</p>
              <button className="btn-orange" onClick={contactarGratis} disabled={loading}>
                {loading ? t.procesando : t.contactar}
              </button>
            </div>
          )}

          {!tieneGratis && tieneCreditos && (
            <div style={{background:'#f0f4ff',borderRadius:10,padding:16,marginBottom:16,border:'2px solid #4B6CB7'}}>
              <div style={{fontWeight:700,color:'#4B6CB7',fontSize:16,marginBottom:6}}>
                🎫 {t.creditos.replace('{n}', user.creditosContacto)}
              </div>
              <p style={{color:'#555',fontSize:14,margin:'0 0 12px'}}>{t.creditosDesc}</p>
              <button className="btn-orange" onClick={contactarGratis} disabled={loading}>
                {loading ? t.procesando : t.usarCredito}
              </button>
            </div>
          )}

          {!tieneGratis && !tieneCreditos && (
            <div style={{background:'#fff8e1',borderRadius:10,padding:16,marginBottom:16}}>
              <div style={{fontWeight:700,color:'#92400e',fontSize:16,marginBottom:6}}>💳 USD 0.50</div>
              <div style={{background:'#f0f4ff',borderRadius:8,padding:10,marginBottom:12,fontSize:13,color:'#555'}}>
                🔒 {t.seguro}
              </div>
              <button className="btn-orange" onClick={contactarGratis} disabled={loading}>
                {loading ? t.procesando : t.pagar}
              </button>
            </div>
          )}

          <div style={{marginTop:20,borderTop:'1px solid #f0f0f0',paddingTop:16}}>
            <h3 style={{marginBottom:12}}>📦 {t.paquetes}</h3>
            {[
              {key:'p5', label:t.p5, ahorro:''},
              {key:'p10', label:t.p10, ahorro:'30% off'},
              {key:'p25', label:t.p25, ahorro:'44% off'},
            ].map(p => (
              <button key={p.key} onClick={() => initPaquete(p.key)} disabled={loading}
                style={{width:'100%',padding:'12px 16px',marginBottom:8,background:'white',border:'1.5px solid #4B6CB7',borderRadius:10,cursor:'pointer',display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:14}}>
                <span style={{color:'#4B6CB7',fontWeight:600}}>{p.label}</span>
                {p.ahorro && <span style={{background:'#F4A020',color:'white',padding:'2px 8px',borderRadius:20,fontSize:12,fontWeight:700}}>{p.ahorro}</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {paso === 'pago' && clientSecret && (
        <div className="card">
          <h2 style={{marginBottom:16}}>💳 {t.pagar}</h2>
          <div style={{background:'#f0f4ff',borderRadius:10,padding:12,marginBottom:16,fontSize:13,color:'#555'}}>
            🔒 {t.seguro}
          </div>
          <Elements stripe={stripePromise} options={{clientSecret}}>
            <CheckoutForm t={t} sellerId={sellerId} tipo={tipoPago} />
          </Elements>
          <button onClick={() => setPaso('inicio')} style={{background:'none',border:'none',color:'#888',cursor:'pointer',marginTop:12,fontSize:13}}>
            {t.volver || '← Volver'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function Pay() {
  return (
    <>
      <Nav links={[{href:'/explorar',label:'← Back'}]} />
      <Suspense fallback={<div className="spinner">Cargando...</div>}>
        <PayContent />
      </Suspense>
    </>
  );
}