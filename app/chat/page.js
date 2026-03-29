'use client';
import { useState } from 'react';
import Link from 'next/link';

const IDIOMAS = [
  { code: 'español', label: '🇦🇷 Español' },
  { code: 'inglés', label: '🇺🇸 Inglés' },
  { code: 'portugués', label: '🇧🇷 Portugués' },
  { code: 'francés', label: '🇫🇷 Francés' },
  { code: 'italiano', label: '🇮🇹 Italiano' },
  { code: 'alemán', label: '🇩🇪 Alemán' },
  { code: 'chino', label: '🇨🇳 Chino' },
  { code: 'ruso', label: '🇷🇺 Ruso' },
];

export default function Chat() {
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState('');
  const [idiomaUsuario, setIdiomaUsuario] = useState('inglés');
  const [idiomaAnfitrion] = useState('español');
  const [enviando, setEnviando] = useState(false);

  const traducir = async (texto, origen, destino) => {
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ texto, idiomaOrigen: origen, idiomaDestino: destino })
    });
    const data = await res.json();
    return data.traduccion;
  };

  const enviar = async () => {
    if (!texto.trim() || enviando) return;
    setEnviando(true);

    const mensajeOriginal = texto;
    setTexto('');

    // Traducir mensaje del viajero al español para el anfitrion
    const traducidoParaAnfitrion = await traducir(mensajeOriginal, idiomaUsuario, idiomaAnfitrion);

    const nuevoMensaje = {
      id: Date.now(),
      tipo: 'viajero',
      original: mensajeOriginal,
      idioma: idiomaUsuario,
      traducido: traducidoParaAnfitrion,
    };

    setMensajes(prev => [...prev, nuevoMensaje]);
    setEnviando(false);
  };

  const responderAnfitrion = async (textoAnfitrion) => {
    setEnviando(true);

    // Traducir respuesta del anfitrion al idioma del viajero
    const traducidoParaViajero = await traducir(textoAnfitrion, idiomaAnfitrion, idiomaUsuario);

    const respuesta = {
      id: Date.now(),
      tipo: 'anfitrion',
      original: textoAnfitrion,
      idioma: idiomaAnfitrion,
      traducido: traducidoParaViajero,
    };

    setMensajes(prev => [...prev, respuesta]);
    setEnviando(false);
  };

  return (
    <>
      <nav className="nav">
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        </Link>
        <div className="nav-links">
          <Link href="/explorar">Explorar</Link>
        </div>
      </nav>

      <div style={{ maxWidth: 480, margin: '0 auto', padding: '16px 20px', height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column' }}>

        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 13, color: '#555', flexShrink: 0 }}>Tu idioma:</div>
            <select value={idiomaUsuario} onChange={e => setIdiomaUsuario(e.target.value)} style={{ flex: 1, padding: '6px 10px', fontSize: 13 }}>
              {IDIOMAS.filter(i => i.code !== 'español').map(i => (
                <option key={i.code} value={i.code}>{i.label}</option>
              ))}
            </select>
          </div>
          <div style={{ fontSize: 12, color: '#888', marginTop: 8 }}>
            El anfitrion escribe en español y vos ves la traduccion en {idiomaUsuario}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', marginBottom: 12 }}>
          {mensajes.length === 0 && (
            <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🧉</div>
              <p>Empeza la conversacion</p>
            </div>
          )}

          {mensajes.map(m => (
            <div key={m.id} style={{ marginBottom: 16, display: 'flex', flexDirection: 'column', alignItems: m.tipo === 'viajero' ? 'flex-end' : 'flex-start' }}>
              <div style={{ maxWidth: '80%' }}>
                <div style={{ fontSize: 11, color: '#888', marginBottom: 4, textAlign: m.tipo === 'viajero' ? 'right' : 'left' }}>
                  {m.tipo === 'viajero' ? 'Vos' : 'Anfitrion'} · {IDIOMAS.find(i => i.code === m.idioma)?.label}
                </div>
                <div style={{ background: m.tipo === 'viajero' ? '#003DA5' : 'white', color: m.tipo === 'viajero' ? 'white' : '#1a1a1a', padding: '10px 14px', borderRadius: m.tipo === 'viajero' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', fontSize: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  {m.original}
                </div>
                <div style={{ background: m.tipo === 'viajero' ? '#e8f0fb' : '#f9f9f9', padding: '8px 14px', borderRadius: 8, fontSize: 12, color: '#555', marginTop: 4 }}>
                  <span style={{ color: '#888' }}>Traduccion: </span>{m.traducido}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <textarea
            rows={2}
            placeholder={`Escribi en ${idiomaUsuario}...`}
            value={texto}
            onChange={e => setTexto(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); } }}
            style={{ width: '100%', border: 'none', outline: 'none', resize: 'none', fontSize: 15, marginBottom: 8 }}
          />
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn-orange" onClick={enviar} disabled={enviando || !texto.trim()} style={{ flex: 1 }}>
              {enviando ? 'Traduciendo...' : 'Enviar'}
            </button>
          </div>
        </div>

        <div style={{ marginTop: 12, background: '#f0f4ff', borderRadius: 12, padding: 12 }}>
          <div style={{ fontSize: 12, color: '#555', marginBottom: 8, fontWeight: 600 }}>Simular respuesta del anfitrion (demo):</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['Hola! Como estas?', 'Bienvenido a Argentina!', 'Te cuento sobre el mate...'].map(r => (
              <button key={r} onClick={() => responderAnfitrion(r)} disabled={enviando} style={{ width: 'auto', padding: '6px 12px', fontSize: 12, background: 'white', color: '#003DA5', border: '1px solid #003DA5', borderRadius: 8 }}>
                {r}
              </button>
            ))}
          </div>
        </div>

      </div>
    </>
  );
}