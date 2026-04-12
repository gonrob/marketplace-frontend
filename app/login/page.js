'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('verified=1')) {
      setSuccess('✅ Email verificado. Ya podés iniciar sesión.');
    }
  }, []);
  const [loading, setLoading] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await api.post('/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesion.');
    } finally { setLoading(false); }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          <h1>Iniciar sesion</h1>
          {success && <div className="success">{success}</div>}
          {error && <div className="error">{error}</div>}
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({...form,email:e.target.value})} required />
            </div>
            <div className="form-group">
              <label>Contrasena</label>
              <div style={{position:'relative'}}>
                <input type={showPass?'text':'password'} placeholder="Tu contrasena" value={form.password} onChange={e => setForm({...form,password:e.target.value})} style={{paddingRight:50}} required />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',width:'auto',padding:'4px 8px',background:'none',border:'none',color:'#888',fontSize:16,cursor:'pointer'}}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
          </form>
          <div className="link">¿Olvidaste tu contraseña? <a href='/forgot-password' style={{color:'#C94B4B'}}>Recuperar</a><br/>Sin cuenta? <Link href="/register">Registrarse</Link></div>
        </div>
      </div>
    </>
  );
}
