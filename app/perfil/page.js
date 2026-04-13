'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import useLang from '../../lib/useLang';
import api from '../../lib/api';

const T = {
  es: {
    titulo: 'Mi perfil',
    nombre: 'Nombre',
    bio: 'Biografía',
    precio: 'Precio por hora (USD)',
    ciudad: 'Ciudad / Zona',
    guardar: 'Guardar cambios',
    guardando: 'Guardando...',
    guardadoOk: '✅ Perfil actualizado',
    foto: 'Cambiar foto',
    disponible: 'Disponible para contactos',
    baja: 'Darme de baja',
    bajaConfirm: '¿Seguro que querés eliminar tu cuenta? Esta acción no se puede deshacer.',
    bajaOk: 'Cuenta eliminada',
    bajaError: 'Error al eliminar la cuenta',
    cancelar: 'Cancelar',
    confirmarBaja: 'Sí, eliminar mi cuenta',
    eliminando: 'Eliminando...',
    habilidades: 'Servicios que ofrecés',
  },
  en: {
    titulo: 'My profile',
    nombre: 'Name',
    bio: 'Bio',
    precio: 'Price per hour (USD)',
    ciudad: 'City / Area',
    guardar: 'Save changes',
    guardando: 'Saving...',
    guardadoOk: '✅ Profile updated',
    foto: 'Change photo',
    disponible: 'Available for contacts',
    baja: 'Delete my account',
    bajaConfirm: 'Are you sure you want to delete your account? This cannot be undone.',
    bajaOk: 'Account deleted',
    bajaError: 'Error deleting account',
    cancelar: 'Cancel',
    confirmarBaja: 'Yes, delete my account',
    eliminando: 'Deleting...',
    habilidades: 'Services you offer',
  },
  pt: {
    titulo: 'Meu perfil', nombre: 'Nome', bio: 'Bio', precio: 'Preço por hora (USD)',
    ciudad: 'Cidade / Área', guardar: 'Salvar', guardando: 'Salvando...', guardadoOk: '✅ Perfil atualizado',
    foto: 'Trocar foto', disponible: 'Disponível para contatos', baja: 'Excluir minha conta',
    bajaConfirm: 'Tem certeza que quer excluir sua conta?', bajaOk: 'Conta excluída',
    bajaError: 'Erro ao excluir conta', cancelar: 'Cancelar', confirmarBaja: 'Sim, excluir minha conta',
    eliminando: 'Excluindo...', habilidades: 'Serviços que oferece',
  },
  fr: {
    titulo: 'Mon profil', nombre: 'Nom', bio: 'Bio', precio: 'Prix par heure (USD)',
    ciudad: 'Ville / Zone', guardar: 'Enregistrer', guardando: 'Enregistrement...', guardadoOk: '✅ Profil mis à jour',
    foto: 'Changer photo', disponible: 'Disponible pour contacts', baja: 'Supprimer mon compte',
    bajaConfirm: 'Êtes-vous sûr de vouloir supprimer votre compte?', bajaOk: 'Compte supprimé',
    bajaError: 'Erreur lors de la suppression', cancelar: 'Annuler', confirmarBaja: 'Oui, supprimer mon compte',
    eliminando: 'Suppression...', habilidades: 'Services proposés',
  },
};

const SERVICIOS = [
  { id: 'futbol', emoji: '⚽', es: 'Partido de fútbol', en: 'Football match' },
  { id: 'tour', emoji: '🗺️', es: 'Tour por la ciudad', en: 'City tour' },
  { id: 'bailar', emoji: '💃', es: 'Salir a bailar', en: 'Go dancing' },
  { id: 'habilidades', emoji: '🎓', es: 'Enseñar habilidades', en: 'Teach skills' },
  { id: 'asado', emoji: '🔥', es: 'Hacer un asado', en: 'BBQ / Asado' },
  { id: 'mate', emoji: '🧉', es: 'Tomar mate', en: 'Drink mate' },
  { id: 'compras', emoji: '🛍️', es: 'Ir de compras', en: 'Go shopping' },
  { id: 'naturaleza', emoji: '🏔️', es: 'Excursión naturaleza', en: 'Nature trip' },
  { id: 'museos', emoji: '🏛️', es: 'Museos / cultura', en: 'Museums / culture' },
  { id: 'fotografia', emoji: '📷', es: 'Sesión de fotos', en: 'Photo session' },
  { id: 'gastronomia', emoji: '🍽️', es: 'Recorrido gastronómico', en: 'Food tour' },
  { id: 'noche', emoji: '🌙', es: 'Salida nocturna', en: 'Night out' },
  { id: 'deporte', emoji: '🏃', es: 'Deporte juntos', en: 'Sports together' },
  { id: 'aeropuerto', emoji: '✈️', es: 'Aeropuerto', en: 'Airport' },
  { id: 'idioma', emoji: '💬', es: 'Practicar idiomas', en: 'Language practice' },
  { id: 'musica', emoji: '🎵', es: 'Música en vivo', en: 'Live music' },
  { id: 'tango', emoji: '🌹', es: 'Tango', en: 'Tango' },
  { id: 'otro', emoji: '✨', es: 'Otro', en: 'Other' },
];

