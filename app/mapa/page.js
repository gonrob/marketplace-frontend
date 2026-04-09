"use client";

import { useState, useEffect, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from "@react-google-maps/api";
import Nav from '../components/Nav';
import useLang from '../../lib/useLang';
import api from '../../lib/api';

const CITY_COORDS = {
  "Buenos Aires":   { lat: -34.6037, lng: -58.3816 },
  "Córdoba":        { lat: -31.4135, lng: -64.1811 },
  "Rosario":        { lat: -32.9468, lng: -60.6393 },
  "Mendoza":        { lat: -32.8908, lng: -68.8272 },
  "Bariloche":      { lat: -41.1335, lng: -71.3103 },
  "Salta":          { lat: -24.7859, lng: -65.4117 },
  "Tucumán":        { lat: -26.8083, lng: -65.2176 },
  "Mar del Plata":  { lat: -38.0023, lng: -57.5575 },
  "Ushuaia":        { lat: -54.8019, lng: -68.3030 },
  "Río Negro":      { lat: -39.0333, lng: -67.0000 },
  "Navarro":        { lat: -35.0000, lng: -59.2667 },
  "Ciudad Jardín":  { lat: -34.6500, lng: -58.5167 },
  "Charata":        { lat: -27.2167, lng: -61.1833 },
  "Bahía Blanca":   { lat: -38.7183, lng: -62.2663 },
};

const getCoordsForCity = (ciudad) => {
  if (!ciudad) return null;
  // Buscar coincidencia exacta primero
  if (CITY_COORDS[ciudad]) return CITY_COORDS[ciudad];
  // Buscar coincidencia parcial
  const ciudadLower = ciudad.toLowerCase();
  for (const [key, coords] of Object.entries(CITY_COORDS)) {
    if (ciudadLower.includes(key.toLowerCase()) || key.toLowerCase().includes(ciudadLower.split(' ')[0].toLowerCase())) {
      return coords;
    }
  }
  // Default Buenos Aires
  return CITY_COORDS['Buenos Aires'];
};

const MAP_CENTER = { lat: -35.5, lng: -63.0 };
const MAP_ZOOM = 5;
const containerStyle = { width: "100%", height: "100%" };

const texts = {
  es: { title: "Mapa de Anfitriones", subtitle: "Encontrá anfitriones cerca tuyo", loading: "Cargando mapa...", contact: "Contactar", price: "por hora" },
  en: { title: "Host Map", subtitle: "Find hosts near you", loading: "Loading map...", contact: "Contact", price: "per hour" },
  pt: { title: "Mapa de Anfitriões", subtitle: "Encontre anfitriões perto de você", loading: "Carregando...", contact: "Contatar", price: "por hora" },
  fr: { title: "Carte des Hôtes", subtitle: "Trouvez des hôtes près de chez vous", loading: "Chargement...", contact: "Contacter", price: "par heure" },
  it: { title: "Mappa degli Host", subtitle: "Trova host vicino a te", loading: "Caricamento...", contact: "Contatta", price: "all'ora" },
  de: { title: "Gastgeber-Karte", subtitle: "Finde Gastgeber in deiner Nähe", loading: "Laden...", contact: "Kontaktieren", price: "pro Stunde" },
  zh: { title: "房东地图", subtitle: "在附近找到房东", loading: "加载中...", contact: "联系", price: "每小时" },
  ru: { title: "Карта хозяев", subtitle: "Найдите хозяев рядом", loading: "Загрузка...", contact: "Связаться", price: "в час" },
};

export default function MapaPage() {
  const { lang } = useLang();
  const t = texts[lang] || texts.es;
  const [sellers, setSellers] = useState([]);
  const [selected, setSelected] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "",
    id: "knowan-map",
  });

  useEffect(() => {
    api.get("/api/users/sellers")
      .then((res) => setSellers(res.data || []))
      .catch(() => setSellers([]));
  }, []);

  const withOffset = sellers
    .filter((s) => s.disponible && s.ciudad && getCoordsForCity(s.ciudad))
    .map((s, i, arr) => {
      const coords = getCoordsForCity(s.ciudad);
      const sameCity = arr.slice(0, i).filter((x) => x.ciudad === s.ciudad).length;
      return {
        ...s,
        coords: {
          lat: coords.lat + sameCity * 0.04,
          lng: coords.lng + sameCity * 0.04,
        },
      };
    });

  if (loadError) {
    return (
      <div style={{ minHeight: "100vh", background: "rgba(255,255,255,0.88)" }}>
        <Nav />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "80vh", flexDirection: "column", gap: 8 }}>
          <p style={{ fontSize: 18, color: "#C94B4B" }}>⚠️ Error al cargar Google Maps.</p>
          <p style={{ fontSize: 14, color: "#666" }}>Verificá que la API key esté correcta y que Maps JavaScript API esté habilitada.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "rgba(255,255,255,0.88)" }}>
      <Nav />
      <div style={{ textAlign: "center", padding: "32px 16px 16px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, background: "linear-gradient(90deg, #4B6CB7, #C94B4B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>
          {t.title}
        </h1>
        <p style={{ color: "#555", fontSize: 15 }}>{t.subtitle}</p>
      </div>
      <div style={{ margin: "0 auto", maxWidth: 900, height: 520, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 24px rgba(75,108,183,0.13)", border: "1.5px solid #e5e7eb", marginBottom: 40 }}>
        {!isLoaded ? (
          <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#f0f4ff" }}>
            <p style={{ color: "#4B6CB7", fontSize: 16 }}>{t.loading}</p>
          </div>
        ) : (
          <GoogleMap mapContainerStyle={containerStyle} center={MAP_CENTER} zoom={MAP_ZOOM} options={{ streetViewControl: false, mapTypeControl: false, styles: [{ featureType: "poi", stylers: [{ visibility: "off" }] }] }}>
            {withOffset.map((seller) => (
              <Marker
                key={seller._id}
                position={seller.coords}
                title={seller.nombre}
                onClick={() => setSelected(seller)}
                icon={{ path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z", fillColor: "#4B6CB7", fillOpacity: 1, strokeColor: "#fff", strokeWeight: 1.5, scale: 1.7, anchor: { x: 12, y: 24 } }}
              />
            ))}
            {selected && (
              <InfoWindow position={selected.coords} onCloseClick={() => setSelected(null)}>
                <div style={{ minWidth: 180, fontFamily: "sans-serif" }}>
                  {selected.foto && <img src={selected.foto} alt={selected.nombre} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", display: "block", margin: "0 auto 8px", border: "2px solid #4B6CB7" }} />}
                  <p style={{ fontWeight: 700, fontSize: 15, textAlign: "center", margin: "0 0 2px" }}>{selected.nombre}</p>
                  <p style={{ color: "#666", fontSize: 12, textAlign: "center", margin: "0 0 6px" }}>📍 {selected.ciudad}</p>
                  {selected.precio && <p style={{ color: "#4B6CB7", fontSize: 13, textAlign: "center", margin: "0 0 8px" }}>USD {selected.precio} {t.price}</p>}
                  {selected.puntuacion > 0 && <p style={{ color: "#f59e0b", fontSize: 12, textAlign: "center", margin: "0 0 8px" }}>{"★".repeat(Math.round(selected.puntuacion))} ({selected.puntuacion.toFixed(1)})</p>}
                  <a href={"/pay?seller=" + selected._id} style={{ display: "block", background: "linear-gradient(90deg, #4B6CB7, #C94B4B)", color: "#fff", textAlign: "center", padding: "7px 12px", borderRadius: 8, fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{t.contact}</a>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
