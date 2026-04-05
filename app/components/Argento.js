'use client';
import { useState } from 'react';
import useLang from '../../lib/useLang';

const SISTEMA = `Sos Argento, el asistente virtual de Knowan. Sos argentino, simpático y usás modismos argentinos. 
Knowan es una app que conecta viajeros extranjeros con anfitriones argentinos.
- El primer contacto es GRATIS
- Los siguientes contactos cuestan USD 0.50 (el anfitrión recibe USD 0.35, Knowan USD 0.15)
- Hay paquetes: 5 contactos USD 2.00, 10 contactos USD 3.50, 25 contactos USD 7.00
- Los anfitriones fijan su precio por hora de servicio y lo reciben íntegro
- Los anfitriones pueden retirar sus ganancias cuando quieran por Mercado Pago o transferencia
- El registro es gratis tanto para viajeros como anfitriones
- La app tiene chat en tiempo real, verificación de identidad y pagos seguros con Stripe
- Web: knowan.net
- Contacto: info.knowan@gmail.com
Respondé siempre en el idioma del usuario. Sé conciso y simpático.`;

const T = {
  es:{placeholder:'Preguntale algo a Argento...',enviar:'Enviar',bienvenida:'¡Hola! Soy Argento 🇦🇷\n¿En qué te puedo ayudar?'},
  en:{placeholder:'Ask Argento something...',enviar:'Send',bienvenida:"Hey! I'm Argento 🇦🇷\nHow can I help you?"},
  pt:{placeholder:'Pergunte algo ao Argento...',enviar:'Enviar',bienvenida:'Oi! Sou o Argento 🇦🇷\nComo posso te ajudar?'},
  fr:{placeholder:"Posez une question à Argento...",enviar:'Envoyer',bienvenida:"Salut! Je suis Argento 🇦🇷\nComment puis-je vous aider?"},
  it:{placeholder:'Chiedi qualcosa ad Argento...',enviar:'Invia',bienvenida:'Ciao! Sono Argento 🇦🇷\nCome posso aiutarti?'},
  de:{placeholder:'Frag Argento etwas...',enviar:'Senden',bienvenida:'Hallo! Ich bin Argento 🇦🇷\nWie kann ich helfen?'},
  zh:{placeholder:'问问Argento...',enviar:'发送',bienvenida:'你好！我是Argento 🇦🇷\n我能帮你什么？'},
  ru:{placeholder:'Спросите Argento...',enviar:'Отправить',bienvenida:'Привет! Я Argento 🇦🇷\nКак я могу помочь?'},
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
      <button
        onClick={() => setOpen(!open)}
        style={{
          position:'fixed',bottom:24,right:24,width:60,height:60,borderRadius:'50%',
          background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',
          border:'none',cursor:'pointer',zIndex:1000,
          fontSize:28,display:'flex',alignItems:'center',justifyContent:'center',
          boxShadow:'0 4px 20px rgba(0,0,0,0.3)',marginBottom:0,padding:0,
          transition:'transform 0.2s'
        }}
      >
        {open ? '✕' : '🧉'}
      </button>

      {open && (
        <div style={{
          position:'fixed',bottom:96,right:24,width:320,height:420,
          background:'white',borderRadius:20,boxShadow:'0 8px 40px rgba(0,0,0,0.2)',
          zIndex:999,display:'flex',flexDirection:'column',overflow:'hidden',
          border:'1px solid rgba(75,108,183,0.15)'
        }}>
          <div style={{background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',padding:'14px 16px',display:'flex',alignItems:'center',gap:10}}>
            <div style={{width:36,height:36,borderRadius:'50%',background:'rgba(255,255,255,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20}}>🧉</div>
            <div>
              <div style={{color:'white',fontWeight:700,fontSize:15}}>Argento</div>
              <div style={{color:'rgba(255,255,255,0.8)',fontSize:11}}>Asistente de Knowan 🇦🇷</div>
            </div>
          </div>

          <div style={{flex:1,overflowY:'auto',padding:12,display:'flex',flexDirection:'column',gap:8,background:'#f8f9fa'}}>
            {msgs.map((m, i) => (
              <div key={i} style={{display:'flex',justifyContent:m.rol==='user'?'flex-end':'flex-start'}}>
                <div style={{
                  maxWidth:'80%',padding:'8px 12px',borderRadius:m.rol==='user'?'16px 16px 4px 16px':'16px 16px 16px 4px',
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