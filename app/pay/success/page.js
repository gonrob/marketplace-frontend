'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '../../components/Nav';
import api from '../../../lib/api';

function Estrellas({ onValorar, valorado }) {
  const [hover, setHover] = useState(0);
  const [seleccion, setSeleccion] = useState(0);

  const votar = async (puntos) => {
    setSeleccion(puntos);
    onValorar(puntos);
  };

  if (valorado) return (
    <div style={{textAlign:'center',padding:'12px 0'}}>
      <div style={{fontSize:32,marginBottom:4}}>⭐⭐⭐⭐⭐</div>
      <div style={{color:'#22c55e',fontWeight:600}}>Gracias por tu valoracion!</div>
    </div>
  );

  return (
    <div style={{textAlign:'center',padding:'12px 0'}}>
      <div style={{display:'flex',justifyContent:'center',gap:8,marginBottom:8}}>
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            onClick={() => votar(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(0)}
            style={{fontSize:32,background:'none',border:'none',cursor:'pointer',opacity:(hover||seleccion)>=n?1:0.3,transition:'opacity 0.2s'}}
          >
            ⭐
          </button>
        ))}
      </div>
      <div style={{fontSize:13,color:'#888'}}>Toca para valorar</div>
    </div>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const sellerId = params.get('seller');
  const [valorado, setValorado] = useState(false);
  const [lang, setLang] = useState('es');
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
    if (sellerId) {
      api.get('/api/users/sellers/' + sellerId).then(r => setSeller(r.data)).catch(() => {});
    }
  }, []);

  const valorar = async (puntos) => {
    if (!sellerId) return;
    try {
      await api.post(`/api/users/sellers/${sellerId}/valorar`, { puntos });
      setValorado(true);
    } catch (err) {
      console.error(err);
    }
  };

  const T = {
    es:{titulo:'Pago exitoso',sub:'Tu pago fue procesado correctamente.',email:'Recibiras un email con los datos del anfitrion.',valora:'Valora tu experiencia',explorar:'Ver mas anfitriones',chat:'Chatear con el anfitrion'},
    en:{titulo:'Payment successful',sub:'Your payment was processed correctly.',email:'You will receive an email with the host details.',valora:'Rate your experience',explorar:'Find more hosts',chat:'Chat with the host'},
    pt:{titulo:'Pagamento bem-sucedido',sub:'Seu pagamento foi processado corretamente.',email:'Voce recebera um email com os dados do anfitriao.',valora:'Avalie sua experiencia',explorar:'Ver mais anfitrioes',chat:'Conversar com o anfitriao'},
    fr:{titulo:'Paiement reussi',sub:'Votre paiement a ete traite correctement.',email:"Vous recevrez un email avec les coordonnees de l'hote.",valora:'Evaluez votre experience',explorar:"Trouver plus d'hotes",chat:"Chatter avec l'hote"},
    it:{titulo:'Pagamento riuscito',sub:'Il tuo pagamento e stato elaborato correttamente.',email:"Riceverai un'email con i dati dell'host.",valora:'Valuta la tua esperienza',explorar:'Trova altri host',chat:"Chatta con l'host"},
    de:{titulo:'Zahlung erfolgreich',sub:'Ihre Zahlung wurde erfolgreich verarbeitet.',email:'Sie erhalten eine E-Mail mit den Gastgeberdaten.',valora:'Bewerten Sie Ihre Erfahrung',explorar:'Mehr Gastgeber finden',chat:'Mit dem Gastgeber chatten'},
    zh:{titulo:'支付成功',sub:'您的付款已成功处理。',email:'您将收到一封包含主人详细信息的电子邮件。',valora:'评价您的体验',explorar:'查找更多主人',chat:'与主人聊天'},
    ru:{titulo:'Оплата успешна',sub:'Ваш платеж был успешно обработан.',email:'Вы получите электронное письмо с данными хозяина.',valora:'Оцените свой опыт',explorar:'Найти больше хозяев',chat:'Чат с хозяином'},
  };

  const t = T[lang] || T.en;

  return (
    <div className="container">
      <div className="card" style={{textAlign:'center'}}>
        {seller?.telefono && (
          <div style={{background:'#f0fff4',borderRadius:14,padding:20,marginBottom:20,border:'2px solid #22c55e'}}>
            <div style={{fontSize:32,marginBottom:8}}>📱</div>
            <div style={{fontWeight:800,fontSize:18,color:'#15803d',marginBottom:4}}>{lang==='en'?'Host WhatsApp':lang==='zh'?'主人WhatsApp':lang==='ru'?'WhatsApp хозяина':'WhatsApp del anfitrión'}</div>
            <div style={{fontSize:18,fontWeight:700,color:'#1a1a1a',marginBottom:8}}>{seller.telefono}</div>
            <div style={{background:'#fff',borderRadius:10,padding:12,marginBottom:12,textAlign:'left',fontSize:13,color:'#555'}}>
              <p style={{margin:'0 0 6px'}}><strong>📞 {lang==='en'?'From abroad':lang==='zh'?'从国外':'Desde el extranjero'}:</strong> +54 {seller.telefono.replace(/^0/,'').replace(/^15/,'9')}</p>
              <p style={{margin:'0 0 6px'}}><strong>📱 {lang==='en'?'With Argentine SIM':lang==='zh'?'使用阿根廷SIM卡':'Con SIM argentina'}:</strong> {seller.telefono}</p>
              <p style={{margin:0,fontSize:11,color:'#aaa'}}>Si no responde al primer número, probá el segundo</p>
            </div>
            <a href={'https://wa.me/54' + seller.telefono.replace(/[^0-9]/g,'').replace(/^0/,'').replace(/^15/,'9')} target="_blank" rel="noopener noreferrer" style={{display:'inline-block',background:'#25D366',color:'white',padding:'12px 24px',borderRadius:12,fontWeight:700,textDecoration:'none',fontSize:15}}>
              {lang==='en'?'Open WhatsApp':lang==='zh'?'打开WhatsApp':lang==='ru'?'Открыть WhatsApp':'Abrir WhatsApp'}
            </a>
          </div>
        )}
        <div style={{fontSize:64,marginBottom:16}}>🎉</div>
        <h1>{t.titulo}</h1>
        <p style={{color:'#666',marginBottom:8}}>{t.sub}</p>
        <div style={{background:'#f0fff4',borderRadius:10,padding:12,marginBottom:20,fontSize:14,color:'#065f46'}}>
          📧 {t.email}
        </div>

        {sellerId && (
          <div className="card" style={{marginBottom:16}}>
            <h2 style={{marginBottom:8}}>{t.valora}</h2>
            <Estrellas onValorar={valorar} valorado={valorado} />
          </div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {sellerId && (
            <Link href={`/mensajes?con=${sellerId}`}>
              <button className="btn-orange">💬 {t.chat}</button>
            </Link>
          )}
          <Link href="/explorar">
            <button className="btn-secondary">{t.explorar}</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaySuccess() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div className="spinner">Cargando...</div>}>
        <SuccessContent />
      </Suspense>
    </>
  );
}