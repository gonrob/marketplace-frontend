'use client';
import { useState } from 'react';
import Nav from '../components/Nav';

const IDIOMAS = ['Español','English','Português','Français','Italiano','Deutsch','中文','Русский'];
const CODES = ['es','en','pt','fr','it','de','zh','ru'];

export default function Chat() {
  const [texto, setTexto] = useState('');
  const [idiomaOrigen, setIdiomaOrigen] = useState('es');
  const [idiomaDestino, setIdiomaDestino] = useState('en');
  const [traduccion, setTraduccion] = useState('');
  const [loading, setLoading] = useState(false);

  const traducir = async () => {
    if (!texto.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto, origen: idiomaOrigen, destino: idiomaDestino })
      });
      const data = await res.json();
      setTraduccion(data.traduccion || data.error || 'Error al traducir');
    } catch {
      setTraduccion('Error al traducir');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <h1>Chat con traduccion 🌍</h1>
          <p style={{color:'#666',fontSize:14,marginBottom:20}}>Traduccion instantanea en 8 idiomas</p>

          <div style={{display:'flex',gap:10,marginBottom:16}}>
            <div style={{flex:1}}>
              <label style={{fontSize:13,color:'#888',display:'block',marginBottom:4}}>Desde</label>
              <select value={idiomaOrigen} onChange={e => setIdiomaOrigen(e.target.value)}>
                {CODES.map((c,i) => <option key={c} value={c}>{IDIOMAS[i]}</option>)}
              </select>
            </div>
            <div style={{flex:1}}>
              <label style={{fontSize:13,color:'#888',display:'block',marginBottom:4}}>Hacia</label>
              <select value={idiomaDestino} onChange={e => setIdiomaDestino(e.target.value)}>
                {CODES.map((c,i) => <option key={c} value={c}>{IDIOMAS[i]}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <textarea
              rows={4}
              placeholder="Escribi algo para traducir..."
              value={texto}
              onChange={e => setTexto(e.target.value)}
              style={{resize:'vertical'}}
            />
          </div>

          <button className="btn-orange" onClick={traducir} disabled={loading||!texto.trim()}>
            {loading ? 'Traduciendo...' : 'Traducir'}
          </button>

          {traduccion && (
            <div style={{marginTop:20,background:'#f0f4ff',borderRadius:12,padding:16}}>
              <div style={{fontSize:12,color:'#888',marginBottom:8}}>Traduccion:</div>
              <div style={{fontSize:16,color:'#1a1a1a',lineHeight:1.6}}>{traduccion}</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
