'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Nav from '../components/Nav';
import api from '../../lib/api';
import useLang from '../../lib/useLang';

const HABS = ['Guia','Profesor','Cocinero','Truco','Mate','Futbol','Musica','Tango','Historia','Espanol','Charla'];

const T = {
  es:{titulo:'Mi perfil',foto:'Toca para cambiar la foto',nombre:'Nombre completo',ciudad:'Ciudad',sobre:'Sobre vos',precio:'Precio por hora de servicio',recibes:'Vos recibis',cobra:'Argentalk cobra 15%',consejo:'Se recomienda un precio accesible. Este es el precio que cobraras por hora de tu servicio. Una vez contactados, acordas el precio directamente con el viajero.',bueno:'En que sos bueno?',disponible:'Disponibilidad',disponibleBtn:'Disponible ahora',noDisponible:'No disponible',guardar:'Guardar perfil',guardando:'Guardando...',baja:'Dar de baja mi cuenta',bajaPregunta:'Ya no queres usar Argentalk?',exito:'Perfil actualizado!',fotoOk:'Foto actualizada!',errorFoto:'Error al subir foto.',errorGuardar:'Error al guardar.'},
  en:{titulo:'My profile',foto:'Tap to change photo',nombre:'Full name',ciudad:'City',sobre:'About you',precio:'Price per hour of service',recibes:'You receive',cobra:'Argentalk charges 15%',consejo:'We recommend an affordable price. This is the price you will charge per hour of service. Once connected, you agree on the price directly with the traveler.',bueno:'What are you good at?',disponible:'Availability',disponibleBtn:'Available now',noDisponible:'Not available',guardar:'Save profile',guardando:'Saving...',baja:'Delete my account',bajaPregunta:'Do you want to leave Argentalk?',exito:'Profile updated!',fotoOk:'Photo updated!',errorFoto:'Error uploading photo.',errorGuardar:'Error saving.'},
  pt:{titulo:'Meu perfil',foto:'Toque para mudar a foto',nombre:'Nome completo',ciudad:'Cidade',sobre:'Sobre voce',precio:'Preco por hora de servico',recibes:'Voce recebe',cobra:'Argentalk cobra 15%',consejo:'Recomendamos um preco acessivel. Este e o preco que voce cobrara por hora de servico.',bueno:'No que voce e bom?',disponible:'Disponibilidade',disponibleBtn:'Disponivel agora',noDisponible:'Nao disponivel',guardar:'Salvar perfil',guardando:'Salvando...',baja:'Excluir minha conta',bajaPregunta:'Quer sair do Argentalk?',exito:'Perfil atualizado!',fotoOk:'Foto atualizada!',errorFoto:'Erro ao enviar foto.',errorGuardar:'Erro ao salvar.'},
  fr:{titulo:'Mon profil',foto:'Appuyer pour changer la photo',nombre:'Nom complet',ciudad:'Ville',sobre:'A propos de vous',precio:'Prix par heure de service',recibes:'Vous recevez',cobra:'Argentalk prend 15%',consejo:'Nous recommandons un prix abordable. C est le prix que vous facturerez par heure de service.',bueno:'En quoi etes-vous bon?',disponible:'Disponibilite',disponibleBtn:'Disponible maintenant',noDisponible:'Non disponible',guardar:'Sauvegarder',guardando:'Sauvegarde...',baja:'Supprimer mon compte',bajaPregunta:'Voulez-vous quitter Argentalk?',exito:'Profil mis a jour!',fotoOk:'Photo mise a jour!',errorFoto:'Erreur photo.',errorGuardar:'Erreur sauvegarde.'},
  it:{titulo:'Il mio profilo',foto:'Tocca per cambiare foto',nombre:'Nome completo',ciudad:'Citta',sobre:'Su di te',precio:'Prezzo per ora di servizio',recibes:'Ricevi',cobra:'Argentalk prende 15%',consejo:'Consigliamo un prezzo accessibile. Questo e il prezzo che addebiterai per ora di servizio.',bueno:'In cosa sei bravo?',disponible:'Disponibilita',disponibleBtn:'Disponibile ora',noDisponible:'Non disponibile',guardar:'Salva profilo',guardando:'Salvando...',baja:'Elimina il mio account',bajaPregunta:'Vuoi lasciare Argentalk?',exito:'Profilo aggiornato!',fotoOk:'Foto aggiornata!',errorFoto:'Errore foto.',errorGuardar:'Errore salvataggio.'},
  de:{titulo:'Mein Profil',foto:'Tippen um Foto zu aendern',nombre:'Vollstaendiger Name',ciudad:'Stadt',sobre:'Ueber dich',precio:'Preis pro Stunde Dienstleistung',recibes:'Du erhaeltst',cobra:'Argentalk nimmt 15%',consejo:'Wir empfehlen einen erschwinglichen Preis. Dies ist der Preis den Sie pro Stunde berechnen.',bueno:'Worin bist du gut?',disponible:'Verfuegbarkeit',disponibleBtn:'Jetzt verfuegbar',noDisponible:'Nicht verfuegbar',guardar:'Profil speichern',guardando:'Speichern...',baja:'Konto loeschen',bajaPregunta:'Moechtest du Argentalk verlassen?',exito:'Profil aktualisiert!',fotoOk:'Foto aktualisiert!',errorFoto:'Fehler beim Hochladen.',errorGuardar:'Fehler beim Speichern.'},
  zh:{titulo:'我的资料',foto:'点击更换照片',nombre:'全名',ciudad:'城市',sobre:'关于你',precio:'每小时服务价格',recibes:'你收到',cobra:'Argentalk收取15%',consejo:'建议设置合理价格。这是您每小时服务收取的价格。',bueno:'你擅长什么?',disponible:'可用性',disponibleBtn:'现在可用',noDisponible:'不可用',guardar:'保存资料',guardando:'保存中...',baja:'删除我的账户',bajaPregunta:'你想离开Argentalk吗?',exito:'资料已更新!',fotoOk:'照片已更新!',errorFoto:'上传照片出错。',errorGuardar:'保存出错。'},
  ru:{titulo:'Мой профиль',foto:'Нажмите для смены фото',nombre:'Полное имя',ciudad:'Город',sobre:'О себе',precio:'Цена за час услуги',recibes:'Вы получаете',cobra:'Argentalk берет 15%',consejo:'Рекомендуем доступную цену. Это цена которую вы будете взимать за час услуги.',bueno:'В чем вы хороши?',disponible:'Доступность',disponibleBtn:'Доступен сейчас',noDisponible:'Недоступен',guardar:'Сохранить профиль',guardando:'Сохранение...',baja:'Удалить аккаунт',bajaPregunta:'Хотите покинуть Argentalk?',exito:'Профиль обновлен!',fotoOk:'Фото обновлено!',errorFoto:'Ошибка загрузки фото.',errorGuardar:'Ошибка сохранения.'},
};

