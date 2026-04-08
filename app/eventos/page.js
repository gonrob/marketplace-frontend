'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';
import useLang from '../../lib/useLang';

const CATEGORIAS = [
  { id: 'todos', emoji: '🎉', es: 'Todos', en: 'All' },
  { id: 'musica', emoji: '🎵', es: 'Música / Conciertos', en: 'Music / Concerts' },
  { id: 'deportes', emoji: '⚽', es: 'Deportes', en: 'Sports' },
  { id: 'fiestas', emoji: '🎊', es: 'Festivales / Fiestas', en: 'Festivals / Parties' },
  { id: 'cultura', emoji: '🏛️', es: 'Cultura / Teatro', en: 'Culture / Theater' },
  { id: 'gastronomia', emoji: '🍽️', es: 'Gastronomía', en: 'Food & Drink' },
];

const CAT_EMOJI = {
  concerts: '🎵',
  sports: '⚽',
  community: '🎊',
  festivals: '🎊',
  'performing-arts': '🎭',
  expos: '🏛️',
  'food-drink': '🍽️',
  conferences: '💼',
};

const T = {
  es: { titulo: 'Eventos en Argentina', sub: 'Encontrá el evento perfecto y viví la experiencia con un anfitrión local', comprar: 'Quiero ir', necesitas: 'Para comprar entradas necesitás contactar a un anfitrión', buscarAnfitrion: 'Buscar anfitrión', cargando: 'Cargando eventos...', sinEventos: 'No hay eventos disponibles en esta categoría.', precio: 'Precio aprox.', fecha: 'Fecha', lugar: 'Lugar' },
  en: { titulo: 'Events in Argentina', sub: 'Find the perfect event and live the experience with a local host', comprar: 'I want to go', necesitas: 'To buy tickets you need to contact a host', buscarAnfitrion: 'Find a host', cargando: 'Loading events...', sinEventos: 'No events available in this category.', precio: 'Approx. price', fecha: 'Date', lugar: 'Venue' },
  pt: { titulo: 'Eventos na Argentina', sub: 'Encontre o evento perfeito e viva a experiência com um anfitrião local', comprar: 'Quero ir', necesitas: 'Para comprar ingressos você precisa contatar um anfitrião', buscarAnfitrion: 'Encontrar anfitrião', cargando: 'Carregando eventos...', sinEventos: 'Não há eventos disponíveis.', precio: 'Preço aprox.', fecha: 'Data', lugar: 'Local' },
};

export default function EventosPage() {
  const { lang } = useLang();
  const t = T[lang] || T.es;
  const [categoria, setCategoria] = useState('todos');
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalEvento, setModalEvento] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = process.env.NEXT_PUBLIC_API_URL + '/api/eventos' + (categoria !== 'todos' ? `?categoria=${categoria}` : '');
    fetch(url)
      .then(r => r.json())
      .then(data => { setEventos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [categoria]);

  const formatFecha = (fecha) => {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-AR', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div style={{ minHeight: '100vh', background: 'rgba(255,255,255,0.92)', fontFamily: 'sans-serif' }}>
      <Nav />

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '32px 16px 20px' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 8px', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {t.titulo}
        </h1>
        <p style={{ color: '#666', fontSize: 14, margin: 0 }}>{t.sub}</p>
      </div>

      {/* Categorias */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 16px 20px', scrollbarWidth: 'none' }}>
        {CATEGORIAS.map(c => (
          <button key={c.id} onClick={() => setCategoria(c.id)} style={{
            display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
            borderRadius: 24, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
            fontSize: 13, fontWeight: 600, flexShrink: 0,
            background: categoria === c.id ? 'linear-gradient(90deg,#4B6CB7,#C94B4B)' : '#f3f4f6',
            color: categoria === c.id ? '#fff' : '#444',
          }}>
            {c.emoji} {lang === 'en' ? c.en : c.es}
          </button>
        ))}
      </div>

      {/* Eventos */}
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 16px 60px' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#4B6CB7', padding: 40 }}>{t.cargando}</p>
        ) : eventos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', padding: 40 }}>{t.sinEventos}</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {eventos.map(e => (
              <div key={e.id} onClick={() => setModalEvento(e)} style={{
                background: '#fff', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)', cursor: 'pointer',
                border: '1.5px solid #e5e7eb', display: 'flex',
              }}>
                {e.imagen && (
                  <img src={e.imagen} alt={e.nombre} style={{ width: 120, minWidth: 120, objectFit: 'cover' }} />
                )}
                <div style={{ padding: '14px 16px', flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#1a1a1a', marginBottom: 4 }}>{e.nombre}</div>
                  <div style={{ fontSize: 12, color: '#4B6CB7', fontWeight: 600, marginBottom: 4 }}>📅 {formatFecha(e.fecha)}</div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>📍 {e.lugar} · {e.ciudad}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#C94B4B' }}>{e.precio}</span>
                    <span style={{ fontSize: 12, color: '#4B6CB7', fontWeight: 600 }}>Ver más →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal evento */}
      {modalEvento && (
        <div onClick={() => setModalEvento(null)} style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.55)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={e => e.stopPropagation()} style={{ background: '#fff', borderRadius: '20px 20px 0 0', maxWidth: 600, width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '24px 20px 40px' }}>
            
            {modalEvento.imagen && <img src={modalEvento.imagen} alt={modalEvento.nombre} style={{ width: '100%', borderRadius: 12, marginBottom: 16, maxHeight: 200, objectFit: 'cover' }} />}
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: '#1a1a1a', flex: 1 }}>{modalEvento.nombre}</h2>
              <button onClick={() => setModalEvento(null)} style={{ background: '#f3f4f6', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 18, cursor: 'pointer', flexShrink: 0, marginLeft: 12 }}>✕</button>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
              <span style={{ background: '#EBF2FF', color: '#4B6CB7', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>📅 {formatFecha(modalEvento.fecha)}</span>
              <span style={{ background: '#fff7ed', color: '#c2410c', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>📍 {modalEvento.lugar}</span>
              <span style={{ background: '#fef3c7', color: '#92400e', borderRadius: 20, padding: '4px 12px', fontSize: 12, fontWeight: 700 }}>{modalEvento.precio}</span>
            </div>

            {modalEvento.descripcion && (
              <p style={{ fontSize: 13, color: '#555', lineHeight: 1.6, marginBottom: 20 }}>{modalEvento.descripcion}</p>
            )}

            <div style={{ background: '#f8faff', borderRadius: 12, padding: 16, marginBottom: 16, border: '1.5px solid #e5e7eb' }}>
              <p style={{ fontWeight: 700, fontSize: 14, margin: '0 0 6px', color: '#222' }}>🎟️ ¿Cómo comprar?</p>
              <p style={{ fontSize: 13, color: '#555', margin: '0 0 12px', lineHeight: 1.5 }}>{t.necesitas}</p>
              <Link href="/explorar">
                <button style={{ width: '100%', padding: '13px', borderRadius: 12, border: 'none', background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: 'pointer' }}>
                  🇦🇷 {t.buscarAnfitrion}
                </button>
              </Link>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
