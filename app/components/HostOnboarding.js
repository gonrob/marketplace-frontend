'use client';
import { useState, useRef } from 'react';
import api from '../../lib/api';

const SERVICIOS = [
  { id: 'futbol',      emoji: '⚽', es: 'Acompañar a un partido de fútbol',      en: 'Take you to a football match' },
  { id: 'tour',        emoji: '🗺️', es: 'Tour por la ciudad',                    en: 'City tour' },
  { id: 'bailar',      emoji: '💃', es: 'Salir a bailar',                         en: 'Go dancing' },
  { id: 'habilidades', emoji: '🎓', es: 'Enseñar habilidades (cocina, idioma…)',  en: 'Teach skills (cooking, language…)' },
  { id: 'asado',       emoji: '🔥', es: 'Hacer un asado',                         en: 'BBQ / Asado' },
  { id: 'mate',        emoji: '🧉', es: 'Tomar mate y charlar',                   en: 'Drink mate and chat' },
  { id: 'compras',     emoji: '🛍️', es: 'Ir de compras',                          en: 'Go shopping' },
  { id: 'naturaleza',  emoji: '🏔️', es: 'Excursión a la naturaleza',              en: 'Nature trip' },
  { id: 'museos',      emoji: '🏛️', es: 'Visitar museos o cultura',               en: 'Visit museums / culture' },
  { id: 'fotografia',  emoji: '📷', es: 'Sesión de fotos por la ciudad',          en: 'Photo session around the city' },
  { id: 'gastronomia', emoji: '🍽️', es: 'Recorrido gastronómico',                en: 'Food tour' },
  { id: 'noche',       emoji: '🌙', es: 'Salida nocturna / bares',                en: 'Night out / bars' },
  { id: 'deporte',     emoji: '🏃', es: 'Hacer deporte juntos',                   en: 'Do sports together' },
  { id: 'aeropuerto',  emoji: '✈️', es: 'Buscar / llevar al aeropuerto',          en: 'Airport pickup / dropoff' },
  { id: 'idioma',      emoji: '💬', es: 'Practicar idiomas',                      en: 'Language practice' },
  { id: 'musica',      emoji: '🎵', es: 'Show de música en vivo',                 en: 'Live music show' },
  { id: 'tango',       emoji: '🌹', es: 'Clase o milonga de tango',              en: 'Tango class or milonga' },
  { id: 'otro',        emoji: '✨', es: 'Otra actividad (escribir en bio)',        en: 'Other (describe in bio)' },
];

const ZONAS = [
  'Buenos Aires - Centro/Microcentro',
  'Buenos Aires - Palermo',
  'Buenos Aires - San Telmo / La Boca',
  'Buenos Aires - Belgrano / Núñez',
  'Buenos Aires - Recoleta / Barrio Norte',
  'GBA Norte', 'GBA Sur', 'GBA Oeste',
  'Córdoba Capital', 'Rosario', 'Mendoza Capital',
  'Bariloche', 'Salta Capital', 'Tucumán Capital',
  'Mar del Plata', 'Ushuaia', 'Bahía Blanca', 'Otra ciudad',
];

const T = {
  es: {
    titulo: '¡Completá tu perfil de anfitrión!',
    sub: 'Antes de aparecer en el escaparate, necesitamos algunos datos',
    serviciosTitulo: '¿Qué podés ofrecer a los viajeros?',
    serviciosSub: 'Seleccioná todo lo que aplique',
    zonaLabel: 'Zona de servicio',
    zonaPlaceholder: '— Seleccioná tu zona —',
    fotoLabel: 'Foto de perfil',
    fotoSub: 'Los viajeros confían más cuando ven tu cara',
    subir: 'Subir foto',
    cambiar: 'Cambiar foto',
    guardar: 'Guardar y continuar',
    errorFoto: '⚠️ La foto de perfil es obligatoria',
    errorServicios: '⚠️ Seleccioná al menos un servicio',
    errorZona: '⚠️ Seleccioná tu zona de servicio',
    errorGeneral: 'Error al guardar. Intentá de nuevo.',
    guardando: 'Guardando...',
  },
  en: {
    titulo: 'Complete your host profile!',
    sub: 'Before appearing in the listing, we need a few details',
    serviciosTitulo: 'What can you offer travelers?',
    serviciosSub: 'Select all that apply',
    zonaLabel: 'Service area',
    zonaPlaceholder: '— Select your area —',
    fotoLabel: 'Profile photo',
    fotoSub: 'Travelers trust you more when they see your face',
    subir: 'Upload photo',
    cambiar: 'Change photo',
    guardar: 'Save and continue',
    errorFoto: '⚠️ Profile photo is required',
    errorServicios: '⚠️ Select at least one service',
    errorZona: '⚠️ Select your service area',
    errorGeneral: 'Error saving. Please try again.',
    guardando: 'Saving...',
  },
};

