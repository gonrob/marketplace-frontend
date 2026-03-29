'use client';
import CulturaPage from '../CulturaPage';
export default function Futbol() {
  return <CulturaPage
    icon="⚽" titulo="El Fútbol" sub="Una religión con millones de fieles"
    secciones={[
      {titulo:'El fútbol en Argentina',texto:'En Argentina el fútbol no es un deporte, es una pasión. La Selección Argentina es tricampeona del mundo: 1978, 1986 y 2022.'},
      {titulo:'Los grandes equipos',lista:[['Boca Juniors','Los Xeneizes','Buenos Aires'],['River Plate','Los Millonarios','Buenos Aires'],['San Lorenzo','El Ciclón','Buenos Aires'],['Racing Club','La Academia','Avellaneda'],['Independiente','El Rojo','Avellaneda']]},
    ]}
    cta="¿Querés hablar de fútbol con un argentino fanático?"
  />;
}
