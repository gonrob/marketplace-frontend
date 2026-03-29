'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';

const HABILIDADES_OPCIONES = ['Guía', 'Profesor', 'Cocinero', 'Truco', 'Mate', 'Fútbol', 'Música', 'Tango', 'Historia', 'Español', 'Charla'];

export default function Perfil() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    bio: '',
    precio: 10,
    habilidades: [],
    ciudad: '',
    idiomas: ['Español'],
    disponible: true
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }

    api.get('/api/auth/me')
      .then(res => {
        setUser(res.data);
        setForm({
          nombre: res.data.nombre || '',
          bio: res.data.bio || '',
          precio: res.data.precio || 10,
          habilidades: res.data.habilidades || [],
          ciudad: res.data.ciudad || '',
          idiomas: res.data.idiomas || ['Español'],
          disponible: res.data.disponible !== false
        });
      })
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, []);

  const toggleHabilidad = (h) => {
    setForm(f => ({
      ...f,
      habilidades: f.habilidades.includes(h)
        ? f.habilidades.filter(x => x !== h)
        : [...f.habilidades, h]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    setError('');
    try {
      await api.put('/api/users/profile', form);
      setMsg('¡Perfil actualizado!');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al guardar.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/');
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
          <button
            onClick={handleLogout}
            style={{ width: 'auto', padding: '6px 14px', fontSize: 13, background: 'rgba(255,255,255,0.2)', color: 'white', border: 'none' }}
          >
            Salir
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '24px 20px' }}>

        {msg && <div className="success">{msg}</div>}
        {error && <div className="error">{error}</div>}

        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: '#EBF2FF', color: '#003DA5',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, fontWeight: 700, margin: '0 auto 10px'
            }}>
              {(form.nombre || user?.email || 'A')[0].toUpperCase()}
            </div>
            <div style={{ fontSize: 13, color: '#888' }}>{user?.email}</div>
            {user?.verificado && (
              <span className="badge badge-blue" style={{ marginTop: 6 }}>✓ Verificado</span>
            )}
          </div>

          <div className="form-group">
            <label>Tu nombre</label>
            <input
              placeholder="Ej: Lucas García"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Tu ciudad</label>
            <input
              placeholder="Ej: Buenos Aires, Mendoza..."
              value={form.ciudad}
              onChange={e => setForm({ ...form, ciudad: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Contate un poco</label>
            <textarea
              rows={4}
              placeholder="Ej: Soy porteño, fanático del truco y el mate. Me encanta hablar de la cultura argentina con gente de todo el mundo..."
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label>Precio por primer contacto (USD)</label>
            <input
              type="number"
              min="1"
              max="200"
              value={form.precio}
              onChange={e => setForm({ ...form, precio: parseInt(e.target.value) })}
            />
            <div style={{ fontSize: 12, color: '#888', marginTop: 6 }}>
              Vos recibís USD {Math.round(form.precio * 0.85)} — Argentalk cobra 15%
            </div>
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: 14 }}>¿En qué sos bueno?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {HABILIDADES_OPCIONES.map(h => (
              <button
                key={h}
                onClick={() => toggleHabilidad(h)}
                style={{
                  width: 'auto',
                  padding: '8px 16px',
                  borderRadius: 20,
                  background: form.habilidades.includes(h) ? '#003DA5' : 'white',
                  color: form.habilidades.includes(h) ? 'white' : '#003DA5',
                  border: '1.5px solid #003DA5',
                  fontSize: 14,
                  cursor: 'pointer'
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 style={{ marginBottom: 14 }}>Disponibilidad</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button
              onClick={() => setForm({ ...form, disponible: !form.disponible })}
              style={{
                width: 'auto',
                padding: '10px 20px',
                background: form.disponible ? '#22c55e' : '#ddd',
                color: form.disponible ? 'white' : '#666',
                border: 'none',
                borderRadius: 10,
                fontSize: 14
              }}
            >
              {form.disponible ? '✓ Disponible ahora' : 'No disponible'}
            </button>
            <span style={{ fontSize: 13, color: '#888' }}>
              {form.disponible ? 'Los clientes te pueden contactar' : 'No aparecés en las búsquedas'}
            </span>
          </div>
        </div>

        <button
          className="btn-orange"
          onClick={handleSave}
          disabled={saving}
          style={{ marginBottom: 20 }}
        >
          {saving ? 'Guardando...' : 'Guardar perfil'}
        </button>

      </div>
    </>
  );
}