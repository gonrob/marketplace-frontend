'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import HostOnboarding from '../components/HostOnboarding';

const T = {
  es:{titulo:'Crear cuenta',elige:'¿Sos anfitrión o viajero?',anfitrion:'🏠 Soy anfitrión',anfitrionDesc:'Quiero compartir mi cultura y ganar dinero',pareja:'👫 Somos anfitriones pareja',parejaDesc:'Ofrecemos experiencias juntos como pareja',viajero:'🌍 Soy viajero',viajeroDesc:'Quiero conectar con argentinos reales',nombre:'Nombre',apellido:'Apellido',email:'Email',telefono:'Teléfono (para comunicarte con el anfitrión)',password:'Contraseña',siguiente:'Siguiente',registrar:'Crear cuenta',cargando:'Creando cuenta...',login:'Iniciar sesión',yaRegistrado:'Ya tengo cuenta',metodoPago:'Método de cobro',mercadopago:'Mercado Pago',transferencia:'Transferencia bancaria',cuentaPago:'Email MP o CBU/Alias',error:'Error al crear cuenta.',confirmar:'¡Cuenta creada! Revisá tu email para confirmar.'},
  en:{titulo:'Create account',elige:'Are you a host or traveler?',anfitrion:'🏠 I am a host',anfitrionDesc:'I want to share my culture and earn money',pareja:'👫 We are a couple host',parejaDesc:'We offer experiences together as a couple',viajero:'🌍 I am a traveler',viajeroDesc:'I want to connect with real Argentinians',nombre:'First name',apellido:'Last name',email:'Email',telefono:'Phone (to contact your host)',password:'Password',siguiente:'Next',registrar:'Create account',cargando:'Creating...',login:'Log in',yaRegistrado:'Already have an account',metodoPago:'Payment method',mercadopago:'Mercado Pago',transferencia:'Bank transfer',cuentaPago:'MP Email or CBU/Alias',error:'Error creating account.',confirmar:'Account created! Check your email to confirm.'},
};

