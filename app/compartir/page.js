'use client';
import { useState, useEffect, useRef } from 'react';
import Nav from '../components/Nav';

const URL = 'https://knowan.net';

export default function Compartir() {
  const [copiado, setCopiado] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js';
    script.onload = () => {
      if (canvasRef.current) {
        window.QRCode.toCanvas(canvasRef.current, URL, {
          width: 200, margin: 2,
          color: { dark: '#4B6CB7', light: '#ffffff' }
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  const copiar = () => {
    navigator.clipboard.writeText(URL);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="card" style={{textAlign:'center'}}>
          <h1 style={{marginBottom:8}}>Compartir Knowan</h1>
          <p style={{color:'#666',fontSize:14,marginBottom:24}}>Compartí la app con tus amigos y conocidos</p>

          <div style={{background:'#f0f4ff',borderRadius:16,padding:24,marginBottom:20}}>
            <div style={{fontSize:48,marginBottom:12}}>🧉</div>
            <div style={{fontWeight:700,fontSize:20,color:'#4B6CB7',marginBottom:4}}>Argen<span style={{color:'#F4A020'}}>talk</span></div>
            <div style={{fontSize:13,color:'#666'}}>Hablá con argentinos reales. Viví la cultura.</div>
          </div>

          <div style={{background:'#f0f4ff',borderRadius:10,padding:'12px 16px',display:'flex',alignItems:'center',gap:10,marginBottom:20}}>
            <span style={{flex:1,fontSize:13,color:'#4B6CB7',textAlign:'left',wordBreak:'break-all'}}>{URL}</span>
            <button onClick={copiar} style={{width:'auto',padding:'8px 16px',fontSize:13,background:copiado?'#22c55e':'#4B6CB7',flexShrink:0}}>
              {copiado ? '¡Copiado!' : 'Copiar'}
            </button>
          </div>

          <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
            <a href={`https://wa.me/?text=Conocé%20Knowan%20-%20Hablá%20con%20argentinos%20reales%20${URL}`} target="_blank" rel="noopener noreferrer">
              <button style={{background:'#25D366',border:'none'}}>💬 Compartir por WhatsApp</button>
            </a>
            <a href={`mailto:?subject=Conocé Knowan&body=Hablá con argentinos reales en ${URL}`}>
              <button className="btn-secondary">📧 Compartir por Email</button>
            </a>
            <a href={`https://twitter.com/intent/tweet?text=Conocé%20Knowan%20-%20Hablá%20con%20argentinos%20reales&url=${URL}`} target="_blank" rel="noopener noreferrer">
              <button style={{background:'#000',border:'none',color:'white'}}>𝕏 Compartir en X</button>
            </a>
          </div>

          <div style={{borderTop:'1px solid #f0f0f0',paddingTop:20}}>
            <h2 style={{marginBottom:8}}>QR para hostels y negocios</h2>
            <p style={{fontSize:13,color:'#666',marginBottom:16}}>Imprimí este QR y pegalo en tu hostel, bar o negocio</p>
            <div style={{display:'flex',justifyContent:'center',marginBottom:16}}>
              <canvas ref={canvasRef} style={{borderRadius:12}} />
            </div>
            <button onClick={() => window.print()} className="btn-orange" style={{marginBottom:8}}>🖨️ Imprimir QR</button>
          </div>
        </div>
      </div>
    </>
  );
}
