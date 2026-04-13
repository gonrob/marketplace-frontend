'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';
import useLang from '../../lib/useLang';

const T = {
  es:{titulo:'Anfitriones disponibles',buscar:'Buscar...',disponible:'Disponible',verificado:'Verificado',contactar:'Contactar',verPerfil:'👁️ Ver perfil',porHora:'/ hora',sinAnfitriones:'No hay anfitriones disponibles.',cargando:'Cargando...'},
  en:{titulo:'Available hosts',buscar:'Search...',disponible:'Available',verificado:'Verified',contactar:'Contact',verPerfil:'👁️ View profile',porHora:'/ hour',sinAnfitriones:'No hosts available.',cargando:'Loading...'},
  pt:{titulo:'Anfitrioes disponiveis',buscar:'Buscar...',disponible:'Disponivel',verificado:'Verificado',contactar:'Contatar',verPerfil:'👁️ Ver perfil',porHora:'/ hora',sinAnfitriones:'Nenhum anfitriao disponivel.',cargando:'Carregando...'},
  fr:{titulo:'Hotes disponibles',buscar:'Rechercher...',disponible:'Disponible',verificado:'Verifie',contactar:'Contacter',verPerfil:'👁️ Voir profil',porHora:'/ heure',sinAnfitriones:'Aucun hote disponible.',cargando:'Chargement...'},
  it:{titulo:'Host disponibili',buscar:'Cerca...',disponible:'Disponibile',verificado:'Verificato',contactar:'Contatta',verPerfil:'👁️ Vedi profilo',porHora:'/ ora',sinAnfitriones:'Nessun host disponibile.',cargando:'Caricamento...'},
  de:{titulo:'Verfugbare Gastgeber',buscar:'Suchen...',disponible:'Verfugbar',verificado:'Verifiziert',contactar:'Kontaktieren',verPerfil:'👁️ Profil ansehen',porHora:'/ Stunde',sinAnfitriones:'Keine Gastgeber verfugbar.',cargando:'Laden...'},
  zh:{titulo:'可用主人',buscar:'搜索...',disponible:'可用',verificado:'已验证',contactar:'联系',verPerfil:'👁️ 查看资料',porHora:'/ 小时',sinAnfitriones:'没有可用的主人。',cargando:'加载中...'},
  ru:{titulo:'Доступные хозяева',buscar:'Поиск...',disponible:'Доступен',verificado:'Проверен',contactar:'Связаться',verPerfil:'👁️ Посмотреть профиль',porHora:'/ час',sinAnfitriones:'Нет доступных хозяев.',cargando:'Загрузка...'},
};


