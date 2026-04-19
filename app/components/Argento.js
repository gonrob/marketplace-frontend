'use client';
import { useState, useRef, useEffect } from 'react';
import useLang from '../../lib/useLang';

const T = {
  es:{placeholder:'Preguntale algo a Argento...',enviar:'Enviar',bienvenida:'¡Hola! Soy Argento 🇦🇷\n¿En qué te puedo ayudar?',duda:'🇦🇷 ¿ALGUNA DUDA SOBRE LA APP?'},
  en:{placeholder:'Ask Argento something...',enviar:'Send',bienvenida:"Hey! I'm Argento 🇦🇷\nHow can I help you?",duda:'🇦🇷 ANY QUESTIONS ABOUT THE APP?'},
  pt:{placeholder:'Pergunte algo ao Argento...',enviar:'Enviar',bienvenida:'Oi! Sou o Argento 🇦🇷\nComo posso te ajudar?',duda:'🇦🇷 ALGUMA DÚVIDA SOBRE O APP?'},
  fr:{placeholder:"Posez une question à Argento...",enviar:'Envoyer',bienvenida:"Salut! Je suis Argento 🇦🇷\nComment puis-je vous aider?",duda:"🇦🇷 UNE QUESTION SUR L'APP?"},
  it:{placeholder:'Chiedi qualcosa ad Argento...',enviar:'Invia',bienvenida:'Ciao! Sono Argento 🇦🇷\nCome posso aiutarti?',duda:"🇦🇷 DUBBI SULL'APP?"},
  de:{placeholder:'Frag Argento etwas...',enviar:'Senden',bienvenida:'Hallo! Ich bin Argento 🇦🇷\nWie kann ich helfen?',duda:'🇦🇷 FRAGEN ZUR APP?'},
  zh:{placeholder:'问问Argento...',enviar:'发送',bienvenida:'你好！我是Argento 🇦🇷\n我能帮你什么？',duda:'🇦🇷 对APP有疑问吗？'},
  ru:{placeholder:'Спросите Argento...',enviar:'Отправить',bienvenida:'Привет! Я Argento 🇦🇷\nКак я могу помочь?',duda:'🇦🇷 ВОПРОСЫ ПО ПРИЛОЖЕНИЮ?'},
};

const MuñecoSVG = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="22" cy="10" rx="12" ry="4" fill="#75BBFD"/>
    <rect x="10" y="9" width="24" height="5" rx="2.5" fill="#4B6CB7"/>
    <circle cx="22" cy="18" r="9" fill="#FFDBA4"/>
    <circle cx="19" cy="17" r="1.5" fill="#333"/>
    <circle cx="25" cy="17" r="1.5" fill="#333"/>
    <circle cx="19.6" cy="16.4" r="0.5" fill="white"/>
    <circle cx="25.6" cy="16.4" r="0.5" fill="white"/>
    <path d="M18 20 Q22 24 26 20" stroke="#C94B4B" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    <path d="M19 19 Q22 20.5 25 19" stroke="#8B6240" strokeWidth="1" strokeLinecap="round" fill="none"/>
    <rect x="13" y="26" width="18" height="14" rx="5" fill="#74ACDF"/>
    <rect x="13" y="31" width="18" height="4" fill="white"/>
    <rect x="13" y="26" width="18" height="5" rx="3" fill="#74ACDF"/>
    <rect x="13" y="35" width="18" height="5" rx="3" fill="#74ACDF"/>
    <circle cx="22" cy="31" r="2" fill="#F6B40E"/>
    <line x1="22" y1="28" x2="22" y2="27" stroke="#F6B40E" strokeWidth="0.8"/>
    <line x1="22" y1="34" x2="22" y2="35" stroke="#F6B40E" strokeWidth="0.8"/>
    <line x1="19" y1="31" x2="18" y2="31" stroke="#F6B40E" strokeWidth="0.8"/>
    <line x1="25" y1="31" x2="26" y2="31" stroke="#F6B40E" strokeWidth="0.8"/>
    <line x1="20" y1="29" x2="19.3" y2="28.3" stroke="#F6B40E" strokeWidth="0.8"/>
    <line x1="24" y1="33" x2="24.7" y2="33.7" stroke="#F6B40E" strokeWidth="0.8"/>
    <line x1="24" y1="29" x2="24.7" y2="28.3" stroke="#F6B40E" strokeWidth="0.8"/>
    <line x1="20" y1="33" x2="19.3" y2="33.7" stroke="#F6B40E" strokeWidth="0.8"/>
    <rect x="5" y="27" width="9" height="4" rx="2" fill="#74ACDF"/>
    <rect x="30" y="27" width="9" height="4" rx="2" fill="#74ACDF"/>
    <circle cx="5" cy="29" r="2.5" fill="#FFDBA4"/>
    <circle cx="39" cy="29" r="2.5" fill="#FFDBA4"/>
    <rect x="14" y="38" width="6" height="5" rx="2" fill="#333"/>
    <rect x="24" y="38" width="6" height="5" rx="2" fill="#333"/>
  </svg>
);

