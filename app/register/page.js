'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Nav from '../components/Nav';
import api from '../../lib/api';

const T = {
  es:{titulo:'Crear cuenta',elige:'¿Sos anfitrión o viajero?',anfitrion:'🏠 Soy anfitrión',anfitrionDesc:'Quiero compartir mi cultura y ganar dinero',viajero:'🌍 Soy viajero',viajeroDesc:'Quiero conectar con argentinos reales',siguiente:'Siguiente',nombre:'Nombre',apellido:'Apellido',email:'Email',telefono:'Teléfono (WhatsApp)',password:'Contraseña',registrar:'Crear cuenta',cargando:'Creando cuenta...',yaRegistrado:'Ya tengo cuenta',login:'Iniciar sesión',metodoPago:'Método de cobro',mercadopago:'Mercado Pago',transferencia:'Transferencia bancaria',cuentaPago:'Email MP o CBU/Alias',intro:'¿Cómo funciona para anfitriones?',i1:'Te inscribís y verificás tus datos personales.',i2:'Elegís tu precio por hora de servicio — ese monto lo recibís vos íntegro. Ejemplo: guía turístico, profesor de castellano.',i3:'Cuando un viajero quiere contactarte, paga USD 0.50. Vos recibís USD 0.35 y Knowan USD 0.15.',i4:'Una vez conectados, acordás el precio de tu servicio directamente con el viajero fuera de la app.',i5:'Retirás tus ganancias cuando quieras por Mercado Pago o transferencia bancaria.',confirmar:'Revisá tu email para confirmar tu cuenta.',error:'Error al crear cuenta.'},
  en:{titulo:'Create account',elige:'Are you a host or traveler?',anfitrion:'🏠 I am a host',anfitrionDesc:'I want to share my culture and earn money',viajero:'🌍 I am a traveler',viajeroDesc:'I want to connect with real Argentinians',siguiente:'Next',nombre:'First name',apellido:'Last name',email:'Email',telefono:'Phone (WhatsApp)',password:'Password',registrar:'Create account',cargando:'Creating account...',yaRegistrado:'Already have an account',login:'Log in',metodoPago:'Payment method',mercadopago:'Mercado Pago',transferencia:'Bank transfer',cuentaPago:'MP Email or CBU/Alias',intro:'How does it work for hosts?',i1:'You sign up and verify your personal details.',i2:'You set your price per hour of service — you receive that amount in full. Example: tour guide, Spanish teacher.',i3:'When a traveler wants to contact you, they pay USD 0.50. You receive USD 0.35 and Knowan USD 0.15.',i4:'Once connected, you agree on your service price directly with the traveler outside the app.',i5:'You withdraw your earnings whenever you want via Mercado Pago or bank transfer.',confirmar:'Check your email to confirm your account.',error:'Error creating account.'},
  pt:{titulo:'Criar conta',elige:'Voce e anfitriao ou viajante?',anfitrion:'🏠 Sou anfitriao',anfitrionDesc:'Quero compartilhar minha cultura e ganhar dinheiro',viajero:'🌍 Sou viajante',viajeroDesc:'Quero conectar com argentinos reais',siguiente:'Proximo',nombre:'Nome',apellido:'Sobrenome',email:'Email',telefono:'Telefone (WhatsApp)',password:'Senha',registrar:'Criar conta',cargando:'Criando conta...',yaRegistrado:'Ja tenho conta',login:'Entrar',metodoPago:'Metodo de pagamento',mercadopago:'Mercado Pago',transferencia:'Transferencia bancaria',cuentaPago:'Email MP ou CBU/Alias',intro:'Como funciona para anfitrioes?',i1:'Voce se cadastra e verifica seus dados pessoais.',i2:'Voce escolhe seu preco por hora de servico — esse valor voce recebe integralmente.',i3:'Quando um viajante quer te contatar, ele paga USD 0.50. Voce recebe USD 0.35 e Knowan USD 0.15.',i4:'Uma vez conectados, voce combina o preco do seu servico diretamente com o viajante fora do app.',i5:'Voce retira seus ganhos quando quiser via Mercado Pago ou transferencia bancaria.',confirmar:'Verifique seu email para confirmar sua conta.',error:'Erro ao criar conta.'},
  fr:{titulo:'Creer un compte',elige:'Etes-vous hote ou voyageur?',anfitrion:'🏠 Je suis hote',anfitrionDesc:'Je veux partager ma culture et gagner de largent',viajero:'🌍 Je suis voyageur',viajeroDesc:'Je veux rencontrer de vrais Argentins',siguiente:'Suivant',nombre:'Prenom',apellido:'Nom',email:'Email',telefono:'Telephone (WhatsApp)',password:'Mot de passe',registrar:'Creer un compte',cargando:'Creation...',yaRegistrado:'Jai deja un compte',login:'Se connecter',metodoPago:'Methode de paiement',mercadopago:'Mercado Pago',transferencia:'Virement bancaire',cuentaPago:'Email MP ou CBU/Alias',intro:'Comment ca fonctionne pour les hotes?',i1:'Vous vous inscrivez et verifiez vos donnees personnelles.',i2:'Vous fixez votre prix par heure de service — vous recevez ce montant en totalite.',i3:'Quand un voyageur veut vous contacter, il paie USD 0.50. Vous recevez USD 0.35 et Knowan USD 0.15.',i4:'Une fois connectes, vous convenez du prix de votre service directement avec le voyageur.',i5:'Vous retirez vos gains quand vous voulez via Mercado Pago ou virement bancaire.',confirmar:'Verifiez votre email pour confirmer votre compte.',error:'Erreur lors de la creation du compte.'},
  it:{titulo:'Crea account',elige:'Sei host o viaggiatore?',anfitrion:'🏠 Sono host',anfitrionDesc:'Voglio condividere la mia cultura e guadagnare',viajero:'🌍 Sono viaggiatore',viajeroDesc:'Voglio connettermi con veri argentini',siguiente:'Avanti',nombre:'Nome',apellido:'Cognome',email:'Email',telefono:'Telefono (WhatsApp)',password:'Password',registrar:'Crea account',cargando:'Creazione...',yaRegistrado:'Ho gia un account',login:'Accedi',metodoPago:'Metodo di pagamento',mercadopago:'Mercado Pago',transferencia:'Bonifico bancario',cuentaPago:'Email MP o CBU/Alias',intro:'Come funziona per gli host?',i1:'Ti registri e verifichi i tuoi dati personali.',i2:'Scegli il tuo prezzo per ora di servizio — ricevi quell importo per intero.',i3:'Quando un viaggiatore vuole contattarti, paga USD 0.50. Tu ricevi USD 0.35 e Knowan USD 0.15.',i4:'Una volta connessi, concordate il prezzo del servizio direttamente con il viaggiatore.',i5:'Ritiri i tuoi guadagni quando vuoi tramite Mercado Pago o bonifico bancario.',confirmar:'Controlla la tua email per confermare il tuo account.',error:'Errore nella creazione account.'},
  de:{titulo:'Konto erstellen',elige:'Sind Sie Gastgeber oder Reisender?',anfitrion:'🏠 Ich bin Gastgeber',anfitrionDesc:'Ich mochte meine Kultur teilen und Geld verdienen',viajero:'🌍 Ich bin Reisender',viajeroDesc:'Ich mochte echte Argentinier kennenlernen',siguiente:'Weiter',nombre:'Vorname',apellido:'Nachname',email:'Email',telefono:'Telefon (WhatsApp)',password:'Passwort',registrar:'Konto erstellen',cargando:'Erstellen...',yaRegistrado:'Ich habe bereits ein Konto',login:'Anmelden',metodoPago:'Zahlungsmethode',mercadopago:'Mercado Pago',transferencia:'Bankuberweisung',cuentaPago:'MP Email oder CBU/Alias',intro:'Wie funktioniert es fur Gastgeber?',i1:'Sie registrieren sich und verifizieren Ihre personlichen Daten.',i2:'Sie legen Ihren Preis pro Stunde fest — diesen Betrag erhalten Sie vollstandig.',i3:'Wenn ein Reisender Sie kontaktieren mochte, zahlt er USD 0.50. Sie erhalten USD 0.35 und Knowan USD 0.15.',i4:'Einmal verbunden, vereinbaren Sie den Preis Ihres Dienstes direkt mit dem Reisenden.',i5:'Sie heben Ihre Einnahmen jederzeit uber Mercado Pago oder Bankuberweisung ab.',confirmar:'Prufen Sie Ihre E-Mail zur Bestatigung.',error:'Fehler beim Erstellen des Kontos.'},
  zh:{titulo:'创建账户',elige:'您是主人还是旅行者?',anfitrion:'🏠 我是主人',anfitrionDesc:'我想分享我的文化并赚钱',viajero:'🌍 我是旅行者',viajeroDesc:'我想与真正的阿根廷人联系',siguiente:'下一步',nombre:'名字',apellido:'姓氏',email:'电子邮件',telefono:'电话 (WhatsApp)',password:'密码',registrar:'创建账户',cargando:'创建中...',yaRegistrado:'已有账户',login:'登录',metodoPago:'付款方式',mercadopago:'Mercado Pago',transferencia:'银行转账',cuentaPago:'MP邮箱或CBU/别名',intro:'主人如何使用?',i1:'您注册并验证个人信息。',i2:'您设定每小时服务价格——您将完整收到该金额。',i3:'当旅行者想联系您时，他们支付USD 0.50。您收到USD 0.35，Knowan收取USD 0.15。',i4:'一旦联系，您直接与旅行者在应用程序外商定服务价格。',i5:'您随时可以通过Mercado Pago或银行转账提取收益。',confirmar:'请检查您的电子邮件以确认您的账户。',error:'创建账户时出错。'},
  ru:{titulo:'Создать аккаунт',elige:'Вы хозяин или путешественник?',anfitrion:'🏠 Я хозяин',anfitrionDesc:'Хочу делиться культурой и зарабатывать',viajero:'🌍 Я путешественник',viajeroDesc:'Хочу познакомиться с настоящими аргентинцами',siguiente:'Далее',nombre:'Имя',apellido:'Фамилия',email:'Email',telefono:'Телефон (WhatsApp)',password:'Пароль',registrar:'Создать аккаунт',cargando:'Создание...',yaRegistrado:'Уже есть аккаунт',login:'Войти',metodoPago:'Способ оплаты',mercadopago:'Mercado Pago',transferencia:'Банковский перевод',cuentaPago:'Email MP или CBU/Alias',intro:'Как это работает для хозяев?',i1:'Вы регистрируетесь и подтверждаете личные данные.',i2:'Вы устанавливаете цену за час услуги — эту сумму вы получаете полностью.',i3:'Когда путешественник хочет связаться с вами, он платит USD 0.50. Вы получаете USD 0.35, Knowan — USD 0.15.',i4:'После связи вы договариваетесь о цене услуги напрямую с путешественником.',i5:'Вы выводите заработок когда хотите через Mercado Pago или банковский перевод.',confirmar:'Проверьте email для подтверждения аккаунта.',error:'Ошибка при создании аккаунта.'},
};

