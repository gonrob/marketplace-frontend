'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import api from '../../lib/api';

const ADMIN = 'gonrobtor@gmail.com';

export default function Admin() {
  const router = useRouter();
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('anfitriones');
  const [stats, setStats] = useState(null);
  const [emailTodos, setEmailTodos] = useState('');

  const borrarCuenta = async (id, nombre) => {
    if (!confirm(`¿Borrar la cuenta de ${nombre}?`)) return;
    try {
      await api.delete(`/api/users/admin/${id}`);
      setSellers(prev => prev.filter(s => s._id !== id));
    } catch { alert('Error al borrar.'); }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    const load = async () => {
      try {
        const me = await api.get('/api/auth/me');
        if (me.data.email !== ADMIN) { router.push('/'); return; }

        const s = await api.get('/api/users/sellers');
        const b = await api.get('/api/users/buyers');
        setSellers(s.data);
        setBuyers(b.data);
        setStats({
          totalViajeros: b.data.length,
          viajerosVerificados: b.data.filter(x => x.emailVerificado).length,
          totalViajeros: b.data.length,
          viajerosVerificados: b.data.filter(x => x.emailVerificado).length,
          total: s.data.length,
          verificados: s.data.filter(x => x.verificado).length,
          disponibles: s.data.filter(x => x.disponible).length,
          gananciasTotal: s.data.reduce((acc, x) => acc + (x.ganancias || 0), 0),
          contactosTotal: s.data.reduce((acc, x) => acc + (x.totalContactos || 0), 0),
        });
        setEmailTodos(s.data.map(x => x.email).join(', '));
      } catch (err) { console.error('Admin error:', err); setLoading(false); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div className="spinner">Cargando...</div>;

  const tabStyle = (t) => ({
    width:'auto',padding:'8px 16px',fontSize:13,
    background: tab === t ? '#4B6CB7' : 'white',
    color: tab === t ? 'white' : '#4B6CB7',
    border:'1.5px solid #4B6CB7',borderRadius:8,cursor:'pointer',marginBottom:0
  });

  return (
    <>
      <Nav links={[{href:'/dashboard',label:'Dashboard'}]} />
      <div className="container">
        <h1>Panel Admin ⚙️</h1>

        {stats && (
          <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:20}}>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:28,fontWeight:700,color:'#4B6CB7'}}>{stats.total}</div>
              <div style={{fontSize:12,color:'#888'}}>Anfitriones</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:28,fontWeight:700,color:'#22c55e'}}>{stats.verificados}</div>
              <div style={{fontSize:12,color:'#888'}}>Verificados</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:28,fontWeight:700,color:'#C94B4B'}}>{stats.disponibles}</div>
              <div style={{fontSize:12,color:'#888'}}>Disponibles</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:22,fontWeight:700,color:'#4B6CB7'}}>USD {stats.gananciasTotal.toFixed(2)}</div>
              <div style={{fontSize:12,color:'#888'}}>Pagado anfitriones</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:28,fontWeight:700,color:'#4B6CB7'}}>{stats.contactosTotal}</div>
              <div style={{fontSize:12,color:'#888'}}>Contactos totales</div>
            </div>
            <div className="card" style={{textAlign:'center',padding:16}}>
              <div style={{fontSize:22,fontWeight:700,color:'#22c55e'}}>USD {(stats.contactosTotal * 0.15).toFixed(2)}</div>
              <div style={{fontSize:12,color:'#888'}}>Ganancia Knowan</div>
            </div>
          </div>
        )}

        <div className="card" style={{marginBottom:16}}>
          <h2 style={{marginBottom:8}}>📧 Email masivo a todos los anfitriones</h2>
          <div style={{background:'#f0f4ff',borderRadius:8,padding:10,marginBottom:8,fontSize:12,color:'#555',wordBreak:'break-all'}}>
            {emailTodos}
          </div>
          <a href={`mailto:${emailTodos}`}>
            <button style={{background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',marginBottom:0}}>
              📧 Abrir email a todos los anfitriones
            </button>
          </a>
        </div>

        <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
          <button style={tabStyle('anfitriones')} onClick={() => setTab('anfitriones')}>👥 Anfitriones ({sellers.length})</button>
          <button style={tabStyle('viajeros')} onClick={() => setTab('viajeros')}>🌍 Viajeros ({buyers.length})</button>
          <button style={tabStyle('emails')} onClick={() => setTab('emails')}>📧 Emails</button>
        </div>

        {tab === 'anfitriones' && (
          <div>
            {sellers.map(s => (
              <div key={s._id} className="card" style={{marginBottom:12}}>
                <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
                  <div style={{width:48,height:48,borderRadius:'50%',background:'#EBF2FF',color:'#4B6CB7',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0,overflow:'hidden'}}>
                    {s.foto ? <img src={s.foto} alt={s.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : (s.nombre||'A')[0].toUpperCase()}
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:700,fontSize:16,marginBottom:4}}>{s.nombre||'Sin nombre'}</div>
                    {s.verificado && <span className="badge badge-green" style={{marginRight:4}}>✓ Verificado</span>}
                    {s.disponible && <span className="badge badge-blue">● Disponible</span>}
                    <div style={{fontSize:13,color:'#555',marginTop:6}}>📧 {s.email}</div>
                    {s.telefono && <div style={{fontSize:13,color:'#555'}}>📱 {s.telefono}</div>}
                    {s.ciudad && <div style={{fontSize:13,color:'#888'}}>📍 {s.ciudad}</div>}
                    {s.metodoPago && <div style={{fontSize:13,color:'#888'}}>💰 {s.metodoPago}: {s.cuentaPago}</div>}
                    <div style={{display:'flex',gap:12,marginTop:6}}>
                      <span style={{fontSize:13,color:'#4B6CB7',fontWeight:600}}>USD {(s.ganancias||0).toFixed(2)}</span>
                      <span style={{fontSize:13,color:'#888'}}>{s.totalContactos||0} contactos</span>
                      <span style={{fontSize:13,color:'#4B6CB7'}}>USD {s.precio||10}/h</span>
                    </div>
                    <div style={{display:'flex',gap:8,marginTop:10,flexWrap:'wrap'}}>
                      <a href={`mailto:${s.email}`}>
                        <button style={{width:'auto',padding:'6px 12px',fontSize:12,marginBottom:0}}>📧 Email</button>
                      </a>
                      {s.telefono && (
                        <a href={`https://wa.me/${s.telefono.replace(/\D/g,'')}`} target="_blank" rel="noopener noreferrer">
                          <button style={{width:'auto',padding:'6px 12px',fontSize:12,background:'#25D366',marginBottom:0}}>💬 WhatsApp</button>
                        </a>
                      )}
                      <button onClick={() => borrarCuenta(s._id, s.nombre)} style={{width:'auto',padding:'6px 12px',fontSize:12,background:'#cc0000',marginBottom:0}}>🗑️ Borrar</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'viajeros' && (
          <div>
            <div style={{background:'#f0f4ff',borderRadius:12,padding:16,marginBottom:16,display:'flex',gap:20}}>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:28,fontWeight:800,color:'#4B6CB7'}}>{buyers.length}</div>
                <div style={{fontSize:12,color:'#888'}}>Total viajeros</div>
              </div>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:28,fontWeight:800,color:'#22c55e'}}>{buyers.filter(x=>x.emailVerificado).length}</div>
                <div style={{fontSize:12,color:'#888'}}>Verificados</div>
              </div>
              <div style={{textAlign:'center'}}>
                <div style={{fontSize:28,fontWeight:800,color:'#f59e0b'}}>{buyers.filter(x=>!x.emailVerificado).length}</div>
                <div style={{fontSize:12,color:'#888'}}>Sin verificar</div>
              </div>
            </div>
            {buyers.map(b => (
              <div key={b._id} style={{background:'white',borderRadius:12,padding:16,marginBottom:10,display:'flex',alignItems:'center',gap:14,boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                {b.foto ? <img src={b.foto} alt={b.nombre} style={{width:48,height:48,borderRadius:'50%',objectFit:'cover',flexShrink:0}} /> : <div style={{width:48,height:48,borderRadius:'50%',background:'#f3f4f6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,flexShrink:0}}>👤</div>}
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14}}>{b.nombre}</div>
                  <div style={{fontSize:12,color:'#888'}}>{b.email}</div>
                  <div style={{fontSize:11,color:'#aaa'}}>{b.telefono} · {new Date(b.createdAt).toLocaleDateString()}</div>
                </div>
                <span style={{fontSize:11,padding:'3px 8px',borderRadius:20,background:b.emailVerificado?'#dcfce7':'#fef3c7',color:b.emailVerificado?'#15803d':'#92400e',fontWeight:600}}>{b.emailVerificado?'✅ Verificado':'⏳ Sin verificar'}</span>
              </div>
            ))}
          </div>
        )}

        {tab === 'emails' && (
          <div className="card">
            <h2 style={{marginBottom:12}}>📋 Lista de emails</h2>
            {sellers.map((s) => (
              <div key={s._id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div>
                  <div style={{fontWeight:600,fontSize:14}}>{s.nombre||'Sin nombre'}</div>
                  <div style={{fontSize:13,color:'#555'}}>{s.email}</div>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <a href={`mailto:${s.email}`}>
                    <button style={{width:'auto',padding:'6px 12px',fontSize:12,marginBottom:0}}>📧</button>
                  </a>
                  <button onClick={() => borrarCuenta(s._id, s.nombre)} style={{width:'auto',padding:'6px 12px',fontSize:12,background:'#cc0000',marginBottom:0}}>🗑️</button>
                </div>
              </div>
            ))}
            <div style={{marginTop:16,padding:12,background:'#f0f4ff',borderRadius:8,fontSize:12,color:'#555',wordBreak:'break-all'}}>
              <strong>Todos los emails:</strong><br/>{emailTodos}
            </div>
            <a href={`mailto:${emailTodos}`} style={{marginTop:12,display:'block'}}>
              <button>📧 Email a todos</button>
            </a>
          </div>
        )}
      </div>
    </>
  );
}