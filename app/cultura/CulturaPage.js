'use client';
import Link from 'next/link';

function CulturaPage({ icon, titulo, sub, secciones, cta }) {
  return (
    <>
      <nav className="nav">
        <Link href="/" style={{textDecoration:'none'}}><span className="nav-logo">Argen<span>talk</span> 🧉</span></Link>
        <div className="nav-links"><Link href="/explorar">Ver anfitriones</Link></div>
      </nav>
      <div style={{background:'#003DA5',padding:'30px 20px 50px',textAlign:'center'}}>
        <div style={{fontSize:64}}>{icon}</div>
        <h1 style={{color:'white',marginTop:12}}>{titulo}</h1>
        <p style={{color:'rgba(255,255,255,0.8)',marginTop:8}}>{sub}</p>
      </div>
      <div style={{maxWidth:480,margin:'-24px auto 0',padding:'0 20px 40px'}}>
        {secciones.map((s,i) => (
          <div key={i} className="card">
            <h2>{s.titulo}</h2>
            {s.texto && <p style={{color:'#555',lineHeight:1.7,fontSize:15}}>{s.texto}</p>}
            {s.items && s.items.map((item,j) => (
              <div key={j} style={{display:'flex',gap:12,marginBottom:12,alignItems:'flex-start'}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:'#003DA5',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,flexShrink:0,fontSize:13}}>{j+1}</div>
                <p style={{color:'#555',fontSize:14,lineHeight:1.6}}>{item}</p>
              </div>
            ))}
            {s.lista && s.lista.map((item,j) => (
              <div key={j} style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid #f0f0f0'}}>
                <div><div style={{fontWeight:600,fontSize:14}}>{item[0]}</div><div style={{fontSize:12,color:'#888'}}>{item[2]||''}</div></div>
                <span style={{background:'#dbeafe',color:'#1e40af',padding:'3px 10px',borderRadius:99,fontSize:12,fontWeight:600,alignSelf:'center'}}>{item[1]}</span>
              </div>
            ))}
          </div>
        ))}
        <div className="card" style={{textAlign:'center'}}>
          <p style={{color:'#555',marginBottom:16}}>{cta}</p>
          <Link href="/explorar"><button className="btn-orange">Buscar anfitrion</button></Link>
        </div>
      </div>
    </>
  );
}

export default CulturaPage;
