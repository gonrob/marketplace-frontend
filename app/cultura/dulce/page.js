'use client';
import CulturaPage from '../CulturaPage';
export default function Dulce() {
  return <CulturaPage
    icon="🍮" titulo="Dulce de leche" sub="El sabor más argentino del mundo"
    secciones={[
      {titulo:'¿Qué es el dulce de leche?',texto:'El dulce de leche es una crema espesa hecha a base de leche y azúcar. Es el ingrediente estrella de la repostería argentina: alfajores, facturas, medialunas, tortas y helados.'},
      {titulo:'¿Dónde se usa?',lista:[['Alfajor','El snack más famoso',''],['Medialuna','Croissant argentino',''],['Helado','El sabor más pedido',''],['Tostadas','El desayuno clásico','']]},
    ]}
    cta="¿Querés aprender recetas argentinas con dulce de leche?"
  />;
}
