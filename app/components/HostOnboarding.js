'use client';
import { useState, useRef, useEffect } from 'react';

const CATEGORIAS = [
  { id: 'urbanas', emoji: '🏙️', es: 'Experiencias urbanas', servicios: [{ id: 'paseos_ciudad', es: 'Paseos por la ciudad' },{ id: 'tour_barrios', es: 'Tour por barrios' },{ id: 'miradores', es: 'Miradores y vistas panorámicas' },{ id: 'vida_nocturna', es: 'Vida nocturna' }] },
  { id: 'deportivas', emoji: '⚽', es: 'Experiencias deportivas', servicios: [{ id: 'partido_futbol', es: 'Ir a ver un partido de fútbol' },{ id: 'jugar_futbol', es: 'Jugar un partido con locales' },{ id: 'actividades_deportivas', es: 'Actividades deportivas' }] },
  { id: 'gastronomicas', emoji: '🍽️', es: 'Experiencias gastronómicas', servicios: [{ id: 'tour_gastronomico', es: 'Tour gastronómico' },{ id: 'restaurantes_locales', es: 'Ir a comer a restaurantes locales' },{ id: 'asado', es: 'Asado argentino en casa' },{ id: 'cocina', es: 'Clases de cocina' },{ id: 'bares_vinos', es: 'Ruta de bares / vinos' }] },
  { id: 'cultura', emoji: '🎭', es: 'Cultura y entretenimiento', servicios: [{ id: 'tour_cultural', es: 'Tour cultural / histórico' },{ id: 'museos', es: 'Museos y galerías' },{ id: 'espectaculos', es: 'Espectáculos' }] },
  { id: 'naturaleza', emoji: '🌿', es: 'Naturaleza y escapadas', servicios: [{ id: 'excursiones', es: 'Excursiones fuera de la ciudad' },{ id: 'senderismo', es: 'Senderismo / trekking' },{ id: 'campo', es: 'Día de campo' },{ id: 'acuaticas', es: 'Actividades acuáticas' }] },
  { id: 'servicios', emoji: '🚗', es: 'Servicios personalizados', servicios: [{ id: 'acompanamiento', es: 'Acompañamiento durante el día' },{ id: 'traslados', es: 'Traslados' },{ id: 'itinerarios', es: 'Planificación de itinerarios' },{ id: 'traduccion', es: 'Traducción / asistencia' }] },
  { id: 'social', emoji: '🧑‍🤝‍🧑', es: 'Social / lifestyle', servicios: [{ id: 'salir_locales', es: 'Salir con locales' },{ id: 'mate', es: 'Experiencia mate' },{ id: 'mercados', es: 'Compras en mercados' },{ id: 'networking', es: 'Networking' }] },
];

const DURACIONES = ['1h', '2h', '3h', 'Medio día', 'Día completo'];
const IDIOMAS = ['Español', 'Inglés', 'Portugués', 'Francés', 'Otro'];
const ZONAS = ['Buenos Aires - Centro/Microcentro','Buenos Aires - Palermo','Buenos Aires - San Telmo / La Boca','Buenos Aires - Belgrano / Núñez','Buenos Aires - Recoleta / Barrio Norte','GBA Norte','GBA Sur','GBA Oeste','Córdoba Capital','Rosario','Mendoza Capital','Bariloche','Salta Capital','Tucumán Capital','Mar del Plata','Ushuaia','Bahía Blanca','Otra ciudad'];

const inp = (error) => ({ width: '100%', padding: '9px 12px', borderRadius: 8, fontSize: 13, border: `1.5px solid ${error ? '#ef4444' : '#d1d5db'}`, outline: 'none', background: '#fff', boxSizing: 'border-box' });

