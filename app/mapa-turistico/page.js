'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import useLang from '../../lib/useLang';

const DESTINOS = [
  { id:'buenosaires', nombre:'Buenos Aires', lat:-34.6037, lng:-58.3816, emoji:'🏙️', desc:{es:'La capital del tango, la moda y la gastronomía. Palermo, San Telmo y La Boca son imperdibles.',en:'The capital of tango, fashion and gastronomy.'}, epoca:{es:'Todo el año. Primavera (sep-nov) y otoño (mar-may) son ideales.',en:'Year-round. Spring and autumn are ideal.'}, ciudades:['Buenos Aires','CABA'] },
  { id:'salta', nombre:'Salta', lat:-24.7821, lng:-65.4232, emoji:'🌵', desc:{es:'El noroeste con quebradas de colores y pueblos coloniales. Jujuy y Tilcara son joyas.',en:'Northwest Argentina with colorful canyons and colonial towns.'}, epoca:{es:'Temporada seca: abr-oct.',en:'Dry season: Apr-Oct.'}, ciudades:['Salta','Jujuy'] },
  { id:'iguazu', nombre:'Iguazú', lat:-25.6953, lng:-54.4367, emoji:'💧', desc:{es:'Las cataratas más espectaculares del mundo. La Garganta del Diablo te dejará sin palabras.',en:'The most spectacular waterfalls in the world.'}, epoca:{es:'Todo el año. Abr-may y ago-sep son ideales.',en:'Year-round. Apr-May and Aug-Sep are best.'}, ciudades:['Puerto Iguazú','Posadas'] },
  { id:'mendoza', nombre:'Mendoza', lat:-32.8908, lng:-68.8272, emoji:'🍷', desc:{es:'La capital del vino argentino con el Aconcagua de fondo.',en:'The capital of Argentine wine with Aconcagua in the background.'}, epoca:{es:'Vendimia: feb-mar. Primavera para senderismo.',en:'Harvest: Feb-Mar. Spring for hiking.'}, ciudades:['Mendoza'] },
  { id:'cordoba', nombre:'Córdoba', lat:-31.4201, lng:-64.1888, emoji:'🏛️', desc:{es:'La ciudad universitaria más importante del país con sierras únicas.',en:'The most important university city with unique hills.'}, epoca:{es:'Primavera y otoño son perfectos.',en:'Spring and autumn are perfect.'}, ciudades:['Córdoba','Villa Carlos Paz'] },
  { id:'bariloche', nombre:'Bariloche', lat:-41.1335, lng:-71.3103, emoji:'⛷️', desc:{es:'La Suiza argentina. Lagos, bosques y el mejor ski de Sudamérica.',en:'The Swiss Argentina. Lakes, forests and best skiing in South America.'}, epoca:{es:'Verano (dic-mar) para trekking. Invierno para ski.',en:'Summer for trekking. Winter for skiing.'}, ciudades:['Bariloche','San Carlos de Bariloche'] },
  { id:'ushuaia', nombre:'Ushuaia', lat:-54.8019, lng:-68.3029, emoji:'🐧', desc:{es:'El fin del mundo. Pingüinos, glaciares y el Canal Beagle.',en:'The end of the world. Penguins, glaciers and the Beagle Channel.'}, epoca:{es:'Nov-mar: días largos. Jun-ago: nieve.',en:'Nov-Mar: long days. Jun-Aug: snow.'}, ciudades:['Ushuaia'] },
  { id:'elcalafate', nombre:'El Calafate', lat:-50.3382, lng:-72.2648, emoji:'🏔️', desc:{es:'El Glaciar Perito Moreno, uno de los pocos glaciares del mundo que avanza.',en:'The Perito Moreno Glacier, one of the few advancing glaciers in the world.'}, epoca:{es:'Oct-abr para ver el glaciar con buen clima.',en:'Oct-Apr for the glacier in good weather.'}, ciudades:['El Calafate','El Chaltén'] },
  { id:'elchalten', nombre:'El Chaltén', lat:-49.3314, lng:-72.8868, emoji:'🧗', desc:{es:'La capital del trekking. El Fitz Roy y el Cerro Torre son únicos en el mundo.',en:'Trekking capital. Fitz Roy and Cerro Torre are unique destinations.'}, epoca:{es:'Nov-mar: mejor clima para trekking.',en:'Nov-Mar: best weather for trekking.'}, ciudades:['El Chaltén'] },
  { id:'puertomadryn', nombre:'Puerto Madryn', lat:-42.7682, lng:-65.0385, emoji:'🐋', desc:{es:'Avistaje de ballenas y orcas. La Península Valdés es Patrimonio de la UNESCO.',en:'Whale and orca watching. Valdés Peninsula is UNESCO World Heritage.'}, epoca:{es:'Jun-dic para ballenas. Sep-oct pico de temporada.',en:'Jun-Dec for whales. Sep-Oct peak season.'}, ciudades:['Puerto Madryn','Trelew'] },
  { id:'tilcara', nombre:'Tilcara', lat:-23.5772, lng:-65.3970, emoji:'🏺', desc:{es:'Pueblo mágico en la Quebrada de Humahuaca, Patrimonio de la Humanidad.',en:'Magical village in the Humahuaca Gorge, UNESCO World Heritage.'}, epoca:{es:'Abr-oct temporada seca. Carnaval en febrero.',en:'Apr-Oct dry season. Carnival in February.'}, ciudades:['Tilcara','Jujuy'] },
  { id:'rosario', nombre:'Rosario', lat:-32.9442, lng:-60.6505, emoji:'🏅', desc:{es:'Cuna de la bandera argentina y de Lionel Messi. Gran movimiento gastronómico.',en:'Birthplace of the Argentine flag and Lionel Messi. Great gastronomy.'}, epoca:{es:'Todo el año. Primavera y otoño ideales.',en:'Year-round. Spring and autumn ideal.'}, ciudades:['Rosario'] },
  { id:'ischigualasto', nombre:'Valle de la Luna', lat:-29.9000, lng:-67.9167, emoji:'🌑', desc:{es:'Formaciones rocosas lunares y dinosaurios en San Juan. Patrimonio de la UNESCO.',en:'Lunar rock formations and dinosaurs in San Juan. UNESCO World Heritage.'}, epoca:{es:'Abr-oct para evitar calor extremo.',en:'Apr-Oct to avoid extreme heat.'}, ciudades:['San Juan'] },
  { id:'misiones', nombre:'Misiones', lat:-27.3671, lng:-55.8968, emoji:'🦜', desc:{es:'Selva con tucanes y monos. Las Ruinas Jesuíticas de San Ignacio son únicas.',en:'Jungle with toucans and monkeys. San Ignacio Jesuit Ruins are unique.'}, epoca:{es:'Abr-oct clima más fresco y seco.',en:'Apr-Oct cooler and drier weather.'}, ciudades:['Posadas','Puerto Iguazú'] },
];

