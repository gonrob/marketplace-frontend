'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';

const HABILIDADES = ['Guia', 'Profesor', 'Cocinero', 'Truco', 'Mate', 'Futbol', 'Musica', 'Tango', 'Historia', 'Espanol', 'Charla'];

export default function Perfil() {
  const router = useRouter();
  const [form, setForm] = useState({ nombre: '', bio: '', precio: 10, habilidades: [], ciudad: '', disponible: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!localStorage.getItem('token')) { router.push('/login'); return; }
    api.get('/api/auth/me').then(res => {
      const u = res.data;
      setForm({ nombre: u.nombre || '', bio: u.bio || '', precio: u.precio || 10, habilidades: u.habilidades || [], ciudad: u.ciudad || '', disponible: u.disponible !== false });
    }).catch(() => router.push('/login')).finally(() => setLoading(false));
  }, []);

  const toggleH = (h) => setForm(f => ({ ...f, habilidades: f.habilidades.includes(h) ? f.habilidades.filter(x => x !== h) : [...f.habilidades, h] }));

  const save = async () => {
    setSaving(true); setMsg(''); setError('');
    try {
      await api.put('/api/users/profile', form);
      setMsg('Perfil actualizado!');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="spinner">Cargando...</div>;

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{ textDecoration: 'none' }}>
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
          <div className="form-group">
            <label>Nombre</label>
            <input placeholder="Ej: Lucas Garcia" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Ciudad</label>
            <input placeholder="Ej: Buenos Aires, Mendoza..." value={form.ciudad} onChange={e => setForm({ ...form, ciudad: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Sobre vos</label>
            <textarea rows={4} placeholder="Contate un poco..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} style={{ resize: 'vertical' }} />
          </div>
          <div className="form-group">
            <label>Precio por primer contacto (USD)</label>
            <input type="number" min="1" max="500" value={form.precio} onChange={e => setForm({ ...form, precio: parseInt(e.target.value) })} />
            <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
              Vos recibis USD {Math.round(form.precio * 0.85)} — Argentalk cobra 15%
            </div>
          </div>
        </div>

        <div className="card">
          <h2>En que sos bueno?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {HABILIDADES.map(h => (
              <button key={h} onClick={() => toggleH(h)} style={{ width: 'auto', padding: '8px 16px', borderRadius: 20, background: form.habilidades.includes(h) ? '#003DA5' : 'white', color: form.habilidades.includes(h) ? 'white' : '#003DA5', border: '1.5px solid #003DA5', fontSize: 14 }}>
                {h}
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h2>Disponibilidad</h2>
          <button onClick={() => setForm({ ...form, disponible: !form.disponible })} style={{ width: 'auto', padding: '10px 20px', background: form.disponible ? '#22c55e' : '#ddd', color: form.disponible ? 'white' : '#666', border: 'none', borderRadius: 10, fontSize: 14 }}>
            {form.disponible ? 'Disponible ahora' : 'No disponible'}
          </button>
        </div>

        <button className="btn-orange" onClick={save} disabled={saving} style={{ marginBottom: 20 }}>
          {saving ? 'Guardando...' : 'Guardar perfil'}
        </button>
      </div>
    </>
  );
}
