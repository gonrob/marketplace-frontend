'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const T = {
  es:{flag:'🇦🇷',n:'ES',tag:'Hablá con argentinos reales. Viví la cultura.',sub:'Mate · Truco · Fútbol · Dulce de leche',buscar:'Buscar anfitriones',inscribirse:'Inscribirse (Anfitriones & Viajeros)',como:'¿Cómo funciona?',p1t:'Elegí un anfitrión',p1d:'Filtrá por interés, habilidad o disponibilidad',p2t:'Pagá el primer contacto',p2d:'Pago seguro con Stripe',p3t:'¡Conectate!',p3d:'Después del primer contacto, son libres de continuar como quieran',entrar:'Entrar',perfil:'Mi perfil',viaje:'¿Viajás a Argentina?',mpd:'Creá tu cuenta de Mercado Pago gratis para pagar en Argentina',mpb:'Crear cuenta Mercado Pago',comp:'Compartir app',cont:'Contacto'},
  en:{flag:'🇬🇧',n:'EN',tag:'Talk with real Argentinians. Live the culture.',sub:'Mate · Truco · Football · Dulce de leche',buscar:'Find hosts',inscribirse:'Sign up (Hosts & Travelers)',como:'How does it work?',p1t:'Choose a host',p1d:'Filter by interest, skill or availability',p2t:'Pay for first contact',p2d:'Secure payment with Stripe',p3t:'Connect!',p3d:'After first contact, you are free to continue however you want',entrar:'Log in',perfil:'My profile',viaje:'Traveling to Argentina?',mpd:'Create your free Mercado Pago account to pay in Argentina',mpb:'Create Mercado Pago account',comp:'Share app',cont:'Contact'},
  pt:{flag:'🇧🇷',n:'PT',tag:'Fale com argentinos reais. Viva a cultura.',sub:'Mate · Truco · Futebol · Doce de leite',buscar:'Encontrar anfitriões',inscribirse:'Cadastrar (Anfitriões & Viajantes)',como:'Como funciona?',p1t:'Escolha um anfitrião',p1d:'Filtre por interesse ou disponibilidade',p2t:'Pague o primeiro contato',p2d:'Pagamento seguro com Stripe',p3t:'Conecte-se!',p3d:'Após o primeiro contato, são livres para continuar',entrar:'Entrar',perfil:'Meu perfil',viaje:'Viajando para Argentina?',mpd:'Crie sua conta Mercado Pago grátis',mpb:'Criar conta Mercado Pago',comp:'Compartilhar',cont:'Contato'},
  fr:{flag:'🇫🇷',n:'FR',tag:'Parlez avec de vrais Argentins. Vivez la culture.',sub:'Maté · Truco · Football · Dulce de leche',buscar:'Trouver des hôtes',inscribirse:"S'inscrire (Hôtes & Voyageurs)",como:'Comment ça marche?',p1t:'Choisissez un hôte',p1d:'Filtrez par intérêt ou disponibilité',p2t:'Payez le premier contact',p2d:'Paiement sécurisé avec Stripe',p3t:'Connectez-vous!',p3d:'Après le premier contact, vous êtes libres',entrar:'Se connecter',perfil:'Mon profil',viaje:'Vous voyagez en Argentine?',mpd:'Créez votre compte Mercado Pago gratuit',mpb:'Créer un compte Mercado Pago',comp:'Partager',cont:'Contact'},
  it:{flag:'🇮🇹',n:'IT',tag:'Parla con veri argentini. Vivi la cultura.',sub:'Mate · Truco · Calcio · Dulce de leche',buscar:'Trova host',inscribirse:'Iscriviti (Host & Viaggiatori)',como:'Come funziona?',p1t:'Scegli un host',p1d:'Filtra per interesse o disponibilità',p2t:'Paga il primo contatto',p2d:'Pagamento sicuro con Stripe',p3t:'Connettiti!',p3d:'Dopo il primo contatto siete liberi',entrar:'Accedi',perfil:'Il mio profilo',viaje:'Viaggi in Argentina?',mpd:'Crea il tuo account Mercado Pago gratuito',mpb:'Crea account Mercado Pago',comp:'Condividi',cont:'Contatto'},
  de:{flag:'🇩🇪',n:'DE',tag:'Sprich mit echten Argentiniern. Erlebe die Kultur.',sub:'Mate · Truco · Fußball · Dulce de leche',buscar:'Gastgeber finden',inscribirse:'Registrieren (Gastgeber & Reisende)',como:'Wie funktioniert es?',p1t:'Wähle einen Gastgeber',p1d:'Filtere nach Interesse oder Verfügbarkeit',p2t:'Zahle den ersten Kontakt',p2d:'Sichere Zahlung mit Stripe',p3t:'Verbinde dich!',p3d:'Nach dem ersten Kontakt könnt ihr weitermachen',entrar:'Anmelden',perfil:'Mein Profil',viaje:'Reist du nach Argentinien?',mpd:'Erstelle dein kostenloses Mercado Pago Konto',mpb:'Mercado Pago Konto erstellen',comp:'Teilen',cont:'Kontakt'},
  zh:{flag:'🇨🇳',n:'ZH',tag:'与真正的阿根廷人交流。体验文化。',sub:'马黛茶·特鲁科·足球·牛奶焦糖',buscar:'寻找主人',inscribirse:'注册',como:'怎么运作？',p1t:'选择主人',p1d:'按兴趣或可用性筛选',p2t:'支付第一次联系费用',p2d:'通过Stripe安全支付',p3t:'联系！',p3d:'第一次联系后可以自由继续',entrar:'登录',perfil:'我的资料',viaje:'去阿根廷旅行？',mpd:'创建免费的Mercado Pago账户',mpb:'创建Mercado Pago账户',comp:'分享',cont:'联系'},
  ru:{flag:'🇷🇺',n:'RU',tag:'Общайтесь с настоящими аргентинцами.',sub:'Мате·Труко·Футбол·Дульсе де лече',buscar:'Найти хозяина',inscribirse:'Зарегистрироваться',como:'Как это работает?',p1t:'Выберите хозяина',p1d:'Фильтр по интересам',p2t:'Оплатите первый контакт',p2d:'Безопасная оплата через Stripe',p3t:'Свяжитесь!',p3d:'После первого контакта вы свободны',entrar:'Войти',perfil:'Мой профиль',viaje:'Путешествуете в Аргентину?',mpd:'Создайте бесплатный аккаунт Mercado Pago',mpb:'Создать аккаунт Mercado Pago',comp:'Поделиться',cont:'Контакт'},
};

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [lang, setLang] = useState('es');
  const [showLangs, setShowLangs] = useState(false);
  const t = T[lang];
  useEffect(() => { setLoggedIn(!!localStorage.getItem('token')); }, []);

  return (
    <>
      <nav className="nav">
        <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        <div className="nav-links">
          <div style={{position:'relative'}}>
            <button onClick={() => setShowLangs(!showLangs)} style={{width:'auto',padding:'6px 10px',fontSize:14,background:'rgba(255,255,255,0.2)',border:'none',borderRadius:8,color:'white',cursor:'pointer'}}>
              {t.flag} {t.n}
            </button>
            {showLangs && (
              <div style={{position:'absolute',right:0,top:38,background:'white',borderRadius:10,boxShadow:'0 4px 16px rgba(0,0,0,0.15)',padding:8,zIndex:200,minWidth:130}}>
                {Object.entries(T).map(([code,tx]) => (
                  <button key={code} onClick={() => {setLang(code);setShowLangs(false);}} style={{width:'100%',padding:'7px 12px',background:lang===code?'#EBF2FF':'white',border:'none',borderRadius:8,cursor:'pointer',textAlign:'left',fontSize:14,color:'#1a1a1a',display:'flex',gap:8}}>
                    <span>{tx.flag}</span><span>{tx.n}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {loggedIn
            ? <Link href="/dashboard">{t.perfil}</Link>
            : <Link href="/login">{t.entrar}</Link>
          }
        </div>
      </nav>

      <div style={{background:'#003DA5',padding:'40px 20px 60px',textAlign:'center'}}>
        <div style={{fontSize:48,marginBottom:12}}>🧉</div>
        <h1 style={{color:'white',fontSize:32,marginBottom:10}}>Argen<span style={{color:'#F4A020'}}>talk</span></h1>
        <p style={{color:'rgba(255,255,255,0.85)',fontSize:16,marginBottom:8}}>{t.tag}</p>
        <p style={{color:'rgba(255,255,255,0.65)',fontSize:14,marginBottom:28}}>{t.sub}</p>
        <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/explorar"><button className="btn-orange" style={{width:'auto',padding:'13px 28px'}}>{t.buscar}</button></Link>
          <Link href="/register"><button style={{width:'auto',padding:'13px 28px',background:'transparent',border:'2px solid white',color:'white'}}>{t.inscribirse}</button></Link>
        </div>
      </div>

      <div style={{maxWidth:480,margin:'-30px auto 0',padding:'0 20px 40px'}}>

        <div className="cultura-grid" style={{marginTop:0,gridTemplateColumns:'repeat(5,1fr)'}}>
          <Link href="/cultura/mate" className="cultura-item"><span className="cultura-icon">🧉</span><div className="cultura-label">Mate</div></Link>
          <Link href="/cultura/truco" className="cultura-item"><span className="cultura-icon">🃏</span><div className="cultura-label">Truco</div></Link>
          <Link href="/cultura/futbol" className="cultura-item"><span className="cultura-icon">⚽</span><div className="cultura-label">Fútbol</div></Link>
          <Link href="/cultura/dulce" className="cultura-item"><span className="cultura-icon">🍮</span><div className="cultura-label">Dulce de leche</div></Link>
          <Link href="/chat" className="cultura-item"><span className="cultura-icon">🗣️</span><div className="cultura-label">Aprendé el lunfardo</div></Link>
        </div>

        <div className="card">
          <h2 style={{textAlign:'center'}}>{t.como}</h2>
          <div style={{display:'flex',flexDirection:'column',gap:16,marginTop:16}}>
            {[{n:1,ti:t.p1t,d:t.p1d},{n:2,ti:t.p2t,d:t.p2d},{n:3,ti:t.p3t,d:t.p3d}].map(s => (
              <div key={s.n} style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:s.n===3?'#F4A020':'#003DA5',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0}}>{s.n}</div>
                <div><div style={{fontWeight:600,marginBottom:4}}>{s.ti}</div><div style={{fontSize:14,color:'#666'}}>{s.d}</div></div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{background:'#009ee3',textAlign:'center'}}>
          <div style={{fontSize:32,marginBottom:8}}>💙</div>
          <div style={{color:'white',fontWeight:700,fontSize:16,marginBottom:6}}>{t.viaje}</div>
          <div style={{color:'rgba(255,255,255,0.85)',fontSize:13,marginBottom:16}}>{t.mpd}</div>
          <a href="https://www.mercadopago.com.ar/hub/registration/start" target="_blank" rel="noopener noreferrer">
            <button style={{background:'white',color:'#009ee3',border:'none',borderRadius:10,padding:'12px 24px',fontWeight:700,fontSize:14,cursor:'pointer',width:'auto'}}>{t.mpb}</button>
          </a>
        </div>

        <div style={{textAlign:'center',padding:'20px 0 40px',display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/compartir" style={{color:'#003DA5',fontSize:14,textDecoration:'none'}}>{t.comp}</Link>
          <Link href="/contacto" style={{color:'#003DA5',fontSize:14,textDecoration:'none'}}>{t.cont}</Link>
          <Link href="/explorar" style={{color:'#003DA5',fontSize:14,textDecoration:'none'}}>{t.buscar}</Link>
        </div>
      </div>
    </>
  );
}