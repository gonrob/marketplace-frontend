'use client';
import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function ResetContent() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [showPass, setShowPass] = useState(false);

  const handleReset = async () => {
    if (password.length < 6) return setMsg('Mínimo 6 caracteres.');
    if (password !== password2) return setMsg('Las contraseñas no coinciden.');
    setLoading(true);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMsg('✅ Contraseña actualizada. Podés iniciar sesión.');
        setTimeout(() => router.push('/login'), 2000);
      } else {
        setMsg('❌ ' + (data.error || 'Error'));
      }
    } catch {
      setMsg('❌ Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.92)', padding: 20 }}>
      <div style={{ background: '#fff', borderRadius: 20, maxWidth: 400, width: '100%', padding: '32px 28px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{ fontSize: 40 }}>🔑</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '8px 0 4px' }}>Nueva contraseña</h2>
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Nueva contraseña</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" style={{ flex: 1, padding: '10px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none' }} />
            <button onClick={() => setShowPass(p => !p)} style={{ background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: 8, padding: '8px 10px', cursor: 'pointer' }}>{showPass ? '🙈' : '👁️'}</button>
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Repetir contraseña</label>
          <input type={showPass ? 'text' : 'password'} value={password2} onChange={e => setPassword2(e.target.value)} placeholder="Repetí la contraseña" style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none', boxSizing: 'border-box' }} />
        </div>

        {msg && <div style={{ padding: '10px 14px', borderRadius: 10, marginBottom: 14, fontSize: 13, fontWeight: 600, background: msg.includes('✅') ? '#f0fdf4' : '#fff0f0', color: msg.includes('✅') ? '#15803d' : '#c94b4b' }}>{msg}</div>}

        <button onClick={handleReset} disabled={loading} style={{ width: '100%', padding: 13, borderRadius: 12, border: 'none', background: loading ? '#ccc' : 'linear-gradient(90deg,#4B6CB7,#C94B4B)', color: '#fff', fontSize: 15, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Guardando...' : 'Guardar nueva contraseña'}
        </button>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ResetContent />
    </Suspense>
  );
}
