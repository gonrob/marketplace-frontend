'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';

const ADMIN = 'gonrobtor@gmail.com';

export default function Admin() {
  const router = useRouter();
  const [stats, setStats] = useState(null);
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    const load = async () => {
      try {
        const me = await api.get('/api/auth/me');
        if (me.data.email !== ADMIN) { router.push('/'); return; }
        const s = await api.get('/api/users/sellers');
        setSellers(s.data);
        setStats({
          total: s.data.length,
          verificados: s.data.filter(x => x.verificado).length,
          disponibles: s.data.filter(x => x.disponible).length
        });
      } catch { router.push('/'); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div className="spinner">Cargando...</div>;

  return (
    <>
      <Nav links={[{href:'/dashboard',label:'Dashboard'}]} />
      <div className="container">
        <h1>Panel Admin ⚙️</h1>
        {stats && (
          <div style={{display:'flex',gap:12,marginBottom:20}}>
            <div className="card" style={{flex:1,textAlign:'center',padding:16}}>
              <div style={{fontSize:32,fontWeight:700,color:'#003DA5'}}>{stats.total}</div>
              <div style={{fontSize:12,color:'#888'}}>Anfitriones</div>
            </div>
            <div className="card" style={{flex:1,textAlign:'center',padding:16}}>
              <div style={{fontSize:32,fontWeight:700,color:'#22c55e'}}>{stats.verificados}</div>
              <div style={{fontSize:12,color:'#888'}}>Verificados</div>
            </div>
            <div className="card" style={{flex:1,textAlign:'center',padding:16}}>
              <div style={{fontSize:32,fontWeight:700,color:'#F4A020'}}>{stats.disponibles}</div>
              <div style={{fontSize:12,color:'#888'}}>Disponibles</div>
            </div>
          </div>
        )}
        <h2>Anfitriones registrados</h2>
        {sellers.map(s => (
          <div key={s._id} className="card" style={{marginBottom:12,display:'flex',alignItems:'center',gap:12}}>
            <div style={{width:44,height:44,borderRadius:'50%',background:'#EBF2FF',color:'#003DA5',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0,overflow:'hidden'}}>
              {s.foto ? <img src={s.foto} alt={s.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : (s.nombre||'A')[0].toUpperCase()}
            </div>
            <div style={{flex:1}}>
              <div style={{fontWeight:600}}>{s.nombre||'Sin nombre'}</div>
              <div style={{fontSize:13,color:'#888'}}>{s.ciudad} · USD {s.precio}/contacto</div>
            </div>
            <div style={{display:'flex',gap:6}}>
              {s.verificado && <span className="badge badge-green">✓</span>}
              {s.disponible && <span className="badge badge-blue">●</span>}
            </div>
            <div style={{fontWeight:700,color:'#003DA5'}}>USD {s.precio}</div>
          </div>
        ))}
      </div>
    </>
  );
}
