'use client';
import { useState, useEffect } from 'react';
import Nav from '../components/Nav';

const T = {
  es: {
    titulo: 'Consejos para viajar a Argentina',
    sub: 'Todo lo que necesitás saber antes de llegar',
    secciones: [
      {
        icon: '💵',
        titulo: 'Dinero y divisas',
        items: [
          'Traé dólares o euros en efectivo — es la mejor forma de cambiar al tipo de cambio más conveniente.',
          'En Argentina existe el "dólar blue" (mercado paralelo) que da mucho mejor cambio que el oficial.',
          'Podés retirar pesos en cajeros Banelco con tarjeta Wise o Revolut pagando comisión mínima.',
          'Wise cobra ~0.5% de comisión. Revolut da hasta €200/mes gratis en cajeros.',
          'No cambies en el aeropuerto — el tipo de cambio es muy desfavorable.',
          'Los anfitriones de Argentalk pueden orientarte sobre dónde cambiar de forma segura.',
        ]
      },
      {
        icon: '🚌',
        titulo: 'Como moverse',
        items: [
          'En Buenos Aires existe el subte (metro), colectivos (buses), trenes y taxis/remises.',
          'Para usar el transporte público necesitás la tarjeta SUBE — se compra en kioscos y estaciones.',
          'Los extranjeros pueden comprar la SUBE en cualquier kiosco por ~$500 pesos argentinos.',
          'Los buses interurbanos son excelentes — companies como Flixbus, Andesmar y Chevallier cubren todo el país.',
          'Comprá pasajes de larga distancia en plataformas.gob.ar o en la terminal de ómnibus.',
          'El tren Mitre, Sarmiento y Roca conectan Buenos Aires con el Gran Buenos Aires — muy económico con SUBE.',
          'Para moverse dentro de la ciudad, InDriver y Cabify son más económicos que el taxi tradicional.',
        ]
      },
      {
        icon: '🍖',
        titulo: 'Que comer',
        items: [
          'El asado es el plato nacional — carne a las brasas que se come en familia o con amigos los domingos.',
          'Los alfajores son el snack más popular — galletas rellenas de dulce de leche.',
          'Las empanadas son perfectas para comer rápido — rellenas de carne, jamón y queso o caprese.',
          'Las medialunas son los croissants argentinos — ideales para el desayuno con mate.',
          'El helado argentino es considerado uno de los mejores del mundo — el sabor más pedido es dulce de leche.',
          'La milanesa es un clásico — carne empanada frita que se come con papas fritas.',
          'En Buenos Aires hay restaurantes para todos los gustos y presupuestos.',
        ]
      },
      {
        icon: '📱',
        titulo: 'Conectividad y eSIM',
        items: [
          'Recomendamos comprar una eSIM antes de llegar para tener datos desde el primer momento.',
          'Holafly ofrece eSIM con datos ilimitados para Argentina — muy recomendada para viajeros.',
          'También podés comprar un chip local de Personal, Claro o Movistar en cualquier local de telefonía.',
          'El WiFi en hostels, cafés y restaurantes es generalmente bueno en las ciudades grandes.',
          'Próximamente agregaremos link directo para comprar tu eSIM con descuento.',
        ]
      },
      {
        icon: '🔒',
        titulo: 'Seguridad',
        items: [
          'Argentina es un destino seguro para turistas en comparación con otros países de la región.',
          'Como en cualquier ciudad grande, tené cuidado con el celular en la vía pública.',
          'Evitá mostrar objetos de valor como cámaras o joyas en zonas muy transitadas.',
          'Usá bolsillo interior o riñonera para documentos y efectivo.',
          'Los barrios turísticos como Palermo, San Telmo y Recoleta son muy seguros.',
          'Tener un anfitrión local de Argentalk que te oriente es la mejor forma de moverse con confianza.',
        ]
      },
    ],
    cta: '¿Querés un anfitrión que te ayude a moverte por Argentina?',
    btn: 'Buscar anfitriones',
  },
  en: {
    titulo: 'Travel tips for Argentina',
    sub: 'Everything you need to know before you arrive',
    secciones: [
      {
        icon: '💵',
        titulo: 'Money and currency',
        items: [
          'Bring USD or EUR in cash — it\'s the best way to exchange at the most favorable rate.',
          'Argentina has the "blue dollar" (parallel market) which gives a much better rate than the official one.',
          'You can withdraw pesos at Banelco ATMs with Wise or Revolut cards paying minimum fees.',
          'Wise charges ~0.5% fee. Revolut gives up to €200/month free at ATMs.',
          'Don\'t exchange at the airport — the exchange rate is very unfavorable.',
          'Argentalk hosts can guide you on where to exchange safely.',
        ]
      },
      {
        icon: '🚌',
        titulo: 'Getting around',
        items: [
          'Buenos Aires has the subte (metro), buses, trains and taxis/remises.',
          'To use public transport you need the SUBE card — buy it at kiosks and stations.',
          'Foreigners can buy the SUBE at any kiosk for about $500 Argentine pesos.',
          'Long-distance buses are excellent — companies like Andesmar and Chevallier cover the whole country.',
          'Buy long-distance tickets at plataformas.gob.ar or at the bus terminal.',
          'InDriver and Cabify are cheaper than traditional taxis within the city.',
        ]
      },
      {
        icon: '🍖',
        titulo: 'What to eat',
        items: [
          'Asado is the national dish — barbecued meat eaten with family or friends on Sundays.',
          'Alfajores are the most popular snack — cookies filled with dulce de leche.',
          'Empanadas are perfect for a quick meal — filled with meat, ham and cheese or caprese.',
          'Medialunas are Argentine croissants — ideal for breakfast with mate.',
          'Argentine ice cream is considered one of the best in the world — dulce de leche is the most popular flavor.',
          'Milanesa is a classic — breaded fried meat served with french fries.',
        ]
      },
      {
        icon: '📱',
        titulo: 'Connectivity and eSIM',
        items: [
          'We recommend buying an eSIM before you arrive to have data from the first moment.',
          'Holafly offers eSIM with unlimited data for Argentina — highly recommended for travelers.',
          'You can also buy a local SIM from Personal, Claro or Movistar at any phone store.',
          'WiFi in hostels, cafes and restaurants is generally good in large cities.',
          'We will soon add a direct link to buy your eSIM with a discount.',
        ]
      },
      {
        icon: '🔒',
        titulo: 'Safety',
        items: [
          'Argentina is a safe destination for tourists compared to other countries in the region.',
          'As in any big city, be careful with your phone in public.',
          'Avoid showing valuables like cameras or jewelry in busy areas.',
          'Use an inner pocket or money belt for documents and cash.',
          'Tourist neighborhoods like Palermo, San Telmo and Recoleta are very safe.',
          'Having a local Argentalk host to guide you is the best way to get around with confidence.',
        ]
      },
    ],
    cta: 'Want a host to help you get around Argentina?',
    btn: 'Find hosts',
  },
  pt: {
    titulo: 'Dicas para viajar para a Argentina',
    sub: 'Tudo o que você precisa saber antes de chegar',
    secciones: [
      { icon:'💵', titulo:'Dinheiro e câmbio', items:['Traga dólares ou euros em espécie — é a melhor forma de trocar.','A Argentina tem o "dólar blue" (mercado paralelo) com taxa muito melhor que a oficial.','Você pode sacar pesos em caixas Banelco com Wise ou Revolut pagando taxa mínima.','Não troque no aeroporto — a taxa é muito desfavorável.','Os anfitriões do Argentalk podem orientar sobre onde trocar com segurança.'] },
      { icon:'🚌', titulo:'Como se locomover', items:['Buenos Aires tem metrô, ônibus, trens e táxis.','Para o transporte público você precisa do cartão SUBE — compre em bancas e estações.','Estrangeiros podem comprar o SUBE em qualquer banca.','Ônibus de longa distância são excelentes — cobrem todo o país.','InDriver e Cabify são mais baratos que táxi tradicional.'] },
      { icon:'🍖', titulo:'O que comer', items:['O asado é o prato nacional — churrasco comido em família aos domingos.','Alfajores são o lanche mais popular — biscoitos recheados de doce de leite.','Empanadas são perfeitas para comer rápido.','Medialunas são os croissants argentinos — ideais para o café da manhã.','O sorvete argentino é considerado um dos melhores do mundo.'] },
      { icon:'📱', titulo:'Conectividade e eSIM', items:['Recomendamos comprar um eSIM antes de chegar.','Holafly oferece eSIM com dados ilimitados para Argentina.','Você também pode comprar um chip local de Personal, Claro ou Movistar.','Em breve adicionaremos link direto para comprar seu eSIM com desconto.'] },
      { icon:'🔒', titulo:'Segurança', items:['A Argentina é um destino seguro para turistas.','Como em qualquer grande cidade, cuidado com o celular em público.','Use bolso interno ou pochete para documentos e dinheiro.','Bairros como Palermo, San Telmo e Recoleta são muito seguros.','Ter um anfitrião local do Argentalk é a melhor forma de se locomover com confiança.'] },
    ],
    cta: 'Quer um anfitrião para te ajudar a se locomover pela Argentina?',
    btn: 'Encontrar anfitriões',
  },
  fr: {
    titulo: 'Conseils pour voyager en Argentine',
    sub: 'Tout ce que vous devez savoir avant d\'arriver',
    secciones: [
      { icon:'💵', titulo:'Argent et devises', items:['Apportez des USD ou EUR en espèces — c\'est la meilleure façon d\'échanger.','L\'Argentine a le "dollar bleu" (marché parallèle) avec un meilleur taux que l\'officiel.','Vous pouvez retirer des pesos aux distributeurs Banelco avec Wise ou Revolut.','Ne changez pas à l\'aéroport — le taux est très défavorable.','Les hôtes Argentalk peuvent vous guider pour changer en toute sécurité.'] },
      { icon:'🚌', titulo:'Se déplacer', items:['Buenos Aires a le métro, les bus, les trains et les taxis.','Pour les transports en commun, vous avez besoin de la carte SUBE.','Les bus longue distance sont excellents et couvrent tout le pays.','InDriver et Cabify sont moins chers que les taxis traditionnels.'] },
      { icon:'🍖', titulo:'Que manger', items:['L\'asado est le plat national — barbecue mangé en famille le dimanche.','Les alfajores sont le snack le plus populaire — biscuits fourrés au dulce de leche.','Les empanadas sont parfaites pour manger rapidement.','La glace argentine est considérée comme l\'une des meilleures du monde.'] },
      { icon:'📱', titulo:'Connectivité et eSIM', items:['Nous recommandons d\'acheter un eSIM avant d\'arriver.','Holafly propose des eSIM avec données illimitées pour l\'Argentine.','Vous pouvez aussi acheter une carte SIM locale de Personal, Claro ou Movistar.','Bientôt, nous ajouterons un lien direct pour acheter votre eSIM avec réduction.'] },
      { icon:'🔒', titulo:'Sécurité', items:['L\'Argentine est une destination sûre pour les touristes.','Faites attention à votre téléphone en public.','Utilisez une poche intérieure pour les documents et l\'argent.','Les quartiers comme Palermo, San Telmo et Recoleta sont très sûrs.'] },
    ],
    cta: 'Vous voulez un hôte pour vous aider à vous déplacer en Argentine?',
    btn: 'Trouver des hôtes',
  },
  it: {
    titulo: 'Consigli per viaggiare in Argentina',
    sub: 'Tutto quello che devi sapere prima di arrivare',
    secciones: [
      { icon:'💵', titulo:'Denaro e valute', items:['Porta USD o EUR in contanti — è il modo migliore per cambiare.','L\'Argentina ha il "dollaro blu" (mercato parallelo) con un tasso migliore di quello ufficiale.','Puoi prelevare pesos agli ATM Banelco con Wise o Revolut pagando commissioni minime.','Non cambiare in aeroporto — il tasso è molto sfavorevole.','Gli host di Argentalk possono guidarti su dove cambiare in sicurezza.'] },
      { icon:'🚌', titulo:'Come spostarsi', items:['Buenos Aires ha metropolitana, autobus, treni e taxi.','Per i trasporti pubblici hai bisogno della carta SUBE.','Gli autobus a lunga percorrenza sono eccellenti e coprono tutto il paese.','InDriver e Cabify sono più economici dei taxi tradizionali.'] },
      { icon:'🍖', titulo:'Cosa mangiare', items:['L\'asado è il piatto nazionale — barbecue mangiato in famiglia la domenica.','Gli alfajores sono lo snack più popolare — biscotti ripieni di dulce de leche.','Le empanadas sono perfette per mangiare velocemente.','Il gelato argentino è considerato uno dei migliori al mondo.'] },
      { icon:'📱', titulo:'Connettività e eSIM', items:['Consigliamo di acquistare un eSIM prima di arrivare.','Holafly offre eSIM con dati illimitati per l\'Argentina.','Puoi anche acquistare una SIM locale di Personal, Claro o Movistar.','Presto aggiungeremo un link diretto per acquistare il tuo eSIM con sconto.'] },
      { icon:'🔒', titulo:'Sicurezza', items:['L\'Argentina è una destinazione sicura per i turisti.','Come in qualsiasi grande città, fai attenzione al telefono in pubblico.','Usa una tasca interna per documenti e contanti.','Quartieri come Palermo, San Telmo e Recoleta sono molto sicuri.'] },
    ],
    cta: 'Vuoi un host che ti aiuti a muoverti in Argentina?',
    btn: 'Trova host',
  },
  de: {
    titulo: 'Reisetipps für Argentinien',
    sub: 'Alles was Sie vor der Ankunft wissen müssen',
    secciones: [
      { icon:'💵', titulo:'Geld und Währung', items:['Bringen Sie USD oder EUR in bar mit — das ist die beste Art zu tauschen.','Argentinien hat den "blauen Dollar" (Parallelmarkt) mit viel besserem Kurs als dem offiziellen.','Sie können Pesos an Banelco-Geldautomaten mit Wise oder Revolut abheben.','Tauschen Sie nicht am Flughafen — der Kurs ist sehr ungünstig.','Argentalk-Gastgeber können Sie zu sicheren Wechselstellen führen.'] },
      { icon:'🚌', titulo:'Fortbewegung', items:['Buenos Aires hat U-Bahn, Busse, Züge und Taxis.','Für öffentliche Verkehrsmittel benötigen Sie die SUBE-Karte.','Fernbusse sind ausgezeichnet und decken das ganze Land ab.','InDriver und Cabify sind günstiger als traditionelle Taxis.'] },
      { icon:'🍖', titulo:'Was essen', items:['Asado ist das Nationalgericht — Grillfleisch das sonntags mit der Familie gegessen wird.','Alfajores sind der beliebteste Snack — Kekse gefüllt mit Dulce de Leche.','Empanadas sind perfekt für eine schnelle Mahlzeit.','Argentinisches Eis gilt als eines der besten der Welt.'] },
      { icon:'📱', titulo:'Konnektivität und eSIM', items:['Wir empfehlen, eine eSIM vor der Ankunft zu kaufen.','Holafly bietet eSIM mit unbegrenzten Daten für Argentinien an.','Sie können auch eine lokale SIM-Karte von Personal, Claro oder Movistar kaufen.','Bald fügen wir einen direkten Link zum Kauf Ihrer eSIM mit Rabatt hinzu.'] },
      { icon:'🔒', titulo:'Sicherheit', items:['Argentinien ist im Vergleich zu anderen Ländern der Region ein sicheres Reiseziel.','Wie in jeder Großstadt, passen Sie in der Öffentlichkeit auf Ihr Telefon auf.','Verwenden Sie eine Innentasche für Dokumente und Bargeld.','Stadtteile wie Palermo, San Telmo und Recoleta sind sehr sicher.'] },
    ],
    cta: 'Möchten Sie einen Gastgeber, der Ihnen hilft, sich in Argentinien zurechtzufinden?',
    btn: 'Gastgeber finden',
  },
  zh: {
    titulo: '阿根廷旅行贴士',
    sub: '到达前您需要了解的一切',
    secciones: [
      { icon:'💵', titulo:'金钱和货币', items:['带美元或欧元现金——这是兑换最优惠汇率的最佳方式。','阿根廷有"蓝色美元"（平行市场），比官方汇率好得多。','您可以在Banelco自动取款机用Wise或Revolut卡提取比索，手续费最低。','不要在机场兑换——汇率非常不利。','Argentalk的主人可以指导您在哪里安全兑换。'] },
      { icon:'🚌', titulo:'交通出行', items:['布宜诺斯艾利斯有地铁、公共汽车、火车和出租车。','乘坐公共交通需要SUBE卡——在报刊亭和车站购买。','长途巴士非常棒，覆盖全国各地。','InDriver和Cabify比传统出租车便宜。'] },
      { icon:'🍖', titulo:'饮食', items:['阿萨多是国菜——周日与家人一起吃的烧烤。','阿尔法霍尔是最受欢迎的零食——填充牛奶焦糖的饼干。','恩帕纳达斯是快速用餐的完美选择。','阿根廷冰淇淋被认为是世界上最好的之一。'] },
      { icon:'📱', titulo:'网络和eSIM', items:['建议在到达前购买eSIM，以便从第一刻起就有数据。','Holafly提供阿根廷无限数据eSIM，非常推荐。','也可以在当地购买Personal、Claro或Movistar的SIM卡。','即将添加以折扣价购买eSIM的直接链接。'] },
      { icon:'🔒', titulo:'安全', items:['与该地区其他国家相比，阿根廷是一个安全的旅游目的地。','与任何大城市一样，在公共场所注意手机。','使用内袋或腰包存放证件和现金。','帕勒莫、圣特尔莫和雷科莱塔等街区非常安全。'] },
    ],
    cta: '想要一个主人帮助您在阿根廷四处走动吗？',
    btn: '寻找主人',
  },
  ru: {
    titulo: 'Советы для путешествия в Аргентину',
    sub: 'Всё, что нужно знать перед приездом',
    secciones: [
      { icon:'💵', titulo:'Деньги и валюта', items:['Привезите наличные USD или EUR — лучший способ обменять по выгодному курсу.','В Аргентине есть "синий доллар" (параллельный рынок) с гораздо лучшим курсом.','Можно снимать песо в банкоматах Banelco с картами Wise или Revolut с минимальной комиссией.','Не меняйте в аэропорту — курс очень невыгодный.','Хозяева Argentalk могут подсказать, где безопасно обменять.'] },
      { icon:'🚌', titulo:'Передвижение', items:['В Буэнос-Айресе есть метро, автобусы, поезда и такси.','Для общественного транспорта нужна карта SUBE — купить в киосках и на станциях.','Междугородние автобусы отличные и охватывают всю страну.','InDriver и Cabify дешевле традиционного такси.'] },
      { icon:'🍖', titulo:'Что поесть', items:['Асадо — национальное блюдо, мясо на гриле, которое едят с семьёй по воскресеньям.','Альфахорес — самая популярная закуска, печенье с дульсе де лече.','Эмпанадас идеальны для быстрого перекуса.','Аргентинское мороженое считается одним из лучших в мире.'] },
      { icon:'📱', titulo:'Связь и eSIM', items:['Рекомендуем купить eSIM до приезда, чтобы сразу иметь интернет.','Holafly предлагает eSIM с безлимитным интернетом для Аргентины.','Также можно купить местную SIM-карту Personal, Claro или Movistar.','Скоро добавим прямую ссылку для покупки eSIM со скидкой.'] },
      { icon:'🔒', titulo:'Безопасность', items:['Аргентина — безопасное направление для туристов по сравнению с другими странами региона.','Как в любом большом городе, следите за телефоном на улице.','Используйте внутренний карман для документов и наличных.','Районы Палермо, Сан-Тельмо и Реколета очень безопасны.'] },
    ],
    cta: 'Хотите хозяина, который поможет вам передвигаться по Аргентине?',
    btn: 'Найти хозяина',
  },
};

