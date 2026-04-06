'use client';
import { useEffect, useRef, useState } from 'react';
import Nav from '../components/Nav';
import api from '../../lib/api';
import useLang from '../../lib/useLang';
import Link from 'next/link';

const T = {
  es:{titulo:'Anfitriones en el mapa',cargando:'Cargando mapa...',contactar:'Contactar',verPerfil:'Ver perfil',porHora:'/ hora',sinUbicacion:'Sin ubicación'},
  en:{titulo:'Hosts on the map',cargando:'Loading map...',contactar:'Contact',verPerfil:'View profile',porHora:'/ hour',sinUbicacion:'No location'},
  pt:{titulo:'Anfitriões no mapa',cargando:'Carregando mapa...',contactar:'Contatar',verPerfil:'Ver perfil',porHora:'/ hora',sinUbicacion:'Sem localização'},
  fr:{titulo:'Hôtes sur la carte',cargando:'Chargement...',contactar:'Contacter',verPerfil:'Voir profil',porHora:'/ heure',sinUbicacion:'Sans localisation'},
  it:{titulo:'Host sulla mappa',cargando:'Caricamento...',contactar:'Contatta',verPerfil:'Vedi profilo',porHora:'/ ora',sinUbicacion:'Senza posizione'},
  de:{titulo:'Gastgeber auf der Karte',cargando:'Laden...',contactar:'Kontaktieren',verPerfil:'Profil ansehen',porHora:'/ Stunde',sinUbicacion:'Kein Standort'},
  zh:{titulo:'地图上的主人',cargando:'加载中...',contactar:'联系',verPerfil:'查看资料',porHora:'/ 小时',sinUbicacion:'无位置'},
  ru:{titulo:'Хозяева на карте',cargando:'Загрузка...',contactar:'Связаться',verPerfil:'Профиль',porHora:'/ час',sinUbicacion:'Нет местоположения'},
};

const CIUDADES = {
  'Buenos Aires': { lat:-34.6037, lng:-58.3816 },
  'Córdoba': { lat:-31.4201, lng:-64.1888 },
  'Rosario': { lat:-32.9442, lng:-60.6505 },
  'Mendoza': { lat:-32.8908, lng:-68.8272 },
  'Bariloche': { lat:-41.1335, lng:-71.3103 },
  'Salta': { lat:-24.7821, lng:-65.4232 },
  'Tucumán': { lat:-26.8083, lng:-65.2176 },
  'Mar del Plata': { lat:-38.0055, lng:-57.5426 },
  'Ushuaia': { lat:-54.8019, lng:-68.3030 },
  'Río negro': { lat:-39.0333, lng:-67.5833 },
  'Navarro': { lat:-35.0000, lng:-59.2833 },
  'Ciudad Jardin': { lat:-34.6167, lng:-58.5333 },
  'Charata': { lat:-27.2167, lng:-61.1833 },
  'Bahía Blanca': { lat:-38.7196, lng:-62.2724 },
};

export default function Mapa() {
  const { lang } = useLang();
  const t = T[lang] || T.en;
  const mapRef = useRef(null);
  const [sellers, setSellers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    api.get('/api/users/sellers').then(r => setSellers(r.data)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!sellers.length) return;
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!key) return;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    window.initMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.6037, lng: -58.3816 },
        zoom: 5,
        styles: [
          { featureType: 'all', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c9e8f9' }] },
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
        ]
      });

      sellers.forEach(seller => {
        const ciudad = seller.ciudad?.trim();
        const coords = ciudad ? Object.entries(CIUDADES).find(([k]) => ciudad.toLowerCase().includes(k.toLowerCase())) : null;
        if (!coords) return;

        const marker = new window.google.maps.Marker({
          position: coords[1],
          map,
          title: seller.nombre,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 12,
            fillColor: '#4B6CB7',
            fillOpacity: 1,
            strokeColor: 'white',
            strokeWeight: 2,
          }
        });

        marker.addListener('click', () => setSelected(seller));
      });

      setMapLoaded(true);
    };

    return () => { delete window.initMap; };
  }, [sellers]);

  return (
    <>
      <Nav links={[{href:'/explorar',label:'← Explorar'}]} />
      <div style={{position:'relative'}}>
        <div ref={mapRef} style={{width:'100%',height:'calc(100vh - 60px)',background:'#e8f4f8'}} />

        {!mapLoaded && (
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'white',padding:20,borderRadius:12,boxShadow:'0 4px 20px rgba(0,0,0,0.15)',textAlign:'center'}}>
            <div style={{fontSize:32,marginBottom:8}}>🗺️</div>
            <div style={{color:'#4B6CB7',fontWeight:600}}>{t.cargando}</div>
          </div>
        )}

        {selected && (
          <div style={{
            position:'absolute',bottom:24,left:'50%',transform:'translateX(-50%)',
            width:300,background:'white',borderRadius:16,
            boxShadow:'0 8px 32px rgba(0,0,0,0.2)',overflow:'hidden',
            zIndex:10
          }}>
            <div style={{background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',padding:'12px 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div style={{color:'white',fontWeight:700,fontSize:15}}>{selected.nombre}</div>
              <button onClick={() => setSelected(null)} style={{background:'none',border:'none',color:'white',fontSize:18,cursor:'pointer',padding:0,marginBottom:0,width:'auto'}}>✕</button>
            </div>
            <div style={{padding:16}}>
              <div style={{display:'flex',gap:12,alignItems:'center',marginBottom:12}}>
                <div style={{width:56,height:56,borderRadius:'50%',background:'#EBF2FF',overflow:'hidden',flexShrink:0}}>
                  {selected.foto
                    ? <img src={selected.foto} alt={selected.nombre} style={{width:'100%',height:'100%',objectFit:'cover'}} />
                    : <div style={{width:'100%',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',fontSize:24,fontWeight:700,color:'#4B6CB7'}}>{(selected.nombre||'A')[0]}</div>
                  }
                </div>
                <div>
                  {selected.ciudad && <div style={{fontSize:13,color:'#888'}}>📍 {selected.ciudad}</div>}
                  {selected.puntuacion > 0 && <div style={{fontSize:13,color:'#F6B40E'}}>{'⭐'.repeat(Math.round(selected.puntuacion))} {selected.puntuacion}</div>}
                  <div style={{fontSize:18,fontWeight:700,color:'#4B6CB7'}}>USD {selected.precio} <span style={{fontSize:12,color:'#888'}}>{t.porHora}</span></div>
                </div>
              </div>
              {selected.habilidades?.length > 0 && (
                <div style={{display:'flex',flexWrap:'wrap',gap:4,marginBottom:12}}>
                  {selected.habilidades.slice(0,4).map((h,i) => (
                    <span key={i} style={{background:'#EBF2FF',color:'#4B6CB7',borderRadius:20,padding:'2px 8px',fontSize:11}}>{h}</span>
                  ))}
                </div>
              )}
              <Link href={`/pay?seller=${selected._id}&nombre=${encodeURIComponent(selected.nombre||'')}&precio=${selected.precio}`}>
                <button style={{marginBottom:0}}>🤝 {t.contactar}</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