export default function HostOnboarding({ lang = 'es', token, onComplete }) {
  const t = T[lang] || T.es;
  const [seleccionados, setSeleccionados] = useState([]);
  const [zona, setZona] = useState('');
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const toggle = (id) =>
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    setError('');
    if (!foto) return setError(t.errorFoto);
    if (seleccionados.length === 0) return setError(t.errorServicios);
    if (!zona) return setError(t.errorZona);

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', foto);
      const uploadRes = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      });
      const fotoUrl = uploadRes.data.url;

      await api.patch('/api/users/me', {
        foto: fotoUrl,
        habilidades: seleccionados,
        ciudad: zona,
      }, { headers: { Authorization: `Bearer ${token}` } });

      onComplete();
    } catch (e) {
      setError(e?.response?.data?.message || t.errorGeneral);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.55)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
      overflowY: 'auto', padding: '32px 16px',
    }}>
      <div style={{
        background: '#fff', borderRadius: 20, maxWidth: 580, width: '100%',
        padding: '32px 28px', boxShadow: '0 8px 48px rgba(0,0,0,0.25)',
      }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 44, marginBottom: 8 }}>🇦🇷</div>
          <h2 style={{
            fontSize: 22, fontWeight: 800, margin: '0 0 8px',
            background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>{t.titulo}</h2>
          <p style={{ color: '#666', fontSize: 14, margin: 0 }}>{t.sub}</p>
        </div>

        {/* FOTO */}
        <div style={{ background: '#f8faff', borderRadius: 14, padding: 20, marginBottom: 20, border: '1.5px solid #e5e7eb' }}>
          <p style={{ fontWeight: 700, fontSize: 15, margin: '0 0 4px', color: '#222' }}>📸 {t.fotoLabel}</p>
          <p style={{ color: '#888', fontSize: 13, margin: '0 0 16px' }}>{t.fotoSub}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div
              onClick={() => fileRef.current.click()}
              style={{
                width: 80, height: 80, borderRadius: '50%', cursor: 'pointer',
                background: fotoPreview ? 'transparent' : 'linear-gradient(135deg,#4B6CB7,#C94B4B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                overflow: 'hidden', border: '3px solid #4B6CB7', flexShrink: 0,
              }}
            >
              {fotoPreview
                ? <img src={fotoPreview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <span style={{ fontSize: 28 }}>👤</span>
              }
            </div>
            <button
              onClick={() => fileRef.current.click()}
              style={{
                background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff',
                border: 'none', borderRadius: 10, padding: '10px 22px',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
              }}
            >
              {fotoPreview ? t.cambiar : t.subir}
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFoto} />
          </div>
        </div>

        {/* ZONA */}
        <div style={{ background: '#f8faff', borderRadius: 14, padding: 20, marginBottom: 20, border: '1.5px solid #e5e7eb' }}>
          <p style={{ fontWeight: 700, fontSize: 15, margin: '0 0 12px', color: '#222' }}>📍 {t.zonaLabel}</p>
          <select
            value={zona}
            onChange={(e) => setZona(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              border: '1.5px solid #d1d5db', fontSize: 14,
              background: '#fff', outline: 'none',
            }}
          >
            <option value="">{t.zonaPlaceholder}</option>
            {ZONAS.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>

        {/* SERVICIOS */}
        <div style={{ background: '#f8faff', borderRadius: 14, padding: 20, marginBottom: 24, border: '1.5px solid #e5e7eb' }}>
          <p style={{ fontWeight: 700, fontSize: 15, margin: '0 0 4px', color: '#222' }}>🎯 {t.serviciosTitulo}</p>
          <p style={{ color: '#888', fontSize: 13, margin: '0 0 16px' }}>{t.serviciosSub}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {SERVICIOS.map((s) => {
              const activo = seleccionados.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '9px 14px', borderRadius: 24, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.15s',
                    background: activo ? 'linear-gradient(90deg,#4B6CB7,#C94B4B)' : '#fff',
                    color: activo ? '#fff' : '#444',
                    border: activo ? '2px solid transparent' : '2px solid #d1d5db',
                    boxShadow: activo ? '0 2px 8px rgba(75,108,183,0.25)' : 'none',
                  }}
                >
                  <span>{s.emoji}</span>
                  <span>{lang === 'en' ? s.en : s.es}</span>
                </button>
              );
            })}
          </div>
        </div>

        {error && (
          <div style={{
            background: '#fff0f0', border: '1px solid #fca5a5',
            borderRadius: 10, padding: '12px 16px', marginBottom: 16,
            color: '#c94b4b', fontSize: 14, fontWeight: 600,
          }}>
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: '100%', padding: '14px', borderRadius: 12, border: 'none',
            background: loading ? '#ccc' : 'linear-gradient(90deg,#4B6CB7,#C94B4B)',
            color: '#fff', fontSize: 16, fontWeight: 800,
            cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 16px rgba(75,108,183,0.3)',
          }}
        >
          {loading ? t.guardando : t.guardar}
        </button>

      </div>
    </div>
  );
}
