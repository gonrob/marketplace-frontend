'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Nav from '../components/Nav';

export default function QR() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js';
    script.onload = () => {
      if (canvasRef.current) {
        window.QRCode.toCanvas(canvasRef.current, 'https://argentalk.vercel.app', {
          width: 220, margin: 2,
          color: { dark: '#003DA5', light: '#ffffff' }
        });
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <>
      <Nav links={[{href:'/compartir',label:'Compartir'}]} />
      <div className="container" style={{textAlign:'center'}}>
        <div className="card" style={{maxWidth:340,margin:'0 auto'}}>
          <div style={{fontSize:28,fontWeight:700,color:'#003DA5',marginBottom:4}}>
            Argen<span style={{color:'#F4A020'}}>talk</span> 🧉
          </div>
          <div style={{fontSize:14,color:'#666',marginBottom:4}}>Hablá con argentinos reales</div>
          <div style={{fontSize:12,color:'#999',marginBottom:20}}>Talk · Parlez · Parla · Sprechen · 说话 · Говорить</div>
          <div style={{display:'flex',justifyContent:'center',marginBottom:20}}>
            <canvas ref={canvasRef} style={{borderRadius:8}} />
          </div>
          <div style={{background:'#003DA5',color:'white',borderRadius:8,padding:'10px 16px',fontSize:14,fontWeight:600,marginBottom:12}}>
            argentalk.vercel.app
          </div>
          <div style={{display:'flex',justifyContent:'center',gap:8,fontSize:12,color:'#888',marginBottom:20,flexWrap:'wrap'}}>
            <span>🇦🇷 ES</span><span>🇬🇧 EN</span><span>🇧🇷 PT</span><span>🇫🇷 FR</span>
            <span>🇮🇹 IT</span><span>🇩🇪 DE</span><span>🇨🇳 ZH</span><span>🇷🇺 RU</span>
          </div>
          <button onClick={() => window.print()} className="btn-orange" style={{marginBottom:8}}>Imprimir</button>
          <Link href="/compartir">
            <button className="btn-secondary">Compartir por WhatsApp / Email</button>
          </Link>
        </div>
      </div>
    </>
  );
}