const PAISES = [
  ['+93','🇦🇫','Afganistán'],['+355','🇦🇱','Albania'],['+213','🇩🇿','Argelia'],['+376','🇦🇩','Andorra'],['+244','🇦🇴','Angola'],
  ['+54','🇦🇷','Argentina'],['+374','🇦🇲','Armenia'],['+61','🇦🇺','Australia'],['+43','🇦🇹','Austria'],['+994','🇦🇿','Azerbaiyán'],
  ['+1242','🇧🇸','Bahamas'],['+973','🇧🇭','Baréin'],['+880','🇧🇩','Bangladés'],['+375','🇧🇾','Bielorrusia'],['+32','🇧🇪','Bélgica'],
  ['+501','🇧🇿','Belice'],['+229','🇧🇯','Benín'],['+975','🇧🇹','Bután'],['+591','🇧🇴','Bolivia'],['+387','🇧🇦','Bosnia'],
  ['+267','🇧🇼','Botsuana'],['+55','🇧🇷','Brasil'],['+673','🇧🇳','Brunéi'],['+359','🇧🇬','Bulgaria'],['+226','🇧🇫','Burkina Faso'],
  ['+257','🇧🇮','Burundi'],['+238','🇨🇻','Cabo Verde'],['+855','🇰🇭','Camboya'],['+237','🇨🇲','Camerún'],['+1','🇨🇦','Canadá'],
  ['+236','🇨🇫','R. Centroafricana'],['+235','🇹🇩','Chad'],['+56','🇨🇱','Chile'],['+86','🇨🇳','China'],['+57','🇨🇴','Colombia'],
  ['+269','🇰🇲','Comoras'],['+242','🇨🇬','Congo'],['+506','🇨🇷','Costa Rica'],['+385','🇭🇷','Croacia'],['+53','🇨🇺','Cuba'],
  ['+357','🇨🇾','Chipre'],['+420','🇨🇿','Chequia'],['+45','🇩🇰','Dinamarca'],['+253','🇩🇯','Yibuti'],['+1809','🇩🇴','R. Dominicana'],
  ['+593','🇪🇨','Ecuador'],['+20','🇪🇬','Egipto'],['+503','🇸🇻','El Salvador'],['+240','🇬🇶','G. Ecuatorial'],['+291','🇪🇷','Eritrea'],
  ['+372','🇪🇪','Estonia'],['+268','🇸🇿','Esuatini'],['+251','🇪🇹','Etiopía'],['+679','🇫🇯','Fiyi'],['+358','🇫🇮','Finlandia'],
  ['+33','🇫🇷','Francia'],['+241','🇬🇦','Gabón'],['+220','🇬🇲','Gambia'],['+995','🇬🇪','Georgia'],['+49','🇩🇪','Alemania'],
  ['+233','🇬🇭','Ghana'],['+30','🇬🇷','Grecia'],['+502','🇬🇹','Guatemala'],['+224','🇬🇳','Guinea'],['+245','🇬🇼','Guinea-Bisáu'],
  ['+592','🇬🇾','Guyana'],['+509','🇭🇹','Haití'],['+504','🇭🇳','Honduras'],['+36','🇭🇺','Hungría'],['+354','🇮🇸','Islandia'],
  ['+91','🇮🇳','India'],['+62','🇮🇩','Indonesia'],['+98','🇮🇷','Irán'],['+964','🇮🇶','Irak'],['+353','🇮🇪','Irlanda'],
  ['+972','🇮🇱','Israel'],['+39','🇮🇹','Italia'],['+1876','🇯🇲','Jamaica'],['+81','🇯🇵','Japón'],['+962','🇯🇴','Jordania'],
  ['+7','🇰🇿','Kazajistán'],['+254','🇰🇪','Kenia'],['+965','🇰🇼','Kuwait'],['+996','🇰🇬','Kirguistán'],['+856','🇱🇦','Laos'],
  ['+371','🇱🇻','Letonia'],['+961','🇱🇧','Líbano'],['+266','🇱🇸','Lesoto'],['+231','🇱🇷','Liberia'],['+218','🇱🇾','Libia'],
  ['+423','🇱🇮','Liechtenstein'],['+370','🇱🇹','Lituania'],['+352','🇱🇺','Luxemburgo'],['+261','🇲🇬','Madagascar'],['+265','🇲🇼','Malaui'],
  ['+60','🇲🇾','Malasia'],['+960','🇲🇻','Maldivas'],['+223','🇲🇱','Mali'],['+356','🇲🇹','Malta'],['+212','🇲🇦','Marruecos'],
  ['+222','🇲🇷','Mauritania'],['+230','🇲🇺','Mauricio'],['+52','🇲🇽','México'],['+373','🇲🇩','Moldavia'],['+377','🇲🇨','Mónaco'],
  ['+976','🇲🇳','Mongolia'],['+382','🇲🇪','Montenegro'],['+258','🇲🇿','Mozambique'],['+264','🇳🇦','Namibia'],['+977','🇳🇵','Nepal'],
  ['+31','🇳🇱','Países Bajos'],['+64','🇳🇿','Nueva Zelanda'],['+505','🇳🇮','Nicaragua'],['+227','🇳🇪','Níger'],['+234','🇳🇬','Nigeria'],
  ['+47','🇳🇴','Noruega'],['+968','🇴🇲','Omán'],['+92','🇵🇰','Pakistán'],['+507','🇵🇦','Panamá'],['+675','🇵🇬','Papúa N. Guinea'],
  ['+595','🇵🇾','Paraguay'],['+51','🇵🇪','Perú'],['+63','🇵🇭','Filipinas'],['+48','🇵🇱','Polonia'],['+351','🇵🇹','Portugal'],
  ['+974','🇶🇦','Qatar'],['+40','🇷🇴','Rumania'],['+7','🇷🇺','Rusia'],['+250','🇷🇼','Ruanda'],['+966','🇸🇦','Arabia Saudita'],
  ['+221','🇸🇳','Senegal'],['+381','🇷🇸','Serbia'],['+232','🇸🇱','Sierra Leona'],['+65','🇸🇬','Singapur'],['+421','🇸🇰','Eslovaquia'],
  ['+386','🇸🇮','Eslovenia'],['+252','🇸🇴','Somalia'],['+27','🇿🇦','Sudáfrica'],['+34','🇪🇸','España'],['+94','🇱🇰','Sri Lanka'],
  ['+249','🇸🇩','Sudán'],['+597','🇸🇷','Surinam'],['+46','🇸🇪','Suecia'],['+41','🇨🇭','Suiza'],['+963','🇸🇾','Siria'],
  ['+886','🇹🇼','Taiwán'],['+992','🇹🇯','Tayikistán'],['+255','🇹🇿','Tanzania'],['+66','🇹🇭','Tailandia'],['+228','🇹🇬','Togo'],
  ['+1868','🇹🇹','Trinidad y Tobago'],['+216','🇹🇳','Túnez'],['+90','🇹🇷','Turquía'],['+993','🇹🇲','Turkmenistán'],['+256','🇺🇬','Uganda'],
  ['+380','🇺🇦','Ucrania'],['+971','🇦🇪','Emiratos Árabes'],['+44','🇬🇧','Reino Unido'],['+1','🇺🇸','EE.UU.'],['+598','🇺🇾','Uruguay'],
  ['+998','🇺🇿','Uzbekistán'],['+58','🇻🇪','Venezuela'],['+84','🇻🇳','Vietnam'],['+967','🇾🇪','Yemen'],['+260','🇿🇲','Zambia'],['+263','🇿🇼','Zimbabue'],
].sort((a,b) => a[2].localeCompare(b[2]));

