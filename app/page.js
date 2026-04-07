'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useLang from '../lib/useLang';

const LOGO = 'https://res.cloudinary.com/djtsmuzlo/image/upload/v1775331191/Disen%CC%83o_sin_ti%CC%81tulo_l1nog6.png';

const T = {
  es:{flag:'🇦🇷',n:'ES',tag:'Conectá con argentinos reales. Viví la cultura.',sub:'Mate · Truco · Fútbol · Dulce de leche',buscar:'Buscar anfitriones',inscribirse:'Inscribirse (Anfitriones & Viajeros)',como:'¿Cómo funciona?',p1t:'Elegí un anfitrión',p1d:'Filtrá por interés, habilidad o disponibilidad',p2t:'🎁 Te regalamos un chat de bienvenida',p2d:'Conocé tu primer argentino/a gratis. Si querés conocer más, solo USD 0.50 c/u',p3t:'¡Conectate!',p3d:'Después del primer contacto, son libres de continuar como quieran',entrar:'Entrar',perfil:'Mi perfil',comp:'Compartir app',cont:'Contacto',consejos:'Consejos de viaje',mapa:'Ver mapa de anfitriones',consejossub:'Dinero, transporte, seguridad y más',mate:'Mate',truco:'Truco',futbol:'Fútbol',dulce:'Dulce de leche',lunfardo:'Aprendé el lunfardo'},
  en:{flag:'🇬🇧',n:'EN',tag:'Connect with real Argentinians. Live the culture.',sub:'Mate · Truco · Football · Dulce de leche',buscar:'Find hosts',inscribirse:'Sign up (Hosts & Travelers)',como:'How does it work?',p1t:'Choose a host',p1d:'Filter by interest, skill or availability',p2t:'🎁 We gift you a welcome chat',p2d:'Meet your first Argentine for free. More hosts? Only USD 0.50 each',p3t:'Connect!',p3d:'After first contact, you are free to continue however you want',entrar:'Log in',perfil:'My profile',comp:'Share app',cont:'Contact',consejos:'Travel tips',mapa:'View host map',consejossub:'Money, transport, safety and more',mate:'Mate',truco:'Truco',futbol:'Football',dulce:'Dulce de leche',lunfardo:'Learn Argentine slang'},
  pt:{flag:'🇧🇷',n:'PT',tag:'Conecte com argentinos reais. Viva a cultura.',sub:'Mate · Truco · Futebol · Doce de leite',buscar:'Encontrar anfitriões',inscribirse:'Cadastrar (Anfitriões & Viajantes)',como:'Como funciona?',p1t:'Escolha um anfitrião',p1d:'Filtre por interesse ou disponibilidade',p2t:'🎁 Te presentamos um chat de boas-vindas',p2d:'Conheça seu primeiro argentino grátis. Mais anfitriões? Apenas USD 0.50 cada',p3t:'Conecte-se!',p3d:'Após o primeiro contato, são livres para continuar',entrar:'Entrar',perfil:'Meu perfil',comp:'Compartilhar',cont:'Contato',consejos:'Dicas de viagem',mapa:'Ver mapa de anfitriões',consejossub:'Dinheiro, transporte, segurança e mais',mate:'Mate',truco:'Truco',futbol:'Futebol',dulce:'Doce de leite',lunfardo:'Aprenda o lunfardo'},
  fr:{flag:'🇫🇷',n:'FR',tag:'Connectez avec de vrais Argentins. Vivez la culture.',sub:'Maté · Truco · Football · Dulce de leche',buscar:'Trouver des hôtes',inscribirse:"S'inscrire (Hôtes & Voyageurs)",como:'Comment ça marche?',p1t:'Choisissez un hôte',p1d:'Filtrez par intérêt ou disponibilité',p2t:'🎁 On vous offre un chat de bienvenue',p2d:'Rencontrez votre premier argentin gratuitement. Plus d hôtes? Seulement USD 0.50 chacun',p3t:'Connectez-vous!',p3d:'Après le premier contact, vous êtes libres',entrar:'Se connecter',perfil:'Mon profil',comp:'Partager',cont:'Contact',consejos:'Conseils de voyage',mapa:'Voir la carte des hôtes',consejossub:'Argent, transport, sécurité et plus',mate:'Maté',truco:'Truco',futbol:'Football',dulce:'Dulce de leche',lunfardo:'Apprenez le lunfardo'},
  it:{flag:'🇮🇹',n:'IT',tag:'Connettiti con veri argentini. Vivi la cultura.',sub:'Mate · Truco · Calcio · Dulce de leche',buscar:'Trova host',inscribirse:'Iscriviti (Host & Viaggiatori)',como:'Come funziona?',p1t:'Scegli un host',p1d:'Filtra per interesse o disponibilità',p2t:'🎁 Ti regaliamo una chat di benvenuto',p2d:'Conosci il tuo primo argentino gratis. Altri host? Solo USD 0.50 ciascuno',p3t:'Connettiti!',p3d:'Dopo il primo contatto siete liberi',entrar:'Accedi',perfil:'Il mio profilo',comp:'Condividi',cont:'Contatto',consejos:'Consigli di viaggio',mapa:'Vedi mappa degli host',consejossub:'Denaro, trasporti, sicurezza e altro',mate:'Mate',truco:'Truco',futbol:'Calcio',dulce:'Dulce de leche',lunfardo:'Impara il lunfardo'},
  de:{flag:'🇩🇪',n:'DE',tag:'Verbinde dich mit echten Argentiniern. Erlebe die Kultur.',sub:'Mate · Truco · Fußball · Dulce de leche',buscar:'Gastgeber finden',inscribirse:'Registrieren (Gastgeber & Reisende)',como:'Wie funktioniert es?',p1t:'Wähle einen Gastgeber',p1d:'Filtere nach Interesse oder Verfügbarkeit',p2t:'🎁 Wir schenken dir einen Willkommens-Chat',p2d:'Lerne deinen ersten Argentinier kostenlos kennen. Weitere Gastgeber? Nur USD 0.50 pro Person',p3t:'Verbinde dich!',p3d:'Nach dem ersten Kontakt könnt ihr weitermachen',entrar:'Anmelden',perfil:'Mein Profil',comp:'Teilen',cont:'Kontakt',consejos:'Reisetipps',mapa:'Gastgeberkarte anzeigen',consejossub:'Geld, Transport, Sicherheit und mehr',mate:'Mate',truco:'Truco',futbol:'Fußball',dulce:'Dulce de leche',lunfardo:'Lerne Lunfardo'},
  zh:{flag:'🇨🇳',n:'ZH',tag:'与真正的阿根廷人联系。体验文化。',sub:'马黛茶·特鲁科·足球·牛奶焦糖',buscar:'寻找主人',inscribirse:'注册',como:'怎么运作？',p1t:'选择主人',p1d:'按兴趣或可用性筛选',p2t:'🎁 赠送一次欢迎聊天',p2d:'免费认识您的第一位阿根廷人。更多主人？每位仅需USD 0.50',p3t:'联系！',p3d:'第一次联系后可以自由继续',entrar:'登录',perfil:'我的资料',comp:'分享',cont:'联系',consejos:'旅行贴士',mapa:'查看房东地图',consejossub:'金钱、交通、安全等',mate:'马黛茶',truco:'特鲁科',futbol:'足球',dulce:'牛奶焦糖',lunfardo:'学习阿根廷俚语'},
  ru:{flag:'🇷🇺',n:'RU',tag:'Общайтесь с настоящими аргентинцами.',sub:'Мате·Труко·Футбол·Дульсе де лече',buscar:'Найти хозяина',inscribirse:'Зарегистрироваться',como:'Как это работает?',p1t:'Выберите хозяина',p1d:'Фильтр по интересам',p2t:'🎁 Дарим приветственный чат',p2d:'Познакомьтесь с первым аргентинцем бесплатно. Больше хозяев? Всего USD 0.50 каждый',p3t:'Свяжитесь!',p3d:'После первого контакта вы свободны',entrar:'Войти',perfil:'Мой профиль',comp:'Поделиться',cont:'Контакт',consejos:'Советы путешественникам',mapa:'Смотреть карту хозяев',consejossub:'Деньги, транспорт, безопасность и другое',mate:'Мате',truco:'Труко',futbol:'Футбол',dulce:'Дульсе де лече',lunfardo:'Учите лунфардо'},
};

