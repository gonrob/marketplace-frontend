'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import Nav from '../components/Nav';
import api from '../../lib/api';
import { io } from 'socket.io-client';

function ChatContent() {
  const params = useSearchParams();
  const router = useRouter();
  const conId = params.get('con');
  const [mensajes, setMensajes] = useState([]);
  const [texto, setTexto] = useState('');
  const [showValorar, setShowValorar] = useState(false);
  const [estrellas, setEstrellas] = useState(0);
  const [valorado, setValorado] = useState(false);
  const [user, setUser] = useState(null);
  const [contacto, setContacto] = useState(null);
  const [socket, setSocket] = useState(null);
  const [lang, setLang] = useState('es');
  const bottomRef = useRef(null);

  const T = {
    es:{placeholder:'Escribe un mensaje...',enviar:'Enviar',conectando:'Conectando...'},
    en:{placeholder:'Write a message...',enviar:'Send',conectando:'Connecting...'},
    pt:{placeholder:'Escreva uma mensagem...',enviar:'Enviar',conectando:'Conectando...'},
    fr:{placeholder:'Ecrivez un message...',enviar:'Envoyer',conectando:'Connexion...'},
    it:{placeholder:'Scrivi un messaggio...',enviar:'Invia',conectando:'Connessione...'},
    de:{placeholder:'Schreib eine Nachricht...',enviar:'Senden',conectando:'Verbindung...'},
    zh:{placeholder:'写一条消息...',enviar:'发送',conectando:'连接中...'},
    ru:{placeholder:'Напишите сообщение...',enviar:'Отправить',conectando:'Подключение...'},
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }

    api.get('/api/auth/me').then(r => {
      setUser(r.data);
      if (conId) {
        api.get(`/api/users/sellers/${conId}`).then(s => setContacto(s.data)).catch(() => {});
      }

      const s = io(process.env.NEXT_PUBLIC_API_URL, { transports: ['polling', 'websocket'] });
      s.on('connect', () => {
        s.emit('join', r.data._id);
      });
      s.on('mensaje', (msg) => {
        setMensajes(prev => [...prev, msg]);
      });
      setSocket(s);
      return () => s.disconnect();
    }).catch(() => router.push('/login'));
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  const valorar = async (n) => {
    try {
      await api.post(`/api/users/sellers/${conId}/valorar`, { puntuacion: n });
      setValorado(true);
      setShowValorar(false);
    } catch {}
  };

  const enviar = () => {
    if (!texto.trim() || !socket || !conId || !user) return;
    const msgData = {
      de: user._id,
      para: conId,
      texto: texto.trim(),
      nombre: user.nombre || user.email
    };
    socket.emit('mensaje', msgData);
    setMensajes(prev => [...prev, { ...msgData, propio: true, timestamp: new Date() }]);
    setTexto('');
  };

  const t = T[lang] || T.en;

  return (
    <div style={{display:'flex',flexDirection:'column',height:'calc(100vh - 60px)'}}>
      <div style={{background:'#4B6CB7',padding:'12px 16px',display:'flex',alignItems:'center',gap:12}}>
        <div style={{width:40,height:40,borderRadius:'50%',background:'#EBF2FF',color:'#4B6CB7',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,overflow:'hidden',flexShrink:0}}>
          {contacto?.foto
            ? <img src={contacto.foto} alt={contacto.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} />
            : (contacto?.nombre||'?')[0].toUpperCase()
          }
        </div>
        <div>
          <div style={{color:'white',fontWeight:600,fontSize:15}}>{contacto?.nombre || t.conectando}</div>
          {contacto?.ciudad && <div style={{color:'rgba(255,255,255,0.7)',fontSize:12}}>📍 {contacto.ciudad}</div>}
        </div>
      </div>

      <div style={{flex:1,overflowY:'auto',padding:16,display:'flex',flexDirection:'column',gap:10,background:'#f8f9fa'}}>
        {mensajes.length === 0 && (
          <div style={{textAlign:'center',color:'#888',marginTop:40,fontSize:14}}>
            <div style={{fontSize:40,marginBottom:8}}>💬</div>
            <p>Empieza la conversacion!</p>
          </div>
        )}
        {mensajes.map((m, i) => (
          <div key={i} style={{display:'flex',justifyContent:m.propio?'flex-end':'flex-start'}}>
            <div style={{
              maxWidth:'75%',padding:'10px 14px',borderRadius:m.propio?'18px 18px 4px 18px':'18px 18px 18px 4px',
              background:m.propio?'#4B6CB7':'white',
              color:m.propio?'white':'#1a1a1a',
              boxShadow:'0 1px 4px rgba(0,0,0,0.1)',
              fontSize:14,lineHeight:1.5
            }}>
              {!m.propio && <div style={{fontSize:11,fontWeight:600,marginBottom:4,opacity:0.7}}>{m.nombre}</div>}
              {m.texto}
              <div style={{fontSize:10,opacity:0.6,marginTop:4,textAlign:'right'}}>
                {new Date(m.timestamp).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {user?.role === 'buyer' && contacto && !valorado && (
        <div style={{padding:'10px 16px',background:'#f8faff',borderTop:'1px solid #e5e7eb',textAlign:'center'}}>
          {!showValorar ? (
            <button onClick={() => setShowValorar(true)} style={{background:'transparent',border:'1.5px solid #4B6CB7',color:'#4B6CB7',borderRadius:20,padding:'6px 16px',fontSize:13,fontWeight:600,cursor:'pointer'}}>
              ⭐ Valorar a {contacto.nombre}
            </button>
          ) : (
            <div>
              <p style={{fontSize:13,color:'#555',margin:'0 0 8px'}}>¿Cómo fue tu experiencia con {contacto.nombre}?</p>
              <div style={{display:'flex',justifyContent:'center',gap:8}}>
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => valorar(n)} style={{fontSize:28,background:'none',border:'none',cursor:'pointer',opacity:estrellas>=n?1:0.3}} onMouseEnter={() => setEstrellas(n)} onMouseLeave={() => setEstrellas(0)}>
                    ⭐
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {valorado && (
        <div style={{padding:'10px 16px',background:'#f0fdf4',borderTop:'1px solid #6ee7b7',textAlign:'center',fontSize:13,color:'#15803d',fontWeight:600}}>
          ✅ ¡Gracias por tu valoración!
        </div>
      )}
      <div style={{padding:'12px 16px',background:'white',borderTop:'1px solid #f0f0f0',display:'flex',gap:10}}>
        <input
          value={texto}
          onChange={e => setTexto(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && enviar()}
          placeholder={t.placeholder}
          style={{flex:1,margin:0,borderRadius:24,padding:'10px 16px'}}
        />
        <button onClick={enviar} className="btn-orange" style={{width:'auto',padding:'10px 20px',borderRadius:24,flexShrink:0}}>
          {t.enviar}
        </button>
      </div>
    </div>
  );
}

export default function Mensajes() {
  return (
    <>
      <Nav />
      <Suspense fallback={<div className="spinner">Cargando...</div>}>
        <ChatContent />
      </Suspense>
    </>
  );
}