export default function PerfilPage() {
  const lang = useLang();
  const t = T[lang] || T.es;
  const router = useRouter();
  const fileRef = useRef();

  const [user, setUser] = useState(null);
  const [nombre, setNombre] = useState('');
  const [bio, setBio] = useState('');
  const [precio, setPrecio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [disponible, setDisponible] = useState(false);
  const [habilidades, setHabilidades] = useState([]);
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const [msg, setMsg] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [showBaja, setShowBaja] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    api.get('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => {
        const u = r.data;
        setUser(u);
        setNombre(u.nombre || '');
        setBio(u.bio || '');
        setPrecio(u.precio || '');
        setCiudad(u.ciudad || '');
        setDisponible(u.disponible || false);
        setHabilidades(u.habilidades || []);
        setFotoPreview(u.foto || null);
      })
      .catch(() => router.push('/login'));
  }, []);

  const toggleHabilidad = (id) =>
    setHabilidades(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const handleFoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFoto(file);
    setFotoPreview(URL.createObjectURL(file));
  };

  const handleGuardar = async () => {
    setGuardando(true);
    setMsg('');
    try {
      const token = localStorage.getItem('token');
      let fotoUrl = user?.foto;

      if (foto) {
        const base64 = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(foto); });
        const up = await api.post('/api/upload/photo', { photo: base64 });
        fotoUrl = up.data.url;
      }

      await api.put('/api/users/profile', {
        nombre, bio, precio, ciudad, disponible, habilidades, foto: fotoUrl,
      });

      setMsg(t.guardadoOk);
    } catch {
      setMsg('❌ ' + (t.bajaError || 'Error al guardar'));
    } finally {
      setGuardando(false);
    }
  };

  const handleBaja = async () => {
    setEliminando(true);
    try {
      const token = localStorage.getItem('token');
      await api.delete('/api/users/account', { headers: { Authorization: `Bearer ${token}` } });
      localStorage.removeItem('token');
      router.push('/');
    } catch {
      setMsg(t.bajaError);
      setShowBaja(false);
    } finally {
      setEliminando(false);
    }
  };

  if (!user) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#4B6CB7' }}>{t.cargando || 'Cargando...'}</p>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: 'rgba(255,255,255,0.92)', fontFamily: 'sans-serif' }}>
      <Nav />

      <div style={{ maxWidth: 560, margin: '0 auto', padding: '32px 16px 80px' }}>
        <h1 style={{
          fontSize: 24, fontWeight: 800, marginBottom: 28,
          background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          {t.titulo}
        </h1>

        {/* FOTO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <div
            onClick={() => fileRef.current.click()}
            style={{
              width: 90, height: 90, borderRadius: '50%', cursor: 'pointer',
              background: fotoPreview ? 'transparent' : 'linear-gradient(135deg,#4B6CB7,#C94B4B)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', border: '3px solid #4B6CB7', flexShrink: 0,
            }}
          >
            {fotoPreview
              ? <img src={fotoPreview} alt="foto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ fontSize: 32, color: '#fff' }}>👤</span>
            }
          </div>
          <button onClick={() => fileRef.current.click()} style={{
            background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff',
            border: 'none', borderRadius: 10, padding: '10px 20px',
            fontWeight: 700, fontSize: 14, cursor: 'pointer',
          }}>
            📸 {t.foto}
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFoto} />
        </div>

        {/* CAMPOS */}
        {[
          { label: t.nombre, value: nombre, set: setNombre, type: 'text', readonly: true },
          ...(user?.role === 'seller' ? [{ label: t.precio, value: precio, set: setPrecio, type: 'number' }, { label: t.ciudad, value: ciudad, set: setCiudad, type: 'text' }] : []),
        ].map(({ label, value, set, type, readonly }) => (
          <div key={label} style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>{label}</label>
            <input
              type={type}
              value={value}
              onChange={e => !readonly && set(e.target.value)}
              readOnly={readonly}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: 10,
                border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none',
                boxSizing: 'border-box',
                background: readonly ? '#f3f4f6' : '#fff',
                color: readonly ? '#999' : '#1a1a1a',
              }}
            />
          </div>
        ))}

        {/* BIO */}
        {user?.role === 'seller' && <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>{t.bio}</label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={4}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 10,
              border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none',
              resize: 'vertical', boxSizing: 'border-box',
            }}
          />
        </div>}

        {/* DISPONIBLE */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, padding: '14px', background: '#f8faff', borderRadius: 12, border: '1.5px solid #e5e7eb' }}>
          <input
            type="checkbox"
            checked={disponible}
            onChange={e => setDisponible(e.target.checked)}
            style={{ width: 20, height: 20, cursor: 'pointer', accentColor: '#4B6CB7' }}
          />
          <label style={{ fontSize: 15, fontWeight: 600, color: '#222', cursor: 'pointer' }} onClick={() => setDisponible(d => !d)}>
            {t.disponible}
          </label>
        </div>

        {/* HABILIDADES — solo para sellers */}
        {user.role === 'seller' && (
          <div style={{ background: '#f8faff', borderRadius: 14, padding: 20, marginBottom: 24, border: '1.5px solid #e5e7eb' }}>
            <p style={{ fontWeight: 700, fontSize: 15, margin: '0 0 14px', color: '#222' }}>🎯 {t.habilidades}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {SERVICIOS.map(s => {
                const activo = habilidades.includes(s.id);
                return (
                  <button key={s.id} onClick={() => toggleHabilidad(s.id)} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '7px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                    cursor: 'pointer',
                    background: activo ? 'linear-gradient(90deg,#4B6CB7,#C94B4B)' : '#fff',
                    color: activo ? '#fff' : '#444',
                    border: activo ? '2px solid transparent' : '2px solid #d1d5db',
                  }}>
                    {s.emoji} {lang === 'en' ? s.en : s.es}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* MSG */}
        {msg && (
          <div style={{
            padding: '12px 16px', borderRadius: 10, marginBottom: 16, fontSize: 14, fontWeight: 600,
            background: msg.includes('❌') ? '#fff0f0' : '#f0fff4',
            color: msg.includes('❌') ? '#c94b4b' : '#065f46',
            border: `1px solid ${msg.includes('❌') ? '#fca5a5' : '#6ee7b7'}`,
          }}>
            {msg}
          </div>
        )}

        {/* GUARDAR */}
        <button onClick={handleGuardar} disabled={guardando} style={{
          width: '100%', padding: '14px', borderRadius: 12, border: 'none',
          background: guardando ? '#ccc' : 'linear-gradient(90deg,#4B6CB7,#C94B4B)',
          color: '#fff', fontSize: 16, fontWeight: 800,
          cursor: guardando ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 16px rgba(75,108,183,0.3)', marginBottom: 16,
        }}>
          {guardando ? t.guardando : t.guardar}
        </button>

        {/* DARSE DE BAJA */}
        <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: 24, marginTop: 8 }}>
          <button onClick={() => setShowBaja(true)} style={{
            width: '100%', padding: '12px', borderRadius: 12,
            background: 'transparent', border: '2px solid #fca5a5',
            color: '#c94b4b', fontSize: 15, fontWeight: 700, cursor: 'pointer',
          }}>
            🗑️ {t.baja}
          </button>
        </div>
      </div>

      {/* MODAL CONFIRMAR BAJA */}
      {showBaja && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        }}>
          <div style={{
            background: '#fff', borderRadius: 20, maxWidth: 400, width: '100%',
            padding: '32px 28px', textAlign: 'center',
            boxShadow: '0 8px 48px rgba(0,0,0,0.25)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: '#222', marginBottom: 24 }}>
              {t.bajaConfirm}
            </p>
            <button onClick={handleBaja} disabled={eliminando} style={{
              width: '100%', padding: '13px', borderRadius: 12, border: 'none',
              background: eliminando ? '#ccc' : '#c94b4b',
              color: '#fff', fontSize: 15, fontWeight: 700,
              cursor: eliminando ? 'not-allowed' : 'pointer', marginBottom: 10,
            }}>
              {eliminando ? t.eliminando : t.confirmarBaja}
            </button>
            <button onClick={() => setShowBaja(false)} style={{
              width: '100%', padding: '13px', borderRadius: 12,
              background: 'transparent', border: '2px solid #d1d5db',
              color: '#555', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}>
              {t.cancelar}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