const inp = (error) => ({width:'100%',padding:'10px 14px',borderRadius:10,border:`1.5px solid ${error?'#ef4444':'#d1d5db'}`,fontSize:14,outline:'none',boxSizing:'border-box'});

export default function Register() {
  const router = useRouter();
  const [lang] = useState('es');
  const t = T[lang] || T.es;

  const [paso, setPaso] = useState(1); // 1=elegir rol, 2=datos, 3=onboarding (solo anfitrion)
  const [role, setRole] = useState('');
  const [form, setForm] = useState({nombre:'',apellido:'',email:'',telefono:'',password:'',metodoPago:'mercadopago',cuentaPago:'',nombrePareja:''});
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Fotos
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [foto2, setFoto2] = useState(null);
  const [fotoPreview2, setFotoPreview2] = useState(null);
  const fotoRef = useRef();
  const foto2Ref = useRef();

  // Datos del onboarding para anfitriones
  const [onboardingData, setOnboardingData] = useState(null);

  const uploadFoto = async (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const max = 600;
        let w = img.width, h = img.height;
        if (w > max) { h = Math.round(h * max / w); w = max; }
        if (h > max) { w = Math.round(w * max / h); h = max; }
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        const base64 = canvas.toDataURL('image/jpeg', 0.6);
        URL.revokeObjectURL(url);
        try {
          const up = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/upload/photo-public', {
            method: 'POST', headers: {'Content-Type':'application/json'},
            body: JSON.stringify({photo: base64})
          });
          if (up.ok) { const d = await up.json(); resolve(d.url); }
          else resolve(null);
        } catch { resolve(null); }
      };
      img.onerror = () => resolve(null);
      img.src = url;
    });
  };

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = true;
    if (!form.apellido.trim()) e.apellido = true;
    if (!/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.telefono.trim()) e.telefono = true;
    if (form.password.length < 6) e.password = true;
    if (!foto) e.foto = true;
    if (role === 'pareja' && !foto2) e.foto2 = true;
    setErrors(e);
    if (Object.keys(e).length > 0) setError('⬆️ Subí y completá el formulario');
    return Object.keys(e).length === 0;
  };

  const irAlOnboarding = async () => {
    if (!validate()) return;
    setLoading(true); setError('');
    try {
      let fotoUrl = foto ? await uploadFoto(foto) : null;
      let fotoUrl2 = foto2 ? await uploadFoto(foto2) : null;
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          nombre: form.nombre + ' ' + form.apellido,
          email: form.email,
          password: form.password,
          telefono: form.telefono,
          role: role === 'pareja' ? 'seller' : role,
          foto: fotoUrl,
          foto2: fotoUrl2,
          nombrePareja: form.nombrePareja || '',
          metodoPago: form.metodoPago,
          cuentaPago: form.cuentaPago,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.error);
      localStorage.setItem('token', data.token);
      if (role === 'pareja') localStorage.setItem('esPareja', 'true');
      else localStorage.removeItem('esPareja');
      setPaso(3);
    } catch (err) {
      setError(err.message || t.error);
    } finally { setLoading(false); }
  };

  const crearCuenta = async (extraData = {}) => {
    setLoading(true); setError('');
    try {
      let fotoUrl = foto ? await uploadFoto(foto) : null;
      let fotoUrl2 = foto2 ? await uploadFoto(foto2) : null;

      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          nombre: form.nombre + ' ' + form.apellido,
          email: form.email,
          password: form.password,
          telefono: form.telefono,
          role: role === 'pareja' ? 'seller' : role,
          foto: fotoUrl,
          foto2: fotoUrl2,
          nombrePareja: form.nombrePareja || '',
          metodoPago: (role === 'seller' || role === 'pareja') ? form.metodoPago : '',
          cuentaPago: (role === 'seller' || role === 'pareja') ? form.cuentaPago : '',
          ...extraData,
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || t.error);

      localStorage.setItem('token', data.token);
      if (role === 'pareja') localStorage.setItem('esPareja', 'true');
      else localStorage.removeItem('esPareja');

      alert(t.confirmar);
      router.push(role === 'buyer' ? '/explorar?verificar=1' : '/dashboard');
    } catch (err) {
      setError(err.message || t.error);
    } finally { setLoading(false); }
  };

  // Paso 1 — elegir rol
  if (paso === 1) return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <h1 style={{marginBottom:20}}>{t.elige}</h1>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <button onClick={() => { setRole('seller'); setPaso(2); }} style={{padding:20,background:'#f0f4ff',border:'2px solid #4B6CB7',borderRadius:14,cursor:'pointer',textAlign:'left'}}>
              <div style={{fontSize:20,fontWeight:700,color:'#4B6CB7',marginBottom:4}}>{t.anfitrion}</div>
              <div style={{fontSize:14,color:'#555'}}>{t.anfitrionDesc}</div>
            </button>
            <button onClick={() => { setRole('pareja'); setPaso(2); }} style={{padding:20,background:'#fdf4ff',border:'2px solid #C94B4B',borderRadius:14,cursor:'pointer',textAlign:'left'}}>
              <div style={{fontSize:20,fontWeight:700,color:'#C94B4B',marginBottom:4}}>{t.pareja}</div>
              <div style={{fontSize:14,color:'#555'}}>{t.parejaDesc}</div>
            </button>
            <button onClick={() => { setRole('buyer'); setPaso(2); }} style={{padding:20,background:'#fff8e1',border:'2px solid #F4A020',borderRadius:14,cursor:'pointer',textAlign:'left'}}>
              <div style={{fontSize:20,fontWeight:700,color:'#F4A020',marginBottom:4}}>{t.viajero}</div>
              <div style={{fontSize:14,color:'#555'}}>{t.viajeroDesc}</div>
            </button>
          </div>
          <div style={{textAlign:'center',marginTop:20,fontSize:14,color:'#888'}}>
            {t.yaRegistrado} <Link href="/login" style={{color:'#4B6CB7'}}>{t.login}</Link>
          </div>
        </div>
      </div>
    </>
  );

  // Paso 2 — datos personales
  if (paso === 2) return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <h1 style={{marginBottom:20}}>{t.titulo}</h1>
          {error && <div className="error">{error}</div>}

          {/* FOTO */}
          <div style={{textAlign:'center',marginBottom:20}}>
            <div onClick={() => fotoRef.current.click()} style={{width:90,height:90,borderRadius:'50%',cursor:'pointer',background:fotoPreview?'transparent':'linear-gradient(135deg,#4B6CB7,#C94B4B)',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',border:`3px solid ${errors.foto?'#ef4444':'#4B6CB7'}`,margin:'0 auto 10px'}}>
              {fotoPreview ? <img src={fotoPreview} alt="foto" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <span style={{fontSize:32}}>👤</span>}
            </div>
            <button type="button" onClick={() => fotoRef.current.click()} style={{background:'linear-gradient(90deg,#4B6CB7,#C94B4B)',color:'#fff',border:'none',borderRadius:10,padding:'8px 20px',fontWeight:700,fontSize:13,cursor:'pointer'}}>
              📸 {fotoPreview ? 'Cambiar foto' : 'Subir tu foto'}
            </button>
            {errors.foto && <p style={{color:'#ef4444',fontSize:12,marginTop:6}}>La foto es obligatoria</p>}
            <input ref={fotoRef} type="file" accept="image/*" style={{display:'none'}} onChange={e => { const f=e.target.files[0]; if(f){setFoto(f);setFotoPreview(URL.createObjectURL(f));setErrors(p=>({...p,foto:false}));} }} />
          </div>

          {/* FOTO 2 PAREJA */}
          {role === 'pareja' && (
            <div style={{textAlign:'center',marginBottom:20,padding:16,background:'#fdf4ff',borderRadius:12,border:'1.5px solid #C94B4B'}}>
              <p style={{fontWeight:700,fontSize:13,color:'#C94B4B',margin:'0 0 10px'}}>📸 Foto de tu pareja</p>
              <div onClick={() => foto2Ref.current.click()} style={{width:80,height:80,borderRadius:'50%',cursor:'pointer',background:fotoPreview2?'transparent':'#f3f4f6',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',border:'3px solid #C94B4B',margin:'0 auto 10px'}}>
                {fotoPreview2 ? <img src={fotoPreview2} alt="pareja" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <span style={{fontSize:28}}>👤</span>}
              </div>
              {errors.foto2 && <p style={{color:'#ef4444',fontSize:12,marginTop:4}}>La foto de tu pareja es obligatoria</p>}
              <button type="button" onClick={() => foto2Ref.current.click()} style={{background:'#C94B4B',color:'#fff',border:'none',borderRadius:10,padding:'8px 16px',fontWeight:700,fontSize:13,cursor:'pointer'}}>
                {fotoPreview2 ? 'Cambiar' : 'Subir foto'}
              </button>
              <input ref={foto2Ref} type="file" accept="image/*" style={{display:'none'}} onChange={e => { const f=e.target.files[0]; if(f){setFoto2(f);setFotoPreview2(URL.createObjectURL(f));setErrors(p=>({...p,foto2:false}));} }} />
            </div>
          )}

          {/* CAMPOS */}
          <div className="form-group">
            <label style={{color:errors.nombre?'#ef4444':'inherit'}}>{t.nombre} {errors.nombre&&'⚠️'}</label>
            <input value={form.nombre} onChange={e=>{setForm({...form,nombre:e.target.value});setErrors(p=>({...p,nombre:false}));}} style={inp(errors.nombre)} />
          </div>
          <div className="form-group">
            <label style={{color:errors.apellido?'#ef4444':'inherit'}}>{t.apellido} {errors.apellido&&'⚠️'}</label>
            <input value={form.apellido} onChange={e=>{setForm({...form,apellido:e.target.value});setErrors(p=>({...p,apellido:false}));}} style={inp(errors.apellido)} />
          </div>
          {role === 'pareja' && (
            <div className="form-group">
              <label>👫 Nombre y apellido de tu pareja</label>
              <input value={form.nombrePareja} onChange={e=>setForm({...form,nombrePareja:e.target.value})} placeholder="ej: María García" style={inp(false)} />
            </div>
          )}
          <div className="form-group">
            <label style={{color:errors.email?'#ef4444':'inherit'}}>{t.email} {errors.email&&'⚠️'}</label>
            <input type="email" value={form.email} onChange={e=>{setForm({...form,email:e.target.value});setErrors(p=>({...p,email:false}));}} style={inp(errors.email)} />
          </div>
          <div className="form-group">
            <label style={{color:errors.telefono?'#ef4444':'inherit'}}>{t.telefono} {errors.telefono&&'⚠️'}</label>
            <div style={{display:'flex',gap:8}}>
              <select value={form.prefijo||'+54'} onChange={e=>setForm({...form,prefijo:e.target.value})} style={{padding:'10px 4px',borderRadius:10,border:'1.5px solid #d1d5db',fontSize:11,outline:'none',background:'#fff',width:80,flexShrink:0}}>
                {PAISES.map(([code,flag,name]) => <option key={code+name} value={code}>{flag} {code} {name}</option>)}
              </select>
              <input type="tel" value={form.telefono} onChange={e=>{setForm({...form,telefono:e.target.value});setErrors(p=>({...p,telefono:false}));}} style={{...inp(errors.telefono),flex:1}} placeholder="WhatsApp" />
            </div>
          </div>
          <div className="form-group">
            <label style={{color:errors.password?'#ef4444':'inherit'}}>{t.password} {errors.password&&'⚠️'}</label>
            <input type={showPass?'text':'password'} value={form.password} onChange={e=>{setForm({...form,password:e.target.value});setErrors(p=>({...p,password:false}));}} style={inp(errors.password)} />
            <span onClick={()=>setShowPass(p=>!p)} style={{fontSize:12,color:'#4B6CB7',cursor:'pointer',display:'block',marginTop:4}}>{showPass?'🙈 Ocultar':'👁️ Ver contraseña'}</span>
          </div>

          {(role === 'seller' || role === 'pareja') && (
            <>
              <div className="form-group">
                <label>{t.metodoPago}</label>
                <select value={form.metodoPago} onChange={e=>setForm({...form,metodoPago:e.target.value})} style={inp(false)}>
                  <option value="mercadopago">{t.mercadopago}</option>
                  <option value="transferencia">{t.transferencia}</option>
                </select>
              </div>
              <div className="form-group">
                <label>{t.cuentaPago}</label>
                <input value={form.cuentaPago} onChange={e=>setForm({...form,cuentaPago:e.target.value})} style={inp(false)} />
              </div>
            </>
          )}

          {role === 'buyer' ? (
            <button onClick={() => { if(validate()) crearCuenta(); }} disabled={loading} className="btn-orange">
              {loading ? t.cargando : t.registrar}
            </button>
          ) : (
            <button onClick={irAlOnboarding} disabled={loading} className="btn-orange">
              {loading ? '⏳ Creando cuenta...' : 'Siguiente → Configurar experiencias'}
            </button>
          )}
          <button onClick={() => setPaso(1)} style={{background:'none',border:'none',color:'#888',cursor:'pointer',marginTop:12,fontSize:13,display:'block',width:'100%'}}>← Volver</button>
        </div>
      </div>
    </>
  );

  // Paso 3 — onboarding anfitrion (cuenta ya creada antes)
  if (paso === 3) return (
    <HostOnboarding
      esPareja={role === 'pareja'}
      onComplete={() => {
        alert('¡Cuenta creada! Revisá tu email para confirmar.');
        router.push(role === 'buyer' ? '/explorar?verificar=1' : '/dashboard');
      }}
    />
  );

  return null;
}
