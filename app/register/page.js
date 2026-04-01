'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';

const T = {
  es:{titulo:'Unete a Argentalk',soy:'Soy...',anfitrionTitulo:'Anfitrion argentino',anfitrionDesc:'Quiero compartir mi cultura y ganar dinero extra',viajeroTitulo:'Viajero / Extranjero',viajeroDesc:'Quiero conocer argentinos y la cultura — Gratis para registrarse',yaTenes:'Ya tenes cuenta?',entrar:'Entrar',tusDatos:'Tus datos',nombre:'Nombre',apellido:'Apellido',email:'Email',contrasena:'Contrasena',minimo:'Minimo 6 caracteres',telefono:'Telefono',ciudad:'Ciudad',ciudadPlaceholder:'Buenos Aires, Mendoza...',pais:'Pais de residencia',paisPlaceholder:'Espana, Italia, USA...',atras:'Atras',siguiente:'Siguiente',registrarGratis:'Registrarme gratis',creando:'Creando...',gratis:'El registro es gratis. Solo pagas cuando elegis un anfitrion.',cobrar:'Como queres cobrar?',mp:'Mercado Pago',mpDesc:'Recomendado para Argentina',banco:'Cuenta bancaria',bancoDesc:'CBU o alias',mpEmail:'Email o telefono de Mercado Pago',cbu:'CBU o alias',crearCuenta:'Crear cuenta',creandoCuenta:'Creando cuenta...'},
  en:{titulo:'Join Argentalk',soy:'I am...',anfitrionTitulo:'Argentine host',anfitrionDesc:'I want to share my culture and earn extra money',viajeroTitulo:'Traveler / Foreigner',viajeroDesc:'I want to meet Argentinians and their culture — Free to register',yaTenes:'Already have an account?',entrar:'Log in',tusDatos:'Your details',nombre:'First name',apellido:'Last name',email:'Email',contrasena:'Password',minimo:'Minimum 6 characters',telefono:'Phone',ciudad:'City',ciudadPlaceholder:'Buenos Aires, Mendoza...',pais:'Country of residence',paisPlaceholder:'Spain, Italy, USA...',atras:'Back',siguiente:'Next',registrarGratis:'Register for free',creando:'Creating...',gratis:'Registration is free. You only pay when you choose a host.',cobrar:'How do you want to get paid?',mp:'Mercado Pago',mpDesc:'Recommended for Argentina',banco:'Bank account',bancoDesc:'CBU or alias',mpEmail:'Mercado Pago email or phone',cbu:'CBU or alias',crearCuenta:'Create account',creandoCuenta:'Creating account...'},
  pt:{titulo:'Entre no Argentalk',soy:'Sou...',anfitrionTitulo:'Anfitrião argentino',anfitrionDesc:'Quero compartilhar minha cultura e ganhar dinheiro extra',viajeroTitulo:'Viajante / Estrangeiro',viajeroDesc:'Quero conhecer argentinos e a cultura — Grátis para se cadastrar',yaTenes:'Já tem conta?',entrar:'Entrar',tusDatos:'Seus dados',nombre:'Nome',apellido:'Sobrenome',email:'Email',contrasena:'Senha',minimo:'Mínimo 6 caracteres',telefono:'Telefone',ciudad:'Cidade',ciudadPlaceholder:'Buenos Aires, Mendoza...',pais:'País de residência',paisPlaceholder:'Espanha, Itália, EUA...',atras:'Voltar',siguiente:'Próximo',registrarGratis:'Cadastrar grátis',creando:'Criando...',gratis:'O cadastro é gratuito. Você só paga quando escolhe um anfitrião.',cobrar:'Como quer receber?',mp:'Mercado Pago',mpDesc:'Recomendado para Argentina',banco:'Conta bancária',bancoDesc:'CBU ou alias',mpEmail:'Email ou telefone do Mercado Pago',cbu:'CBU ou alias',crearCuenta:'Criar conta',creandoCuenta:'Criando conta...'},
  fr:{titulo:'Rejoindre Argentalk',soy:'Je suis...',anfitrionTitulo:'Hôte argentin',anfitrionDesc:'Je veux partager ma culture et gagner de l\'argent',viajeroTitulo:'Voyageur / Étranger',viajeroDesc:'Je veux rencontrer des Argentins — Inscription gratuite',yaTenes:'Vous avez déjà un compte?',entrar:'Se connecter',tusDatos:'Vos informations',nombre:'Prénom',apellido:'Nom',email:'Email',contrasena:'Mot de passe',minimo:'Minimum 6 caractères',telefono:'Téléphone',ciudad:'Ville',ciudadPlaceholder:'Buenos Aires, Mendoza...',pais:'Pays de résidence',paisPlaceholder:'Espagne, Italie, USA...',atras:'Retour',siguiente:'Suivant',registrarGratis:'S\'inscrire gratuitement',creando:'Création...',gratis:'L\'inscription est gratuite. Vous ne payez que lorsque vous choisissez un hôte.',cobrar:'Comment voulez-vous être payé?',mp:'Mercado Pago',mpDesc:'Recommandé pour l\'Argentine',banco:'Compte bancaire',bancoDesc:'CBU ou alias',mpEmail:'Email ou téléphone Mercado Pago',cbu:'CBU ou alias',crearCuenta:'Créer un compte',creandoCuenta:'Création du compte...'},
  it:{titulo:'Unisciti ad Argentalk',soy:'Sono...',anfitrionTitulo:'Host argentino',anfitrionDesc:'Voglio condividere la mia cultura e guadagnare soldi extra',viajeroTitulo:'Viaggiatore / Straniero',viajeroDesc:'Voglio conoscere argentini e la loro cultura — Registrazione gratuita',yaTenes:'Hai già un account?',entrar:'Accedi',tusDatos:'I tuoi dati',nombre:'Nome',apellido:'Cognome',email:'Email',contrasena:'Password',minimo:'Minimo 6 caratteri',telefono:'Telefono',ciudad:'Città',ciudadPlaceholder:'Buenos Aires, Mendoza...',pais:'Paese di residenza',paisPlaceholder:'Spagna, Italia, USA...',atras:'Indietro',siguiente:'Avanti',registrarGratis:'Registrati gratis',creando:'Creazione...',gratis:'La registrazione è gratuita. Paghi solo quando scegli un host.',cobrar:'Come vuoi essere pagato?',mp:'Mercado Pago',mpDesc:'Consigliato per Argentina',banco:'Conto bancario',bancoDesc:'CBU o alias',mpEmail:'Email o telefono Mercado Pago',cbu:'CBU o alias',crearCuenta:'Crea account',creandoCuenta:'Creazione account...'},
  de:{titulo:'Argentalk beitreten',soy:'Ich bin...',anfitrionTitulo:'Argentinischer Gastgeber',anfitrionDesc:'Ich möchte meine Kultur teilen und Geld verdienen',viajeroTitulo:'Reisender / Ausländer',viajeroDesc:'Ich möchte Argentinier kennenlernen — Kostenlose Registrierung',yaTenes:'Haben Sie bereits ein Konto?',entrar:'Anmelden',tusDatos:'Ihre Daten',nombre:'Vorname',apellido:'Nachname',email:'E-Mail',contrasena:'Passwort',minimo:'Mindestens 6 Zeichen',telefono:'Telefon',ciudad:'Stadt',ciudadPlaceholder:'Buenos Aires, Mendoza...',pais:'Wohnsitzland',paisPlaceholder:'Spanien, Italien, USA...',atras:'Zurück',siguiente:'Weiter',registrarGratis:'Kostenlos registrieren',creando:'Erstellen...',gratis:'Die Registrierung ist kostenlos. Sie zahlen nur, wenn Sie einen Gastgeber wählen.',cobrar:'Wie möchten Sie bezahlt werden?',mp:'Mercado Pago',mpDesc:'Empfohlen für Argentinien',banco:'Bankkonto',bancoDesc:'CBU oder Alias',mpEmail:'Mercado Pago E-Mail oder Telefon',cbu:'CBU oder Alias',crearCuenta:'Konto erstellen',creandoCuenta:'Konto wird erstellt...'},
  zh:{titulo:'加入Argentalk',soy:'我是...',anfitrionTitulo:'阿根廷主人',anfitrionDesc:'我想分享我的文化并赚取额外收入',viajeroTitulo:'旅行者/外国人',viajeroDesc:'我想认识阿根廷人和他们的文化 — 免费注册',yaTenes:'已有账户?',entrar:'登录',tusDatos:'您的信息',nombre:'名字',apellido:'姓氏',email:'电子邮件',contrasena:'密码',minimo:'最少6个字符',telefono:'电话',ciudad:'城市',ciudadPlaceholder:'布宜诺斯艾利斯...',pais:'居住国',paisPlaceholder:'西班牙，意大利，美国...',atras:'返回',siguiente:'下一步',registrarGratis:'免费注册',creando:'创建中...',gratis:'注册是免费的。只有当您选择主人时才需付款。',cobrar:'您想如何收款?',mp:'Mercado Pago',mpDesc:'推荐用于阿根廷',banco:'银行账户',bancoDesc:'CBU或别名',mpEmail:'Mercado Pago邮箱或电话',cbu:'CBU或别名',crearCuenta:'创建账户',creandoCuenta:'创建账户中...'},
  ru:{titulo:'Присоединиться к Argentalk',soy:'Я...',anfitrionTitulo:'Аргентинский хозяин',anfitrionDesc:'Хочу делиться культурой и зарабатывать деньги',viajeroTitulo:'Путешественник / Иностранец',viajeroDesc:'Хочу познакомиться с аргентинцами — Бесплатная регистрация',yaTenes:'Уже есть аккаунт?',entrar:'Войти',tusDatos:'Ваши данные',nombre:'Имя',apellido:'Фамилия',email:'Эл. почта',contrasena:'Пароль',minimo:'Минимум 6 символов',telefono:'Телефон',ciudad:'Город',ciudadPlaceholder:'Буэнос-Айрес...',pais:'Страна проживания',paisPlaceholder:'Испания, Италия, США...',atras:'Назад',siguiente:'Далее',registrarGratis:'Зарегистрироваться бесплатно',creando:'Создание...',gratis:'Регистрация бесплатна. Вы платите только когда выбираете хозяина.',cobrar:'Как вы хотите получать оплату?',mp:'Mercado Pago',mpDesc:'Рекомендуется для Аргентины',banco:'Банковский счёт',bancoDesc:'CBU или псевдоним',mpEmail:'Email или телефон Mercado Pago',cbu:'CBU или псевдоним',crearCuenta:'Создать аккаунт',creandoCuenta:'Создание аккаунта...'},
};

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [lang, setLang] = useState('es');
  const [form, setForm] = useState({ email:'', password:'', nombre:'', apellido:'', telefono:'', ciudad:'', pais:'', metodoPago:'', cuentaPago:'' });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(f => ({...f,[k]:v}));

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
  }, []);

  const t = T[lang] || T.es;

  const submit = async () => {
    setError(''); setLoading(true);
    try {
      const res = await api.post('/api/auth/register', {
        email: form.email, password: form.password,
        nombre: `${form.nombre} ${form.apellido}`.trim(),
        role, telefono: form.telefono, ciudad: form.ciudad,
        pais: form.pais, metodoPago: form.metodoPago, cuentaPago: form.cuentaPago
      });
      localStorage.setItem('token', res.data.token);
      router.push('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrarse.');
      setStep(2);
    } finally { setLoading(false); }
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div className="card">
          {step === 1 && (
            <>
              <h1>{t.titulo}</h1>
              <p style={{color:'#666',marginBottom:24,fontSize:15}}>{t.soy}</p>
              <div style={{display:'flex',flexDirection:'column',gap:12}}>
                <button onClick={() => {setRole('seller');setStep(2);}} style={{background:'white',color:'#003DA5',border:'2px solid #003DA5',borderRadius:12,padding:20,textAlign:'left',cursor:'pointer'}}>
                  <div style={{fontSize:28,marginBottom:8}}>🇦🇷</div>
                  <div style={{fontWeight:700,fontSize:17,marginBottom:4}}>{t.anfitrionTitulo}</div>
                  <div style={{fontSize:14,color:'#666'}}>{t.anfitrionDesc}</div>
                </button>
                <button onClick={() => {setRole('buyer');setStep(2);}} style={{background:'white',color:'#F4A020',border:'2px solid #F4A020',borderRadius:12,padding:20,textAlign:'left',cursor:'pointer'}}>
                  <div style={{fontSize:28,marginBottom:8}}>🌍</div>
                  <div style={{fontWeight:700,fontSize:17,marginBottom:4}}>{t.viajeroTitulo}</div>
                  <div style={{fontSize:14,color:'#666'}}>{t.viajeroDesc}</div>
                </button>
              </div>
              <div className="link">{t.yaTenes} <Link href="/login">{t.entrar}</Link></div>
            </>
          )}

          {step === 2 && (
            <>
              <h1>{t.tusDatos}</h1>
              {error && <div className="error">{error}</div>}
              <div className="form-group"><label>{t.nombre}</label><input value={form.nombre} onChange={e => set('nombre',e.target.value)} required /></div>
              <div className="form-group"><label>{t.apellido}</label><input value={form.apellido} onChange={e => set('apellido',e.target.value)} required /></div>
              <div className="form-group"><label>{t.email}</label><input type="email" value={form.email} onChange={e => set('email',e.target.value)} required /></div>
              <div className="form-group">
                <label>{t.contrasena}</label>
                <div style={{position:'relative'}}>
                  <input type={showPass?'text':'password'} placeholder={t.minimo} value={form.password} onChange={e => set('password',e.target.value)} style={{paddingRight:50}} required />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',width:'auto',padding:'4px 8px',background:'none',border:'none',color:'#888',fontSize:13,cursor:'pointer'}}>
                    {showPass ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="form-group"><label>{t.telefono}</label><input value={form.telefono} onChange={e => set('telefono',e.target.value)} /></div>
              {role === 'seller' && <div className="form-group"><label>{t.ciudad}</label><input placeholder={t.ciudadPlaceholder} value={form.ciudad} onChange={e => set('ciudad',e.target.value)} /></div>}
              {role === 'buyer' && <div className="form-group"><label>{t.pais}</label><input placeholder={t.paisPlaceholder} value={form.pais} onChange={e => set('pais',e.target.value)} /></div>}
              <div style={{display:'flex',gap:10}}>
                <button className="btn-secondary" onClick={() => setStep(1)} style={{flex:1}}>{t.atras}</button>
                <button onClick={() => {
                  if (!form.nombre||!form.email||!form.password) { setError('Required fields missing.'); return; }
                  if (form.password.length < 6) { setError(t.minimo); return; }
                  setError('');
                  if (role === 'buyer') { submit(); } else { setStep(3); }
                }} style={{flex:2}} disabled={loading}>
                  {role === 'buyer' ? (loading ? t.creando : t.registrarGratis) : t.siguiente}
                </button>
              </div>
              {role === 'buyer' && <div style={{marginTop:16,background:'#f0fff4',borderRadius:10,padding:12,fontSize:13,color:'#065f46'}}>✅ {t.gratis}</div>}
            </>
          )}

          {step === 3 && role === 'seller' && (
            <>
              <h1>{t.cobrar}</h1>
              {error && <div className="error">{error}</div>}
              <p style={{fontSize:13,color:'#003DA5',fontWeight:600,marginBottom:12}}>85% / 15% Argentalk</p>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginBottom:16}}>
                <button onClick={() => set('metodoPago','mercadopago')} style={{background:form.metodoPago==='mercadopago'?'#009ee3':'white',color:form.metodoPago==='mercadopago'?'white':'#009ee3',border:'2px solid #009ee3',borderRadius:12,padding:16,textAlign:'left',cursor:'pointer'}}>
                  <div style={{fontWeight:700,fontSize:16}}>💙 {t.mp}</div>
                  <div style={{fontSize:13,marginTop:4,opacity:0.8}}>{t.mpDesc}</div>
                </button>
                <button onClick={() => set('metodoPago','banco')} style={{background:form.metodoPago==='banco'?'#003DA5':'white',color:form.metodoPago==='banco'?'white':'#003DA5',border:'2px solid #003DA5',borderRadius:12,padding:16,textAlign:'left',cursor:'pointer'}}>
                  <div style={{fontWeight:700,fontSize:16}}>🏦 {t.banco}</div>
                  <div style={{fontSize:13,marginTop:4,opacity:0.8}}>{t.bancoDesc}</div>
                </button>
              </div>
              {form.metodoPago === 'mercadopago' && <div className="form-group"><label>{t.mpEmail}</label><input value={form.cuentaPago} onChange={e => set('cuentaPago',e.target.value)} /></div>}
              {form.metodoPago === 'banco' && <div className="form-group"><label>{t.cbu}</label><input value={form.cuentaPago} onChange={e => set('cuentaPago',e.target.value)} /></div>}
              <div style={{display:'flex',gap:10,marginTop:8}}>
                <button className="btn-secondary" onClick={() => setStep(2)} style={{flex:1}}>{t.atras}</button>
                <button className="btn-orange" onClick={submit} disabled={loading||!form.metodoPago} style={{flex:2}}>
                  {loading ? t.creandoCuenta : t.crearCuenta}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}