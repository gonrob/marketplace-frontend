'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Nav from '../components/Nav';

const CULTURAS = {
  mate: {
    icon: '🧉',
    es: { titulo:'El Mate', sub:'La bebida nacional de Argentina', secciones:[{t:'¿Qué es el mate?',p:'El mate es una infusión hecha con hojas de yerba mate. Es mucho más que una bebida — es un ritual social que une a las personas. Se comparte en ronda, pasando el mate de mano en mano.'},{t:'Las reglas',p:'El cebador llena el mate y lo pasa. No se agradece hasta que quieras terminar. Si decís "gracias" significa que no querés más. Nunca muevas la bombilla.'}], cta:'¿Querés aprender a tomar mate con un argentino real?'},
    en: { titulo:'Mate', sub:"Argentina's national drink", secciones:[{t:'What is mate?',p:"Mate is an infusion made from dried yerba mate leaves. It's much more than a drink — it's a social ritual that brings people together, shared in a circle from hand to hand."},{t:'The rules',p:"The cebador fills the mate and passes it. Don't say thank you until you're done — 'thank you' means you don't want more. Never move the bombilla."}], cta:'Want to learn to drink mate with a real Argentinian?'},
    pt: { titulo:'O Mate', sub:'A bebida nacional da Argentina', secciones:[{t:'O que é o mate?',p:'O mate é uma infusão feita com folhas de erva-mate. É muito mais que uma bebida — é um ritual social que une as pessoas, compartilhado em roda.'},{t:'As regras',p:'O cebador enche e passa. Não agradeça até querer terminar — "obrigado" significa que não quer mais. Nunca mova a bombilla.'}], cta:'Quer aprender a tomar mate com um argentino real?'},
    fr: { titulo:'Le Maté', sub:"La boisson nationale de l'Argentine", secciones:[{t:"Qu'est-ce que le maté?",p:"Le maté est une infusion de feuilles de yerba mate. C'est un rituel social qui réunit les gens, partagé en cercle de main en main."},{t:'Les règles',p:"Le cebador remplit et passe. Ne remerciez pas avant d'avoir fini — merci signifie que vous n'en voulez plus. Ne bougez jamais la bombilla."}], cta:'Vous voulez apprendre à boire du maté avec un vrai Argentin?'},
    it: { titulo:'Il Mate', sub:"La bevanda nazionale dell'Argentina", secciones:[{t:"Cos'è il mate?",p:"Il mate è un'infusione di foglie di yerba mate. È un rituale sociale che unisce le persone, condiviso in cerchio di mano in mano."},{t:'Le regole',p:"Il cebador riempie e passa. Non ringraziare fino alla fine — 'grazie' significa che non vuoi più. Non muovere mai la bombilla."}], cta:'Vuoi imparare a bere il mate con un vero argentino?'},
    de: { titulo:'Mate', sub:'Das Nationalgetränk Argentiniens', secciones:[{t:'Was ist Mate?',p:'Mate ist ein Aufguss aus Yerba-Mate-Blättern. Es ist ein soziales Ritual, das Menschen zusammenbringt, im Kreis von Hand zu Hand gereicht.'},{t:'Die Regeln',p:'Der Cebador füllt und reicht weiter. Bedanken Sie sich nicht bis zum Ende — Danke bedeutet, Sie möchten keinen mehr. Bewegen Sie nie die Bombilla.'}], cta:'Möchten Sie Mate mit einem echten Argentinier lernen?'},
    zh: { titulo:'马黛茶', sub:'阿根廷的国家饮料', secciones:[{t:'什么是马黛茶?',p:'马黛茶是用马黛茶叶制成的茶饮。这是一种社交仪式，人们围成一圈分享，将马黛茶从一个人传递给另一个人。'},{t:'规则',p:'冲泡者填满并传递。在完成之前不要道谢——谢谢意味着你不想要更多。永远不要移动吸管。'}], cta:'想和真正的阿根廷人学习喝马黛茶吗?'},
    ru: { titulo:'Мате', sub:'Национальный напиток Аргентины', secciones:[{t:'Что такое мате?',p:'Мате — настой из листьев йерба мате. Это социальный ритуал, объединяющий людей, передаваемый по кругу из рук в руки.'},{t:'Правила',p:'Себадор наполняет и передаёт. Не благодарите до конца — спасибо значит больше не хотите. Никогда не двигайте бомбилью.'}], cta:'Хотите научиться пить мате с настоящим аргентинцем?'},
  },
  truco: {
    icon: '🃏',
    es: { titulo:'El Truco', sub:'El juego de cartas más popular de Argentina', secciones:[{t:'¿Qué es el Truco?',p:'El Truco es un juego de cartas español muy popular en Argentina, Uruguay y Paraguay. Se juega con una baraja española de 40 cartas. Es un juego de estrategia, bluff y mucha picardía.'},{t:'Las cartas más importantes',p:'1 de Espadas (el macho), 1 de Bastos (el mata), 7 de Espadas y 7 de Oros son las más poderosas del juego.'}], cta:'¿Querés aprender a jugar al Truco con un argentino real?'},
    en: { titulo:'Truco', sub:"Argentina's most popular card game", secciones:[{t:'What is Truco?',p:"Truco is a Spanish card game very popular in Argentina, Uruguay and Paraguay. It's played with a Spanish deck of 40 cards. It's a game of strategy, bluffing and cunning."},{t:'The most important cards',p:'Ace of Swords, Ace of Clubs, 7 of Swords and 7 of Coins are the most powerful cards in the game.'}], cta:'Want to learn to play Truco with a real Argentinian?'},
    pt: { titulo:'Truco', sub:'O jogo de cartas mais popular da Argentina', secciones:[{t:'O que é o Truco?',p:'O Truco é um jogo de cartas espanhol muito popular na Argentina, Uruguai e Paraguai. É jogado com um baralho espanhol de 40 cartas.'},{t:'As cartas mais importantes',p:'Ás de Espadas, Ás de Paus, 7 de Espadas e 7 de Ouros são as mais poderosas.'}], cta:'Quer aprender a jogar Truco com um argentino real?'},
    fr: { titulo:'Truco', sub:"Le jeu de cartes le plus populaire d'Argentine", secciones:[{t:"Qu'est-ce que le Truco?",p:"Le Truco est un jeu de cartes espagnol très populaire en Argentine. Il se joue avec un jeu espagnol de 40 cartes."},{t:'Les cartes les plus importantes',p:"As d'Épées, As de Bâtons, 7 d'Épées et 7 d'Ors sont les plus puissantes."}], cta:'Vous voulez apprendre à jouer au Truco avec un vrai Argentin?'},
    it: { titulo:'Truco', sub:"Il gioco di carte più popolare dell'Argentina", secciones:[{t:"Cos'è il Truco?",p:"Il Truco è un gioco di carte spagnolo molto popolare in Argentina. Si gioca con un mazzo spagnolo di 40 carte."},{t:'Le carte più importanti',p:'Asso di Spade, Asso di Bastoni, 7 di Spade e 7 di Ori sono le più potenti.'}], cta:'Vuoi imparare a giocare a Truco con un vero argentino?'},
    de: { titulo:'Truco', sub:'Argentiniens beliebtestes Kartenspiel', secciones:[{t:'Was ist Truco?',p:'Truco ist ein spanisches Kartenspiel, das in Argentinien sehr beliebt ist. Es wird mit einem spanischen Deck von 40 Karten gespielt.'},{t:'Die wichtigsten Karten',p:'As der Schwerter, As der Keulen, 7 der Schwerter und 7 der Münzen sind die stärksten.'}], cta:'Möchten Sie Truco mit einem echten Argentinier lernen?'},
    zh: { titulo:'特鲁科', sub:'阿根廷最受欢迎的纸牌游戏', secciones:[{t:'什么是特鲁科?',p:'特鲁科是一种西班牙纸牌游戏，在阿根廷、乌拉圭和巴拉圭非常流行。使用40张西班牙纸牌游戏。'},{t:'最重要的牌',p:'剑A、棍A、剑7和金币7是最强的牌。'}], cta:'想和真正的阿根廷人学习玩特鲁科吗?'},
    ru: { titulo:'Труко', sub:'Самая популярная карточная игра Аргентины', secciones:[{t:'Что такое Труко?',p:'Труко — испанская карточная игра, очень популярная в Аргентине. Играется испанской колодой из 40 карт.'},{t:'Самые важные карты',p:'Туз Мечей, Туз Жезлов, 7 Мечей и 7 Монет — самые сильные карты.'}], cta:'Хотите научиться играть в Труко с настоящим аргентинцем?'},
  },
  futbol: {
    icon: '⚽',
    es: { titulo:'El Fútbol', sub:'Una religión con millones de fieles', secciones:[{t:'El fútbol en Argentina',p:'En Argentina el fútbol no es un deporte, es una pasión. La Selección Argentina es tricampeona del mundo: 1978, 1986 y 2022 con Lionel Messi.'},{t:'Los grandes equipos',p:'Boca Juniors, River Plate, San Lorenzo, Racing e Independiente son los más populares. El superclásico Boca-River es el partido más famoso del mundo.'}], cta:'¿Querés hablar de fútbol con un argentino fanático?'},
    en: { titulo:'Football', sub:'A religion with millions of followers', secciones:[{t:'Football in Argentina',p:"In Argentina, football is not a sport — it's a passion. The Argentine national team is a three-time world champion: 1978, 1986 and 2022 with Lionel Messi."},{t:'The great teams',p:'Boca Juniors, River Plate, San Lorenzo, Racing and Independiente are the most popular. The Boca-River superclásico is the most famous match in the world.'}], cta:'Want to talk about football with a passionate Argentinian?'},
    pt: { titulo:'Futebol', sub:'Uma religião com milhões de fiéis', secciones:[{t:'O futebol na Argentina',p:'Na Argentina, o futebol não é um esporte — é uma paixão. A seleção argentina é tricampeã mundial: 1978, 1986 e 2022 com Lionel Messi.'},{t:'Os grandes times',p:'Boca Juniors, River Plate, San Lorenzo, Racing e Independiente são os mais populares.'}], cta:'Quer falar de futebol com um argentino fanático?'},
    fr: { titulo:'Football', sub:'Une religion avec des millions de fidèles', secciones:[{t:'Le football en Argentine',p:"En Argentine, le football n'est pas un sport — c'est une passion. L'équipe nationale est triple championne du monde: 1978, 1986 et 2022 avec Lionel Messi."},{t:'Les grandes équipes',p:'Boca Juniors, River Plate, San Lorenzo, Racing et Independiente sont les plus populaires.'}], cta:'Vous voulez parler de football avec un Argentin passionné?'},
    it: { titulo:'Calcio', sub:'Una religione con milioni di fedeli', secciones:[{t:'Il calcio in Argentina',p:"In Argentina il calcio non è uno sport — è una passione. La nazionale argentina è tre volte campione del mondo: 1978, 1986 e 2022 con Lionel Messi."},{t:'Le grandi squadre',p:'Boca Juniors, River Plate, San Lorenzo, Racing e Independiente sono le più popolari.'}], cta:'Vuoi parlare di calcio con un appassionato argentino?'},
    de: { titulo:'Fußball', sub:'Eine Religion mit Millionen Anhängern', secciones:[{t:'Fußball in Argentinien',p:'In Argentinien ist Fußball kein Sport — es ist eine Leidenschaft. Die argentinische Nationalmannschaft ist dreifacher Weltmeister: 1978, 1986 und 2022 mit Lionel Messi.'},{t:'Die großen Teams',p:'Boca Juniors, River Plate, San Lorenzo, Racing und Independiente sind die beliebtesten.'}], cta:'Möchten Sie mit einem leidenschaftlichen Argentinier über Fußball sprechen?'},
    zh: { titulo:'足球', sub:'拥有数百万信徒的宗教', secciones:[{t:'阿根廷的足球',p:'在阿根廷，足球不是运动——它是激情。阿根廷国家队三次夺得世界杯冠军：1978年、1986年和2022年（梅西带队）。'},{t:'伟大的球队',p:'博卡青年、河床、圣洛伦索、竞赛和独立队是最受欢迎的。'}], cta:'想和热情的阿根廷人谈论足球吗?'},
    ru: { titulo:'Футбол', sub:'Религия с миллионами последователей', secciones:[{t:'Футбол в Аргентине',p:'В Аргентине футбол — не спорт, это страсть. Сборная Аргентины трёхкратный чемпион мира: 1978, 1986 и 2022 (с Месси).'},{t:'Великие команды',p:'Бока Хуниорс, Ривер Плейт, Сан-Лоренсо, Расинг и Индепендьенте — самые популярные.'}], cta:'Хотите поговорить о футболе с настоящим аргентинцем?'},
  },
  dulce: {
    icon: '🍮',
    es: { titulo:'Dulce de Leche', sub:'El sabor más argentino del mundo', secciones:[{t:'¿Qué es el dulce de leche?',p:'El dulce de leche es una crema espesa hecha a base de leche y azúcar cocinadas lentamente. Es el ingrediente estrella de la repostería argentina: alfajores, medialunas y helados.'},{t:'¿Dónde se usa?',p:'En el alfajor, en medialunas, en el helado (el sabor más pedido), en las tostadas del desayuno y en tortas de cumpleaños.'}], cta:'¿Querés aprender recetas argentinas con dulce de leche?'},
    en: { titulo:'Dulce de Leche', sub:'The most Argentine flavor in the world', secciones:[{t:'What is dulce de leche?',p:"Dulce de leche is a thick cream made from slowly cooked milk and sugar. It's the star ingredient of Argentine pastries: alfajores, medialunas and ice cream."},{t:'Where is it used?',p:'In alfajor, in medialunas (Argentine croissants), in ice cream (the most requested flavor), in breakfast toast and birthday cakes.'}], cta:'Want to learn Argentine recipes with dulce de leche?'},
    pt: { titulo:'Doce de Leite', sub:'O sabor mais argentino do mundo', secciones:[{t:'O que é o doce de leite?',p:'O doce de leite é um creme espesso feito de leite e açúcar cozidos lentamente. É o ingrediente estrela da confeitaria argentina.'},{t:'Onde é usado?',p:'No alfajor, nas medialunas, no sorvete, nas torradas do café e em bolos de aniversário.'}], cta:'Quer aprender receitas argentinas com doce de leite?'},
    fr: { titulo:'Dulce de Leche', sub:'La saveur la plus argentine du monde', secciones:[{t:"Qu'est-ce que le dulce de leche?",p:"Le dulce de leche est une crème épaisse à base de lait et de sucre cuits lentement. C'est l'ingrédient vedette de la pâtisserie argentine."},{t:'Où est-il utilisé?',p:'Dans les alfajors, les medialunas, la glace, les toasts et les gâteaux.'}], cta:'Vous voulez apprendre des recettes argentines au dulce de leche?'},
    it: { titulo:'Dulce de Leche', sub:'Il sapore più argentino del mondo', secciones:[{t:"Cos'è il dulce de leche?",p:"Il dulce de leche è una crema densa fatta di latte e zucchero cotti lentamente. È l'ingrediente stella della pasticceria argentina."},{t:'Dove viene usato?',p:"Nell'alfajor, nelle medialunas, nel gelato, nel pane tostato e nelle torte di compleanno."}], cta:'Vuoi imparare ricette argentine con dulce de leche?'},
    de: { titulo:'Dulce de Leche', sub:'Der argentinischste Geschmack der Welt', secciones:[{t:'Was ist Dulce de Leche?',p:'Dulce de Leche ist eine dicke Creme aus langsam gekochter Milch und Zucker. Es ist die Hauptzutat der argentinischen Bäckerei.'},{t:'Wo wird es verwendet?',p:'Im Alfajor, in Medialunas, im Eis, auf Toast und in Geburtstagskuchen.'}], cta:'Möchten Sie argentinische Rezepte mit Dulce de Leche lernen?'},
    zh: { titulo:'牛奶焦糖', sub:'世界上最阿根廷的味道', secciones:[{t:'什么是牛奶焦糖?',p:'牛奶焦糖是由牛奶和糖慢慢烹煮而成的浓稠奶油。它是阿根廷糕点的明星原料：阿尔法霍尔、牛角包和冰淇淋。'},{t:'在哪里使用?',p:'在阿尔法霍尔饼干、牛角包、冰淇淋、早餐吐司和生日蛋糕中。'}], cta:'想和阿根廷人学习牛奶焦糖食谱吗?'},
    ru: { titulo:'Дульсе де Лече', sub:'Самый аргентинский вкус в мире', secciones:[{t:'Что такое дульсе де лече?',p:'Дульсе де лече — густой крем из медленно приготовленного молока и сахара. Это главный ингредиент аргентинской выпечки.'},{t:'Где используется?',p:'В альфаторе, медиалунах, мороженом, тостах и праздничных тортах.'}], cta:'Хотите научиться аргентинским рецептам с дульсе де лече?'},
  },
};