export default function Perfil() {
  const router = useRouter();
  const { lang } = useLang();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({nombre:'',bio:'',precio:10,habilidades:[],ciudad:'',disponible:true});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { router.push('/login'); return; }
    api.get('/api/auth/me')
      .then(r => {
        setUser(r.data);
        setForm({
          nombre: r.data.nombre || '',
          bio: r.data.bio || '',
          precio: r.data.precio || 10,
          habilidades: r.data.habilidades || [],
          ciudad: r.data.ciudad || '',
          disponible: r.data.disponible !== false
        });
        setLoading(false);
      })
      .catch(() => { localStorage.removeItem('token'); router.push('/login'); });
  }, []);

  const t = T[lang] || T.es;

  const toggleH = h => setForm(f => ({
    ...f,
    habilidades: f.habilidades.includes(h) ? f.habilidades.filter(x => x !== h) : [...f.habilidades, h]
  }));

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setError('');
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const res = await api.post('/api/upload/photo', { photo: ev.target.result });
        setUser(u => ({ ...u, foto: res.data.url }));
        setMsg(t.fotoOk);
      } catch { setError(t.errorFoto); }
      finally { setUploading(false); }
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    setSaving(true); setMsg(''); setError('');
    try {
      const res = await api.put('/api/users/profile', form);
      setUser(prev => ({ ...prev, ...res.data }));
      setMsg(t.exito);
    } catch (err) {
      setError(err.response?.data?.error || t.errorGuardar);
    } finally { setSaving(false); }
  };

  const darDeBaja = async () => {
    if (!confirm(t.bajaPregunta)) return;
    try {
      await api.delete('/api/users/account');
      localStorage.clear();
      router.push('/');
    } catch { setError(t.errorGuardar); }
  };

  if (loading) return <div className="spinner">Cargando...</div>;
  if (!user) return null;

  return (
    <>
      <Nav links={[{href:'/dashboard',label:'Dashboard'}]} />
      <div className="container">
        {msg && <div className="success">{msg}</div>}
        {error && <div className="error">{error}</div>}

        <div className="card">
          <h1>{t.titulo}</h1>
          <div style={{textAlign:'center',marginBottom:20}}>
            <div onClick={() => fileRef.current?.click()} style={{width:90,height:90,borderRadius:'50%',background:'#EBF2FF',color:'#003DA5',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:700,margin:'0 auto 8px',cursor:'pointer',overflow:'hidden',position:'relative',border:'3px solid #003DA5'}}>
              {user?.foto
                ? <img src={user.foto} alt="foto" style={{width:'100%',height:'100%',objectFit:'cover'}} />
                : (user?.nombre||user?.email||'A')[0].toUpperCase()
              }
              {uploading && <div style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontSize:11}}>...</div>}
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:'none'}} />
            <div style={{fontSize:13,color:'#003DA5',marginTop:4,cursor:'pointer'}} onClick={() => fileRef.current?.click()}>📷 {t.foto}</div>
            <div style={{fontSize:12,color:'#888',marginTop:2}}>{user?.email}</div>
          </div>

          <div className="form-group"><label>{t.nombre}</label><input value={form.nombre} onChange={e => setForm({...form,nombre:e.target.value})} /></div>
          <div className="form-group"><label>{t.ciudad}</label><input value={form.ciudad} onChange={e => setForm({...form,ciudad:e.target.value})} /></div>
          <div className="form-group"><label>{t.sobre}</label><textarea rows={4} value={form.bio} onChange={e => setForm({...form,bio:e.target.value})} style={{resize:'vertical'}} /></div>

          {user?.role === 'seller' && (
            <div className="form-group">
              <label>{t.precio}</label>
              <div style={{display:'flex',alignItems:'center',gap:16,marginTop:8}}>
                <input type="range" min="2" max="200" step="1" value={form.precio} onChange={e => setForm({...form,precio:parseInt(e.target.value)})} style={{flex:1}} />
                <div style={{minWidth:80,textAlign:'center'}}>
                  <div style={{fontSize:24,fontWeight:700,color:'#003DA5'}}>USD {form.precio}</div>
                </div>
              </div>
              <div style={{background:'#fff8e1',borderRadius:8,padding:10,marginTop:8,fontSize:13,color:'#92400e',lineHeight:1.5}}>
                💡 {t.consejo}
              </div>
            </div>
          )}
        </div>

        {user?.role === 'seller' && (
          <div className="card">
            <h2>{t.bueno}</h2>
            <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
              {HABS.map(h => (
                <button key={h} onClick={() => toggleH(h)} style={{width:'auto',padding:'8px 16px',borderRadius:20,background:form.habilidades.includes(h)?'#003DA5':'white',color:form.habilidades.includes(h)?'white':'#003DA5',border:'1.5px solid #003DA5',fontSize:14,cursor:'pointer'}}>{h}</button>
              ))}
            </div>
          </div>
        )}

        {user?.role === 'seller' && (
          <div className="card">
            <h2>{t.disponible}</h2>
            <button onClick={() => setForm({...form,disponible:!form.disponible})} style={{width:'auto',padding:'10px 20px',background:form.disponible?'#22c55e':'#ddd',color:form.disponible?'white':'#666',border:'none',borderRadius:10,fontSize:14,cursor:'pointer'}}>
              {form.disponible ? t.disponibleBtn : t.noDisponible}
            </button>
          </div>
        )}

        <button className="btn-orange" onClick={save} disabled={saving} style={{marginBottom:12}}>
          {saving ? t.guardando : t.guardar}
        </button>

        <div style={{marginTop:20,paddingTop:20,borderTop:'1px solid #f0f0f0',textAlign:'center'}}>
          <p style={{fontSize:13,color:'#888',marginBottom:12}}>{t.bajaPregunta}</p>
          <button onClick={darDeBaja} style={{width:'auto',padding:'10px 20px',background:'white',color:'#cc0000',border:'1px solid #cc0000',borderRadius:10,fontSize:14,cursor:'pointer'}}>{t.baja}</button>
        </div>
      </div>
    </>
  );
}