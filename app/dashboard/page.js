'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';
import useLang from '../../lib/useLang';
import HostOnboarding from '../components/HostOnboarding';

const ADMIN = 'gonrobtor@gmail.com';

const T = {
  es:{retirar:'Retirar ganancias',retirando:'Procesando...',minimoRetiro:'Minimo USD 1 para retirar.',retiroOk:'Solicitud de retiro enviada. Te contactaremos pronto.',creditos:'Contactos disponibles',comprar:'Comprar contactos',ganancias:'Ganancias',contactos:'Contactos',disponible:'Disponible',verificado:'Verificado',anfitrion:'Anfitrion',viajero:'Viajero',editarPerfil:'Editar mi perfil',verificarId:'Verificar identidad',buscarAnfitriones:'Buscar anfitriones',aprender:'Aprender sobre Argentina',admin:'Panel Admin',salir:'Salir'},
  en:{retirar:'Withdraw earnings',retirando:'Processing...',minimoRetiro:'Minimum USD 1 to withdraw.',retiroOk:'Withdrawal request sent. We will contact you soon.',creditos:'Available contacts',comprar:'Buy contacts',ganancias:'Earnings',contactos:'Contacts',disponible:'Available',verificado:'Verified',anfitrion:'Host',viajero:'Traveler',editarPerfil:'Edit my profile',verificarId:'Verify identity',buscarAnfitriones:'Find hosts',aprender:'Learn about Argentina',admin:'Admin Panel',salir:'Log out'},
  pt:{retirar:'Retirar ganhos',retirando:'Processando...',minimoRetiro:'Minimo USD 1.',retiroOk:'Solicitação enviada.',creditos:'Contatos disponiveis',comprar:'Comprar contatos',ganancias:'Ganhos',contactos:'Contatos',disponible:'Disponivel',verificado:'Verificado',anfitrion:'Anfitriao',viajero:'Viajante',editarPerfil:'Editar perfil',verificarId:'Verificar identidade',buscarAnfitriones:'Buscar anfitrioes',aprender:'Aprender sobre Argentina',admin:'Painel Admin',salir:'Sair'},
  fr:{retirar:'Retirer les gains',retirando:'Traitement...',minimoRetiro:'Minimum USD 1.',retiroOk:'Demande envoyée.',creditos:'Contacts disponibles',comprar:'Acheter des contacts',ganancias:'Gains',contactos:'Contacts',disponible:'Disponible',verificado:'Vérifié',anfitrion:'Hôte',viajero:'Voyageur',editarPerfil:'Modifier mon profil',verificarId:'Vérifier identité',buscarAnfitriones:'Trouver des hôtes',aprender:"Apprendre sur l'Argentine",admin:'Panneau Admin',salir:'Déconnexion'},
  it:{retirar:'Ritira guadagni',retirando:'Elaborazione...',minimoRetiro:'Minimo USD 1.',retiroOk:'Richiesta inviata.',creditos:'Contatti disponibili',comprar:'Acquista contatti',ganancias:'Guadagni',contactos:'Contatti',disponible:'Disponibile',verificado:'Verificato',anfitrion:'Host',viajero:'Viaggiatore',editarPerfil:'Modifica profilo',verificarId:'Verifica identità',buscarAnfitriones:'Trova host',aprender:"Impara sull'Argentina",admin:'Pannello Admin',salir:'Esci'},
  de:{retirar:'Gewinne auszahlen',retirando:'Verarbeitung...',minimoRetiro:'Mindestens USD 1.',retiroOk:'Anfrage gesendet.',creditos:'Verfügbare Kontakte',comprar:'Kontakte kaufen',ganancias:'Einnahmen',contactos:'Kontakte',disponible:'Verfügbar',verificado:'Verifiziert',anfitrion:'Gastgeber',viajero:'Reisender',editarPerfil:'Profil bearbeiten',verificarId:'Identität verifizieren',buscarAnfitriones:'Gastgeber finden',aprender:'Über Argentinien lernen',admin:'Admin-Panel',salir:'Abmelden'},
  zh:{retirar:'提取收益',retirando:'处理中...',minimoRetiro:'最低提取USD 1。',retiroOk:'提款申请已发送。',creditos:'可用联系次数',comprar:'购买联系次数',ganancias:'收益',contactos:'联系次数',disponible:'可用',verificado:'已验证',anfitrion:'主人',viajero:'旅行者',editarPerfil:'编辑资料',verificarId:'验证身份',buscarAnfitriones:'寻找主人',aprender:'了解阿根廷',admin:'管理面板',salir:'退出'},
  ru:{retirar:'Вывести заработок',retirando:'Обработка...',minimoRetiro:'Минимум USD 1.',retiroOk:'Запрос отправлен.',creditos:'Доступные контакты',comprar:'Купить контакты',ganancias:'Заработок',contactos:'Контакты',disponible:'Доступен',verificado:'Проверен',anfitrion:'Хозяин',viajero:'Путешественник',editarPerfil:'Редактировать профиль',verificarId:'Подтвердить личность',buscarAnfitriones:'Найти хозяина',aprender:'Узнать об Аргентине',admin:'Панель Admin',salir:'Выйти'},
};

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { lang } = useLang();
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [retirando, setRetirando] = useState(false);

  const loadUser = async () => {
    try {
      const r = await api.get('/api/auth/me');
      setUser(r.data);
      const d = r.data;
      if (d.role === "seller" && !(d.habilidades && d.habilidades.length)) {
        setShowOnboarding(true);
      }
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) { router.push('/login'); return; }
    loadUser();
    const interval = setInterval(() => {
      loadUser();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (searchParams.get('verified') === 'true') { loadUser(); setMsg('Identidad verificada!'); }
    if (searchParams.get('paquete') === 'true') { loadUser(); setMsg('Paquete activado!'); }
  }, [searchParams]);

  const verificar = async () => {
    try {
      const r = { data: { url: null } };
      window.location.href = r.data.url;
    } catch { setError('Error al iniciar verificacion.'); }
  };

  const retirar = async () => {
    const t = T[lang] || T.es;
    if (retirando) return;
    if ((user?.ganancias || 0) < 1) { setError(t.minimoRetiro); return; }
    setRetirando(true); setError(''); setMsg('');
    try {
      const r = await api.post('/api/stripe/retirar');
      setMsg(r.data.message || t.retiroOk);
      loadUser();
    } catch (err) {
      setError(err.response?.data?.error || 'Error al retirar.');
    } finally { setRetirando(false); }
  };

  const logout = () => { localStorage.clear(); router.push('/'); };

  if (loading) return <div className="spinner">Cargando...</div>;

  const t = T[lang] || T.es;
  const isAdmin = user?.email === ADMIN;

  return (
    <>
      {user && !user.emailVerificado && user.email !== 'gonrobtor@gmail.com' && false && (
        <div style={{position:'fixed',inset:0,zIndex:9998,background:'rgba(255,255,255,0.97)',display:'flex',alignItems:'center',justifyContent:'center',padding:20}}>
          <div style={{textAlign:'center',maxWidth:400}}>
            <div style={{fontSize:60,marginBottom:16}}>📧</div>
            <h2 style={{fontSize:22,fontWeight:800,background:'linear-gradient(90deg,#4B6CB7,#C94B4B)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:8}}>Verificá tu email</h2>
            <p style={{color:'#555',fontSize:15,lineHeight:1.6,marginBottom:8}}>Te enviamos un email de verificación a <strong>{user.email}</strong></p>
            <p style={{color:'#888',fontSize:13,marginBottom:24}}>Hacé click en el link del email para activar tu cuenta.</p>
            <p style={{color:'#aaa',fontSize:12}}>¿No lo encontrás? Revisá tu carpeta de spam.</p>
          </div>
        </div>
      )}
      {showOnboarding && <HostOnboarding lang={lang} token={localStorage.getItem("token")} onComplete={() => { setShowOnboarding(false); }} onSkip={() => setShowOnboarding(false)} />}
      <nav className="nav">
        <Link href="/" style={{textDecoration:'none'}}><span className="nav-logo">Know<span>an</span> 🌐</span></Link>
        <div className="nav-links">
          <Link href="/" style={{fontSize:13,color:'white',textDecoration:'none',opacity:0.8}}>🏠 Home</Link>
          <Link href="/explorar" style={{fontSize:13,color:'white',textDecoration:'none'}}>{t.buscarAnfitriones}</Link>
          <button onClick={logout} style={{background:'rgba(255,255,255,0.2)',border:'none',color:'white',padding:'6px 12px',borderRadius:8,cursor:'pointer',fontSize:13}}>{t.salir}</button>
        </div>
      </nav>

      <div className="container">
        {msg && <div className="success">{msg}</div>}
        {error && <div className="error">{error}</div>}

        <div className="card" style={{textAlign:'center'}}>
          <div onClick={() => router.push('/perfil')} style={{width:80,height:80,borderRadius:'50%',background:'#EBF2FF',color:'#4B6CB7',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:700,margin:'0 auto 12px',overflow:'hidden',cursor:'pointer',border:'3px solid #4B6CB7'}}>
            {user?.foto
              ? <img src={user.foto} alt="foto" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              : (user?.nombre||user?.email||'A')[0].toUpperCase()
            }
          </div>
          <div style={{fontWeight:600,fontSize:18}}>{user?.nombre||'Sin nombre'}</div>
          <div style={{color:'#888',fontSize:14,marginTop:4}}>{user?.email}</div>
          <div style={{marginTop:8,display:'flex',gap:6,justifyContent:'center',flexWrap:'wrap'}}>
            <span className="badge badge-blue">{user?.role==='seller'?`🏠 ${t.anfitrion}`:`🌍 ${t.viajero}`}</span>
            {user?.verificado && <span className="badge badge-green">✓ {t.verificado}</span>}
          </div>
        </div>

        {user?.role === 'seller' && (
          <>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
              <div style={{background:'#f0f4ff',borderRadius:12,padding:'16px',textAlign:'center'}}>
                <div style={{fontSize:24,fontWeight:700,color:'#4B6CB7'}}>USD {(user?.ganancias||0).toFixed(2)}</div>
                <div style={{fontSize:12,color:'#888',marginTop:4}}>{t.ganancias}</div>
              </div>
              <div style={{background:'#f0fff4',borderRadius:12,padding:'16px',textAlign:'center'}}>
                <div style={{fontSize:24,fontWeight:700,color:'#065f46'}}>{user?.totalContactos||0}</div>
                <div style={{fontSize:12,color:'#888',marginTop:4}}>{t.contactos}</div>
              </div>
            </div>

            {user?.puntuacion > 0 && (
              <div style={{textAlign:'center',marginBottom:12,fontSize:14,color:'#F4A020'}}>
                {'⭐'.repeat(Math.round(user.puntuacion))} {user.puntuacion}/5
              </div>
            )}

            <button className="btn-orange" onClick={retirar} disabled={retirando} style={{marginBottom:12}}>
              💰 {retirando ? t.retirando : t.retirar} (USD {(user?.ganancias||0).toFixed(2)})
            </button>
            <Link href="/perfil"><button style={{marginBottom:12}}>✏️ {t.editarPerfil}</button></Link>

          </>
        )}

        {user?.role === 'buyer' && (
          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div>
                <div style={{fontWeight:600,fontSize:16}}>🎫 {t.creditos}</div>
                <div style={{fontSize:24,fontWeight:700,color:'#4B6CB7'}}>{user?.creditosContacto||0}</div>
              </div>
              <Link href="/pay?paquetes=true">
                <button className="btn-orange" style={{width:'auto',padding:'10px 16px',fontSize:13}}>📦 {t.comprar}</button>
              </Link>
            </div>
            <Link href="/explorar"><button className="btn-orange" style={{marginBottom:12}}>🔍 {t.buscarAnfitriones}</button></Link>
            <Link href="/perfil"><button style={{marginBottom:12}}>✏️ {t.editarPerfil}</button></Link>
            <Link href="/cultura/mate"><button className="btn-secondary">🌐 {t.aprender}</button></Link>
          </div>
        )}

        {isAdmin && (
          <Link href="/admin">
            <button style={{background:'#1a1a1a',color:'white',marginTop:8}}>⚙️ {t.admin}</button>
          </Link>
        )}
      </div>
    </>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="spinner">Cargando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}