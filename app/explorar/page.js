'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';

async function traducirTexto(texto, destino) {
  if (!texto || destino === 'es') return texto;
  try {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto, origen: 'es', destino })
    });
    const data = await res.json();
    return data.traduccion || texto;
  } catch { return texto; }
}

export default function Explorar() {
  const [sellers, setSellers] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState('es');
  const [traduciendo, setTraduciendo] = useState(false);

 useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
    
    api.get('/api/users/sellers')
      .then(async r => {
        let data = r.data;
        if (savedLang !== 'es') {
          setTraduciendo(true);
          try {
            data = await Promise.all(data.map(async s => ({
              ...s,
              bio: s.bio ? await traducirTexto(s.bio, savedLang) : s.bio,
            })));
          } catch(e) { console.error('Error traduciendo:', e); }
          setTraduciendo(false);
        }
        setSellers(data);
        setFiltrados(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);
    setLang(savedLang);
    api.get('/api/users/sellers')
      .then(async r => {
        let data = r.data;
        if (savedLang !== 'es') {
          setTraduciendo(true);
          data = await Promise.all(data.map(async s => ({
            ...s,
            bio: s.bio ? await traducirTexto(s.bio, savedLang) : s.bio,
            habilidades: s.habilidades?.length > 0
              ? await Promise.all(s.habilidades.map(h => traducirTexto(h, savedLang)))
              : s.habilidades
          })));
          setTraduciendo(false);
        }
        setSellers(data);
        setFiltrados(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!busqueda) { setFiltrados(sellers); return; }
    const q = busqueda.toLowerCase();
    setFiltrados(sellers.filter(s =>
      s.nombre?.toLowerCase().includes(q) ||
      s.ciudad?.toLowerCase().includes(q) ||
      s.bio?.toLowerCase().includes(q) ||
      s.habilidades?.some(h => h.toLowerCase().includes(q))
    ));
  }, [busqueda, sellers]);

  if (loading) return <div className="spinner">Cargando...</div>;

  return (
    <>
      <Nav links={[{href:'/register',label:'Inscribirse'}]} />
      <div className="container">
        <h1 style={{marginBottom:4}}>Anfitriones argentinos</h1>
        {traduciendo && <div style={{fontSize:13,color:'#888',marginBottom:12}}>🌍 Traduciendo al tu idioma...</div>}

        <div style={{marginBottom:20,marginTop:12}}>
          <input placeholder="Buscar por nombre, ciudad, habilidad..." value={busqueda} onChange={e => setBusqueda(e.target.value)} style={{width:'100%'}} />
        </div>

        {filtrados.length === 0 && (
          <div className="card" style={{textAlign:'center',color:'#888'}}>No hay anfitriones disponibles por ahora.</div>
        )}

        {filtrados.map(s => (
          <div key={s._id} className="card" style={{marginBottom:16}}>
            <div style={{display:'flex',gap:16,alignItems:'flex-start'}}>
              <div style={{width:64,height:64,borderRadius:'50%',background:'#EBF2FF',color:'#003DA5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700,flexShrink:0,overflow:'hidden',border:'2px solid #003DA5'}}>
                {s.foto ? <img src={s.foto} alt={s.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} /> : (s.nombre||s.email||'A')[0].toUpperCase()}
              </div>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:8,flexWrap:'wrap'}}>
                  <div style={{fontWeight:700,fontSize:17}}>{s.nombre||'Sin nombre'}</div>
                  {s.verificado && <span className="badge badge-green">✓ Verificado</span>}
                  {s.disponible && <span className="badge badge-blue">Disponible</span>}
                </div>
                {s.ciudad && <div style={{fontSize:13,color:'#888',marginTop:2}}>📍 {s.ciudad}</div>}
                {s.bio && <div style={{fontSize:14,color:'#555',marginTop:6,lineHeight:1.5}}>{s.bio}</div>}
                {s.habilidades?.length > 0 && (
                  <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:8}}>
                    {s.habilidades.map((h,i) => <span key={i} style={{background:'#EBF2FF',color:'#003DA5',padding:'3px 10px',borderRadius:20,fontSize:12}}>{h}</span>)}
                  </div>
                )}
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:12}}>
                  <div style={{fontWeight:700,fontSize:18,color:'#003DA5'}}>USD {s.precio||10}</div>
                  <Link href={`/pay?seller=${s._id}&precio=${s.precio||10}&nombre=${encodeURIComponent(s.nombre||'Anfitrion')}`}>
                    <button className="btn-orange" style={{width:'auto',padding:'10px 20px',fontSize:14}}>Contactar</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}