const svgIcon = (emoji, active) => {
  const size = active ? 48 : 40;
  const r = active ? 22 : 18;
  const fill = active ? '#F6B40E' : '#74ACDF';
  const fs = active ? 22 : 18;
  const cy = active ? 24 : 20;
  const ty = active ? 31 : 26;
  return { url: "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><circle cx="${cy}" cy="${cy}" r="${r}" fill="${fill}" stroke="white" stroke-width="2"/><text x="${cy}" y="${ty}" text-anchor="middle" font-size="${fs}">${emoji}</text></svg>`), scaledSize: { width: size, height: size } };
};

export default function MapaTuristico() {
  const { lang } = useLang();
  const [selected, setSelected] = useState(null);
  const [sellers, setSellers] = useState([]);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const panelRef = useRef(null);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + '/api/users/sellers')
      .then(r => r.json()).then(d => setSellers(d || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (selected && panelRef.current) {
      setTimeout(() => panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }
  }, [selected]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!apiKey || mapInstanceRef.current) return;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMapaTuristico`;
    script.async = true;
    script.defer = true;
    window.initMapaTuristico = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: -38, lng: -65 },
        zoom: 4,
        styles: [
          { elementType: 'geometry', stylers: [{ color: '#1a2744' }] },
          { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: '#1a2744' }] },
          { featureType: 'administrative.country', elementType: 'geometry.stroke', stylers: [{ color: '#4B6CB7' }] },
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0d2137' }] },
          { featureType: 'road', stylers: [{ visibility: 'off' }] },
          { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#1e3a5f' }] },
        ],
        disableDefaultUI: true,
        zoomControl: true,
      });
      mapInstanceRef.current = map;
      DESTINOS.forEach(d => {
        const icon = svgIcon(d.emoji, false);
        const marker = new window.google.maps.Marker({
          position: { lat: d.lat, lng: d.lng },
          map,
          title: d.nombre,
          icon: { url: icon.url, scaledSize: new window.google.maps.Size(icon.scaledSize.width, icon.scaledSize.height) },
        });
        marker.addListener('click', () => {
          setSelected(prev => prev?.id === d.id ? null : d);
          markersRef.current.forEach(m => {
            const de = DESTINOS.find(x => x.id === m.id);
            if (de) {
              const ic = svgIcon(de.emoji, false);
              m.marker.setIcon({ url: ic.url, scaledSize: new window.google.maps.Size(ic.scaledSize.width, ic.scaledSize.height) });
            }
          });
          const ic = svgIcon(d.emoji, true);
          marker.setIcon({ url: ic.url, scaledSize: new window.google.maps.Size(ic.scaledSize.width, ic.scaledSize.height) });
        });
        markersRef.current.push({ id: d.id, marker });
      });
    };
    document.head.appendChild(script);
    return () => { delete window.initMapaTuristico; };
  }, []);

  const anfitriones = selected ? sellers.filter(s => s.ciudad && selected.ciudades.some(c => s.ciudad.toLowerCase().includes(c.toLowerCase()))).slice(0,3) : [];

  return (
    <div style={{minHeight:'100vh',background:'#0f2027',fontFamily:'system-ui,sans-serif',color:'#fff',display:'flex',flexDirection:'column'}}>
      <div style={{padding:'16px 20px',borderBottom:'1px solid rgba(255,255,255,0.1)',display:'flex',alignItems:'center',gap:16,flexShrink:0}}>
        <Link href="/" style={{color:'rgba(255,255,255,0.7)',textDecoration:'none',fontSize:14,fontWeight:600}}>← Volver</Link>
        <div>
          <h1 style={{margin:0,fontSize:20,fontWeight:800}}>🌍 Mapa Turístico de Argentina</h1>
          <p style={{margin:0,fontSize:12,color:'rgba(255,255,255,0.5)'}}>Tocá un destino para explorar</p>
        </div>
      </div>

      {/* MAPA - siempre full width */}
      <div ref={mapRef} style={{width:'100%',height:'55vh',minHeight:300,flexShrink:0}}/>

      {/* PANEL - debajo del mapa, scroll automático */}
      <div ref={panelRef} style={{width:'100%',background:'rgba(255,255,255,0.03)',borderTop:'2px solid rgba(75,108,183,0.4)',padding:20,flex:1}}>
        {!selected ? (
          <div>
            <p style={{color:'rgba(255,255,255,0.5)',fontSize:13,textAlign:'center',marginBottom:16}}>Tocá un destino en el mapa</p>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:10}}>
              {DESTINOS.map(d=>(
                <button key={d.id} onClick={()=>setSelected(d)} style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:14,padding:'12px',cursor:'pointer',display:'flex',alignItems:'center',gap:8,textAlign:'left'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.12)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}>
                  <span style={{fontSize:22}}>{d.emoji}</span>
                  <div style={{color:'#fff',fontWeight:700,fontSize:13}}>{d.nombre}</div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{maxWidth:600,margin:'0 auto'}}>
            <button onClick={()=>setSelected(null)} style={{background:'rgba(255,255,255,0.1)',border:'none',borderRadius:8,padding:'6px 12px',color:'rgba(255,255,255,0.7)',cursor:'pointer',fontSize:13,marginBottom:16}}>← Volver</button>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:14}}>
              <span style={{fontSize:40}}>{selected.emoji}</span>
              <h2 style={{margin:0,fontSize:24,fontWeight:800,color:'#F6B40E'}}>{selected.nombre}</h2>
            </div>
            <div style={{background:'rgba(255,255,255,0.06)',borderRadius:14,padding:16,marginBottom:12}}>
              <p style={{margin:0,fontSize:14,lineHeight:1.6,color:'rgba(255,255,255,0.9)'}}>{selected.desc[lang]||selected.desc.es}</p>
            </div>
            <div style={{background:'rgba(246,180,14,0.1)',border:'1px solid rgba(246,180,14,0.3)',borderRadius:14,padding:14,marginBottom:20}}>
              <div style={{color:'#F6B40E',fontWeight:700,fontSize:13,marginBottom:4}}>📅 Mejor época para visitar</div>
              <p style={{margin:0,fontSize:13,color:'rgba(255,255,255,0.8)'}}>{selected.epoca[lang]||selected.epoca.es}</p>
            </div>
            <h3 style={{fontSize:14,fontWeight:700,color:'#74ACDF',marginBottom:10}}>🇦🇷 Anfitriones cerca</h3>
            {anfitriones.length===0 ? (
              <div style={{background:'rgba(255,255,255,0.04)',borderRadius:12,padding:16,textAlign:'center'}}>
                <p style={{color:'rgba(255,255,255,0.4)',fontSize:13,margin:'0 0 10px'}}>Aún no hay anfitriones en esta zona.</p>
                <Link href="/explorar"><button style={{background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',border:'none',borderRadius:10,padding:'8px 16px',color:'#fff',fontSize:12,fontWeight:700,cursor:'pointer'}}>Ver todos →</button></Link>
              </div>
            ) : anfitriones.map(a=>(
              <div key={a._id} style={{background:'rgba(255,255,255,0.06)',borderRadius:14,padding:12,display:'flex',alignItems:'center',gap:12,marginBottom:8}}>
                <img src={a.foto} alt={a.nombre} style={{width:48,height:48,borderRadius:'50%',objectFit:'cover',border:'2px solid #74ACDF'}} onError={e=>e.target.src='https://via.placeholder.com/48'}/>
                <div style={{flex:1}}>
                  <div style={{color:'#fff',fontWeight:700,fontSize:14}}>{a.nombre}</div>
                  <div style={{color:'rgba(255,255,255,0.5)',fontSize:12}}>{a.ciudad}</div>
                </div>
                <Link href={`/pay?seller=${a._id}`}><button style={{background:'linear-gradient(135deg,#4B6CB7,#C94B4B)',border:'none',borderRadius:10,padding:'8px 12px',color:'#fff',fontSize:12,fontWeight:700,cursor:'pointer'}}>Ver</button></Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
