'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async () => {
    if (!email) return setMsg('Ingresá tu email.');
    setLoading(true);
    try {
      await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setMsg('Si el email existe recibirás un link en minutos.');
    } catch {
      setMsg('Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#f8faff',padding:20}}>
      <div style={{background:'#fff',borderRadius:20,maxWidth:400,width:'100%',padding:'32px 28px',boxShadow:'0 4px 24px rgba(0,0,0,0.1)'}}>
        <div style={{textAlign:'center',marginBottom:24}}>
          <div style={{fontSize:40}}>📧</div>
          <h2 style={{fontSize:22,fontWeight:800,background:'linear-gradient(90deg,#4B6CB7,#C94B4B)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',margin:'8px 0 4px'}}>Olvidé mi contraseña</h2>
          <p style={{color:'#666',fontSize:13}}>Te enviamos un link para crear una nueva</p>
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:13,fontWeight:600,color:'#555',display:'block',marginBottom:6}}>Email</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==='Enter'&&handleSubmit()} placeholder="tu@email.com" style={{width:'100%',padding:'10px 14px',borderRadius:10,border:'1.5px solid #d1d5db',fontSize:14,outline:'none',boxSizing:'border-box'}} />
        </div>
        {msg && <div style={{padding:'10px 14px',borderRadius:10,marginBottom:14,fontSize:13,fontWeight:600,background:'#f0fdf4',color:'#15803d'}}>{msg}</div>}
        <button onClick={handleSubmit} disabled={loading} style={{width:'100%',padding:13,borderRadius:12,border:'none',background:loading?'#ccc':'linear-gradient(90deg,#4B6CB7,#C94B4B)',color:'#fff',fontSize:15,fontWeight:800,cursor:loading?'not-allowed':'pointer',marginBottom:14}}>
          {loading ? 'Enviando...' : 'Enviar link'}
        </button>
        <div style={{textAlign:'center'}}>
          <Link href="/login" style={{color:'#4B6CB7',fontSize:13,textDecoration:'none'}}>← Volver al login</Link>
        </div>
      </div>
    </div>
  );
}
