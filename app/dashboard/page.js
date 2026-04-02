'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';

const ADMIN = 'gonrobtor@gmail.com';

const T = {
  es:{retirar:'Retirar ganancias',retirando:'Procesando retiro...',minimoRetiro:'Minimo USD 1 para retirar.',retiroOk:'Solicitud de retiro enviada. Te contactaremos pronto.',creditos:'Contactos disponibles',comprar:'Comprar contactos'},
  en:{retirar:'Withdraw earnings',retirando:'Processing...',minimoRetiro:'Minimum USD 1 to withdraw.',retiroOk:'Withdrawal request sent. We will contact you soon.',creditos:'Available contacts',comprar:'Buy contacts'},
  pt:{retirar:'Retirar ganhos',retirando:'Processando...',minimoRetiro:'Minimo USD 1 para retirar.',retiroOk:'Solicitacao enviada.',creditos:'Contatos disponiveis',comprar:'Comprar contatos'},
  fr:{retirar:'Retirer les gains',retirando:'Traitement...',minimoRetiro:'Minimum USD 1 pour retirer.',retiroOk:'Demande envoyee.',creditos:'Contacts disponibles',comprar:'Acheter des contacts'},
  it:{retirar:'Ritira guadagni',retirando:'Elaborazione...',minimoRetiro:'Minimo USD 1 per ritirare.',retiroOk:'Richiesta inviata.',creditos:'Contatti disponibili',comprar:'Acquista contatti'},
  de:{retirar:'Gewinne auszahlen',retirando:'Verarbeitung...',minimoRetiro:'Mindestens USD 1 zum Auszahlen.',retiroOk:'Anfrage gesendet.',creditos:'Verfugbare Kontakte',comprar:'Kontakte kaufen'},
  zh:{retirar:'提取收益',retirando:'处理中...',minimoRetiro:'最低提取USD 1。',retiroOk:'提款申请已发送。',creditos:'可用联系次数',comprar:'购买联系次数'},
  ru:{retirar:'Вывести заработок',retirando:'Обработка...',minimoRetiro:'Минимум USD 1 для вывода.',retiroOk:'Запрос отправлен.',creditos:'Доступные контакты',comprar:'Купить контакты'},
};

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const [retirando, setRetirando] = useState(false);
  const [lang, setLang] = useState('es');

  const loadUser = async () => {
    try {
      const r = await api.get('/api/auth/me');
      setUser(r.data);
    } catch {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
    if (!localStorage.getItem('token')) { router.push('/login'); return; }
    loadUser();
  }, []);

  useEffect(() => {
    if (searchParams.get('verified') === 'true') {
      loadUser();
      setMsg('Identidad verificada correctamente!');
    }
    if (searchParams.get('paquete') === 'true') {
      loadUser();
      setMsg('Paquete de contactos activado!');
    }
  }, [searchParams]);

  const verificar = async () => {
    try {
      const r = await api.post('/api/stripe/verify/identity');
      window.location.href = r.data.url;
    } catch { setMsg('Error al iniciar verificacion.'); }
  };

  const retirar = async () => {
    if (retirando) return;
    const t = T[lang] || T.es;
    if ((user?.ganancias || 0) < 1) { setError(t.minimoRetiro); return; }
    setRetirando(true); setError(''); setMsg('');
    try {
      const r = await api.post('/api/stripe/retirar');
      setMsg(r.data.message || (T[lang]||T.es).retiroOk);
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
      <nav className="nav">
        <Link href="/" style={{textDecoration:'none'}}><span className="nav-logo">Argen<span>talk</span> 🧉</span></Link>
        <div className="nav-links">
          <Link href="/" style={{fontSize:13,color:'white',textDecoration:'none',opacity:0.8}}>🏠 Home</Link>
          <Link href="/explorar" style={{fontSize:13,color:'white',textDecoration:'none'}}>Explorar</Link>
          <button onClick={logout} className="btn-sm" style={{background:'rgba(255,255,255,0.2)',border:'none',color:'white'}}>Salir</button>
        </div>
      </nav>

      <div className="container">
        {msg && <div className="success">{msg}</div>}
        {error && <div className="error">{error}</div>}

        <div className="card" style={{textAlign:'center'}}>
          <div onClick={() => router.push('/perfil')} style={{width:80,height:80,borderRadius:'50%',background:'#EBF2FF',color:'#003DA5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:700,margin:'0 auto 12px',overflow:'hidden',cursor:'pointer',border:'3px solid #003DA5'}}>
            {user?.foto
              ? <img src={user.foto} alt="foto" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              : (user?.nombre||user?.email||'A')[0].toUpperCase()
            }
          </div>
          <div style={{fontSize:11,color:'#888',marginBottom:8}}>Toca para cambiar foto</div>
          <div style={{fontWeight:600,fontSize:18}}>{user?.nombre||'Sin nombre'}</div>
          <div style={{color:'#888',fontSize:14,marginTop:4}}>{user?.email}</div>
          <div style={{marginTop:8,display:'flex',gap:6,justifyContent:'center',flexWrap:'wrap'}}>
            <span className="badge badge-blue">{user?.role==='seller'?'🏠 Anfitrion':'🌍 Viajero'}</span>
            {user?.verificado && <span className="badge badge-green">✓ Verificado</span>}
          </div>
        </div>

        {user?.role === 'seller' && (
          <>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:16}}>
              <div style={{background:'#f0f4ff',borderRadius:12,padding:'16px',textAlign:'center'}}>
                <div style={{fontSize:24,fontWeight:700,color:'#003DA5'}}>USD {(user?.ganancias||0).toFixed(2)}</div>
                <div style={{fontSize:12,color:'#888',marginTop:4}}>Ganancias</div>
              </div>
              <div style={{background:'#f0fff4',borderRadius:12,padding:'16px',textAlign:'center'}}>
                <div style={{fontSize:24,fontWeight:700,color:'#065f46'}}>{user?.totalContactos||0}</div>
                <div style={{fontSize:12,color:'#888',marginTop:4}}>Contactos</div>
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

            <Link href="/perfil">
              <button style={{marginBottom:12}}>✏️ Editar mi perfil</button>
            </Link>

            {!user?.verificado ? (
              <button className="btn-secondary" style={{marginBottom:12}} onClick={verificar}>
                🪪 Verificar identidad
              </button>
            ) : (
              <div className="success" style={{marginBottom:12}}>🪪 Identidad verificada ✅</div>
            )}
          </>
        )}

        {user?.role === 'buyer' && (
          <div className="card">
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
              <div>
                <div style={{fontWeight:600,fontSize:16}}>🎫 {t.creditos}</div>
                <div style={{fontSize:24,fontWeight:700,color:'#003DA5'}}>{user?.creditosContacto||0}</div>
              </div>
              <Link href="/pay?paquetes=true">
                <button className="btn-orange" style={{width:'auto',padding:'10px 16px',fontSize:13}}>
                  📦 {t.comprar}
                </button>
              </Link>
            </div>

            <Link href="/explorar">
              <button className="btn-orange" style={{marginBottom:12}}>🔍 Buscar anfitriones</button>
            </Link>
            <Link href="/perfil">
              <button style={{marginBottom:12}}>✏️ Editar mi perfil</button>
            </Link>
            <Link href="/cultura/mate">
              <button className="btn-secondary">🧉 Aprender sobre Argentina</button>
            </Link>
          </div>
        )}

        {isAdmin && (
          <Link href="/admin">
            <button style={{background:'#1a1a1a',color:'white',marginTop:8}}>⚙️ Panel Admin</button>
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