export default function HostOnboarding({ onComplete }) {
  const fileRef = useRef();
  const fileRef2 = useRef();
  const [esPareja, setEsPareja] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('esPareja') === 'true') setEsPareja(true);
  }, []);

  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [foto2, setFoto2] = useState(null);
  const [fotoPreview2, setFotoPreview2] = useState(null);
  const [nombrePareja, setNombrePareja] = useState('');
  const [zona, setZona] = useState('');
  const [seleccionados, setSeleccionados] = useState({});
  const [servicioCustom, setServicioCustom] = useState('');
  const [errors, setErrors] = useState({});
  const [detErrors, setDetErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [precioGral, setPrecioGral] = useState('');
  const [duracionGral, setDuracionGral] = useState('');
  const [descripcionGral, setDescripcionGral] = useState('');
  const [personasGral, setPersonasGral] = useState('2');
  const [galeria, setGaleria] = useState([]);
  const [fotosExp, setFotosExp] = useState({});
  const galeriaRef = useRef();
  const fotosExpRef = useRef({});

  const handleFoto = (e) => { const f = e.target.files[0]; if(f){setFoto(f);setFotoPreview(URL.createObjectURL(f));setErrors(p=>({...p,foto:false}));} };
  const handleFoto2 = (e) => { const f = e.target.files[0]; if(f){setFoto2(f);setFotoPreview2(URL.createObjectURL(f));} };

  const toggle = (id) => { setSeleccionados(p => { const n={...p}; if(n[id]) delete n[id]; else n[id]=true; return n; }); setErrors(p=>({...p,servicios:false})); };


  const validate = () => {
    const e = {};
    if (!foto) e.foto = true;
    if (!zona) e.zona = true;
    if (Object.keys(seleccionados).length === 0 && !servicioCustom.trim()) e.servicios = true;
    setErrors(e);
    setDetErrors({});
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    setMsg('');
    if (!validate()) { setMsg('Completá los campos marcados en rojo.'); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      const base64 = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(foto); });
      const upRes = await fetch(apiUrl + '/api/upload/photo', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ photo: base64 }) });
      if (!upRes.ok) throw new Error('Error subiendo foto');
      const upData = await upRes.json();

      let fotoUrl2 = null;
      if (foto2) {
        const base642 = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(foto2); });
        const upRes2 = await fetch(apiUrl + '/api/upload/photo', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ photo: base642 }) });
        if (upRes2.ok) { const d = await upRes2.json(); fotoUrl2 = d.url; }
      }

      // Subir galeria
      const galeriaUrls = [];
      for (const g of galeria) {
        const b64 = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(g.file); });
        const ur = await fetch(apiUrl + '/api/upload/photo', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }, body: JSON.stringify({ photo: b64 }) });
        if (ur.ok) { const ud = await ur.json(); galeriaUrls.push(ud.url); }
      }

      const habilidades = Object.entries(seleccionados).map(([id, d]) => ({ id, ...d }));
      if (servicioCustom.trim()) habilidades.push({ id: 'custom', descripcion: servicioCustom.trim(), precio: '', duracion: '', personas: '', idioma: '', punto: '', esCustom: true });

      const profRes = await fetch(apiUrl + '/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
        body: JSON.stringify({ foto: upData.url, habilidades, ciudad: zona, ...(fotoUrl2 && { foto2: fotoUrl2 }), ...(nombrePareja && { nombrePareja }), ...(galeriaUrls.length && { galeria: galeriaUrls }) }),
      });
      if (!profRes.ok) throw new Error('Error guardando perfil');
      localStorage.removeItem('esPareja');
      onComplete('email_sent');
    } catch (err) {
      setMsg('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', overflowY: 'auto', padding: '24px 16px 48px' }}>
      <div style={{ background: '#fff', borderRadius: 20, maxWidth: 620, width: '100%', padding: '28px 24px', boxShadow: '0 8px 48px rgba(0,0,0,0.2)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 40, marginBottom: 6 }}>🇦🇷</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 6px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>¿Qué experiencias podés ofrecer?</h2>
          <p style={{ color: '#666', fontSize: 13, margin: 0 }}>Completá tu perfil para aparecer en el escaparate</p>
        </div>

        {/* FOTO 1 */}
        <div style={{ background: errors.foto ? '#fff5f5' : '#f8faff', borderRadius: 14, padding: 18, marginBottom: 16, border: `1.5px solid ${errors.foto ? '#ef4444' : '#e5e7eb'}` }}>
          <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 12px', color: errors.foto ? '#ef4444' : '#222' }}>
            📸 {esPareja ? 'Foto 1 — La tuya' : 'Foto de perfil'} {errors.foto && <span style={{ fontSize: 12, fontWeight: 400 }}>— obligatoria</span>}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div onClick={() => fileRef.current.click()} style={{ width: 72, height: 72, borderRadius: '50%', cursor: 'pointer', flexShrink: 0, background: fotoPreview ? 'transparent' : 'linear-gradient(135deg,#4B6CB7,#C94B4B)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: `3px solid ${errors.foto ? '#ef4444' : '#4B6CB7'}` }}>
              {fotoPreview ? <img src={fotoPreview} alt="foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 26 }}>👤</span>}
            </div>
            <button onClick={() => fileRef.current.click()} style={{ background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{fotoPreview ? 'Cambiar foto' : 'Subir foto'}</button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFoto} />
          </div>
        </div>

        {/* FOTO 2 Y NOMBRE PAREJA */}
        {esPareja && (
          <div style={{ background: '#fdf4ff', borderRadius: 14, padding: 18, marginBottom: 16, border: '1.5px solid #C94B4B' }}>
            <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 14px', color: '#C94B4B' }}>👫 Datos de tu pareja</p>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Nombre de tu pareja</label>
              <input value={nombrePareja} onChange={e => setNombrePareja(e.target.value)} placeholder="ej: María García" style={inp(false)} />
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, margin: '0 0 10px', color: '#C94B4B' }}>📸 Foto 2 — La de tu pareja</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div onClick={() => fileRef2.current.click()} style={{ width: 72, height: 72, borderRadius: '50%', cursor: 'pointer', flexShrink: 0, background: fotoPreview2 ? 'transparent' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '3px solid #C94B4B' }}>
                {fotoPreview2 ? <img src={fotoPreview2} alt="pareja" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: 26 }}>👤</span>}
              </div>
              <button onClick={() => fileRef2.current.click()} style={{ background: '#C94B4B', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 18px', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>{fotoPreview2 ? 'Cambiar foto' : 'Subir foto de tu pareja'}</button>
              <input ref={fileRef2} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFoto2} />
            </div>
          </div>
        )}

        {/* ZONA */}
        <div style={{ background: errors.zona ? '#fff5f5' : '#f8faff', borderRadius: 14, padding: 18, marginBottom: 16, border: `1.5px solid ${errors.zona ? '#ef4444' : '#e5e7eb'}` }}>
          <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 10px', color: errors.zona ? '#ef4444' : '#222' }}>📍 Zona de servicio {errors.zona && <span style={{ fontSize: 12, fontWeight: 400 }}>— obligatoria</span>}</p>
          <select value={zona} onChange={e => { setZona(e.target.value); setErrors(p=>({...p,zona:false})); }} style={inp(errors.zona)}>
            <option value="">— Seleccioná tu zona —</option>
            {ZONAS.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>

        {/* SERVICIOS */}
        <div style={{ background: errors.servicios ? '#fff5f5' : '#f8faff', borderRadius: 14, padding: 18, marginBottom: 16, border: `1.5px solid ${errors.servicios ? '#ef4444' : '#e5e7eb'}` }}>
          <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 4px', color: errors.servicios ? '#ef4444' : '#222' }}>🎯 Experiencias {errors.servicios && <span style={{ fontSize: 12, fontWeight: 400 }}>— seleccioná al menos una</span>}</p>
          <p style={{ color: '#888', fontSize: 12, margin: '0 0 16px' }}>Hacé click para configurar cada experiencia</p>
          {CATEGORIAS.map(cat => (
            <div key={cat.id} style={{ marginBottom: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 13, color: '#444', margin: '0 0 8px' }}>{cat.emoji} {cat.es}</p>
              {cat.servicios.map(s => {
                const activo = !!seleccionados[s.id];
                const det = seleccionados[s.id] || {};
                const de = detErrors[s.id] || {};
                return (
                  <div key={s.id} style={{ borderRadius: 10, overflow: 'hidden', border: `1.5px solid ${activo ? '#4B6CB7' : '#e5e7eb'}`, marginBottom: 6 }}>
                    <div onClick={() => toggle(s.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', cursor: 'pointer', background: activo ? 'linear-gradient(90deg,#4B6CB7,#C94B4B)' : '#fff' }}>
                      <div style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, background: activo ? '#fff' : 'transparent', border: `2px solid ${activo ? '#fff' : '#aaa'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {activo && <span style={{ fontSize: 12, color: '#4B6CB7', fontWeight: 800 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: activo ? '#fff' : '#333' }}>{s.es}</span>
                    </div>
                    {activo && (
                      <div style={{ padding: 14, background: '#fafbff', borderTop: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
                          <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: de.precio ? '#ef4444' : '#555', display: 'block', marginBottom: 4 }}>💰 Precio USD {de.precio && '*'}</label>
                            <input type="number" placeholder="ej: 25" value={det.precio} onChange={e => update(s.id, 'precio', e.target.value)} style={inp(de.precio)} />
                          </div>
                          <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: de.duracion ? '#ef4444' : '#555', display: 'block', marginBottom: 4 }}>⏱️ Duración {de.duracion && '*'}</label>
                            <select value={det.duracion} onChange={e => update(s.id, 'duracion', e.target.value)} style={inp(de.duracion)}>
                              <option value="">— Elegí —</option>
                              {DURACIONES.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                          </div>
                        </div>
                        <div style={{ marginBottom: 10 }}>
                          <label style={{ fontSize: 12, fontWeight: 600, color: de.descripcion ? '#ef4444' : '#555', display: 'block', marginBottom: 4 }}>📝 Descripción {de.descripcion && '*'}</label>
                          <textarea placeholder="Ej: Los lunes hago yoga a la mañana en Plaza Italia, te puedo llevar y después tomamos un café..." value={det.descripcion} onChange={e => update(s.id, 'descripcion', e.target.value)} rows={2} style={{ ...inp(de.descripcion), resize: 'vertical' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                          <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>👥 Máx. personas</label>
                            <input type="number" min="1" max="20" value={det.personas} onChange={e => update(s.id, 'personas', e.target.value)} style={inp(false)} />
                          </div>
                          <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>🌍 Idioma</label>
                            <select value={det.idioma} onChange={e => update(s.id, 'idioma', e.target.value)} style={inp(false)}>
                              {IDIOMAS.map(i => <option key={i} value={i}>{i}</option>)}
                            </select>
                          </div>
                          <div>
                            <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>📍 Punto encuentro</label>
                            <input type="text" placeholder="ej: Plaza Mayor" value={det.punto} onChange={e => update(s.id, 'punto', e.target.value)} style={inp(false)} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* GALERIA */}
        <div style={{ background: '#f8faff', borderRadius: 14, padding: 18, marginBottom: 16, border: '1.5px solid #e5e7eb' }}>
          <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 4px', color: '#222' }}>🖼️ Galería de fotos (opcional)</p>
          <p style={{ color: '#888', fontSize: 12, margin: '0 0 14px' }}>Subí hasta 5 fotos de tus experiencias — tu coche, el barrio, la actividad...</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
            {galeria.map((g, i) => (
              <div key={i} style={{ position: 'relative', width: 80, height: 80 }}>
                <img src={g.preview} alt={`foto${i}`} style={{ width: '100%', height: '100%', borderRadius: 8, objectFit: 'cover', border: '2px solid #4B6CB7' }} />
                <button onClick={() => setGaleria(p => p.filter((_, j) => j !== i))} style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', color: '#fff', border: 'none', borderRadius: '50%', width: 20, height: 20, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
              </div>
            ))}
            {galeria.length < 5 && (
              <div onClick={() => galeriaRef.current.click()} style={{ width: 80, height: 80, borderRadius: 8, border: '2px dashed #4B6CB7', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#4B6CB7', fontSize: 24 }}>+</div>
            )}
          </div>
          <input ref={galeriaRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files[0]; if(f && galeria.length < 5) setGaleria(p => [...p, { file: f, preview: URL.createObjectURL(f) }]); }} />
        </div>

        {/* CAMPOS GENERALES */}
        {Object.keys(seleccionados).length > 0 && (
          <div style={{ background: '#f0f4ff', borderRadius: 14, padding: 18, marginBottom: 16, border: '1.5px solid #4B6CB7' }}>
            <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 14px', color: '#4B6CB7' }}>📋 Detalles de tus experiencias</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>💰 Precio USD (por persona)</label>
                <input type="number" placeholder="ej: 25" value={precioGral} onChange={e => setPrecioGral(e.target.value)} style={inp(false)} />
              </div>
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>⏱️ Duración promedio</label>
                <select value={duracionGral} onChange={e => setDuracionGral(e.target.value)} style={inp(false)}>
                  <option value="">— Elegí —</option>
                  {DURACIONES.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>📝 Descripción general</label>
              <textarea placeholder="Ej: Soy guía local, conozco todos los rincones de Buenos Aires. Te muestro la ciudad como un local." value={descripcionGral} onChange={e => setDescripcionGral(e.target.value)} rows={3} style={{ ...inp(false), resize: 'vertical' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>👥 Máx. personas por experiencia</label>
              <input type="number" min="1" max="20" value={personasGral} onChange={e => setPersonasGral(e.target.value)} style={inp(false)} />
            </div>
          </div>
        )}

        {/* SERVICIO CUSTOM */}
        <div style={{ background: '#fffbea', borderRadius: 14, padding: 18, marginBottom: 20, border: '1.5px solid #fcd34d' }}>
          <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 4px', color: '#92400e' }}>✨ ¿Tenés algo único para ofrecer?</p>
          <p style={{ color: '#888', fontSize: 12, margin: '0 0 12px' }}>Escribilo con tus palabras — esto se destacará en tu perfil</p>
          <textarea value={servicioCustom} onChange={e => setServicioCustom(e.target.value)} placeholder="Ej: Los domingos organizo partidos de fútbol en Palermo con locales y turistas, después asado incluido 🔥" rows={3} style={{ ...inp(false), resize: 'vertical' }} />
        </div>

        {msg && <div style={{ background: '#fff0f0', border: '1px solid #fca5a5', borderRadius: 10, padding: '12px 16px', marginBottom: 16, color: '#c94b4b', fontSize: 13, fontWeight: 600 }}>{msg}</div>}

        <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: 13, borderRadius: 12, border: 'none', background: loading ? '#ccc' : 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Guardando...' : 'Guardar y publicar perfil'}
        </button>
      </div>
    </div>
  );
}
