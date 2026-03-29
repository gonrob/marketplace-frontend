'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({ email:'', password:'', nombre:'', apellido:'', telefono:'', ciudad:'', pais:'', metodoPago:'', cuentaPago:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  const submit = async () => {
    setError(''); setLoading(true);
    try {
      const res = await api.post('/api/auth/register', {
        email: form.email,
        password: form.password,
        nombre: `${form.nombre} ${form.apellido}`.trim(),
        role,
        telefono: form.telefono,
        ciudad: form.ciudad,
        pais: form.pais,
        metodoPago: form.metodoPago,
        cuentaPago: form.cuentaPago
      });
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse.');
      setStep(2);
    } finally { setLoading(false); }
  };

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{textDecoration:'none'}}><span className="nav-logo">Argen<span>talk</span> 🧉</span></Link>
      </nav>
      <div className="container">
        <div className="card">

          {step === 1 && (
            <>
              <h1>Unete a Argentalk</h1>
              <p style={{color:'#666',marginBottom:24,fontSize:15}}>Soy...</p>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <button onClick={() => {setRole('seller');setStep(2);}} style={{background:'white',color:'#003DA5',border:'2px solid #003DA5',borderRadius:12,padding:20,textAlign:'left',cursor:'pointer'}}>
                  <div style={{fontSize:28,marginBottom:8}}>🇦🇷</div>
                  <div style={{fontWeight:700,fontSize:17,marginBottom:4}}>Anfitrion argentino</div>
                  <div style={{fontSize:14,color:'#666'}}>Quiero compartir mi cultura y ganar dinero extra</div>
                </button>
                <button onClick={() => {setRole('buyer');setStep(2);}} style={{background:'white',color:'#F4A020',border:'2px solid #F4A020',borderRadius:12,padding:20,textAlign:'left',cursor:'pointer'}}>
                  <div style={{fontSize:28,marginBottom:8}}>🌍</div>
                  <div style={{fontWeight:700,fontSize:17,marginBottom:4}}>Viajero / Extranjero</div>
                  <div style={{fontSize:14,color:'#666'}}>Quiero conocer argentinos y la cultura</div>
                </button>
              </div>
              <div className="link">Ya tenes cuenta? <Link href="/login">Entrar</Link></div>
            </>
          )}

          {step === 2 && (
            <>
              <h1>Tus datos</h1>
              {error && <div className="error">{error}</div>}
              <div className="form-group">
                <label>Nombre</label>
                <input placeholder="Tu nombre" value={form.nombre} onChange={e => set('nombre',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Apellido</label>
                <input placeholder="Tu apellido" value={form.apellido} onChange={e => set('apellido',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="tu@email.com" value={form.email} onChange={e => set('email',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Contrasena</label>
                <input type="password" placeholder="Minimo 6 caracteres" value={form.password} onChange={e => set('password',e.target.value)} required />
              </div>
              <div className="form-group">
                <label>Telefono</label>
                <input placeholder="+54 9 11 1234 5678" value={form.telefono} onChange={e => set('telefono',e.target.value)} />
              </div>
              {role === 'seller' && (
                <div className="form-group">
                  <label>Ciudad</label>
                  <input placeholder="Buenos Aires, Mendoza..." value={form.ciudad} onChange={e => set('ciudad',e.target.value)} />
                </div>
              )}
              {role === 'buyer' && (
                <div className="form-group">
                  <label>Pais de residencia</label>
                  <input placeholder="Espana, Italia, USA..." value={form.pais} onChange={e => set('pais',e.target.value)} />
                </div>
              )}
              <div style={{display:'flex',gap:10}}>
                <button className="btn-secondary" onClick={() => setStep(1)} style={{flex:1}}>Atras</button>
                <button onClick={() => {
                  if (!form.nombre || !form.email || !form.password) { setError('Nombre, email y contrasena son obligatorios.'); return; }
                  if (form.password.length < 6) { setError('La contrasena debe tener al menos 6 caracteres.'); return; }
                  setError(''); setStep(3);
                }} style={{flex:2}}>Siguiente</button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1>{role === 'seller' ? 'Como queres cobrar?' : 'Como queres pagar?'}</h1>
              {error && <div className="error">{error}</div>}

              {role === 'seller' && (
                <>
                  <p style={{fontSize:14,color:'#666',marginBottom:16}}>Elegí como vas a recibir tus pagos. Podes cambiarlo despues.</p>
                  <p style={{fontSize:13,color:'#003DA5',fontWeight:600,marginBottom:12}}>Vos recibis el 85% de cada contacto. Argentalk cobra 15%.</p>
                  <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
                    <button onClick={() => set('metodoPago','mercadopago')} style={{background:form.metodoPago==='mercadopago'?'#009ee3':'white',color:form.metodoPago==='mercadopago'?'white':'#009ee3',border:'2px solid #009ee3',borderRadius:12,padding:16,textAlign:'left',cursor:'pointer'}}>
                      <div style={{fontWeight:700,fontSize:16}}>💙 Mercado Pago</div>
                      <div style={{fontSize:13,marginTop:4,opacity:0.8}}>Recomendado para Argentina</div>
                    </button>
                    <button onClick={() => set('metodoPago','banco')} style={{background:form.metodoPago==='banco'?'#003DA5':'white',color:form.metodoPago==='banco'?'white':'#003DA5',border:'2px solid #003DA5',borderRadius:12,padding:16,textAlign:'left',cursor:'pointer'}}>
                      <div style={{fontWeight:700,fontSize:16}}>🏦 Cuenta bancaria</div>
                      <div style={{fontSize:13,marginTop:4,opacity:0.8}}>CBU o alias</div>
                    </button>
                  </div>
                  {form.metodoPago === 'mercadopago' && (
                    <div className="form-group">
                      <label>Email o telefono de Mercado Pago</label>
                      <input placeholder="tu@email.com o +54 9 11..." value={form.cuentaPago} onChange={e => set('cuentaPago',e.target.value)} />
                    </div>
                  )}
                  {form.metodoPago === 'banco' && (
                    <div className="form-group">
                      <label>CBU o alias</label>
                      <input placeholder="tu.alias o 0000000000000000000000" value={form.cuentaPago} onChange={e => set('cuentaPago',e.target.value)} />
                    </div>
                  )}
                </>
              )}

              {role === 'buyer' && (
                <>
                  <p style={{fontSize:14,color:'#666',marginBottom:16}}>Podes pagar con tarjeta internacional. Si viajás a Argentina, te ayudamos a crear una cuenta en Mercado Pago.</p>
                  <div style={{background:'#f0f4ff',borderRadius:12,padding:16,marginBottom:12}}>
                    <div style={{fontWeight:600,marginBottom:6}}>💳 Tarjeta internacional</div>
                    <div style={{fontSize:13,color:'#555'}}>Visa, Mastercard, Amex — pago seguro con Stripe</div>
                  </div>
                  <div style={{background:'#e8f5ff',borderRadius:12,padding:16,marginBottom:16,border:'1px solid #009ee3'}}>
                    <div style={{fontWeight:600,marginBottom:6}}>💙 Mercado Pago (opcional)</div>
                    <div style={{fontSize:13,color:'#555',marginBottom:10}}>Si viajás a Argentina, te enviamos instrucciones para crear tu cuenta gratis</div>
                    <input placeholder="tu@email.com (opcional)" value={form.cuentaPago} onChange={e => set('cuentaPago',e.target.value)} style={{padding:'8px 12px',borderRadius:8,border:'1px solid #ddd',width:'100%',fontSize:13}} />
                  </div>
                </>
              )}

              <div style={{display:'flex',gap:10,marginTop:8}}>
                <button className="btn-secondary" onClick={() => setStep(2)} style={{flex:1}}>Atras</button>
                <button className="btn-orange" onClick={submit} disabled={loading || (role==='seller' && !form.metodoPago)} style={{flex:2}}>
                  {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </>
  );
}
