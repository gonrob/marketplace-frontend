'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const textos = {
  es: { flag: '🇦🇷', nombre: 'ES', tagline: 'Hablá con argentinos reales. Viví la cultura.', sub: 'Mate · Truco · Fútbol · Dulce de leche', buscar: 'Buscar anfitriones', inscribirse: 'Inscribirse (Anfitriones & Viajeros)', como: '¿Cómo funciona?', paso1t: 'Elegí un anfitrión', paso1d: 'Filtrá por interés, habilidad o disponibilidad', paso2t: 'Pagá el primer contacto', paso2d: 'Pago seguro con Stripe', paso3t: '¡Conectate!', paso3d: 'A partir del primer contacto, son libres de continuar como quieran', entrar: 'Entrar', miperfil: 'Mi perfil', registrarse: 'Registrarse' },
  en: { flag: '🇬🇧', nombre: 'EN', tagline: 'Talk with real Argentinians. Live the culture.', sub: 'Mate · Truco · Football · Dulce de leche', buscar: 'Find hosts', inscribirse: 'Sign up (Hosts & Travelers)', como: 'How does it work?', paso1t: 'Choose a host', paso1d: 'Filter by interest, skill or availability', paso2t: 'Pay for first contact', paso2d: 'Secure payment with Stripe', paso3t: 'Connect!', paso3d: 'After first contact, you are free to continue however you want', entrar: 'Log in', miperfil: 'My profile', registrarse: 'Sign up' },
  pt: { flag: '🇧🇷', nombre: 'PT', tagline: 'Fale com argentinos reais. Viva a cultura.', sub: 'Mate · Truco · Futebol · Doce de leite', buscar: 'Encontrar anfitriões', inscribirse: 'Cadastrar (Anfitriões & Viajantes)', como: 'Como funciona?', paso1t: 'Escolha um anfitrião', paso1d: 'Filtre por interesse, habilidade ou disponibilidade', paso2t: 'Pague o primeiro contato', paso2d: 'Pagamento seguro com Stripe', paso3t: 'Conecte-se!', paso3d: 'Após o primeiro contato, são livres para continuar como quiserem', entrar: 'Entrar', miperfil: 'Meu perfil', registrarse: 'Cadastrar' },
  fr: { flag: '🇫🇷', nombre: 'FR', tagline: 'Parlez avec de vrais Argentins. Vivez la culture.', sub: 'Maté · Truco · Football · Dulce de leche', buscar: 'Trouver des hôtes', inscribirse: "S'inscrire (Hôtes & Voyageurs)", como: 'Comment ça marche?', paso1t: 'Choisissez un hôte', paso1d: 'Filtrez par intérêt, compétence ou disponibilité', paso2t: 'Payez le premier contact', paso2d: 'Paiement sécurisé avec Stripe', paso3t: 'Connectez-vous!', paso3d: 'Après le premier contact, vous êtes libres de continuer comme vous voulez', entrar: 'Se connecter', miperfil: 'Mon profil', registrarse: "S'inscrire" },
  it: { flag: '🇮🇹', nombre: 'IT', tagline: 'Parla con veri argentini. Vivi la cultura.', sub: 'Mate · Truco · Calcio · Dulce de leche', buscar: 'Trova host', inscribirse: 'Iscriviti (Host & Viaggiatori)', como: 'Come funziona?', paso1t: 'Scegli un host', paso1d: 'Filtra per interesse, abilità o disponibilità', paso2t: 'Paga il primo contatto', paso2d: 'Pagamento sicuro con Stripe', paso3t: 'Connettiti!', paso3d: 'Dopo il primo contatto, siete liberi di continuare come volete', entrar: 'Accedi', miperfil: 'Il mio profilo', registrarse: 'Iscriviti' },
  de: { flag: '🇩🇪', nombre: 'DE', tagline: 'Sprich mit echten Argentiniern. Erlebe die Kultur.', sub: 'Mate · Truco · Fußball · Dulce de leche', buscar: 'Gastgeber finden', inscribirse: 'Registrieren (Gastgeber & Reisende)', como: 'Wie funktioniert es?', paso1t: 'Wähle einen Gastgeber', paso1d: 'Filtere nach Interesse, Fähigkeit oder Verfügbarkeit', paso2t: 'Zahle den ersten Kontakt', paso2d: 'Sichere Zahlung mit Stripe', paso3t: 'Verbinde dich!', paso3d: 'Nach dem ersten Kontakt könnt ihr wie ihr wollt weitermachen', entrar: 'Anmelden', miperfil: 'Mein Profil', registrarse: 'Registrieren' },
  zh: { flag: '🇨🇳', nombre: 'ZH', tagline: '与真正的阿根廷人交流。体验文化。', sub: '马黛茶 · 特鲁科 · 足球 · 牛奶焦糖', buscar: '寻找主人', inscribirse: '注册（主人和旅行者）', como: '怎么运作？', paso1t: '选择主人', paso1d: '按兴趣、技能或可用性筛选', paso2t: '支付第一次联系费用', paso2d: '通过Stripe安全支付', paso3t: '联系！', paso3d: '第一次联系后，你们可以自由地继续', entrar: '登录', miperfil: '我的资料', registrarse: '注册' },
  ru: { flag: '🇷🇺', nombre: 'RU', tagline: 'Общайтесь с настоящими аргентинцами. Живите культурой.', sub: 'Мате · Труко · Футбол · Дульсе де лече', buscar: 'Найти хозяина', inscribirse: 'Зарегистрироваться (Хозяева и путешественники)', como: 'Как это работает?', paso1t: 'Выберите хозяина', paso1d: 'Фильтруйте по интересам, навыкам или доступности', paso2t: 'Оплатите первый контакт', paso2d: 'Безопасная оплата через Stripe', paso3t: 'Свяжитесь!', paso3d: 'После первого контакта вы свободны продолжать как хотите', entrar: 'Войти', miperfil: 'Мой профиль', registrarse: 'Зарегистрироваться' },
};

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [lang, setLang] = useState('es');
  const [showLangs, setShowLangs] = useState(false);
  const t = textos[lang];

  useEffect(() => { setLoggedIn(!!localStorage.getItem('token')); }, []);

  return (
    <>
      <nav className="nav">
        <span className="nav-logo">Argen<span>talk</span> 🧉</span>
        <div className="nav-links" style={{ alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowLangs(!showLangs)} style={{ width: 'auto', padding: '6px 10px', fontSize: 15, background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: 8, cursor: 'pointer', color: 'white' }}>
              {t.flag} {t.nombre}
            </button>
            {showLangs && (
              <div style={{ position: 'absolute', right: 0, top: 36, background: 'white', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.15)', padding: 8, zIndex: 200, minWidth: 140 }}>
                {Object.entries(textos).map(([code, tx]) => (
                  <button key={code} onClick={() => { setLang(code); setShowLangs(false); }} style={{ width: '100%', padding: '8px 12px', background: lang === code ? '#EBF2FF' : 'white', border: 'none', borderRadius: 8, cursor: 'pointer', textAlign: 'left', fontSize: 14, color: '#1a1a1a', display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span>{tx.flag}</span><span>{tx.nombre}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          {loggedIn ? (
            <Link href="/dashboard">{t.miperfil}</Link>
          ) : (
            <><Link href="/login">{t.entrar}</Link><Link href="/register">{t.registrarse}</Link></>
          )}
        </div>
      </nav>

      <div style={{ background: '#003DA5', padding: '40px 20px 60px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🧉</div>
        <h1 style={{ color: 'white', fontSize: 32, marginBottom: 10 }}>Argen<span style={{ color: '#F4A020' }}>talk</span></h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, marginBottom: 8 }}>{t.tagline}</p>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, marginBottom: 28 }}>{t.sub}</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/explorar"><button className="btn-orange" style={{ width: 'auto', padding: '13px 28px' }}>{t.buscar}</button></Link>
          <Link href="/register"><button style={{ width: 'auto', padding: '13px 28px', background: 'transparent', border: '2px solid white', color: 'white' }}>{t.inscribirse}</button></Link>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: '-30px auto 0', padding: '0 20px 40px' }}>
        <div className="cultura-grid" style={{ marginTop: 0 }}>
          <Link href="/cultura/mate" className="cultura-item"><span className="cultura-icon">🧉</span><div className="cultura-label">Mate</div></Link>
          <Link href="/cultura/truco" className="cultura-item"><span className="cultura-icon">🃏</span><div className="cultura-label">Truco</div></Link>
          <Link href="/cultura/futbol" className="cultura-item"><span className="cultura-icon">⚽</span><div className="cultura-label">Fútbol</div></Link>
          <Link href="/cultura/dulce" className="cultura-item"><span className="cultura-icon">🍮</span><div className="cultura-label">Dulce de leche</div></Link>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h2>{t.como}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, textAlign: 'left', marginTop: 16 }}>
            {[
              { n: 1, title: t.paso1t, desc: t.paso1d },
              { n: 2, title: t.paso2t, desc: t.paso2d },
              { n: 3, title: t.paso3t, desc: t.paso3d },
            ].map(s => (
              <div key={s.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: s.n === 3 ? '#F4A020' : '#003DA5', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{s.n}</div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{s.title}</div>
                  <div style={{ fontSize: 14, color: '#666' }}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ background: '#009ee3', textAlign: 'center' }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>💙</div>
          <div style={{ color: 'white', fontWeight: 700, fontSize: 16, marginBottom: 6 }}>
            {lang === 'es' ? '¿Viajás a Argentina?' : lang === 'en' ? 'Traveling to Argentina?' : lang === 'pt' ? 'Viajando para Argentina?' : lang === 'fr' ? 'Vous voyagez en Argentine?' : lang === 'it' ? 'Viaggi in Argentina?' : lang === 'de' ? 'Reist du nach Argentinien?' : lang === 'zh' ? '去阿根廷旅行？' : 'Путешествуете в Аргентину?'}
          </div>
          <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 16 }}>
            {lang === 'es' ? 'Creá tu cuenta de Mercado Pago gratis para pagar en Argentina' : lang === 'en' ? 'Create your free Mercado Pago account to pay in Argentina' : lang === 'pt' ? 'Crie sua conta Mercado Pago grátis para pagar na Argentina' : 'Create your free Mercado Pago account to pay in Argentina'}
          </div>
          <a href="https://www.mercadopago.com.ar/hub/registration/start" target="_blank" rel="noopener noreferrer">
            <button style={{ background: 'white', color: '#009ee3', border: 'none', borderRadius: 10, padding: '12px 24px', fontWeight: 700, fontSize: 14, cursor: 'pointer', width: 'auto' }}>
              {lang === 'es' ? 'Crear cuenta Mercado Pago' : lang === 'en' ? 'Create Mercado Pago account' : 'Crear cuenta Mercado Pago'}
            </button>
          </a>
        </div>
      </div>
    </>
  );
}