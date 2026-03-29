'use client';
import CulturaPage from '../CulturaPage';
export default function Mate() {
  return <CulturaPage
    icon="🧉" titulo="El mate" sub="Mucho más que una bebida, es un ritual de amistad"
    secciones={[
      {titulo:'¿Qué es el mate?',texto:'El mate es la infusion más popular de Argentina. Se prepara con yerba mate dentro de un recipiente y se toma con una bombilla de metal. Es amargo, aunque se puede endulzar.'},
      {titulo:'El ritual',items:['El cebador llena el mate con yerba y agua caliente (70-80°C, nunca hirviendo)','Se pasa al siguiente en ronda. Se toma todo y se devuelve sin decir gracias','Cuando ya no querés más, decís "gracias" — esa es la señal para parar']},
    ]}
    cta="¿Querés aprender a cebar mate con un argentino real?"
  />;
}
