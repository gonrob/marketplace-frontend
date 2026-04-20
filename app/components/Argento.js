'use client';
import { useState, useRef, useEffect } from 'react';
import useLang from '../../lib/useLang';

const T = {
  es:{placeholder:'Preguntale algo a Argento...',enviar:'Enviar',bienvenida:'¡Hola! Soy Argento 🇦🇷\n¿En qué te puedo ayudar?',duda:'¿Dudas sobre la app?'},
  en:{placeholder:'Ask Argento something...',enviar:'Send',bienvenida:"Hey! I'm Argento 🇦🇷\nHow can I help you?",duda:'Questions about the app?'},
  pt:{placeholder:'Pergunte algo ao Argento...',enviar:'Enviar',bienvenida:'Oi! Sou o Argento 🇦🇷\nComo posso te ajudar?',duda:'Dúvidas sobre o app?'},
  fr:{placeholder:"Posez une question à Argento...",enviar:'Envoyer',bienvenida:"Salut! Je suis Argento 🇦🇷\nComment puis-je vous aider?",duda:"Des questions sur l'app?"},
  it:{placeholder:'Chiedi qualcosa ad Argento...',enviar:'Invia',bienvenida:'Ciao! Sono Argento 🇦🇷\nCome posso aiutarti?',duda:"Dubbi sull'app?"},
  de:{placeholder:'Frag Argento etwas...',enviar:'Senden',bienvenida:'Hallo! Ich bin Argento 🇦🇷\nWie kann ich helfen?',duda:'Fragen zur App?'},
  zh:{placeholder:'问问Argento...',enviar:'发送',bienvenida:'你好！我是Argento 🇦🇷\n我能帮你什么？',duda:'对App有疑问吗？'},
  ru:{placeholder:'Спросите Argento...',enviar:'Отправить',bienvenida:'Привет! Я Argento 🇦🇷\nКак я могу помочь?',duda:'Вопросы о приложении?'},
};

const Muneco = ({ size = 54 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
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

const styles = `
  @keyframes argentoBounce {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes argentoAppear {
    from { opacity: 0; transform: scale(0.85) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  @keyframes argentoBubble {
    0%   { opacity: 0; transform: translateY(6px); }
    10%  { opacity: 1; transform: translateY(0); }
    85%  { opacity: 1; }
    100% { opacity: 0; }
  }
  .argento-bounce {
    animation: argentoBounce 1.8s ease-in-out infinite;
  }
  .argento-chat {
    animation: argentoAppear 0.22s ease;
  }
  .argento-bubble {
    animation: argentoBubble 4s ease-in-out infinite;
  }
  .argento-btn:hover .argento-bounce {
    animation-play-state: paused;
  }
`;

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
      <style>{styles}</style>

      {/* Muñeco flotante */}
      {!open && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9998,
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          cursor: 'pointer',
        }}
          onClick={() => setOpen(true)}
          className="argento-btn"
        >
          {/* Burbuja de texto */}
          <div className="argento-bubble" style={{
            background: '#fff',
            border: '2px solid #4B6CB7',
            borderRadius: 14,
            padding: '6px 12px',
            fontSize: 12,
            fontWeight: 700,
            color: '#4B6CB7',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 10px rgba(75,108,183,0.2)',
            position: 'relative',
          }}>
            {t.duda}
            {/* triangulito abajo */}
            <span style={{
              position: 'absolute', bottom: -8, left: '50%', transform: 'translateX(-50%)',
              width: 0, height: 0,
              borderLeft: '7px solid transparent',
              borderRight: '7px solid transparent',
              borderTop: '8px solid #4B6CB7',
            }}/>
          </div>

          {/* Muñeco con sombra y bounce */}
          <div className="argento-bounce" style={{
            background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)',
            borderRadius: '50%',
            width: 68, height: 68,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 6px 24px rgba(75,108,183,0.45)',
          }}>
            <Muneco size={46} />
          </div>
        </div>
      )}

      {/* Chat panel */}
      {open && (
        <div className="argento-chat" style={{
          position: 'fixed', bottom: 24, right: 16, zIndex: 9999,
          width: 320, maxWidth: 'calc(100vw - 32px)',
          background: '#fff', borderRadius: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column',
          maxHeight: '65vh', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)',
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 10,
            borderRadius: '20px 20px 0 0', flexShrink: 0,
            cursor: 'pointer',
          }}
            onClick={() => setOpen(false)}
          >
            <div style={{ flexShrink: 0 }}>
              <Muneco size={40} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Argento</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>Asistente de KNOWAN 🇦🇷</div>
            </div>
            <button
              onClick={e => { e.stopPropagation(); setOpen(false); }}
              style={{
                background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%',
                width: 28, height: 28, color: '#fff', cursor: 'pointer', fontSize: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
              }}
            >✕</button>
          </div>

          {/* Mensajes */}
          <div style={{
            flex: 1, overflowY: 'auto', padding: 14,
            display: 'flex', flexDirection: 'column', gap: 10, background: '#f8f9fa',
          }}>
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
            {loading && (
              <div style={{
                background: '#fff', padding: '10px 14px',
                borderRadius: '18px 18px 18px 4px', fontSize: 13, color: '#888',
              }}>✍️ ...</div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
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
