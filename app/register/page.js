'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';

const T = {
  es:{titulo:'Crear cuenta',elige:'¿Sos anfitrión o viajero?',anfitrion:'🏠 Soy anfitrión',anfitrionDesc:'Quiero compartir mi cultura y ganar dinero',pareja:'👫 Somos anfitriones pareja',parejaDesc:'Ofrecemos experiencias juntos como pareja',parejaAviso:'¡Genial! Como anfitrión pareja podés ofrecer experiencias juntos. También podés agregar experiencias en solitario desde tu perfil cuando quieras.',nombrePareja:'Nombre de tu pareja',viajero:'🌍 Soy viajero',viajeroDesc:'Quiero conectar con argentinos reales',siguiente:'Siguiente',nombre:'Nombre',apellido:'Apellido',email:'Email',telefono:'Teléfono (WhatsApp)',password:'Contraseña',registrar:'Crear cuenta',cargando:'Creando cuenta...',yaRegistrado:'Ya tengo cuenta',login:'Iniciar sesión',metodoPago:'Método de cobro',mercadopago:'Mercado Pago',transferencia:'Transferencia bancaria',cuentaPago:'Email MP o CBU/Alias',intro:'¿Cómo funciona para anfitriones?',i1:'Te inscribís y verificás tus datos personales.',i2:'Elegís tu precio por hora de servicio — ese monto lo recibís vos íntegro. Ejemplo: guía turístico, profesor de castellano.',i3:'Cuando un viajero quiere contactarte, paga USD 0.50. Vos recibís USD 0.25 y Knowan USD 0.25.',i4:'Una vez conectados, acordás el precio de tu servicio directamente con el viajero fuera de la app.',i5:'Retirás tus ganancias cuando quieras por Mercado Pago o transferencia bancaria.',confirmar:'Revisá tu email para confirmar tu cuenta.',error:'Error al crear cuenta.'},
  en:{titulo:'Create account',elige:'Are you a host or traveler?',anfitrion:'🏠 I am a host',anfitrionDesc:'I want to share my culture and earn money',pareja:'👫 We are a couple host',parejaDesc:'We offer experiences together as a couple',parejaAviso:'Great! As a couple host you can offer experiences together. You can also add solo experiences from your profile anytime.',nombrePareja:'Your partner name',viajero:'🌍 I am a traveler',viajeroDesc:'I want to connect with real Argentinians',siguiente:'Next',nombre:'First name',apellido:'Last name',email:'Email',telefono:'Phone (WhatsApp)',password:'Password',registrar:'Create account',cargando:'Creating account...',yaRegistrado:'Already have an account',login:'Log in',metodoPago:'Payment method',mercadopago:'Mercado Pago',transferencia:'Bank transfer',cuentaPago:'MP Email or CBU/Alias',intro:'How does it work for hosts?',i1:'You sign up and verify your personal details.',i2:'You set your price per hour of service — you receive that amount in full. Example: tour guide, Spanish teacher.',i3:'When a traveler wants to contact you, they pay USD 0.50. You receive USD 0.25 and Knowan USD 0.25.',i4:'Once connected, you agree on your service price directly with the traveler outside the app.',i5:'You withdraw your earnings whenever you want via Mercado Pago or bank transfer.',confirmar:'Check your email to confirm your account.',error:'Error creating account.'},
  pt:{titulo:'Criar conta',elige:'Voce e anfitriao ou viajante?',anfitrion:'🏠 Sou anfitriao',anfitrionDesc:'Quero compartilhar minha cultura e ganhar dinheiro',pareja:'👫 Somos anfitriões casal',parejaDesc:'Oferecemos experiências juntos como casal',parejaAviso:'Ótimo! Como anfitrião casal você pode oferecer experiências juntos. Você também pode adicionar experiências solo do seu perfil.',nombrePareja:'Nome do seu parceiro/a',viajero:'🌍 Sou viajante',viajeroDesc:'Quero conectar com argentinos reais',siguiente:'Proximo',nombre:'Nome',apellido:'Sobrenome',email:'Email',telefono:'Telefone (WhatsApp)',password:'Senha',registrar:'Criar conta',cargando:'Criando conta...',yaRegistrado:'Ja tenho conta',login:'Entrar',metodoPago:'Metodo de pagamento',mercadopago:'Mercado Pago',transferencia:'Transferencia bancaria',cuentaPago:'Email MP ou CBU/Alias',intro:'Como funciona para anfitrioes?',i1:'Voce se cadastra e verifica seus dados pessoais.',i2:'Voce escolhe seu preco por hora de servico — esse valor voce recebe integralmente.',i3:'Quando um viajante quer te contatar, ele paga USD 0.50. Voce recebe USD 0.25 e Knowan USD 0.25.',i4:'Uma vez conectados, voce combina o preco do seu servico diretamente com o viajante fora do app.',i5:'Voce retira seus ganhos quando quiser via Mercado Pago ou transferencia bancaria.',confirmar:'Verifique seu email para confirmar sua conta.',error:'Erro ao criar conta.'},
  fr:{titulo:'Creer un compte',elige:'Etes-vous hote ou voyageur?',anfitrion:'🏠 Je suis hote',anfitrionDesc:'Je veux partager ma culture et gagner de largent',pareja:'👫 Nous sommes hôtes en couple',parejaDesc:'Nous offrons des expériences ensemble en couple',parejaAviso:'Super! En tant qu hôte couple vous pouvez proposer des expériences ensemble. Vous pouvez aussi ajouter des expériences en solo depuis votre profil.',nombrePareja:'Prénom de votre partenaire',viajero:'🌍 Je suis voyageur',viajeroDesc:'Je veux rencontrer de vrais Argentins',siguiente:'Suivant',nombre:'Prenom',apellido:'Nom',email:'Email',telefono:'Telephone (WhatsApp)',password:'Mot de passe',registrar:'Creer un compte',cargando:'Creation...',yaRegistrado:'Jai deja un compte',login:'Se connecter',metodoPago:'Methode de paiement',mercadopago:'Mercado Pago',transferencia:'Virement bancaire',cuentaPago:'Email MP ou CBU/Alias',intro:'Comment ca fonctionne pour les hotes?',i1:'Vous vous inscrivez et verifiez vos donnees personnelles.',i2:'Vous fixez votre prix par heure de service — vous recevez ce montant en totalite.',i3:'Quand un voyageur veut vous contacter, il paie USD 0.50. Vous recevez USD 0.25 et Knowan USD 0.25.',i4:'Une fois connectes, vous convenez du prix de votre service directement avec le voyageur.',i5:'Vous retirez vos gains quand vous voulez via Mercado Pago ou virement bancaire.',confirmar:'Verifiez votre email pour confirmer votre compte.',error:'Erreur lors de la creation du compte.'},
  it:{titulo:'Crea account',elige:'Sei host o viaggiatore?',anfitrion:'🏠 Sono host',anfitrionDesc:'Voglio condividere la mia cultura e guadagnare',pareja:'👫 Siamo host coppia',parejaDesc:'Offriamo esperienze insieme come coppia',parejaAviso:'Ottimo! Come host coppia potete offrire esperienze insieme. Potete anche aggiungere esperienze in solitaria dal vostro profilo.',nombrePareja:'Nome del tuo partner',viajero:'🌍 Sono viaggiatore',viajeroDesc:'Voglio connettermi con veri argentini',siguiente:'Avanti',nombre:'Nome',apellido:'Cognome',email:'Email',telefono:'Telefono (WhatsApp)',password:'Password',registrar:'Crea account',cargando:'Creazione...',yaRegistrado:'Ho gia un account',login:'Accedi',metodoPago:'Metodo di pagamento',mercadopago:'Mercado Pago',transferencia:'Bonifico bancario',cuentaPago:'Email MP o CBU/Alias',intro:'Come funziona per gli host?',i1:'Ti registri e verifichi i tuoi dati personali.',i2:'Scegli il tuo prezzo per ora di servizio — ricevi quell importo per intero.',i3:'Quando un viaggiatore vuole contattarti, paga USD 0.50. Tu ricevi USD 0.25 e Knowan USD 0.25.',i4:'Una volta connessi, concordate il prezzo del servizio direttamente con il viaggiatore.',i5:'Ritiri i tuoi guadagni quando vuoi tramite Mercado Pago o bonifico bancario.',confirmar:'Controlla la tua email per confermare il tuo account.',error:'Errore nella creazione account.'},
  de:{titulo:'Konto erstellen',elige:'Sind Sie Gastgeber oder Reisender?',anfitrion:'🏠 Ich bin Gastgeber',anfitrionDesc:'Ich mochte meine Kultur teilen und Geld verdienen',pareja:'👫 Wir sind ein Gastgeberpaar',parejaDesc:'Wir bieten Erlebnisse gemeinsam als Paar an',parejaAviso:'Super! Als Gastgeberpaar könnt ihr gemeinsam Erlebnisse anbieten. Ihr könnt auch Solo-Erlebnisse aus eurem Profil hinzufügen.',nombrePareja:'Name deines Partners',viajero:'🌍 Ich bin Reisender',viajeroDesc:'Ich mochte echte Argentinier kennenlernen',siguiente:'Weiter',nombre:'Vorname',apellido:'Nachname',email:'Email',telefono:'Telefon (WhatsApp)',password:'Passwort',registrar:'Konto erstellen',cargando:'Erstellen...',yaRegistrado:'Ich habe bereits ein Konto',login:'Anmelden',metodoPago:'Zahlungsmethode',mercadopago:'Mercado Pago',transferencia:'Bankuberweisung',cuentaPago:'MP Email oder CBU/Alias',intro:'Wie funktioniert es fur Gastgeber?',i1:'Sie registrieren sich und verifizieren Ihre personlichen Daten.',i2:'Sie legen Ihren Preis pro Stunde fest — diesen Betrag erhalten Sie vollstandig.',i3:'Wenn ein Reisender Sie kontaktieren mochte, zahlt er USD 0.50. Sie erhalten USD 0.25 und Knowan USD 0.25.',i4:'Einmal verbunden, vereinbaren Sie den Preis Ihres Dienstes direkt mit dem Reisenden.',i5:'Sie heben Ihre Einnahmen jederzeit uber Mercado Pago oder Bankuberweisung ab.',confirmar:'Prufen Sie Ihre E-Mail zur Bestatigung.',error:'Fehler beim Erstellen des Kontos.'},
  zh:{titulo:'创建账户',elige:'您是主人还是旅行者?',anfitrion:'🏠 我是主人',anfitrionDesc:'我想分享我的文化并赚钱',pareja:'👫 我们是情侣主人',parejaDesc:'我们作为情侣一起提供体验',parejaAviso:'太好了！作为情侣主人，您可以一起提供体验。您也可以随时从个人资料中添加单人体验。',nombrePareja:'您伴侣的姓名',viajero:'🌍 我是旅行者',viajeroDesc:'我想与真正的阿根廷人联系',siguiente:'下一步',nombre:'名字',apellido:'姓氏',email:'电子邮件',telefono:'电话 (WhatsApp)',password:'密码',registrar:'创建账户',cargando:'创建中...',yaRegistrado:'已有账户',login:'登录',metodoPago:'付款方式',mercadopago:'Mercado Pago',transferencia:'银行转账',cuentaPago:'MP邮箱或CBU/别名',intro:'主人如何使用?',i1:'您注册并验证个人信息。',i2:'您设定每小时服务价格——您将完整收到该金额。',i3:'当旅行者想联系您时，他们支付USD 0.50。您收到USD 0.25，Knowan收取USD 0.25。',i4:'一旦联系，您直接与旅行者在应用程序外商定服务价格。',i5:'您随时可以通过Mercado Pago或银行转账提取收益。',confirmar:'请检查您的电子邮件以确认您的账户。',error:'创建账户时出错。'},
  ru:{titulo:'Создать аккаунт',elige:'Вы хозяин или путешественник?',anfitrion:'🏠 Я хозяин',anfitrionDesc:'Хочу делиться культурой и зарабатывать',pareja:'👫 Мы хозяева-пара',parejaDesc:'Предлагаем впечатления вместе как пара',parejaAviso:'Отлично! Как хозяева-пара вы можете предлагать впечатления вместе. Вы также можете добавить сольные впечатления из своего профиля.',nombrePareja:'Имя вашего партнера',viajero:'🌍 Я путешественник',viajeroDesc:'Хочу познакомиться с настоящими аргентинцами',siguiente:'Далее',nombre:'Имя',apellido:'Фамилия',email:'Email',telefono:'Телефон (WhatsApp)',password:'Пароль',registrar:'Создать аккаунт',cargando:'Создание...',yaRegistrado:'Уже есть аккаунт',login:'Войти',metodoPago:'Способ оплаты',mercadopago:'Mercado Pago',transferencia:'Банковский перевод',cuentaPago:'Email MP или CBU/Alias',intro:'Как это работает для хозяев?',i1:'Вы регистрируетесь и подтверждаете личные данные.',i2:'Вы устанавливаете цену за час услуги — эту сумму вы получаете полностью.',i3:'Когда путешественник хочет связаться с вами, он платит USD 0.50. Вы получаете USD 0.25, Knowan — USD 0.25.',i4:'После связи вы договариваетесь о цене услуги напрямую с путешественником.',i5:'Вы выводите заработок когда хотите через Mercado Pago или банковский перевод.',confirmar:'Проверьте email для подтверждения аккаунта.',error:'Ошибка при создании аккаунта.'},
};