export default function Argento() {
  const inputRef = useRef(null);
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
          20%{transform:rotate(-15deg) scale(1.1)}
          40%{transform:rotate(15deg) scale(1.1)}
          60%{transform:rotate(-10deg) scale(1.05)}
          80%{transform:rotate(10deg) scale(1.05)}
        }
        @keyframes bounce {
          0%,100%{transform:translateY(0px)}
          50%{transform:translateY(-8px)}
        }
        @keyframes fadeIn {
          from{opacity:0;transform:translateY(10px)}
          to{opacity:1;transform:translateY(0)}
        }
        .argento-btn { animation: wiggle 2.5s ease-in-out infinite; }
        .argento-btn:hover { animation: none; transform: scale(1.15); }
        .argento-badge { animation: bounce 1.8s ease-in-out infinite; }
        .argento-chat { animation: fadeIn 0.3s ease; }
      `}</style>

      <div style={{position:'fixed',bottom:16,right:16,zIndex:1000,display:'flex',flexDirection:'column',alignItems:'center',gap:8}}>
        {!open && (
          <div className="argento-badge" style={{
            background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',
            color:'white',padding:'7px 14px',borderRadius:20,
            fontSize:12,fontWeight:700,whiteSpace:'nowrap',
            boxShadow:'0 4px 12px rgba(0,0,0,0.25)',cursor:'pointer',
            textAlign:'center'
          }} onClick={() => setOpen(true)}>
            {t.duda}
          </div>
        )}
        <button
          className={open ? '' : 'argento-btn'}
          onClick={() => setOpen(!open)}
          style={{
            width:68,height:68,borderRadius:'50%',
            background:'linear-gradient(135deg,#74ACDF,#F6B40E)',
            border:'3px solid white',cursor:'pointer',
            display:'flex',alignItems:'center',justifyContent:'center',
            boxShadow:'0 6px 24px rgba(0,0,0,0.3)',marginBottom:0,padding:4,
          }}
        >
          {open
            ? <span style={{color:'white',fontSize:22,fontWeight:700}}>✕</span>
            : <MuñecoSVG />
          }
        </button>
      </div>

      {open && (
        <div className="argento-chat" style={{
          position:'fixed',bottom:100,right:16,width:320,height:430,
          background:'white',borderRadius:20,
          boxShadow:'0 8px 40px rgba(0,0,0,0.25)',
          zIndex:999,display:'flex',flexDirection:'column',overflow:'hidden',
          border:'1px solid rgba(75,108,183,0.15)'
        }}>
          <div style={{background:'linear-gradient(135deg,#74ACDF,#F6B40E)',padding:'14px 16px',display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:40,height:40,borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',border:'2px solid rgba(255,255,255,0.4)'}}>
              <MuñecoSVG />
            </div>
            <div>
              <div style={{color:'white',fontWeight:700,fontSize:15}}>Argento</div>
              <div style={{color:'rgba(255,255,255,0.9)',fontSize:11}}>Asistente de Knowan 🇦🇷</div>
            </div>
            <button onClick={() => setOpen(false)} style={{marginLeft:'auto',background:'none',border:'none',color:'white',fontSize:20,cursor:'pointer',padding:0,marginBottom:0,width:'auto'}}>✕</button>
          </div>

          <div style={{flex:1,overflowY:'auto',padding:12,display:'flex',flexDirection:'column',gap:8,background:'#f8f9fa'}}>
            {msgs.map((m, i) => (
              <div key={i} style={{display:'flex',justifyContent:m.rol==='user'?'flex-end':'flex-start'}}>
                <div style={{
                  maxWidth:'80%',padding:'8px 12px',
                  borderRadius:m.rol==='user'?'16px 16px 4px 16px':'16px 16px 16px 4px',
                  background:m.rol==='user'?'linear-gradient(135deg,#74ACDF,#4B6CB7)':'white',
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
              ref={inputRef}
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