export default function Register() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({nombre:'',apellido:'',email:'',telefono:'',password:'',metodoPago:'mercadopago',cuentaPago:''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'es';
    setLang(saved);
  }, []);

  const t = T[lang] || T.es;

  const elegirRol = (r) => { setRole(r); setPaso(2); };

  const registrar = async () => {
    setLoading(true); setError('');
    try {
      const res = await api.post('/api/auth/register', {
        nombre: `${form.nombre} ${form.apellido}`.trim(),
        email: form.email,
        password: form.password,
        telefono: form.telefono,
        role,
        metodoPago: role === 'seller' ? form.metodoPago : '',
        cuentaPago: role === 'seller' ? form.cuentaPago : '',
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
              <button onClick={() => elegirRol('buyer')} style={{padding:'20px',background:'#fff8e1',border:'2px solid #F4A020',borderRadius:14,cursor:'pointer',textAlign:'left'}}>
                <div style={{fontSize:20,fontWeight:700,color:'#F4A020',marginBottom:4}}>{t.viajero}</div>
                <div style={{fontSize:14,color:'#555'}}>{t.viajeroDesc}</div>
              </button>
            </div>
            <div style={{textAlign:'center',marginTop:20,fontSize:14,color:'#888'}}>
              {t.yaRegistrado} <Link href="/login" style={{color:'#4B6CB7'}}>{t.login}</Link>
            </div>
          </div>
        )}

        {paso === 2 && (
          <div className="card">
            {role === 'seller' && (
              <div style={{background:'#f0f4ff',borderRadius:12,padding:16,marginBottom:20,border:'1.5px solid #4B6CB7'}}>
                <h3 style={{color:'#4B6CB7',marginBottom:10}}>ℹ️ {t.intro}</h3>
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

            <div className="form-group"><label>{t.nombre}</label><input value={form.nombre} onChange={e => setForm({...form,nombre:e.target.value})} /></div>
            <div className="form-group"><label>{t.apellido}</label><input value={form.apellido} onChange={e => setForm({...form,apellido:e.target.value})} /></div>
            <div className="form-group"><label>{t.email}</label><input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} /></div>
            <div className="form-group"><label>{t.telefono}</label><input type="tel" value={form.telefono} onChange={e => setForm({...form,telefono:e.target.value})} /></div>
            <div className="form-group"><label>{t.password}</label><input type="password" value={form.password} onChange={e => setForm({...form,password:e.target.value})} /></div>

            {role === 'seller' && (
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