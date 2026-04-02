'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import api from '../../lib/api';

const ADMIN = 'gonrobtor@gmail.com';

export default function Admin() {
  const router = useRouter();
  const [sellers, setSellers] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('anfitriones');
  const [stats, setStats] = useState(null);

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
          disponibles: s.data.filter(x => x.disponible).length,
          gananciasTotal: s.data.reduce((acc, x) => acc + (x.ganancias || 0), 0),
          contactosTotal: s.data.reduce((acc, x) => acc + (x.totalContactos || 0), 0),
        });

        // Cargar pagos de Stripe
        try {
          const p = await api.get('/api/admin/pagos');
          setPagos(p.data);
        } catch {}

      } catch { router.push('/'); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div className="spinner">Cargando...</div>;

  const tabStyle = (t) => ({
    width:'auto',padding:'8px 16px',fontSize:13,
    background: tab === t ? '#003DA5' : 'white',
    color: tab === t ? 'white' : '#003DA5',
    border:'1.5px solid #003DA5',borderRadius:8,cursor:'pointer'
  });

  return (
    <>
      <Nav links={[{href:'/dashboard',label:'Dashboard'}]} />
      <div className="container">
        <h1>Panel Admin ⚙️</h1>

        {stats && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:20}}>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:28,fontWeight:700,color:'#003DA5'}}>{stats.total}</div>
              <div style={{fontSize:12,color:'#888'}}>Anfitriones</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:28,fontWeight:700,color:'#22c55e'}}>{stats.verificados}</div>
              <div style={{fontSize:12,color:'#888'}}>Verificados</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:28,fontWeight:700,color:'#F4A020'}}>{stats.disponibles}</div>
              <div style={{fontSize:12,color:'#888'}}>Disponibles</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:22,fontWeight:700,color:'#003DA5'}}>USD {stats.gananciasTotal.toFixed(2)}</div>
              <div style={{fontSize:12,color:'#888'}}>Pagado a anfitriones</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:28,fontWeight:700,color:'#003DA5'}}>{stats.contactosTotal}</div>
              <div style={{fontSize:12,color:'#888'}}>Contactos totales</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:22,fontWeight:700,color:'#22c55e'}}>USD {(stats.contactosTotal * 0 ).toFixed(2)}</div>
              <div style={{fontSize:12,color:'#888'}}>Ganancia Argentalk</div>
            </div>
          </div>
        )}

        <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
          <button style={tabStyle('anfitriones')} onClick={() => setTab('anfitriones')}>👥 Anfitriones</button>
          <button style={tabStyle('pagos')} onClick={() => setTab('pagos')}>💰 Pagos</button>
        </div>

        {tab === 'anfitriones' && (
          <div>
            {sellers.map(s => (
              <div key={s._id} className="card" style={{marginBottom:12}}>
                <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                  <div style={{width:48,height:48,borderRadius:'50%',background:'#EBF2FF',color:'#003DA5',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0,overflow:'hidden'}}>
                    {s.foto ? <img src={s.foto} alt={s.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : (s.nombre||'A')[0].toUpperCase()}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap',alignItems:'center',marginBottom:4}}>
                      <div style={{fontWeight:700,fontSize:16}}>{s.nombre||'Sin nombre'}</div>
                      {s.verificado && <span className="badge badge-green">✓ Verificado</span>}
                      {s.disponible && <span className="badge badge-blue">● Disponible</span>}
                    </div>
                    <div style={{fontSize:13,color:'#555',marginBottom:2}}>📧 {s.email}</div>
                    {s.telefono && <div style={{fontSize:13,color:'#555',marginBottom:2}}>📱 {s.telefono}</div>}
                    {s.ciudad && <div style={{fontSize:13,color:'#888',marginBottom:2}}>📍 {s.ciudad}</div>}
                    {s.metodoPago && <div style={{fontSize:13,color:'#888',marginBottom:2}}>💰 {s.metodoPago}: {s.cuentaPago}</div>}
                    <div style={{display:'flex',gap:12,marginTop:8}}>
                      <div style={{fontSize:13,color:'#003DA5',fontWeight:600}}>USD {(s.ganancias||0).toFixed(2)} ganados</div>
                      <div style={{fontSize:13,color:'#888'}}>{s.totalContactos||0} contactos</div>
                      <div style={{fontSize:13,color:'#003DA5'}}>USD {s.precio||10}/contacto</div>
                    </div>
                    <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
                      <a href={`mailto:${s.email}`}>
                        <button style={{width:'auto',padding:'6px 12px',fontSize:12,background:'#003DA5',color:'white',border:'none',borderRadius:6}}>📧 Email</button>
                      </a>
                      {s.telefono && (
                        <a href={`https://wa.me/${s.telefono.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer">
                          <button style={{width:'auto',padding:'6px 12px',fontSize:12,background:'#25D366',color:'white',border:'none',borderRadius:6}}>💬 WhatsApp</button>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'pagos' && (
          <div>
            {pagos.length === 0 ? (
              <div className="card" style={{textAlign:'center',color:'#888'}}>
                <p>Los pagos aparecen aqui automaticamente.</p>
                <p style={{fontSize:13}}>Ve a <a href="https://dashboard.stripe.com/payments" target="_blank" rel="noopener noreferrer" style={{color:'#003DA5'}}>dashboard.stripe.com/payments</a> para ver todos los pagos.</p>
              </div>
            ) : (
              pagos.map((p, i) => (
                <div key={i} className="card" style={{marginBottom:12}}>
                  <div style={{fontWeight:600}}>USD {(p.amount/100).toFixed(2)}</div>
                  <div style={{fontSize:13,color:'#888'}}>{p.email}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
}