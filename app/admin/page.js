'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import api from '../../lib/api';

const ADMINS = ['info.knowan@gmail.com'];

export default function Admin() {
  const router = useRouter();
  const [sellers, setSellers] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('anfitriones');
  const [stats, setStats] = useState(null);
  const [asunto, setAsunto] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [emailIndividual, setEmailIndividual] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [emailMsg, setEmailMsg] = useState('');

  const borrarCuenta = async (id, nombre) => {
    if (!confirm('Borrar la cuenta de ' + nombre + '?')) return;
    try {
      await api.delete('/api/users/admin/' + id);
      setSellers(prev => prev.filter(s => s._id !== id));
      setBuyers(prev => prev.filter(s => s._id !== id));
    } catch { alert('Error al borrar.'); }
  };

  const enviarEmail = async (role, soloNoVerificados) => {
    if (!asunto || !mensaje) { setEmailMsg('Completa asunto y mensaje.'); return; }
    setEnviando(true); setEmailMsg('');
    try {
      const body = { asunto, mensaje };
      if (emailIndividual) body.emailIndividual = emailIndividual;
      else { body.role = role; if (soloNoVerificados) body.soloNoVerificados = true; }
      const r = await api.post('/api/users/email-masivo', body);
      setEmailMsg('OK: ' + r.data.message);
    } catch { setEmailMsg('Error al enviar.'); }
    finally { setEnviando(false); }
  };

  const cartaVerificacion = () => {
    setAsunto('Importante: verificá tu cuenta en Knowan');
    setMensaje('Hola,\n\nDesde el equipo de Knowan queremos agradecerte por formar parte de nuestra comunidad.\n\nPara mejorar tu experiencia y la de los viajeros que te contactan, te pedimos que:\n\n✅ Verificá tu email haciendo click en el link que te enviamos al registrarte\n📸 Agregá una foto de perfil para que los viajeros puedan conocerte\n\nTe recomendamos borrar tu cuenta actual y crear una nueva para que todo quede correctamente configurado. Es rápido y sencillo.\n\nDisculpá las molestias. Todo esto es para mejorar la app y brindarte la mejor experiencia posible.\n\nMuchas gracias por ser parte de Knowan.\n\nUn abrazo,\nEl equipo de Knowan\nknowان.net');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    const load = async () => {
      try {
        const me = await api.get('/api/auth/me');
        if (!ADMINS.includes(me.data.email)) { router.push('/'); return; }
        const s = await api.get('/api/users/sellers');
        setSellers(s.data);
        let bData = [];
        try { const b = await api.get('/api/users/buyers'); bData = b.data; } catch {}
        setBuyers(bData);
        setStats({
          totalAnfitriones: s.data.length,
          totalViajeros: bData.length,
          gananciasTotal: s.data.reduce((acc, x) => acc + (x.ganancias || 0), 0).toFixed(2),
          contactosTotal: s.data.reduce((acc, x) => acc + (x.totalContactos || 0), 0),
        });
      } catch (err) { console.error('Admin error:', err.message); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div className="spinner">Cargando...</div>;

  const tabStyle = (t) => ({
    padding: '8px 16px', borderRadius: 8, border: '1.5px solid #4B6CB7',
    background: tab === t ? '#4B6CB7' : 'white',
    color: tab === t ? 'white' : '#4B6CB7',
    cursor: 'pointer', fontWeight: 600, fontSize: 13,
  });

  const btnStyle = (color) => ({
    flex: 1, padding: '10px', background: color, color: '#fff',
    border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 12,
  });

  return (
    <>
      <Nav />
      <div className="container" style={{ maxWidth: 700 }}>
        <h1 style={{ marginBottom: 16 }}>Panel Admin</h1>

        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
            <div style={{ background: '#EBF2FF', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#4B6CB7' }}>{stats.totalAnfitriones}</div>
              <div style={{ fontSize: 12, color: '#888' }}>Anfitriones</div>
            </div>
            <div style={{ background: '#fff8e1', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#F4A020' }}>{stats.totalViajeros}</div>
              <div style={{ fontSize: 12, color: '#888' }}>Viajeros</div>
            </div>
            <div style={{ background: '#f0fdf4', borderRadius: 12, padding: 16, textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#22c55e' }}>USD {stats.gananciasTotal}</div>
              <div style={{ fontSize: 12, color: '#888' }}>Ganancias</div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
          <button style={tabStyle('anfitriones')} onClick={() => setTab('anfitriones')}>Anfitriones ({sellers.length})</button>
          <button style={tabStyle('viajeros')} onClick={() => setTab('viajeros')}>Viajeros ({buyers.length})</button>
          <button style={tabStyle('emails')} onClick={() => setTab('emails')}>Emails</button>
        </div>

        {tab === 'anfitriones' && (
          <div>
            {sellers.map(s => (
              <div key={s._id} style={{ background: 'white', borderRadius: 12, padding: 16, marginBottom: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  {s.foto && <img src={s.foto} alt={s.nombre} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{s.nombre}</div>
                    <div style={{ fontSize: 12, color: '#888' }}>{s.email}</div>
                    <div style={{ fontSize: 11, color: '#aaa' }}>{s.ciudad} · {s.totalContactos || 0} contactos · USD {s.ganancias || 0}</div>
                  </div>
                  <button onClick={() => borrarCuenta(s._id, s.nombre)} style={{ padding: '6px 10px', fontSize: 12, background: '#cc0000', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>BORRAR</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'viajeros' && (
          <div>
            <div style={{ background: '#f0f4ff', borderRadius: 12, padding: 16, marginBottom: 16, display: 'flex', gap: 20 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#4B6CB7' }}>{buyers.length}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Total</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#22c55e' }}>{buyers.filter(x => x.emailVerificado).length}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Verificados</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: '#f59e0b' }}>{buyers.filter(x => !x.emailVerificado).length}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Sin verificar</div>
              </div>
            </div>
            {buyers.map(b => (
              <div key={b._id} style={{ background: 'white', borderRadius: 12, padding: 16, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                {b.foto
                  ? <img src={b.foto} alt={b.nombre} style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  : <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>?</div>
                }
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{b.nombre}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{b.email}</div>
                  <div style={{ fontSize: 11, color: '#aaa' }}>{b.telefono}</div>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 20, background: b.emailVerificado ? '#dcfce7' : '#fef3c7', color: b.emailVerificado ? '#15803d' : '#92400e', fontWeight: 600 }}>
                    {b.emailVerificado ? 'Verificado' : 'Sin verificar'}
                  </span>
                  <button onClick={() => borrarCuenta(b._id, b.nombre)} style={{ padding: '6px 10px', fontSize: 12, background: '#cc0000', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer' }}>BORRAR</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'emails' && (
          <div>
            <h2 style={{ marginBottom: 16 }}>Email masivo desde Knowan</h2>

            <button onClick={cartaVerificacion} style={{ width: '100%', padding: '10px', background: '#f0f4ff', border: '1.5px solid #4B6CB7', color: '#4B6CB7', borderRadius: 10, fontWeight: 600, fontSize: 13, cursor: 'pointer', marginBottom: 16 }}>
              Cargar carta de verificacion de Knowan
            </button>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Email individual (opcional)</label>
              <input value={emailIndividual} onChange={e => setEmailIndividual(e.target.value)} placeholder="Si lo completás, solo se envía a esa persona" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Asunto</label>
              <input value={asunto} onChange={e => setAsunto(e.target.value)} placeholder="Novedades de Knowan" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Mensaje</label>
              <textarea value={mensaje} onChange={e => setMensaje(e.target.value)} rows={6} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'vertical' }} />
            </div>

            {emailMsg && <div style={{ padding: '10px 14px', borderRadius: 10, marginBottom: 12, background: '#f0fdf4', color: '#15803d', fontWeight: 600, fontSize: 13 }}>{emailMsg}</div>}

            {emailIndividual ? (
              <button onClick={() => enviarEmail()} disabled={enviando} style={btnStyle('linear-gradient(90deg,#4B6CB7,#C94B4B)')}>
                {enviando ? 'Enviando...' : 'Enviar email individual'}
              </button>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => enviarEmail('seller')} disabled={enviando} style={btnStyle('linear-gradient(90deg,#4B6CB7,#C94B4B)')}>
                    {enviando ? '...' : 'Todos los anfitriones'}
                  </button>
                  <button onClick={() => enviarEmail('buyer')} disabled={enviando} style={btnStyle('linear-gradient(90deg,#C94B4B,#F4A020)')}>
                    {enviando ? '...' : 'Todos los viajeros'}
                  </button>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => enviarEmail('seller', true)} disabled={enviando} style={btnStyle('#888')}>
                    {enviando ? '...' : 'Anfitriones sin verificar'}
                  </button>
                  <button onClick={() => enviarEmail('buyer', true)} disabled={enviando} style={btnStyle('#888')}>
                    {enviando ? '...' : 'Viajeros sin verificar'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
