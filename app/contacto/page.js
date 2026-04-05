'use client';
import Nav from '../components/Nav';

export default function Contacto() {
  return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <h1>Contacto</h1>
          <p style={{color:'#666',marginBottom:20}}>Tenes alguna pregunta o sugerencia? Escribinos.</p>
          <a href="mailto:info.knowan@gmail.com">
            <button className="btn-orange">📧 info.knowan@gmail.com</button>
          </a>
        </div>
      </div>
    </>
  );
}
