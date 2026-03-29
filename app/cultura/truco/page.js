'use client';
import CulturaPage from '../CulturaPage';
export default function Truco() {
  return <CulturaPage
    icon="🃏" titulo="El Truco" sub="El juego de cartas más popular de Argentina"
    secciones={[
      {titulo:'¿Qué es el Truco?',texto:'El Truco es un juego de cartas español muy popular en Argentina, Uruguay y Paraguay. Se juega con una baraja española de 40 cartas. Es un juego de estrategia, bluff y mucha picardía.'},
      {titulo:'Las cartas más importantes',lista:[['1 de Espadas','El macho','La carta más poderosa'],['1 de Bastos','El mata','Segunda más fuerte'],['7 de Espadas','El siete','Tercera en importancia'],['7 de Oros','El siete de oros','Cuarta más poderosa']]},
    ]}
    cta="¿Querés aprender a jugar al Truco con un argentino real?"
  />;
}