const HAB_NAMES = {
  paseos_ciudad: {es:'Paseos por la ciudad',en:'City walks',pt:'Passeios pela cidade',fr:'Promenades en ville',it:'Passeggiate in città',de:'Stadtspaziergänge',zh:'城市漫步',ru:'Прогулки по городу'},
  tour_barrios: {es:'Tour por barrios',en:'Neighborhood tour',pt:'Tour pelos bairros',fr:'Tour des quartiers',it:'Tour dei quartieri',de:'Stadtteil-Tour',zh:'街区游览',ru:'Тур по районам'},
  miradores: {es:'Miradores y vistas',en:'Viewpoints',pt:'Mirantes',fr:'Belvédères',it:'Belvederi',de:'Aussichtspunkte',zh:'观景台',ru:'Смотровые площадки'},
  vida_nocturna: {es:'Vida nocturna',en:'Nightlife',pt:'Vida noturna',fr:'Vie nocturne',it:'Vita notturna',de:'Nachtleben',zh:'夜生活',ru:'Ночная жизнь'},
  partido_futbol: {es:'Ver partido de fútbol',en:'Watch football match',pt:'Ver jogo de futebol',fr:'Match de foot',it:'Partita di calcio',de:'Fußballspiel',zh:'看足球比赛',ru:'Футбольный матч'},
  jugar_futbol: {es:'Jugar fútbol con locales',en:'Play football with locals',pt:'Jogar futebol com locais',fr:'Jouer au foot',it:'Giocare a calcio',de:'Fußball spielen',zh:'和本地人踢球',ru:'Играть в футбол'},
  actividades_deportivas: {es:'Actividades deportivas',en:'Sports activities',pt:'Atividades esportivas',fr:'Activités sportives',it:'Attività sportive',de:'Sportaktivitäten',zh:'体育活动',ru:'Спортивные активности'},
  tour_gastronomico: {es:'Tour gastronómico',en:'Food tour',pt:'Tour gastronômico',fr:'Tour gastronomique',it:'Tour gastronomico',de:'Gastronomie-Tour',zh:'美食之旅',ru:'Гастрономический тур'},
  restaurantes_locales: {es:'Restaurantes locales',en:'Local restaurants',pt:'Restaurantes locais',fr:'Restaurants locaux',it:'Ristoranti locali',de:'Lokale Restaurants',zh:'当地餐厅',ru:'Местные рестораны'},
  asado: {es:'Asado argentino',en:'Argentine BBQ',pt:'Churrasco argentino',fr:'Barbecue argentin',it:'Asado argentino',de:'Argentinisches BBQ',zh:'阿根廷烤肉',ru:'Аргентинский барбекю'},
  cocina: {es:'Clases de cocina',en:'Cooking classes',pt:'Aulas de culinária',fr:'Cours de cuisine',it:'Lezioni di cucina',de:'Kochkurse',zh:'烹饪课',ru:'Кулинарные классы'},
  bares_vinos: {es:'Ruta de bares y vinos',en:'Bars and wine tour',pt:'Rota de bares e vinhos',fr:'Route des bars et vins',it:'Giro di bar e vini',de:'Bar- und Wein-Tour',zh:'酒吧和葡萄酒之旅',ru:'Тур по барам и винам'},
  tour_cultural: {es:'Tour cultural',en:'Cultural tour',pt:'Tour cultural',fr:'Tour culturel',it:'Tour culturale',de:'Kulturelle Tour',zh:'文化游览',ru:'Культурный тур'},
  museos: {es:'Museos y galerías',en:'Museums and galleries',pt:'Museus e galerias',fr:'Musées et galeries',it:'Musei e gallerie',de:'Museen und Galerien',zh:'博物馆和画廊',ru:'Музеи и галереи'},
  espectaculos: {es:'Espectáculos',en:'Shows',pt:'Espetáculos',fr:'Spectacles',it:'Spettacoli',de:'Veranstaltungen',zh:'演出',ru:'Шоу'},
  excursiones: {es:'Excursiones',en:'Excursions',pt:'Excursões',fr:'Excursions',it:'Escursioni',de:'Ausflüge',zh:'郊游',ru:'Экскурсии'},
  senderismo: {es:'Senderismo',en:'Hiking',pt:'Caminhadas',fr:'Randonnée',it:'Escursionismo',de:'Wandern',zh:'徒步旅行',ru:'Пешие походы'},
  campo: {es:'Día de campo',en:'Country day',pt:'Dia no campo',fr:'Journée à la campagne',it:'Giornata in campagna',de:'Landausflug',zh:'乡村一日游',ru:'День на природе'},
  acuaticas: {es:'Actividades acuáticas',en:'Water activities',pt:'Atividades aquáticas',fr:'Activités nautiques',it:'Attività acquatiche',de:'Wasseraktivitäten',zh:'水上活动',ru:'Водные активности'},
  acompanamiento: {es:'Acompañamiento',en:'Accompaniment',pt:'Acompanhamento',fr:'Accompagnement',it:'Accompagnamento',de:'Begleitung',zh:'陪同',ru:'Сопровождение'},
  traslados: {es:'Traslados',en:'Transfers',pt:'Traslados',fr:'Transferts',it:'Trasferimenti',de:'Transfers',zh:'接送',ru:'Трансферы'},
  itinerarios: {es:'Itinerarios',en:'Itineraries',pt:'Itinerários',fr:'Itinéraires',it:'Itinerari',de:'Reisepläne',zh:'行程规划',ru:'Маршруты'},
  traduccion: {es:'Traducción',en:'Translation',pt:'Tradução',fr:'Traduction',it:'Traduzione',de:'Übersetzung',zh:'翻译',ru:'Перевод'},
  salir_locales: {es:'Salir con locales',en:'Go out with locals',pt:'Sair com locais',fr:'Sortir avec des locaux',it:'Uscire con i locali',de:'Mit Einheimischen ausgehen',zh:'和本地人出行',ru:'Прогулки с местными'},
  mate: {es:'Experiencia mate',en:'Mate experience',pt:'Experiência mate',fr:'Expérience maté',it:'Esperienza mate',de:'Mate-Erlebnis',zh:'马黛茶体验',ru:'Опыт мате'},
  mercados: {es:'Compras en mercados',en:'Market shopping',pt:'Compras em mercados',fr:'Shopping aux marchés',it:'Shopping ai mercati',de:'Markteinkäufe',zh:'市场购物',ru:'Шоппинг на рынках'},
  networking: {es:'Networking',en:'Networking',pt:'Networking',fr:'Réseautage',it:'Networking',de:'Networking',zh:'社交',ru:'Нетворкинг'},
  custom: {es:'Experiencia única',en:'Unique experience',pt:'Experiência única',fr:'Expérience unique',it:'Esperienza unica',de:'Einzigartiges Erlebnis',zh:'独特体验',ru:'Уникальный опыт'},
};

