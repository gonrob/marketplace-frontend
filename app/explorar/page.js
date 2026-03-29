'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '../../lib/api';

const FILTROS = ['Todos','Guia','Profesor','Cocinero','Truco','Mate','Futbol','Musica','Tango','Historia'];

export default function Explorar() {
  const [hosts, setHosts] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/users/sellers')
      .then(r => setHosts(r.data))
      .catch(() => setHosts([]))
      .finally(() => setLoading(false));
  }, []);

  const filtrados = hosts.filter(h => {
    const matchFiltro = filtro === 'Todos' || (h.habilidades || []).some(hb => hb.toLowerCase().includes(filtro.toLowerCase()));
    const matchBusqueda = !busqueda || (h.nombre || h.email || '').toLowerCase().includes(busqueda.toLowerCase()) || (h.ciudad || '').toLowerCase().includes(busqueda.toLowerCase());
    return matchFiltro && matchBusqueda;
  });

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{textDecoration:'none'}}><span className="nav-logo">Argen<span>talk</span> 🧉</span></Link>
        <div className="nav-links"><Link href="/login">Entrar</Link></div>
      </nav>

      <div style={{background:'#003DA5',padding:'20px 20px 40px'}}>
        <div style={{maxWidth:480,margin:'0 auto'}}>
          <input
            placeholder="Buscar por nombre, ciudad o interes..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{borderRadius:24,padding:'12px 18px',border:'none',width:'100%',fontSize:15}}
          />
          <div style={{display:'flex',gap:8,marginTop:12,overflowX:'auto',paddingBottom:4}}>
            {FILTROS.map(f => (
              <button key={f} onClick={() => setFiltro(f)} style={{width:'auto',padding:'6px 14px',borderRadius:20,background:filtro===f?'#F4A020':'rgba(255,255,255,0.2)',color:'white',border:'none',fontSize:13,flexShrink:0,cursor:'pointer'}}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:480,margin:'0 auto',padding:'20px'}}>
        {loading && <div className="spinner">Cargando anfitriones...</div>}

        {!loading && filtrados.length === 0 && (
          <div className="card" style={{textAlign:'center'}}>
            <div style={{fontSize:40,marginBottom:12}}>🧉</div>
            <p style={{color:'#666'}}>
              {hosts.length === 0 ? 'Todavia no hay anfitriones registrados.' : 'No hay anfitriones con ese filtro.'}
            </p>
            {hosts.length === 0 && (
              <Link href="/register"><button className="btn-orange" style={{marginTop:16}}>Ser el primero</button></Link>
            )}
          </div>
        )}

        {!loading && filtrados.map((h, i) => (
          <div key={h._id} className="host-card">
            <div style={{display:'flex',gap:12,alignItems:'flex-start'}}>
              <div className="avatar" style={{background:i%2===0?'#EBF2FF':'#FFF3E0',color:i%2===0?'#003DA5':'#F4A020'}}>
                {(h.nombre || h.email)[0].toUpperCase()}
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div style={{fontWeight:600,fontSize:15,display:'flex',alignItems:'center',gap:6}}>
                      {h.nombre || h.email.split('@')[0]}
                      {h.verificado && <span style={{background:'#dbeafe',color:'#1e40af',fontSize:11,padding:'2px 6px',borderRadius:99}}>✓</span>}
                    </div>
                    <div style={{fontSize:12,color:'#888',marginTop:2}}>
                      <span className="dot-green"></span>{h.ciudad || 'Argentina'}
                    </div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div style={{fontSize:18,fontWeight:700,color:'#003DA5'}}>USD {h.precio || 10}</div>
                    <div style={{fontSize:11,color:'#888'}}>por contacto</div>
                  </div>
                </div>
                {h.bio && <p style={{fontSize:13,color:'#555',marginTop:8,lineHeight:1.5}}>{h.bio.slice(0,100)}{h.bio.length>100?'...':''}</p>}
                <div style={{marginTop:8}}>
                  {(h.habilidades||[]).slice(0,5).map(hb => <span key={hb} className="skill-tag">{hb}</span>)}
                </div>
              </div>
            </div>
            <Link href={`/pay?seller=${h._id}&precio=${h.precio||10}&nombre=${encodeURIComponent(h.nombre||h.email.split('@')[0])}`}>
              <button className="btn-orange" style={{marginTop:12}}>
                Contactar — USD {h.precio || 10}
              </button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
