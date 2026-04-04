'use client';
import Nav from '../components/Nav';

export default function Contacto() {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <h1>Contacto</h1>
          <p style={{color:'#666',marginBottom:20}}>¿Tenés alguna pregunta o sugerencia? Escribinos.</p>
          <a href="mailto:knowan26@gmail.com">
            <button className="btn-orange">📧 Escribir a knowan26@gmail.com</button>
          </a>
          <div style={{marginTop:20,fontSize:14,color:'#888'}}>
            También podés encontrarnos en:<br/>
            <a href="https://wa.me/+34000000000" style={{color:'#003DA5'}}>💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  );
}