const UI = {
  es:{btn:'Buscar anfitriones'},en:{btn:'Find hosts'},pt:{btn:'Encontrar anfitriões'},fr:{btn:'Trouver des hôtes'},it:{btn:'Trova host'},de:{btn:'Gastgeber finden'},zh:{btn:'寻找主人'},ru:{btn:'Найти хозяина'},
};

export default function CulturaPage({ culturaKey }) {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
  }, []);

  const cultura = CULTURAS[culturaKey];
  if (!cultura) return null;
  const data = cultura[lang] || cultura.en;
  const ui = UI[lang] || UI.en;

  return (
    <>
      <Nav links={[{href:'/explorar',label:ui.btn}]} />
      <div className="container">
        <div className="card" style={{textAlign:'center',marginBottom:16}}>
          <div style={{fontSize:56,marginBottom:8}}>{cultura.icon}</div>
          <h1 style={{marginBottom:4}}>{data.titulo}</h1>
          <p style={{color:'#888',fontSize:14}}>{data.sub}</p>
        </div>
        {data.secciones && data.secciones.map((s, i) => (
          <div key={i} className="card" style={{marginBottom:16}}>
            <h2 style={{marginBottom:12}}>{s.t}</h2>
            <p style={{color:'#555',lineHeight:1.7,fontSize:15}}>{s.p}</p>
          </div>
        ))}
        <div className="card" style={{background:'#003DA5',textAlign:'center'}}>
          <p style={{color:'white',fontSize:15,marginBottom:16,lineHeight:1.6}}>{data.cta}</p>
          <Link href="/explorar">
            <button className="btn-orange" style={{width:'auto',padding:'12px 28px'}}>{ui.btn}</button>
          </Link>
        </div>
      </div>
    </>
  );
}