export default function Consejos() {
  const [lang, setLang] = useState('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'es';
    setLang(savedLang);
  }, []);

  const t = T[lang] || T.en;

  return (
    <>
      <Nav links={[{href:'/explorar',label:t.btn}]} />
      <div className="container">
        <div className="card" style={{textAlign:'center',marginBottom:16}}>
          <div style={{fontSize:48,marginBottom:8}}>🇦🇷</div>
          <h1 style={{marginBottom:4}}>{t.titulo}</h1>
          <p style={{color:'#888',fontSize:14}}>{t.sub}</p>
        </div>

        {t.secciones.map((s, i) => (
          <div key={i} className="card" style={{marginBottom:16}}>
            <h2 style={{marginBottom:16}}>{s.icon} {s.titulo}</h2>
            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              {s.items.map((item, j) => (
                <div key={j} style={{display:'flex',gap:10,alignItems:'flex-start'}}>
                  <span style={{color:'#003DA5',fontWeight:700,flexShrink:0}}>→</span>
                  <p style={{margin:0,fontSize:14,color:'#555',lineHeight:1.6}}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="card" style={{background:'#003DA5',textAlign:'center'}}>
          <p style={{color:'white',fontSize:15,marginBottom:16,lineHeight:1.6}}>{t.cta}</p>
          <a href="/explorar">
            <button className="btn-orange" style={{width:'auto',padding:'12px 28px'}}>{t.btn}</button>
          </a>
        </div>
      </div>
    </>
  );
}