export default function Home() {
  const { lang, setLang } = useLang();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLangs, setShowLangs] = useState(false);
  const t = T[lang] || T.es;

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem('token'));
  }, []);

  const changeLang = (code) => {
    setLang(code);
    setShowLangs(false);
  };

  return (
    <>
      <nav style={{background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',padding:'12px 20px',display:'flex',justifyContent:'space-between',alignItems:'center',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 12px rgba(0,0,0,0.2)'}}>
        <Link href="/" style={{textDecoration:'none'}}>
          <img src={LOGO} alt="Knowan" style={{height:40,objectFit:'contain'}} />
        </Link>
        <div style={{display:'flex',gap:12,alignItems:'center'}}>
          <div style={{position:'relative'}}>
            <button onClick={() => setShowLangs(!showLangs)} style={{width:'auto',padding:'6px 10px',fontSize:14,background:'rgba(255,255,255,0.2)',border:'1px solid rgba(255,255,255,0.3)',borderRadius:8,color:'white',cursor:'pointer'}}>
              {t.flag} {t.n}
            </button>
            {showLangs && (
              <div style={{position:'absolute',right:0,top:42,background:'white',borderRadius:10,boxShadow:'0 4px 20px rgba(0,0,0,0.2)',padding:8,zIndex:200,minWidth:130}}>
                {Object.entries(T).map(([code,tx]) => (
                  <button key={code} onClick={() => changeLang(code)} style={{width:'100%',padding:'7px 12px',background:lang===code?'#EBF2FF':'white',border:'none',borderRadius:8,cursor:'pointer',textAlign:'left',fontSize:14,color:'#1a1a1a',display:'flex',gap:8}}>
                    <span>{tx.flag}</span><span>{tx.n}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {loggedIn
            ? <Link href="/dashboard" style={{color:'white',fontSize:13,textDecoration:'none',background:'rgba(255,255,255,0.2)',padding:'6px 12px',borderRadius:8}}>{t.perfil}</Link>
            : <Link href="/login" style={{color:'white',fontSize:13,textDecoration:'none',background:'rgba(255,255,255,0.2)',padding:'6px 12px',borderRadius:8}}>{t.entrar}</Link>
          }
        </div>
      </nav>

      <div style={{background:'linear-gradient(135deg,#4B6CB7 0%,#8B4BA8 50%,#C94B4B 100%)',padding:'50px 20px 80px',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,opacity:0.1,backgroundImage:`url(${LOGO})`,backgroundSize:'cover',backgroundPosition:'center'}} />
        <div style={{position:'relative',zIndex:1}}>
          <img src={LOGO} alt="Knowan" style={{height:100,objectFit:'contain',marginBottom:16,filter:'drop-shadow(0 4px 12px rgba(0,0,0,0.3))'}} />
          <p style={{color:'rgba(255,255,255,0.9)',fontSize:17,marginBottom:8,fontWeight:500}}>{t.tag}</p>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:14,marginBottom:32}}>{t.sub}</p>
          <div style={{display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap'}}>
            <Link href="/explorar">
              <button style={{width:'auto',padding:'14px 32px',background:'white',color:'#C94B4B',border:'none',borderRadius:12,fontWeight:700,fontSize:15,cursor:'pointer',boxShadow:'0 4px 12px rgba(0,0,0,0.2)'}}>
                {t.buscar}
              </button>
            </Link>
            <Link href="/mapa">
              <button style={{width:'auto',padding:'14px 32px',background:'transparent',border:'2px solid white',color:'white',borderRadius:12,fontWeight:600,fontSize:15,cursor:'pointer'}}>
                🗺️ {t.mapa}
              </button>
            </Link>
            <Link href="/register">
              <button style={{width:'auto',padding:'14px 32px',background:'transparent',border:'2px solid white',color:'white',borderRadius:12,fontWeight:600,fontSize:15,cursor:'pointer'}}>
                {t.inscribirse}
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div style={{maxWidth:480,margin:'-30px auto 0',padding:'0 20px 40px'}}>
        <div className="cultura-grid" style={{marginTop:0,gridTemplateColumns:'repeat(5,1fr)'}}>
          <Link href="/cultura/mate" className="cultura-item"><span className="cultura-icon">🧉</span><div className="cultura-label">{t.mate}</div></Link>
          <Link href="/cultura/truco" className="cultura-item"><span className="cultura-icon">🃏</span><div className="cultura-label">{t.truco}</div></Link>
          <Link href="/cultura/futbol" className="cultura-item"><span className="cultura-icon">⚽</span><div className="cultura-label">{t.futbol}</div></Link>
          <Link href="/cultura/dulce" className="cultura-item"><span className="cultura-icon">🍮</span><div className="cultura-label">{t.dulce}</div></Link>
          <Link href="/chat" className="cultura-item"><span className="cultura-icon">🗣️</span><div className="cultura-label">{t.lunfardo}</div></Link>
        </div>

        <div className="card">
          <h2 style={{textAlign:'center'}}>{t.como}</h2>
          <div style={{display:'flex',flexDirection:'column',gap:16,marginTop:16}}>
            {[{n:1,ti:t.p1t,d:t.p1d},{n:2,ti:t.p2t,d:t.p2d},{n:3,ti:t.p3t,d:t.p3d}].map(s => (
              <div key={s.n} style={{display:'flex',gap:14,alignItems:'flex-start'}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:s.n===3?'#C94B4B':'#4B6CB7',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0}}>{s.n}</div>
                <div><div style={{fontWeight:600,marginBottom:4}}>{s.ti}</div><div style={{fontSize:14,color:'#666'}}>{s.d}</div></div>
              </div>
            ))}
          </div>
        </div>

        <Link href="/consejos" style={{textDecoration:'none'}}>
          <div style={{background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',borderRadius:14,padding:'16px 20px',marginBottom:16,display:'flex',alignItems:'center',gap:12,cursor:'pointer',boxShadow:'0 4px 12px rgba(0,0,0,0.15)'}}>
            <span style={{fontSize:28}}>✈️</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:16,color:'white'}}>{t.consejos}</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,0.9)',marginTop:2}}>{t.consejossub}</div>
            </div>
            <span style={{color:'white',fontSize:20,fontWeight:700}}>→</span>
          </div>
        </Link>

        <div style={{textAlign:'center',padding:'8px 0 40px',display:'flex',gap:20,justifyContent:'center',flexWrap:'wrap'}}>
          <Link href="/compartir" style={{color:'#4B6CB7',fontSize:14,textDecoration:'none'}}>{t.comp}</Link>
          <Link href="/contacto" style={{color:'#4B6CB7',fontSize:14,textDecoration:'none'}}>{t.cont}</Link>
          <Link href="/explorar" style={{color:'#4B6CB7',fontSize:14,textDecoration:'none'}}>{t.buscar}</Link>
        </div>
      </div>
    </>
  );
}