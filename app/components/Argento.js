'use client';
import { useState } from 'react';
import useLang from '../../lib/useLang';

const T = {
  es:{placeholder:'Preguntale algo a Argento...',enviar:'Enviar',bienvenida:'¡Hola! Soy Argento 🇦🇷\n¿En qué te puedo ayudar?',duda:'¿Alguna duda?'},
  en:{placeholder:'Ask Argento something...',enviar:'Send',bienvenida:"Hey! I'm Argento 🇦🇷\nHow can I help you?",duda:'Any questions?'},
  pt:{placeholder:'Pergunte algo ao Argento...',enviar:'Enviar',bienvenida:'Oi! Sou o Argento 🇦🇷\nComo posso te ajudar?',duda:'Alguma dúvida?'},
  fr:{placeholder:"Posez une question à Argento...",enviar:'Envoyer',bienvenida:"Salut! Je suis Argento 🇦🇷\nComment puis-je vous aider?",duda:'Des questions?'},
  it:{placeholder:'Chiedi qualcosa ad Argento...',enviar:'Invia',bienvenida:'Ciao! Sono Argento 🇦🇷\nCome posso aiutarti?',duda:'Hai dubbi?'},
  de:{placeholder:'Frag Argento etwas...',enviar:'Senden',bienvenida:'Hallo! Ich bin Argento 🇦🇷\nWie kann ich helfen?',duda:'Fragen?'},
  zh:{placeholder:'问问Argento...',enviar:'发送',bienvenida:'你好！我是Argento 🇦🇷\n我能帮你什么？',duda:'有问题吗？'},
  ru:{placeholder:'Спросите Argento...',enviar:'Отправить',bienvenida:'Привет! Я Argento 🇦🇷\nКак я могу помочь?',duda:'Есть вопросы?'},
};

export default function Argento() {
  const { lang } = useLang();
  const t = T[lang] || T.en;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ rol: 'assistant', txt: t.bienvenida }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const enviar = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMsgs(prev => [...prev, { rol: 'user', txt: userMsg }]);
    setLoading(true);
    try {
      const res = await fetch('/api/argento', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: userMsg, historial: msgs, lang })
      });
      const data = await res.json();
      setMsgs(prev => [...prev, { rol: 'assistant', txt: data.respuesta }]);
    } catch {
      setMsgs(prev => [...prev, { rol: 'assistant', txt: '¡Ups! Algo salió mal. Probá de nuevo.' }]);
    } finally { setLoading(false); }
  };

  return (
    <>
      <style>{`
        @keyframes wiggle {
          0%,100%{transform:rotate(0deg) scale(1)}
          25%{transform:rotate(-12deg) scale(1.15)}
          75%{transform:rotate(12deg) scale(1.15)}
        }
        @keyframes bounce {
          0%,100%{transform:translateY(0px)}
          50%{transform:translateY(-6px)}
        }
        @keyframes fadeIn {
          from{opacity:0;transform:translateY(10px)}
          to{opacity:1;transform:translateY(0)}
        }
        .argento-btn {
          animation: wiggle 2s ease-in-out infinite;
        }
        .argento-btn:hover {
          animation: none;
          transform: scale(1.1);
        }
        .argento-badge {
          animation: bounce 1.5s ease-in-out infinite;
        }
        .argento-chat {
          animation: fadeIn 0.3s ease;
        }
      `}</style>

      <div style={{position:'fixed',bottom:16,right:16,zIndex:1000,display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        {!open && (
          <div className="argento-badge" style={{
            background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',
            color:'white',padding:'7px 14px',borderRadius:20,
            fontSize:13,fontWeight:700,whiteSpace:'nowrap',
            boxShadow:'0 4px 12px rgba(0,0,0,0.25)',
            cursor:'pointer'
          }} onClick={() => setOpen(true)}>
            💬 {t.duda}
          </div>
        )}
        <button
          className="argento-btn"
          onClick={() => setOpen(!open)}
          style={{
            width:64,height:64,borderRadius:'50%',
            background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',
            border:'3px solid white',cursor:'pointer',
            fontSize:32,display:'flex',alignItems:'center',justifyContent:'center',
            boxShadow:'0 6px 24px rgba(0,0,0,0.3)',marginBottom:0,padding:0,
          }}
        >
          {open ? '✕' : '🧉'}
        </button>
      </div>

      {open && (
        <div className="argento-chat" style={{
          position:'fixed',bottom:96,right:16,width:320,height:430,
          background:'white',borderRadius:20,
          boxShadow:'0 8px 40px rgba(0,0,0,0.25)',
          zIndex:999,display:'flex',flexDirection:'column',overflow:'hidden',
          border:'1px solid rgba(75,108,183,0.15)'
        }}>
          <div style={{background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',padding:'14px 16px',display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,0.25)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:22,border:'2px solid rgba(255,255,255,0.5)'}}>🧉</div>
            <div>
              <div style={{color:'white',fontWeight:700,fontSize:15}}>Argento</div>
              <div style={{color:'rgba(255,255,255,0.8)',fontSize:11}}>Asistente de Knowan 🇦🇷</div>
            </div>
            <button onClick={() => setOpen(false)} style={{marginLeft:'auto',background:'none',border:'none',color:'white',fontSize:18,cursor:'pointer',padding:0,marginBottom:0,width:'auto'}}>✕</button>
          </div>

          <div style={{flex:1,overflowY:'auto',padding:12,display:'flex',flexDirection:'column',gap:8,background:'#f8f9fa'}}>
            {msgs.map((m, i) => (
              <div key={i} style={{display:'flex',justifyContent:m.rol==='user'?'flex-end':'flex-start'}}>
                <div style={{
                  maxWidth:'80%',padding:'8px 12px',
                  borderRadius:m.rol==='user'?'16px 16px 4px 16px':'16px 16px 16px 4px',
                  background:m.rol==='user'?'linear-gradient(135deg,#4B6CB7,#C94B4B)':'white',
                  color:m.rol==='user'?'white':'#1a1a1a',
                  fontSize:13,lineHeight:1.5,
                  boxShadow:'0 1px 4px rgba(0,0,0,0.1)',
                  whiteSpace:'pre-wrap'
                }}>
                  {m.txt}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{display:'flex',justifyContent:'flex-start'}}>
                <div style={{background:'white',padding:'8px 12px',borderRadius:'16px 16px 16px 4px',fontSize:13,color:'#888',boxShadow:'0 1px 4px rgba(0,0,0,0.1)'}}>
                  ✍️ ...
                </div>
              </div>
            )}
          </div>

          <div style={{padding:10,borderTop:'1px solid #f0f0f0',display:'flex',gap:8,background:'white'}}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && enviar()}
              placeholder={t.placeholder}
              style={{flex:1,margin:0,borderRadius:20,padding:'8px 14px',fontSize:13,border:'1.5px solid #ddd'}}
            />
            <button onClick={enviar} disabled={loading} style={{width:'auto',padding:'8px 14px',borderRadius:20,fontSize:13,marginBottom:0,flexShrink:0}}>
              {t.enviar}
            </button>
          </div>
        </div>
      )}
    </>
  );
}