export default function Register() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({nombre:'',apellido:'',email:'',telefono:'',password:'',metodoPago:'mercadopago',cuentaPago:'',nombrePareja:''});
  const [fotoViajero, setFotoViajero] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);
  const fotoRef = typeof window !== 'undefined' ? require('react').useRef() : {current:null};
  const [showParejaAviso, setShowParejaAviso] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'es';
    setLang(saved);
  }, []);

  const t = T[lang] || T.es;

  const elegirRol = (r) => { setRole(r); setPaso(2); };

  const validateField = (name, value) => {
    const errs = {...fieldErrors};
    if (name === 'nombre' && !value.trim()) errs.nombre = true; else delete errs.nombre;
    if (name === 'apellido' && !value.trim()) errs.apellido = true; else delete errs.apellido;
    if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) errs.email = true; else delete errs.email;
    if (name === 'telefono' && !value.trim()) errs.telefono = true; else delete errs.telefono;
    if (name === 'password' && value.length < 6) errs.password = true; else delete errs.password;
    setFieldErrors(errs);
  };

  const registrar = async () => {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = true;
    if (!form.apellido.trim()) errs.apellido = true;
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = true;
    if (!form.telefono.trim()) errs.telefono = true;
    if (form.password.length < 6) errs.password = true;
    if (role === 'buyer' && !fotoViajero) errs.foto = true;
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true); setError('');
    try {
      if (role === 'buyer' && !fotoViajero) {
        setError('La foto de perfil es obligatoria');
        setLoading(false);
        return;
      }

      let fotoUrl = null;
      if (fotoViajero) {
        const base64 = await new Promise((res, rej) => {
          const r = new FileReader();
          r.onload = () => res(r.result);
          r.onerror = rej;
          r.readAsDataURL(fotoViajero);
        });
        const upRes = await api.post('/api/upload/photo', { photo: base64 });
        fotoUrl = upRes.data.url;
      }

      const res = await api.post('/api/auth/register', {
        nombre: form.nombre + ' ' + form.apellido,
        email: form.email,
        password: form.password,
        telefono: form.telefono,
        role: role === 'pareja' ? 'seller' : role,
        foto: fotoUrl,
        metodoPago: (role === 'seller' || role === 'pareja') ? form.metodoPago : '',
        cuentaPago: (role === 'seller' || role === 'pareja') ? form.cuentaPago : '',
        nombrePareja: form.nombrePareja || '',
      });
      localStorage.setItem('token', res.data.token);
      if (role === 'buyer') {
        router.push('/explorar');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.error || t.error);
    } finally { setLoading(false); }
  };

  return (
    <>
      <Nav />
      <div className="container">
        {paso === 1 && (
          <div className="card">
            <h1 style={{textAlign:'center',marginBottom:24}}>{t.elige}</h1>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <button onClick={() => elegirRol('seller')} style={{padding:'20px',background:'#f0f4ff',border:'2px solid #4B6CB7',borderRadius:14,cursor:'pointer',textAlign:'left'}}>
                <div style={{fontSize:20,fontWeight:700,color:'#4B6CB7',marginBottom:4}}>{t.anfitrion}</div>
                <div style={{fontSize:14,color:'#555'}}>{t.anfitrionDesc}</div>
              </button>
              <button onClick={() => { setRole('pareja'); setShowParejaAviso(true); }} style={{padding:'20px',background:'#fdf4ff',border:'2px solid #C94B4B',borderRadius:14,cursor:'pointer',textAlign:'left'}}>
                <div style={{fontSize:20,fontWeight:700,color:'#C94B4B',marginBottom:4}}>{t.pareja}</div>
                <div style={{fontSize:14,color:'#555'}}>{t.parejaDesc}</div>
              </button>
              <button onClick={() => elegirRol('buyer')} style={{padding:'20px',background:'#fff8e1',border:'2px solid #F4A020',borderRadius:14,cursor:'pointer',textAlign:'left'}}>
                <div style={{fontSize:20,fontWeight:700,color:'#F4A020',marginBottom:4}}>{t.viajero}</div>
                <div style={{fontSize:14,color:'#555'}}>{t.viajeroDesc}</div>
              </button>

              {showParejaAviso && (
                <div style={{background:'#fdf4ff',border:'2px solid #C94B4B',borderRadius:14,padding:16}}>
                  <p style={{fontWeight:700,fontSize:15,color:'#C94B4B',margin:'0 0 8px'}}>👫 {t.pareja}</p>
                  <p style={{fontSize:13,color:'#555',margin:'0 0 12px',lineHeight:1.6}}>{t.parejaAviso}</p>
                  <button onClick={() => elegirRol('pareja')} style={{width:'100%',padding:'12px',background:'linear-gradient(90deg,#4B6CB7,#C94B4B)',color:'#fff',border:'none',borderRadius:10,fontWeight:700,fontSize:14,cursor:'pointer'}}>
                    {t.siguiente} →
                  </button>
                </div>
              )}
            </div>
            <div style={{textAlign:'center',marginTop:20,fontSize:14,color:'#888'}}>
              {t.yaRegistrado} <Link href="/login" style={{color:'#4B6CB7'}}>{t.login}</Link>
            </div>
          </div>
        )}

        {paso === 2 && (
          <div className="card">
            {(role === 'seller' || role === 'pareja') && (
              <div style={{background: role === 'pareja' ? '#fdf4ff' : '#f0f4ff',borderRadius:12,padding:16,marginBottom:20,border:`1.5px solid ${role === 'pareja' ? '#C94B4B' : '#4B6CB7'}`}}>
                <h3 style={{color: role === 'pareja' ? '#C94B4B' : '#4B6CB7',marginBottom:10}}>ℹ️ {t.intro}</h3>
                <div style={{display:'flex',flexDirection:'column',gap:8,fontSize:13,color:'#555',lineHeight:1.6}}>
                  <div>🏠 {t.i1}</div>
                  <div>💰 {t.i2}</div>
                  <div>📱 {t.i3}</div>
                  <div>🤝 {t.i4}</div>
                  <div>💳 {t.i5}</div>
                </div>
              </div>
            )}

            <h1 style={{marginBottom:20}}>{t.titulo}</h1>
            {error && <div className="error">{error}</div>}

            <div className="form-group"><label style={{color:fieldErrors.nombre?'#ef4444':'inherit'}}>{t.nombre} {fieldErrors.nombre && '⚠️'}</label><input value={form.nombre} onChange={e => { setForm({...form,nombre:e.target.value}); validateField('nombre',e.target.value); }} style={{border:fieldErrors.nombre?'1.5px solid #ef4444':'',outline:'none'}} /></div>
            <div className="form-group"><label style={{color:fieldErrors.apellido?'#ef4444':'inherit'}}>{t.apellido} {fieldErrors.apellido && '⚠️'}</label><input value={form.apellido} onChange={e => { setForm({...form,apellido:e.target.value}); validateField('apellido',e.target.value); }} style={{border:fieldErrors.apellido?'1.5px solid #ef4444':'',outline:'none'}} /></div>

            <div className="form-group"><label style={{color:fieldErrors.email?'#ef4444':'inherit'}}>{t.email} {fieldErrors.email && '⚠️'}</label><input type="email" value={form.email} onChange={e => { setForm({...form,email:e.target.value}); validateField('email',e.target.value); }} style={{border:fieldErrors.email?'1.5px solid #ef4444':'',outline:'none'}} /></div>
            <div className="form-group"><label style={{color:fieldErrors.telefono?'#ef4444':'inherit'}}>{t.telefono} {fieldErrors.telefono && '⚠️'}</label><input type="tel" value={form.telefono} onChange={e => { setForm({...form,telefono:e.target.value}); validateField('telefono',e.target.value); }} style={{border:fieldErrors.telefono?'1.5px solid #ef4444':'',outline:'none'}} /></div>
            <div className="form-group">
              <label>{t.password}</label>
              <div style={{display:'flex',gap:8,alignItems:'center'}}>
                <input type={showPass ? 'text' : 'password'} value={form.password} onChange={e => setForm({...form,password:e.target.value})} style={{flex:1,border:fieldErrors.password?'1.5px solid #ef4444':''}} />
                <button type="button" onClick={() => setShowPass(p => !p)} style={{flexShrink:0,background:'#f3f4f6',border:'1px solid #d1d5db',borderRadius:8,padding:'8px 10px',cursor:'pointer',fontSize:16}}>
                  {showPass ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            {(role === 'seller' || role === 'pareja') && (
              <>
                <div className="form-group">
                  <label>{t.metodoPago}</label>
                  <select value={form.metodoPago} onChange={e => setForm({...form,metodoPago:e.target.value})}>
                    <option value="mercadopago">{t.mercadopago}</option>
                    <option value="transferencia">{t.transferencia}</option>
                  </select>
                </div>
                <div className="form-group"><label>{t.cuentaPago}</label><input value={form.cuentaPago} onChange={e => setForm({...form,cuentaPago:e.target.value})} /></div>
              </>
            )}

            {role === 'buyer' && (
              <div className="form-group" style={{marginBottom:16}}>
                <label>📸 Foto de perfil (obligatoria)</label>
                <div style={{display:'flex',alignItems:'center',gap:16,marginTop:8}}>
                  <div onClick={() => fotoRef.current?.click()} style={{width:64,height:64,borderRadius:'50%',cursor:'pointer',background:fotoPreview?'transparent':'linear-gradient(135deg,#4B6CB7,#C94B4B)',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden',border:'3px solid #4B6CB7',flexShrink:0}}>
                    {fotoPreview ? <img src={fotoPreview} alt="foto" style={{width:'100%',height:'100%',objectFit:'cover'}} /> : <span style={{fontSize:24}}>👤</span>}
                  </div>
                  <button type="button" onClick={() => fotoRef.current?.click()} style={{background:'linear-gradient(90deg,#4B6CB7,#C94B4B)',color:'#fff',border:'none',borderRadius:10,padding:'8px 16px',fontWeight:700,fontSize:13,cursor:'pointer'}}>
                    {fotoPreview ? 'Cambiar foto' : 'Subir foto'}
                  </button>
                  <input ref={fotoRef} type="file" accept="image/*" style={{display:'none'}} onChange={e => { const f=e.target.files[0]; if(f){setFotoViajero(f);setFotoPreview(URL.createObjectURL(f));} }} />
                </div>
              </div>
            )}
            <button className="btn-orange" onClick={registrar} disabled={loading}>
              {loading ? t.cargando : t.registrar}
            </button>
            <button onClick={() => setPaso(1)} style={{background:'none',border:'none',color:'#888',cursor:'pointer',marginTop:12,fontSize:13}}>← Volver</button>
          </div>
        )}
      </div>
    </>
  );
}