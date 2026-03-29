'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Contacto() {
  const [form, setForm] = useState({ nombre:'', email:'', mensaje:'' });
  const [enviado, setEnviado] = useState(false);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  const submit = e => {
    e.preventDefault();
    const s = encodeURIComponent(`Contacto desde Argentalk - ${form.nombre}`);
    const b = encodeURIComponent(`Nombre: ${form.nombre}\nEmail: ${form.email}\n\nMensaje:\n${form.mensaje}`);
    window.location.href = `mailto:argentalk26@gmail.com?subject=${s}&body=${b}`;
    setEnviado(true);
  };

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{textDecoration:'none'}}><span className="nav-logo">Argen<span>talk</span> 🧉</span></Link>
        <div className="nav-links"><Link href="/">Inicio</Link></div>
      </nav>
      <div className="container">
        <div className="card">
          <h1>Contacto</h1>
          <div style={{display:'flex',gap:12,marginBottom:24}}>
            <div style={{background:'#f0f4ff',borderRadius:12,padding:16,flex:1,textAlign:'center'}}>
              <div style={{fontSize:28,marginBottom:6}}>📧</div>
              <div style={{fontSize:13,fontWeight:600,color:'#003DA5'}}>Email</div>
              <div style={{fontSize:12,color:'#666',marginTop:4}}>argentalk26@gmail.com</div>
            </div>
            <div style={{background:'#f0fff4',borderRadius:12,padding:16,flex:1,textAlign:'center'}}>
              <div style={{fontSize:28,marginBottom:6}}>⏱️</div>
              <div style={{fontSize:13,fontWeight:600,color:'#065f46'}}>Respuesta</div>
              <div style={{fontSize:12,color:'#666',marginTop:4}}>En menos de 24hs</div>
            </div>
          </div>
          {enviado ? (
            <div className="success" style={{textAlign:'center'}}>
              <div style={{fontSize:40,marginBottom:8}}>✅</div>
              <div style={{fontWeight:600}}>Mensaje listo para enviar</div>
              <div style={{fontSize:14,color:'#555',marginTop:4}}>Se abrio tu app de email con el mensaje preparado</div>
              <button onClick={() => setEnviado(false)} className="btn-secondary" style={{marginTop:16}}>Enviar otro mensaje</button>
            </div>
          ) : (
            <form onSubmit={submit}>
              <div className="form-group">
                <label>Tu nombre</label>
                <input placeholder="Nombre y apellido" value={form.nombre} onChange={e => set('nombre',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Tu email</label>
                <input type="email" placeholder="tu@email.com" value={form.email} onChange={e => set('email',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Mensaje</label>
                <textarea rows={5} placeholder="Contanos en que podemos ayudarte..." value={form.mensaje} onChange={e => set('mensaje',e.target.value)} required style={{resize:'vertical'}} />
              </div>
              <button type="submit" className="btn-orange">Enviar mensaje</button>
            </form>
          )}
        </div>
        <div className="card" style={{textAlign:'center'}}>
          <p style={{color:'#666',fontSize:14,marginBottom:12}}>O escribinos directamente:</p>
          <a href="mailto:argentalk26@gmail.com" style={{color:'#003DA5',fontWeight:600,fontSize:15}}>argentalk26@gmail.com</a>
        </div>
      </div>
    </>
  );
}
