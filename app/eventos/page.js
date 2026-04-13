'use client';
import { useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import useLang from '../../lib/useLang';

const CATEGORIAS = [
  { id: 'conciertos', emoji: '🎵', es: 'Conciertos', en: 'Concerts' },
  { id: 'futbol', emoji: '⚽', es: 'Fútbol', en: 'Football' },
  { id: 'electronica', emoji: '🎧', es: 'Electrónica', en: 'Electronic' },
  { id: 'teatro', emoji: '🎭', es: 'Teatro', en: 'Theater' },
  { id: 'fiestas', emoji: '🎉', es: 'Fiestas', en: 'Parties' },
  { id: 'tango', emoji: '🌹', es: 'Tango', en: 'Tango' },
  { id: 'asado parrilla', emoji: '🔥', es: 'Asados', en: 'BBQ' },
  { id: 'deporte', emoji: '🏃', es: 'Deportes', en: 'Sports' },
];

const CIUDADES = [
  'Buenos Aires', 'Córdoba', 'Rosario', 'Mendoza', 'Bariloche',
  'Salta', 'Tucumán', 'Mar del Plata', 'Ushuaia', 'Bahía Blanca',
];

const T = {
  es: {
    titulo: 'Eventos en Argentina',
    sub: 'Encontrá el evento perfecto y viví la experiencia con un anfitrión local',
    buscar: 'Buscar eventos...',
    ciudad: 'Ciudad o barrio',
    buscarBtn: 'Buscar',
    cargando: 'Buscando eventos...',
    sinEventos: 'No encontramos eventos. Probá con otra búsqueda.',
    contactar: '🇦🇷 Contactar anfitrión',
    buscarSolo: 'Buscar por mi cuenta →',
    como: '¿Cómo funciona?',
    comoDesc: 'Contactá un anfitrión local (USD 0.50) y te ayuda a conseguir entradas, llegar al lugar y vivir la experiencia como un local.',
    precio: 'Ver precio',
    cuando: 'Cuándo',
    donde: 'Dónde',
    elige: '¿Qué querés hacer?',
  },
  en: {
    titulo: 'Events in Argentina',
    sub: 'Find the perfect event and live it with a local host',
    buscar: 'Search events...',
    ciudad: 'City or neighborhood',
    buscarBtn: 'Search',
    cargando: 'Searching events...',
    sinEventos: 'No events found. Try a different search.',
    contactar: '🇦🇷 Contact a host',
    buscarSolo: 'Search on my own →',
    como: 'How does it work?',
    comoDesc: 'Contact a local host (USD 0.50) and they help you get tickets, find the venue and live it like a local.',
    precio: 'See price',
    cuando: 'When',
    donde: 'Where',
    elige: 'What do you want to do?',
  },
};

export default function EventosPage() {
  const { lang } = useLang();
  const t = T[lang] || T.es;

  const [query, setQuery] = useState('');
  const [ciudad, setCiudad] = useState('Buenos Aires');
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);
  const [modalEvento, setModalEvento] = useState(null);

  const buscar = async (q) => {
    const busqueda = q || query;
    if (!busqueda) return;
    setLoading(true);
    setBuscado(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/eventos?q=${encodeURIComponent(busqueda)}&ciudad=${encodeURIComponent(ciudad)}`;
      const r = await fetch(url);
      const data = await r.json();
      setEventos(Array.isArray(data) ? data : []);
    } catch {
      setEventos([]);
    } finally {
      setLoading(false);
    }
  };

  const buscarCategoria = (cat) => {
    setQuery(cat.id);
    buscar(cat.id);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'rgba(255,255,255,0.92)', fontFamily: 'sans-serif' }}>
      <Nav />

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', padding: '32px 20px 28px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 8px' }}>{t.titulo}</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, margin: '0 0 20px' }}>{t.sub}</p>

        {/* Buscador */}
        <div style={{ maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && buscar()}
            placeholder={t.buscar}
            style={{ padding: '13px 16px', borderRadius: 12, border: 'none', fontSize: 15, outline: 'none', width: '100%', boxSizing: 'border-box' }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <select
              value={ciudad}
              onChange={e => setCiudad(e.target.value)}
              style={{ flex: 1, padding: '11px 12px', borderRadius: 12, border: 'none', fontSize: 14, outline: 'none' }}
            >
              {CIUDADES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <button
              onClick={() => buscar()}
              style={{ padding: '11px 24px', borderRadius: 12, border: 'none', background: '#fff', color: '#4B6CB7', fontWeight: 800, fontSize: 15, cursor: 'pointer' }}
            >
              {t.buscarBtn}
            </button>
          </div>
        </div>
      </div>

      {/* Categorías */}
      {!buscado && (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '24px 16px' }}>
          <p style={{ fontWeight: 700, fontSize: 16, color: '#222', marginBottom: 14 }}>{t.elige}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
            {CATEGORIAS.map(cat => (
              <button
                key={cat.id}
                onClick={() => buscarCategoria(cat)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px', borderRadius: 14, border: '1.5px solid #e5e7eb',
                  background: '#fff', cursor: 'pointer', textAlign: 'left',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                }}
              >
                <span style={{ fontSize: 28 }}>{cat.emoji}</span>
                <span style={{ fontWeight: 600, fontSize: 14, color: '#222' }}>{lang === 'en' ? cat.en : cat.es}</span>
              </button>
            ))}
          </div>

          {/* Como funciona */}
          <div style={{ background: '#f8faff', borderRadius: 14, padding: 18, marginTop: 20, border: '1.5px solid #e5e7eb' }}>
            <p style={{ fontWeight: 700, fontSize: 14, color: '#4B6CB7', margin: '0 0 6px' }}>ℹ️ {t.como}</p>
            <p style={{ fontSize: 13, color: '#555', margin: 0, lineHeight: 1.6 }}>{t.comoDesc}</p>
          </div>
        </div>
      )}

      {/* Resultados */}
      {buscado && (
        <div style={{ maxWidth: 700, margin: '0 auto', padding: '20px 16px 60px' }}>
          <button onClick={() => { setBuscado(false); setEventos([]); setQuery(''); }} style={{ background: 'transparent', border: 'none', color: '#4B6CB7', fontSize: 14, fontWeight: 600, cursor: 'pointer', marginBottom: 16, padding: 0 }}>
            {t.volver || '← Volver a categorías'}
          </button>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#4B6CB7', padding: 40 }}>{t.cargando}</p>
          ) : eventos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#888', padding: 40 }}>{t.sinEventos}</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {eventos.map((e, i) => (
                <div
                  key={i}
                  onClick={() => setModalEvento(e)}
                  style={{
                    background: '#fff', borderRadius: 16, overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)', cursor: 'pointer',
                    border: '1.5px solid #e5e7eb', display: 'flex',
                  }}
                >
                  {e.imagen && (
                    <img src={e.imagen} alt={e.nombre} style={{ width: 110, minWidth: 110, objectFit: 'cover' }} />
                  )}
                  <div style={{ padding: '14px 16px', flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#1a1a1a', marginBottom: 4 }}>{e.nombre}</div>
                    {e.hora && <div style={{ fontSize: 12, color: '#4B6CB7', fontWeight: 600, marginBottom: 4 }}>📅 {e.hora}</div>}
                    {e.direccion && <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>📍 {e.direccion}</div>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {e.ticket_precio && <span style={{ fontSize: 13, fontWeight: 700, color: '#C94B4B' }}>{e.ticket_precio}</span>}
                      <span style={{ fontSize: 12, color: '#4B6CB7', fontWeight: 600 }}>{t.vermas || 'Ver más →'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {modalEvento && (
        <div onClick={() => setModalEvento(null)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px 20px 0 0', maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '24px 20px 40px' }}>

            {modalEvento.imagen && <img src={modalEvento.imagen} alt={modalEvento.nombre} style={{ width: '100%', borderRadius: 12, marginBottom: 16, maxHeight: 200, objectFit: 'cover' }} />}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#1a1a1a', flex: 1 }}>{modalEvento.nombre}</h2>
              <button onClick={() => setModalEvento(null)} style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', flexShrink: 0, marginLeft: 12 }}>✕</button>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              {modalEvento.hora && <span style={{ background: '#EBF2FF', color: '#4B6CB7', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>📅 {modalEvento.hora}</span>}
              {modalEvento.direccion && <span style={{ background: '#fff7ed', color: '#c2410c', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>📍 {modalEvento.direccion}</span>}
              {modalEvento.ticket_precio && <span style={{ background: '#fef3c7', color: '#92400e', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>🎟️ {modalEvento.ticket_precio}</span>}
            </div>

            {modalEvento.descripcion && <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>{modalEvento.descripcion}</p>}

            {/* Info como funciona */}
            <div style={{ background: '#f8faff', borderRadius: 12, padding: 14, marginBottom: 14, border: '1.5px solid #e5e7eb' }}>
              <p style={{ fontWeight: 700, fontSize: 13, margin: '0 0 6px', color: '#222' }}>🇦🇷 {t.como || '¿Cómo conseguir entradas?'}</p>
              <p style={{ fontSize: 12, color: '#555', margin: 0, lineHeight: 1.5 }}>{t.comoDesc || 'Contactá un anfitrión local por USD 0.50 y te ayuda.'}</p>
            </div>

            <Link href="/explorar">
              <button style={{ width: '100%', padding: '14px', borderRadius: 12, border: 'none', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer', marginBottom: 10 }}>
                {t.contactar}
              </button>
            </Link>

            {modalEvento.ticket_url && (
              <a href={modalEvento.ticket_url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', textAlign: 'center', color: '#888', fontSize: 13, textDecoration: 'none' }}>
                {t.buscarSolo}
              </a>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
