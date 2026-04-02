'use client';
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';

const ADMIN = 'gonrobtor@gmail.com';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const [contactos, setContactos] = useState([]);

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
    if (!localStorage.getItem('token')) { router.push('/login'); return; }
    loadUser();
  }, []);

  useEffect(() => {
    if (searchParams.get('verified') === 'true') {
      loadUser();
      setMsg('Identidad verificada correctamente!');
    }
  }, [searchParams]);

  const verificar = async () => {
    try {
      const r = await api.post('/api/stripe/verify/identity');
      window.location.href = r.data.url;
    } catch { setMsg('Error al iniciar verificacion.'); }
  };

  const logout = () => { localStorage.clear(); router.push('/'); };

  if (loading) return <div className="spinner">Cargando...</div>;

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

        <div className="card" style={{textAlign:'center'}}>
          <div
            onClick={() => router.push('/perfil')}
            style={{width:80,height:80,borderRadius:'50%',background:'#EBF2FF',color:'#003DA5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:700,margin:'0 auto 12px',overflow:'hidden',cursor:'pointer',border:'3px solid #003DA5'}}
          >
            {user?.foto
              ? <img src={user.foto} alt="foto" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              : (user?.nombre || user?.email || 'A')[0].toUpperCase()
            }
          </div>
          <div style={{fontSize:11,color:'#888',marginBottom:8}}>Toca para cambiar foto</div>
          <div style={{fontWeight:600,fontSize:18}}>{user?.nombre || 'Sin nombre'}</div>
          <div style={{color:'#888',fontSize:14,marginTop:4}}>{user?.email}</div>
          <div style={{marginTop:8,display:'flex',gap:6,justifyContent:'center',flexWrap:'wrap'}}>
            <span className="badge badge-blue">{user?.role === 'seller' ? '🏠 Anfitrion' : '🌍 Viajero'}</span>
            {user?.verificado && <span className="badge badge-green">✓ Verificado</span>}
          </div>

          {user?.role === 'seller' && (
            <div style={{display:'flex',gap:12,marginTop:16,justifyContent:'center'}}>
              <div style={{background:'#f0f4ff',borderRadius:12,padding:'12px 20px',textAlign:'center',flex:1}}>
                <div style={{fontSize:24,fontWeight:700,color:'#003DA5'}}>USD {(user?.ganancias||0).toFixed(2)}</div>
                <div style={{fontSize:12,color:'#888',marginTop:4}}>Ganancias totales</div>
              </div>
              <div style={{background:'#f0fff4',borderRadius:12,padding:'12px 20px',textAlign:'center',flex:1}}>
                <div style={{fontSize:24,fontWeight:700,color:'#065f46'}}>{user?.totalContactos||0}</div>
                <div style={{fontSize:12,color:'#888',marginTop:4}}>Contactos</div>
              </div>
            </div>
          )}

          {user?.role === 'seller' && user?.puntuacion > 0 && (
            <div style={{marginTop:12,fontSize:14,color:'#F4A020'}}>
              {'⭐'.repeat(Math.round(user.puntuacion))} {user.puntuacion}/5
            </div>
          )}
        </div>

        {user?.role === 'seller' && (
          <>
            <Link href="/perfil">
              <button style={{marginBottom:12}}>✏️ Editar mi perfil</button>
            </Link>
            {!user?.verificado ? (
              <button className="btn-secondary" style={{marginBottom:12}} onClick={verificar}>
                🪪 Verificar identidad (DNI o Pasaporte)
              </button>
            ) : (
              <div className="success" style={{marginBottom:12}}>🪪 Identidad verificada ✅</div>
            )}
          </>
        )}

        {user?.role === 'buyer' && (
          <div className="card">
            <h2>Que queres hacer?</h2>
            <Link href="/perfil">
              <button style={{marginBottom:12}}>✏️ Editar mi perfil</button>
            </Link>
            <Link href="/explorar">
              <button className="btn-orange" style={{marginBottom:12}}>🔍 Buscar anfitriones</button>
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