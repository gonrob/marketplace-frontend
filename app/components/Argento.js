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

export default function Argento() {
  const { lang } = useLang();
  const t = T[lang] || T.es;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ rol: 'assistant', txt: t.bienvenida }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

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
        border: 'none', borderRadius: 30, padding: '12px 18px',
        color: '#fff', fontWeight: 700, fontSize: 13,
        cursor: 'pointer', boxShadow: '0 4px 20px rgba(75,108,183,0.5)',
        display: 'flex', alignItems: 'center', gap: 8, maxWidth: 200,
      }}>
        🇦🇷 {t.duda}
      </button>

      {open && (
        <div style={{
          position: 'fixed', bottom: 90, right: 16, zIndex: 9999,
          width: 320, maxWidth: 'calc(100vw - 32px)',
          background: '#fff', borderRadius: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column',
          maxHeight: '65vh',
        }}>
          <div style={{ background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, borderRadius: '20px 20px 0 0' }}>
            <div style={{ fontSize: 28 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>Argento</div>
              <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>Asistente de KNOWAN 🇦🇷</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: 28, height: 28, color: '#fff', cursor: 'pointer', fontSize: 14 }}>✕</button>
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

          <div style={{ padding: 12, background: '#fff', borderTop: '1px solid #eee', borderRadius: '0 0 20px 20px' }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && enviar()}
                placeholder={t.placeholder}
                style={{ flex: 1, padding: '10px 14px', borderRadius: 20, border: '2px solid #4B6CB7', fontSize: 13, outline: 'none', minWidth: 0 }}
              />
              <button onClick={enviar} disabled={loading} style={{ padding: '10px 14px', background: 'linear-gradient(135deg,#4B6CB7,#C94B4B)', color: '#fff', border: 'none', borderRadius: 20, fontWeight: 700, cursor: 'pointer', fontSize: 13, flexShrink: 0 }}>
                {t.enviar}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
