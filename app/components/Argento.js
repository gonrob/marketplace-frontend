'use client';
import { useState, useRef, useEffect } from 'react';
import useLang from '../../lib/useLang';

const T = {
  es:{placeholder:'Preguntale algo a Argento...',enviar:'Enviar',bienvenida:'¡Hola! Soy Argento 🇦🇷\n¿En qué te puedo ayudar?',duda:'🇦🇷 ¿ALGUNA DUDA?'},
  en:{placeholder:'Ask Argento something...',enviar:'Send',bienvenida:"Hey! I'm Argento 🇦🇷\nHow can I help you?",duda:'🇦🇷 ANY QUESTIONS?'},
  pt:{placeholder:'Pergunte algo ao Argento...',enviar:'Enviar',bienvenida:'Oi! Sou o Argento 🇦🇷\nComo posso te ajudar?',duda:'🇦🇷 ALGUMA DÚVIDA?'},
  fr:{placeholder:"Posez une question à Argento...",enviar:'Envoyer',bienvenida:"Salut! Je suis Argento 🇦🇷\nComment puis-je vous aider?",duda:"🇦🇷 UNE QUESTION?"},
  it:{placeholder:'Chiedi qualcosa ad Argento...',enviar:'Invia',bienvenida:'Ciao! Sono Argento 🇦🇷\nCome posso aiutarti?',duda:"🇦🇷 DUBBI?"},
  de:{placeholder:'Frag Argento etwas...',enviar:'Senden',bienvenida:'Hallo! Ich bin Argento 🇦🇷\nWie kann ich helfen?',duda:'🇦🇷 FRAGEN?'},
  zh:{placeholder:'问问Argento...',enviar:'发送',bienvenida:'你好！我是Argento 🇦🇷\n我能帮你什么？',duda:'🇦🇷 有疑问吗？'},
  ru:{placeholder:'Спросите Argento...',enviar:'Отправить',bienvenida:'Привет! Я Argento 🇦🇷\nКак я могу помочь?',duda:'🇦🇷 ВОПРОСЫ?'},
};

const Muneco = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="22" cy="10" rx="12" ry="4" fill="#75BBFD"/>
    <rect x="10" y="9" width="24" height="5" rx="2.5" fill="#4B6CB7"/>
    <circle cx="22" cy="18" r="9" fill="#FFDBA4"/>
    <circle cx="19" cy="17" r="1.5" fill="#333"/>
    <circle cx="25" cy="17" r="1.5" fill="#333"/>
    <circle cx="19.6" cy="16.4" r="0.5" fill="white"/>
    <circle cx="25.6" cy="16.4" r="0.5" fill="white"/>
    <path d="M18 20 Q22 24 26 20" stroke="#C94B4B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <rect x="13" y="26" width="18" height="14" rx="5" fill="#74ACDF"/>
    <rect x="13" y="31" width="18" height="4" fill="white"/>
    <circle cx="22" cy="31" r="2" fill="#F6B40E"/>
    <rect x="5" y="27" width="9" height="4" rx="2" fill="#74ACDF"/>
    <rect x="30" y="27" width="9" height="4" rx="2" fill="#74ACDF"/>
    <circle cx="5" cy="29" r="2.5" fill="#FFDBA4"/>
    <circle cx="39" cy="29" r="2.5" fill="#FFDBA4"/>
    <rect x="14" y="38" width="6" height="5" rx="2" fill="#333"/>
    <rect x="24" y="38" width="6" height="5" rx="2" fill="#333"/>
  </svg>
);

export default function Argento() {
  const { lang } = useLang();
  const t = T[lang] || T.es;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ rol: 'assistant', txt: t.bienvenida }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const enviar = async () => {
    if (!input.trim() || loading) return;
    const txt = input.trim();
    setInput('');
    const newMsgs = [...msgs, { rol: 'user', txt }];
    setMsgs(newMsgs);
    setLoading(true);
    try {
      const res = await fetch('/api/argento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: txt, historial: msgs, lang })
      });
      const data = await res.json();
      setMsgs([...newMsgs, { rol: 'assistant', txt: data.respuesta }]);
    } catch {
      setMsgs([...newMsgs, { rol: 'assistant', txt: 'Error. Intentá de nuevo.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setOpen(p => !p)} style={{
        position: 'fixed', bottom: 24, right: 20, zIndex: 9998,
        background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)',
        border: 'none', borderRadius: 30, padding: '10px 16px',
        color: '#fff', fontWeight: 700, fontSize: 12,
        cursor: 'pointer', boxShadow: '0 4px 20px rgba(75,108,183,0.5)',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Muneco />
        <span style={{whiteSpace:'nowrap'}}>{t.duda}</span>
      </button>

      {open && (
        <div style={{
          position: 'fixed', bottom: 90, right: 16, zIndex: 9999,
          width: 320, maxWidth: 'calc(100vw - 32px)',
          background: '#fff', borderRadius: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column',
          maxHeight: '65vh', overflow: 'hidden',
        }}>
          <div style={{ background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: '20px 20px 0 0', flexShrink: 0 }}>
            <Muneco />
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Argento</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>Asistente de KNOWAN 🇦🇷</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 28, height: 28, color: '#fff', cursor: 'pointer', fontSize: 14, flexShrink: 0 }}>✕</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10, background: '#f8f9fa' }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.rol === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px',
                  borderRadius: m.rol === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: m.rol === 'user' ? 'linear-gradient(135deg,#4B6CB7,#C94B4B)' : '#fff',
                  color: m.rol === 'user' ? '#fff' : '#1a1a1a',
                  fontSize: 13, lineHeight: 1.5, whiteSpace: 'pre-wrap',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                  {m.txt}
                </div>
              </div>
            ))}
            {loading && <div style={{ background: '#fff', padding: '10px 14px', borderRadius: '18px 18px 18px 4px', fontSize: 13, color: '#888' }}>✍️ ...</div>}
            <div ref={bottomRef} />
          </div>

          <div style={{ padding: 12, background: '#fff', borderTop: '1px solid #eee', flexShrink: 0 }}>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); enviar(); } }}
              placeholder={t.placeholder}
              rows={2}
              style={{
                width: '100%', padding: '10px 14px',
                borderRadius: 12, border: '2px solid #4B6CB7',
                fontSize: 13, outline: 'none',
                boxSizing: 'border-box', resize: 'none',
                fontFamily: 'inherit', marginBottom: 8,
                display: 'block',
              }}
            />
            <button onClick={enviar} disabled={loading} style={{
              width: '100%', padding: '10px',
              background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)',
              color: '#fff', border: 'none', borderRadius: 12,
              fontWeight: 700, cursor: 'pointer', fontSize: 14,
            }}>
              {loading ? '...' : t.enviar}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
