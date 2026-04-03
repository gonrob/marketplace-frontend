'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';
import useLang from '../../lib/useLang';

const T = {
  es:{titulo:'Anfitriones disponibles',buscar:'Buscar...',disponible:'Disponible',verificado:'Verificado',contactar:'Contactar',porHora:'/ hora',sinAnfitriones:'No hay anfitriones disponibles.',cargando:'Cargando...'},
  en:{titulo:'Available hosts',buscar:'Search...',disponible:'Available',verificado:'Verified',contactar:'Contact',porHora:'/ hour',sinAnfitriones:'No hosts available.',cargando:'Loading...'},
  pt:{titulo:'Anfitrioes disponiveis',buscar:'Buscar...',disponible:'Disponivel',verificado:'Verificado',contactar:'Contatar',porHora:'/ hora',sinAnfitriones:'Nenhum anfitriao disponivel.',cargando:'Carregando...'},
  fr:{titulo:'Hotes disponibles',buscar:'Rechercher...',disponible:'Disponible',verificado:'Verifie',contactar:'Contacter',porHora:'/ heure',sinAnfitriones:'Aucun hote disponible.',cargando:'Chargement...'},
  it:{titulo:'Host disponibili',buscar:'Cerca...',disponible:'Disponibile',verificado:'Verificato',contactar:'Contatta',porHora:'/ ora',sinAnfitriones:'Nessun host disponibile.',cargando:'Caricamento...'},
  de:{titulo:'Verfugbare Gastgeber',buscar:'Suchen...',disponible:'Verfugbar',verificado:'Verifiziert',contactar:'Kontaktieren',porHora:'/ Stunde',sinAnfitriones:'Keine Gastgeber verfugbar.',cargando:'Laden...'},
  zh:{titulo:'可用主人',buscar:'搜索...',disponible:'可用',verificado:'已验证',contactar:'联系',porHora:'/ 小时',sinAnfitriones:'没有可用的主人。',cargando:'加载中...'},
  ru:{titulo:'Доступные хозяева',buscar:'Поиск...',disponible:'Доступен',verificado:'Проверен',contactar:'Связаться',porHora:'/ час',sinAnfitriones:'Нет доступных хозяев.',cargando:'Загрузка...'},
};

export default function Explorar() {
  const { lang } = useLang();
  const [sellers, setSellers] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/users/sellers')
      .then(r => setSellers(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const t = T[lang] || T.en;

  const filtrados = sellers.filter(s =>
    !filtro ||
    s.nombre?.toLowerCase().includes(filtro.toLowerCase()) ||
    s.bio?.toLowerCase().includes(filtro.toLowerCase()) ||
    s.habilidades?.some(h => h.toLowerCase().includes(filtro.toLowerCase())) ||
    s.ciudad?.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) return (
    <>
      <Nav />
      <div className="spinner">{t.cargando}</div>
    </>
  );

  return (
    <>
      <Nav />
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

        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:12}}>
          {filtrados.map(s => (
            <div key={s._id} className="card" style={{padding:0,overflow:'hidden',borderRadius:16,display:'flex',flexDirection:'column'}}>
              <div style={{position:'relative',height:140,background:'#EBF2FF',overflow:'hidden'}}>
                {s.foto
                  ? <img src={s.foto} alt={s.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                  : <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:48,fontWeight:700,color:'#003DA5'}}>
                      {(s.nombre||'A')[0].toUpperCase()}
                    </div>
                }
                {s.verificado && (
                  <div style={{position:'absolute',top:8,right:8,background:'#22c55e',color:'white',borderRadius:20,padding:'2px 8px',fontSize:11,fontWeight:600}}>✓</div>
                )}
                {s.disponible && (
                  <div style={{position:'absolute',top:8,left:8,background:'#003DA5',color:'white',borderRadius:20,padding:'2px 8px',fontSize:11,fontWeight:600}}>● {t.disponible}</div>
                )}
              </div>

              <div style={{padding:'12px',flex:1,display:'flex',flexDirection:'column'}}>
                <div style={{fontWeight:700,fontSize:15,marginBottom:4}}>{s.nombre||'Sin nombre'}</div>
                {s.ciudad && <div style={{fontSize:12,color:'#888',marginBottom:6}}>📍 {s.ciudad}</div>}
                {s.habilidades && s.habilidades.length > 0 && (
                  <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:8}}>
                    {s.habilidades.slice(0,3).map((h,i) => (
                      <span key={i} style={{background:'#EBF2FF',color:'#003DA5',borderRadius:20,padding:'2px 8px',fontSize:11,fontWeight:500}}>{h}</span>
                    ))}
                  </div>
                )}
                {s.bio && (
                  <div style={{fontSize:12,color:'#666',marginBottom:8,lineHeight:1.4,flex:1,overflow:'hidden',display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical'}}>
                    {s.bio}
                  </div>
                )}
                {s.puntuacion > 0 && (
                  <div style={{fontSize:12,color:'#F4A020',marginBottom:8}}>
                    {'⭐'.repeat(Math.round(s.puntuacion))} {s.puntuacion}
                  </div>
                )}
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:'auto',paddingTop:8,borderTop:'1px solid #f0f0f0'}}>
                  <div>
                    <div style={{fontSize:18,fontWeight:700,color:'#003DA5'}}>USD {s.precio}</div>
                    <div style={{fontSize:11,color:'#888'}}>{t.porHora}</div>
                  </div>
                  <Link href={`/pay?seller=${s._id}&nombre=${encodeURIComponent(s.nombre||'')}&precio=${s.precio}`}>
                    <button className="btn-orange" style={{width:'auto',padding:'8px 14px',fontSize:13,borderRadius:10}}>
                      {t.contactar}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}