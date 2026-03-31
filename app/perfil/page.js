'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';

const HABS = ['Guia','Profesor','Cocinero','Truco','Mate','Futbol','Musica','Tango','Historia','Espanol','Charla'];

export default function Perfil() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({nombre:'',bio:'',precio:10,habilidades:[],ciudad:'',disponible:true});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    api.get('/api/auth/me')
      .then(r => {
        setUser(r.data);
        setForm({
          nombre: r.data.nombre || '',
          bio: r.data.bio || '',
          precio: r.data.precio || 10,
          habilidades: r.data.habilidades || [],
          ciudad: r.data.ciudad || '',
          disponible: r.data.disponible !== false
        });
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        router.push('/login');
      });
  }, []);

  const toggleH = h => setForm(f => ({
    ...f,
    habilidades: f.habilidades.includes(h)
      ? f.habilidades.filter(x => x !== h)
      : [...f.habilidades, h]
  }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError('');
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const res = await api.post('/api/upload/photo', { photo: ev.target.result });
        setUser(u => ({ ...u, foto: res.data.url }));
        setMsg('Foto actualizada!');
      } catch {
        setError('Error al subir foto.');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true); setMsg(''); setError('');
    try {
      await api.put('/api/users/profile', form);
      setMsg('Perfil actualizado!');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar.');
    } finally { setSaving(false); }
  };

  const darDeBaja = async () => {
    if (!confirm('¿Estas seguro que queres dar de baja tu cuenta? Esta accion no se puede deshacer.')) return;
    try {
      await api.delete('/api/users/account');
      localStorage.clear();
      router.push('/');
    } catch {
      setError('Error al dar de baja la cuenta.');
    }
  };

  if (loading) return <div className="spinner">Cargando...</div>;
  if (!user) return null;

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{textDecoration:'none'}}>
          <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        </Link>
        <div className="nav-links">
          <Link href="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <div className="container">
        {msg && <div className="success">{msg}</div>}
        {error && <div className="error">{error}</div>}

        <div className="card">
          <h1>Mi perfil</h1>
          <div style={{textAlign:'center',marginBottom:20}}>
            <div
              onClick={() => fileRef.current?.click()}
              style={{width:90,height:90,borderRadius:'50%',background:'#EBF2FF',color:'#003DA5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:700,margin:'0 auto 8px',cursor:'pointer',overflow:'hidden',position:'relative',border:'3px solid #003DA5'}}
            >
              {user?.foto
                ? <img src={user.foto} alt="foto" style={{width:'100%',height:'100%',objectFit:'cover'}} />
                : (user?.nombre || user?.email || 'A')[0].toUpperCase()
              }
              {uploading && (
                <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:11}}>
                  Subiendo...
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" capture="user" onChange={handlePhoto} style={{display:'none'}} />
            <div style={{fontSize:13,color:'#003DA5',marginTop:4,cursor:'pointer'}} onClick={() => fileRef.current?.click()}>
              📷 Toca para cambiar la foto
            </div>
            <div style={{fontSize:12,color:'#888',marginTop:2}}>{user?.email}</div>
          </div>

          <div className="form-group">
            <label>Nombre completo</label>
            <input placeholder="Ej: Lucas Garcia" value={form.nombre} onChange={e => setForm({...form,nombre:e.target.value})} />
          </div>
          <div className="form-group">
            <label>Ciudad</label>
            <input placeholder="Ej: Buenos Aires, Mendoza..." value={form.ciudad} onChange={e => setForm({...form,ciudad:e.target.value})} />
          </div>
          <div className="form-group">
            <label>Sobre vos</label>
            <textarea rows={4} placeholder="Contate un poco..." value={form.bio} onChange={e => setForm({...form,bio:e.target.value})} style={{resize:'vertical'}} />
          </div>
          {user?.role === 'seller' && (
            <div className="form-group">
              <label>Precio por primer contacto (USD)</label>
              <input type="number" min="1" max="500" value={form.precio} onChange={e => setForm({...form,precio:parseInt(e.target.value)||10})} />
              <div style={{fontSize:12,color:'#888',marginTop:6}}>
                Vos recibis USD {Math.round(form.precio*0.85)} — Argentalk cobra 15%
              </div>
            </div>
          )}
        </div>

        {user?.role === 'seller' && (
          <div className="card">
            <h2>En que sos bueno?</h2>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {HABS.map(h => (
                <button key={h} onClick={() => toggleH(h)} style={{width:'auto',padding:'8px 16px',borderRadius:20,background:form.habilidades.includes(h)?'#003DA5':'white',color:form.habilidades.includes(h)?'white':'#003DA5',border:'1.5px solid #003DA5',fontSize:14,cursor:'pointer'}}>
                  {h}
                </button>
              ))}
            </div>
          </div>
        )}

        {user?.role === 'seller' && (
          <div className="card">
            <h2>Disponibilidad</h2>
            <button onClick={() => setForm({...form,disponible:!form.disponible})} style={{width:'auto',padding:'10px 20px',background:form.disponible?'#22c55e':'#ddd',color:form.disponible?'white':'#666',border:'none',borderRadius:10,fontSize:14,cursor:'pointer'}}>
              {form.disponible ? '✓ Disponible ahora' : 'No disponible'}
            </button>
          </div>
        )}

        <button className="btn-orange" onClick={save} disabled={saving} style={{marginBottom:12}}>
          {saving ? 'Guardando...' : 'Guardar perfil'}
        </button>

        <div style={{marginTop:20,paddingTop:20,borderTop:'1px solid #f0f0f0',textAlign:'center'}}>
          <p style={{fontSize:13,color:'#888',marginBottom:12}}>¿Ya no queres usar Argentalk?</p>
          <button onClick={darDeBaja} style={{width:'auto',padding:'10px 20px',background:'white',color:'#cc0000',border:'1px solid #cc0000',borderRadius:10,fontSize:14,cursor:'pointer'}}>
            Dar de baja mi cuenta
          </button>
        </div>

      </div>
    </>
  );
}