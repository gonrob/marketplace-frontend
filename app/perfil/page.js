'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';

const ADMIN = 'gonrobtor@gmail.com';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) { router.push('/login'); return; }
    api.get('/api/auth/me')
      .then(r => setUser(r.data))
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, []);

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
          <Link href="/explorar">Explorar</Link>
          <button onClick={logout} className="btn-sm" style={{background:'rgba(255,255,255,0.2)',border:'none',color:'white'}}>Salir</button>
        </div>
      </nav>

      <div className="container">
        {msg && <div className="error">{msg}</div>}

        <div className="card" style={{textAlign:'center'}}>
          <div
            onClick={() => router.push('/perfil')}
            style={{width:80,height:80,borderRadius:'50%',background:'#EBF2FF',color:'#003DA5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,fontWeight:700,margin:'0 auto 12px',cursor:'pointer',overflow:'hidden'}}
          >
            {user?.foto
              ? <img src={user.foto} alt="foto" style={{width:'100%',height:'100%',objectFit:'cover'}} />
              : (user?.nombre || user?.email || 'A')[0].toUpperCase()
            }
          </div>
          <div style={{fontSize:12,color:'#888',marginBottom:4}}>Tocá la foto para cambiarla</div>
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
        </div>

        <Link href="/perfil">
          <button className="btn-secondary" style={{marginBottom:12}}>✏️ Editar mi perfil</button>
        </Link>

        {user?.role === 'seller' && (
          <>
            {!user?.verificado && (
              <button className="btn-secondary" style={{marginBottom:12}} onClick={verificar}>
                🪪 Verificar identidad (DNI o Pasaporte)
              </button>
            )}
            {user?.verificado && (
              <div className="success" style={{marginBottom:12}}>🪪 Identidad verificada ✅</div>
            )}
          </>
        )}

        {user?.role === 'buyer' && (
          <div className="card">
            <h2>Que queres hacer?</h2>
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