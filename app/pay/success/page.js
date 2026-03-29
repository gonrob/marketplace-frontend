'use client';
import Link from 'next/link';
export default function PaySuccess() {
  return (
    <>
      <nav className="nav">
        <Link href="/" style={{textDecoration:'none'}}><span className="nav-logo">Argen<span>talk</span> 🧉</span></Link>
      </nav>
      <div className="container" style={{textAlign:'center'}}>
        <div className="card">
          <div style={{fontSize:64,marginBottom:16}}>🎉</div>
          <h1 style={{marginBottom:12}}>Pago completado!</h1>
          <p style={{color:'#666',marginBottom:24}}>El anfitrion recibio tu contacto. Ya podes coordinar con el directamente.</p>
          <Link href="/explorar"><button className="btn-orange">Ver mas anfitriones</button></Link>
        </div>
      </div>
    </>
  );
}