const getHabName = (h, lang) => {
  const id = typeof h === 'string' ? h : (h.id || '');
  if (h.esCustom) return HAB_NAMES.custom?.[lang] || 'Experiencia única';
  return HAB_NAMES[id]?.[lang] || HAB_NAMES[id]?.es || id.replace(/_/g,' ');
};

export default function Explorar() {
  const { lang } = useLang();
  const [sellers, setSellers] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [bios, setBios] = useState({});
  const [expanded, setExpanded] = useState({});
  const [userActual, setUserActual] = useState(null);
  const [showVerificarBanner, setShowVerificarBanner] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) api.get('/api/auth/me').then(r => setUserActual(r.data)).catch(() => {});
    if (window.location.search.includes('verificar=1')) setShowVerificarBanner(true);
  }, []);
  const [modalHost, setModalHost] = useState(null);

  useEffect(() => {
    api.get('/api/users/sellers')
      .then(r => setSellers(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (lang === 'es' || sellers.length === 0) return;
    setBios({});
    sellers.forEach(async (s) => {
      if (!s.bio) return;
      try {
        const res = await fetch('/api/translate', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({ texto: s.bio, origen: 'es', destino: lang })
        });
        const data = await res.json();
        if (data.traduccion) setBios(prev => ({...prev, [s._id]: data.traduccion}));
      } catch {}
    });
  }, [lang, sellers]);

  const t = T[lang] || T.en;

  const filtrados = sellers.filter(s =>
    !filtro ||
    s.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
    s.bio?.toLowerCase().includes(filtro.toLowerCase()) ||
    s.habilidades?.some(h => (typeof h === 'string' ? h : h.id || '').toLowerCase().includes(filtro.toLowerCase())) ||
    s.ciudad?.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) return (
    <>
      <Nav />
      {showVerificarBanner && (
        <div style={{background:'linear-gradient(90deg,#4B6CB7,#C94B4B)',padding:'14px 20px',textAlign:'center',position:'sticky',top:0,zIndex:200}}>
          <p style={{color:'#fff',fontSize:14,fontWeight:600,margin:0}}>📧 Te enviamos un email de verificación — revisá tu bandeja y spam para activar tu cuenta</p>
        </div>
      )}
      <div className="spinner">{t.cargando}</div>
    </>
  );

  return (
    <>
      <Nav />
      {showVerificarBanner && (
        <div style={{background:'linear-gradient(90deg,#4B6CB7,#C94B4B)',padding:'14px 20px',textAlign:'center',position:'sticky',top:0,zIndex:200}}>
          <p style={{color:'#fff',fontSize:14,fontWeight:600,margin:0}}>📧 Te enviamos un email de verificación — revisá tu bandeja y spam para activar tu cuenta</p>
        </div>
      )}
      <div className="container">
        <h1 style={{marginBottom:16}}>{t.titulo}</h1>

        <div style={{position:'relative',marginBottom:20}}>
          <input
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            placeholder={t.buscar}
            style={{paddingLeft:36}}
          />
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',fontSize:16}}>🔍</span>
        </div>

        {filtrados.length === 0 && (
          <div className="card" style={{textAlign:'center',color:'#888'}}>{t.sinAnfitriones}</div>
        )}

        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {filtrados.map(s => {
            const idiomas = s.habilidades && s.habilidades.length > 0
              ? [...new Set(s.habilidades.filter(h => typeof h === 'object' && h.idioma).map(h => h.idioma))]
              : [];
            return (
            <div key={s._id} className="card" style={{padding:0,overflow:'hidden',borderRadius:20,display:'flex',flexDirection:'row',minHeight:180}}>
              {/* FOTO */}
              <div style={{position:'relative',width:160,minWidth:160,background:'#EBF2FF',overflow:'hidden',flexShrink:0}}>
                {s.foto
                  ? <img src={s.foto} alt={s.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  : <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:48,fontWeight:700,color:'#4B6CB7'}}>
                      {(s.nombre||'A')[0].toUpperCase()}
                    </div>
                }
                {s.foto2 && (
                  <div style={{position:'absolute',bottom:8,right:8,width:44,height:44,borderRadius:'50%',overflow:'hidden',border:'2px solid #C94B4B'}}>
                    <img src={s.foto2} alt={s.nombrePareja} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  </div>
                )}
                {s.disponible && (
                  <div style={{position:'absolute',top:8,left:8,background:'#4B6CB7',color:'white',borderRadius:20,padding:'2px 8px',fontSize:10,fontWeight:600}}>● {t.disponible}</div>
                )}
                {s.verificado && (
                  <div style={{position:'absolute',top:8,right:8,background:'#22c55e',color:'white',borderRadius:20,padding:'2px 6px',fontSize:10,fontWeight:600}}>✓</div>
                )}
              </div>

              {/* INFO */}
              <div style={{padding:'16px',flex:1,display:'flex',flexDirection:'column',gap:6}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:17,color:'#1a1a1a'}}>{s.nombre||'Sin nombre'}{s.nombrePareja ? ` & ${s.nombrePareja}` : ''}</div>
                <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:4}}>
                  {s.idiomas?.map(i => <span key={i} style={{fontSize:10,background:'#EBF2FF',color:'#4B6CB7',borderRadius:10,padding:'2px 8px',fontWeight:600}}>{i}</span>)}
                  {s.chat && <span style={{fontSize:10,background:'#f0fdf4',color:'#15803d',borderRadius:10,padding:'2px 8px',fontWeight:600}}>💬 Chat</span>}
                  {s.videollamada && <span style={{fontSize:10,background:'#fdf4ff',color:'#C94B4B',borderRadius:10,padding:'2px 8px',fontWeight:600}}>📹 Video</span>}
                </div>
                    {s.ciudad && <div style={{fontSize:12,color:'#888',marginTop:2}}>📍 {s.ciudad}</div>}
                  </div>
                  <div style={{textAlign:'right',flexShrink:0}}>
                    <div style={{fontSize:20,fontWeight:800,color:'#4B6CB7'}}>USD {s.precio}</div>
                    <div style={{fontSize:10,color:'#aaa'}}>{t.porHora}</div>
                  </div>
                </div>

                {/* Idiomas */}
                {idiomas.length > 0 && (
                  <div style={{display:'flex',gap:4,flexWrap:'wrap'}}>
                    {idiomas.map((id,i) => (
                      <span key={i} style={{background:'#f0fdf4',color:'#15803d',borderRadius:20,padding:'2px 8px',fontSize:11,fontWeight:600}}>🌍 {id}</span>
                    ))}
                  </div>
                )}

                {/* Experiencias */}
                {s.habilidades && s.habilidades.length > 0 && (
                  <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                    {(expanded[s._id] ? s.habilidades : s.habilidades.slice(0,4)).map((h,i) => {
                      const nombre = getHabName(h, lang);
                      const precio = typeof h === 'object' && h.precio ? h.precio : null;
                      const dur = typeof h === 'object' && h.duracion ? h.duracion : null;
                      return (
                        <span key={i} style={{background:'#EBF2FF',color:'#4B6CB7',borderRadius:20,padding:'3px 10px',fontSize:11,fontWeight:500}}>
                          {nombre}{precio ? ` · USD${precio}` : ''}{dur ? ` · ${dur}` : ''}
                        </span>
                      );
                    })}
                    {s.habilidades.length > 4 && (
                      <span
                        onClick={e => { e.preventDefault(); setExpanded(prev => ({...prev, [s._id]: !prev[s._id]})); }}
                        style={{background:'#f3f4f6',color:'#4B6CB7',borderRadius:20,padding:'3px 10px',fontSize:11,cursor:'pointer',fontWeight:600}}
                      >
                        {expanded[s._id] ? 'Ver menos ▲' : `+${s.habilidades.length - 4} más ▼`}
                      </span>
                    )}
                  </div>
                )}

                {/* Bio */}
                {s.bio && (
                  <div style={{fontSize:12,color:'#555',lineHeight:1.5,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>
                    {bios[s._id] || s.bio}
                  </div>
                )}

                {/* Puntuacion + boton */}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'auto',paddingTop:8,borderTop:'1px solid #f0f0f0'}}>
                  <div>
                    {s.puntuacion > 0 && <span style={{fontSize:12,color:'#F4A020'}}>{'⭐'.repeat(Math.round(s.puntuacion))} {s.puntuacion}</span>}
                  </div>
                  <button onClick={e => {e.preventDefault(); setModalHost(s);}} style={{background:'transparent',border:'1.5px solid #4B6CB7',color:'#4B6CB7',borderRadius:10,padding:'7px 14px',fontSize:12,fontWeight:600,cursor:'pointer',marginRight:6}}>
                    {t.verPerfil || '👁️ Ver perfil'}
                  </button>
                  <Link href={
                    typeof window !== 'undefined' && localStorage.getItem('token')
                      ? `/pay?seller=${s._id}&nombre=${encodeURIComponent(s.nombre||'')}&precio=${s.precio}`
                      : '/login'
                  }>
                    <button className="btn-orange" style={{width:'auto',padding:'9px 20px',fontSize:13,borderRadius:10,fontWeight:700}}>
                      {t.contactar}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );})}
        </div>

      {modalHost && (
        <div onClick={() => setModalHost(null)} style={{position:'fixed',inset:0,zIndex:9999,background:'rgba(0,0,0,0.55)',display:'flex',alignItems:'flex-end',justifyContent:'center'}}>
          <div onClick={e => e.stopPropagation()} style={{background:'#fff',borderRadius:'20px 20px 0 0',maxWidth:600,width:'100%',maxHeight:'90vh',overflowY:'auto',padding:'24px 20px 40px'}}>
            <div style={{display:'flex',alignItems:'center',gap:16,marginBottom:20}}>
              <div style={{width:80,height:80,borderRadius:'50%',overflow:'hidden',flexShrink:0,border:'3px solid #4B6CB7',background:'#EBF2FF',display:'flex',alignItems:'center',justifyContent:'center'}}>
                {modalHost.foto ? <img src={modalHost.foto} alt={modalHost.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <span style={{fontSize:32,fontWeight:700,color:'#4B6CB7'}}>{(modalHost.nombre||'A')[0]}</span>}
              </div>
              {modalHost.foto2 && (
                <div style={{width:80,height:80,borderRadius:'50%',overflow:'hidden',flexShrink:0,border:'3px solid #C94B4B',marginLeft:-16}}>
                  <img src={modalHost.foto2} alt={modalHost.nombrePareja} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                </div>
              )}
              <div style={{flex:1}}>
                <div style={{fontWeight:800,fontSize:20,color:'#1a1a1a'}}>{modalHost.nombre}{modalHost.nombrePareja ? ` & ${modalHost.nombrePareja}` : ''}</div>
              <div style={{display:'flex',gap:6,flexWrap:'wrap',marginTop:6}}>
                {modalHost.idiomas?.map(i => <span key={i} style={{fontSize:12,background:'#EBF2FF',color:'#4B6CB7',borderRadius:10,padding:'3px 10px',fontWeight:600}}>{i}</span>)}
                {modalHost.chat && <span style={{fontSize:12,background:'#f0fdf4',color:'#15803d',borderRadius:10,padding:'3px 10px',fontWeight:600}}>💬 Chat</span>}
                {modalHost.videollamada && <span style={{fontSize:12,background:'#fdf4ff',color:'#C94B4B',borderRadius:10,padding:'3px 10px',fontWeight:600}}>📹 Video llamada</span>}
              </div>
                {modalHost.ciudad && <div style={{fontSize:13,color:'#888',marginTop:2}}>📍 {modalHost.ciudad}</div>}
                {modalHost.puntuacion > 0 && <div style={{fontSize:13,color:'#F4A020',marginTop:2}}>{'⭐'.repeat(Math.round(modalHost.puntuacion))} {modalHost.puntuacion}/5</div>}
              </div>
              <button onClick={() => setModalHost(null)} style={{background:'#f3f4f6',border:'none',borderRadius:'50%',width:36,height:36,fontSize:18,cursor:'pointer',flexShrink:0}}>✕</button>
            </div>

            {modalHost.bio && (
              <div style={{background:'#f8faff',borderRadius:12,padding:14,marginBottom:16,fontSize:13,color:'#444',lineHeight:1.6}}>
                {bios[modalHost._id] || modalHost.bio}
              </div>
            )}

            {modalHost.habilidades && modalHost.habilidades.filter(h => typeof h === 'object' && h.idioma).length > 0 && (
              <div style={{marginBottom:16}}>
                <p style={{fontWeight:700,fontSize:14,margin:'0 0 8px',color:'#222'}}>🌍 Idiomas</p>
                <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                  {[...new Set(modalHost.habilidades.filter(h => typeof h === 'object' && h.idioma).map(h => h.idioma))].map((id,i) => (
                    <span key={i} style={{background:'#f0fdf4',color:'#15803d',borderRadius:20,padding:'4px 12px',fontSize:12,fontWeight:600}}>{id}</span>
                  ))}
                </div>
              </div>
            )}

            {modalHost.habilidades && modalHost.habilidades.length > 0 && (
              <div style={{marginBottom:20}}>
                <p style={{fontWeight:700,fontSize:14,margin:'0 0 12px',color:'#222'}}>🎯 Experiencias que ofrece</p>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {modalHost.habilidades.map((h,i) => {
                    if (typeof h === 'string') return <div key={i} style={{background:'#EBF2FF',borderRadius:10,padding:'10px 14px',fontSize:13,color:'#4B6CB7',fontWeight:600}}>{getHabName(h, lang)}</div>;
                    if (h.esCustom) return (
                      <div key={i} style={{background:'linear-gradient(90deg,#fffbea,#fef3c7)',borderRadius:12,padding:'14px 16px',border:'2px solid #fcd34d'}}>
                        <div style={{fontWeight:700,fontSize:14,color:'#92400e',marginBottom:6}}>✨ Experiencia única</div>
                        <div style={{fontSize:13,color:'#555',lineHeight:1.6}}>{h.descripcion}</div>
                      </div>
                    );
                    return (
                      <div key={i} style={{background:'#f8faff',borderRadius:12,padding:'12px 14px',border:'1px solid #e5e7eb'}}>
                        <div style={{fontWeight:700,fontSize:14,color:'#1a1a1a',marginBottom:6,textTransform:'capitalize'}}>{(h.id||'').replace(/_/g,' ')}</div>
                        <div style={{display:'flex',flexWrap:'wrap',gap:6,marginBottom:h.descripcion ? 8 : 0}}>
                          {h.precio && <span style={{background:'#EBF2FF',color:'#4B6CB7',borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:700}}>💰 USD {h.precio}</span>}
                          {h.duracion && <span style={{background:'#fef3c7',color:'#92400e',borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:600}}>⏱️ {h.duracion}</span>}
                          {h.personas && <span style={{background:'#f0fdf4',color:'#15803d',borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:600}}>👥 Máx. {h.personas}</span>}
                          {h.idioma && <span style={{background:'#fdf4ff',color:'#7e22ce',borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:600}}>🌍 {h.idioma}</span>}
                          {h.punto && <span style={{background:'#fff7ed',color:'#c2410c',borderRadius:20,padding:'2px 10px',fontSize:11,fontWeight:600}}>📍 {h.punto}</span>}
                        </div>
                        {h.descripcion && <div style={{fontSize:12,color:'#555',lineHeight:1.5}}>{h.descripcion}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GALERIA */}
            {modalHost.galeria && modalHost.galeria.length > 0 && (
              <div style={{marginBottom:20}}>
                <p style={{fontWeight:700,fontSize:14,margin:'0 0 10px',color:'#222'}}>🖼️ Galería</p>
                <div style={{display:'flex',gap:8,overflowX:'auto',paddingBottom:4}}>
                  {modalHost.galeria.map((url,i) => (
                    <img key={i} src={url} alt={`foto${i}`} style={{width:100,height:100,borderRadius:10,objectFit:'cover',flexShrink:0,border:'1.5px solid #e5e7eb'}} />
                  ))}
                </div>
              </div>
            )}

            <Link href={`/pay?seller=${modalHost._id}&nombre=${encodeURIComponent(modalHost.nombre||'')}&precio=${modalHost.precio}`}>
              <button style={{width:'100%',padding:'14px',borderRadius:12,border:'none',background:'linear-gradient(90deg,#4B6CB7,#C94B4B)',color:'#fff',fontSize:16,fontWeight:800,cursor:'pointer'}}>
                Contactar · USD {modalHost.precio} / hora
              </button>
            </Link>
          </div>
        </div>
      )}

      </div>
    </>
  );
}