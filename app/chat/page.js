'use client';
import { useState } from 'react';
import Nav from '../components/Nav';
import useLang from '../../lib/useLang';

const LUNFARDO = [
  { lunfardo: 'Morfar', es: 'Comer', en: 'Eat', pt: 'Comer', fr: 'Manger', it: 'Mangiare', de: 'Essen', zh: '吃', ru: 'Есть' },
  { lunfardo: 'Laburo', es: 'Trabajo', en: 'Work', pt: 'Trabalho', fr: 'Travail', it: 'Lavoro', de: 'Arbeit', zh: '工作', ru: 'Работа' },
  { lunfardo: 'Pibe', es: 'Chico/Muchacho', en: 'Kid/Boy', pt: 'Garoto', fr: 'Gamin', it: 'Ragazzo', de: 'Junge', zh: '男孩', ru: 'Парень' },
  { lunfardo: 'Mina', es: 'Mujer/Chica', en: 'Woman/Girl', pt: 'Mulher', fr: 'Femme', it: 'Ragazza', de: 'Frau', zh: '女人', ru: 'Женщина' },
  { lunfardo: 'Guita', es: 'Dinero', en: 'Money', pt: 'Dinheiro', fr: 'Argent', it: 'Soldi', de: 'Geld', zh: '钱', ru: 'Деньги' },
  { lunfardo: 'Cana', es: 'Policía', en: 'Police', pt: 'Polícia', fr: 'Police', it: 'Polizia', de: 'Polizei', zh: '警察', ru: 'Полиция' },
  { lunfardo: 'Fiaca', es: 'Pereza/Flojera', en: 'Laziness', pt: 'Preguiça', fr: 'Paresse', it: 'Pigrizia', de: 'Faulheit', zh: '懒惰', ru: 'Лень' },
  { lunfardo: 'Chabón', es: 'Tipo/Hombre', en: 'Guy/Dude', pt: 'Cara', fr: 'Mec', it: 'Tipo', de: 'Typ', zh: '家伙', ru: 'Чувак' },
  { lunfardo: 'Trucho', es: 'Falso/Feo', en: 'Fake/Bad', pt: 'Falso', fr: 'Faux', it: 'Falso', de: 'Falsch', zh: '假的', ru: 'Фальшивый' },
  { lunfardo: 'Copado', es: 'Genial/Bueno', en: 'Cool/Great', pt: 'Legal', fr: 'Cool', it: 'Figo', de: 'Toll', zh: '酷', ru: 'Классный' },
  { lunfardo: 'Quilombo', es: 'Lío/Desorden', en: 'Mess/Chaos', pt: 'Bagunça', fr: 'Bordel', it: 'Casino', de: 'Chaos', zh: '混乱', ru: 'Беспорядок' },
  { lunfardo: 'Flashear', es: 'Imaginar/Alucinar', en: 'Imagine/Daydream', pt: 'Fantasiar', fr: 'Fantasmer', it: 'Fantasticare', de: 'Tagträumen', zh: '幻想', ru: 'Фантазировать' },
  { lunfardo: 'Facha', es: 'Aspecto/Estilo', en: 'Look/Style', pt: 'Aparência', fr: 'Allure', it: 'Aspetto', de: 'Aussehen', zh: '外表', ru: 'Внешность' },
  { lunfardo: 'Boliche', es: 'Discoteca/Bar', en: 'Nightclub/Bar', pt: 'Boate', fr: 'Boîte de nuit', it: 'Discoteca', de: 'Diskothek', zh: '夜店', ru: 'Ночной клуб' },
  { lunfardo: 'Mango', es: 'Peso argentino', en: 'Argentine peso', pt: 'Peso argentino', fr: 'Peso argentin', it: 'Peso argentino', de: 'Argentinischer Peso', zh: '阿根廷比索', ru: 'Аргентинское песо' },
  { lunfardo: 'Re', es: 'Muy/Bastante', en: 'Very/Really', pt: 'Muito', fr: 'Très', it: 'Molto', de: 'Sehr', zh: '非常', ru: 'Очень' },
  { lunfardo: 'Afanar', es: 'Robar', en: 'Steal', pt: 'Roubar', fr: 'Voler', it: 'Rubare', de: 'Stehlen', zh: '偷', ru: 'Красть' },
  { lunfardo: 'Telo', es: 'Hotel por horas', en: 'Love hotel', pt: 'Hotel por horas', fr: 'Hôtel à l\'heure', it: 'Hotel a ore', de: 'Stundenhotel', zh: '情侣旅馆', ru: 'Почасовой отель' },
  { lunfardo: 'Cheto', es: 'Pijo/Elegante', en: 'Posh/Fancy', pt: 'Chique', fr: 'Chic', it: 'Chic', de: 'Schick', zh: '时髦', ru: 'Шикарный' },
  { lunfardo: 'Berreta', es: 'De mala calidad', en: 'Low quality/Cheap', pt: 'Barato/Ruim', fr: 'De mauvaise qualité', it: 'Di bassa qualità', de: 'Minderwertig', zh: '劣质', ru: 'Некачественный' },
];

const T = {
  es: { titulo: 'Aprendé el Lunfardo 🇦🇷', sub: 'El argot porteño que tenés que conocer', buscador: 'Buscar palabra...', lunfardo: 'Lunfardo', significado: 'Significado', traductor: 'Traductor Español ↔ Lunfardo', escribe: 'Escribí en español o lunfardo...', traducir: 'Traducir', resultado: 'Traducción:', todasPalabras: 'Todas las palabras' },
  en: { titulo: 'Learn Lunfardo 🇦🇷', sub: 'Buenos Aires slang you need to know', buscador: 'Search word...', lunfardo: 'Lunfardo', significado: 'Meaning', traductor: 'Spanish ↔ Lunfardo Translator', escribe: 'Write in Spanish or lunfardo...', traducir: 'Translate', resultado: 'Translation:', todasPalabras: 'All words' },
  pt: { titulo: 'Aprenda o Lunfardo 🇦🇷', sub: 'O gíria portenha que você precisa conhecer', buscador: 'Buscar palavra...', lunfardo: 'Lunfardo', significado: 'Significado', traductor: 'Tradutor Espanhol ↔ Lunfardo', escribe: 'Escreva em espanhol ou lunfardo...', traducir: 'Traduzir', resultado: 'Tradução:', todasPalabras: 'Todas as palavras' },
  fr: { titulo: 'Apprendre le Lunfardo 🇦🇷', sub: "L'argot porteño que vous devez connaître", buscador: 'Chercher un mot...', lunfardo: 'Lunfardo', significado: 'Signification', traductor: 'Traducteur Espagnol ↔ Lunfardo', escribe: 'Écrivez en espagnol ou lunfardo...', traducir: 'Traduire', resultado: 'Traduction:', todasPalabras: 'Tous les mots' },
  it: { titulo: 'Impara il Lunfardo 🇦🇷', sub: 'Il gergo porteño che devi conoscere', buscador: 'Cerca parola...', lunfardo: 'Lunfardo', significado: 'Significato', traductor: 'Traduttore Spagnolo ↔ Lunfardo', escribe: 'Scrivi in spagnolo o lunfardo...', traducir: 'Traduci', resultado: 'Traduzione:', todasPalabras: 'Tutte le parole' },
  de: { titulo: 'Lunfardo lernen 🇦🇷', sub: 'Der porteño Slang, den du kennen musst', buscador: 'Wort suchen...', lunfardo: 'Lunfardo', significado: 'Bedeutung', traductor: 'Spanisch ↔ Lunfardo Übersetzer', escribe: 'Schreib auf Spanisch oder Lunfardo...', traducir: 'Übersetzen', resultado: 'Übersetzung:', todasPalabras: 'Alle Wörter' },
  zh: { titulo: '学习 Lunfardo 🇦🇷', sub: '你需要了解的布宜诺斯艾利斯俚语', buscador: '搜索单词...', lunfardo: 'Lunfardo', significado: '含义', traductor: '西班牙语 ↔ Lunfardo 翻译器', escribe: '用西班牙语或lunfardo写...', traducir: '翻译', resultado: '翻译:', todasPalabras: '所有单词' },
  ru: { titulo: 'Учите Lunfardo 🇦🇷', sub: 'Портенский сленг, который нужно знать', buscador: 'Поиск слова...', lunfardo: 'Lunfardo', significado: 'Значение', traductor: 'Переводчик Испанский ↔ Lunfardo', escribe: 'Пишите на испанском или lunfardo...', traducir: 'Перевести', resultado: 'Перевод:', todasPalabras: 'Все слова' },
};

export default function Chat() {
  const { lang } = useLang();
  const t = T[lang] || T.es;
  const [busqueda, setBusqueda] = useState('');
  const [texto, setTexto] = useState('');
  const [traduccion, setTraduccion] = useState('');
  const [loading, setLoading] = useState(false);

  const palabrasFiltradas = LUNFARDO.filter(p =>
    p.lunfardo.toLowerCase().includes(busqueda.toLowerCase()) ||
    p.es.toLowerCase().includes(busqueda.toLowerCase()) ||
    (p[lang] && p[lang].toLowerCase().includes(busqueda.toLowerCase()))
  );

  const traducir = () => {
    if (!texto.trim()) return;
    setLoading(true);
    const textoBuscar = texto.toLowerCase().trim();
    
    // Buscar en lunfardo -> idioma
    const encontradoLunfardo = LUNFARDO.find(p => 
      p.lunfardo.toLowerCase() === textoBuscar ||
      p.lunfardo.toLowerCase().includes(textoBuscar)
    );
    
    if (encontradoLunfardo) {
      const significado = lang === 'es' ? encontradoLunfardo.es : (encontradoLunfardo[lang] || encontradoLunfardo.es);
      setTraduccion(`${encontradoLunfardo.lunfardo} = ${significado}`);
      setLoading(false);
      return;
    }

    // Buscar en idioma -> lunfardo
    const encontradoIdioma = LUNFARDO.find(p => {
      const val = lang === 'es' ? p.es : (p[lang] || p.es);
      return val.toLowerCase().includes(textoBuscar) || p.es.toLowerCase().includes(textoBuscar);
    });

    if (encontradoIdioma) {
      const significado = lang === 'es' ? encontradoIdioma.es : (encontradoIdioma[lang] || encontradoIdioma.es);
      setTraduccion(`${significado} = ${encontradoIdioma.lunfardo} (lunfardo)`);
    } else {
      setTraduccion('No encontré esa palabra en el lunfardo.');
    }
    setLoading(false);
  };

  return (
    <>
      <Nav />
      <div className="container">
        <div style={{ textAlign: 'center', padding: '24px 0 8px' }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, background: 'linear-gradient(90deg,#4B6CB7,#C94B4B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: '0 0 8px' }}>{t.titulo}</h1>
          <p style={{ color: '#666', fontSize: 14, margin: 0 }}>{t.sub}</p>
        </div>

        {/* TRADUCTOR */}
        <div className="card" style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 14 }}>🔄 {t.traductor}</h2>
          <textarea
            value={texto}
            onChange={e => setTexto(e.target.value)}
            placeholder={t.escribe}
            rows={3}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none', boxSizing: 'border-box', resize: 'none', marginBottom: 10 }}
          />
          <button onClick={traducir} disabled={loading} className="btn-orange">
            {loading ? '...' : t.traducir}
          </button>
          {traduccion && (
            <div style={{ marginTop: 14, padding: '14px 16px', background: '#f0f4ff', borderRadius: 10, border: '1.5px solid #4B6CB7' }}>
              <div style={{ fontSize: 12, color: '#4B6CB7', fontWeight: 600, marginBottom: 4 }}>{t.resultado}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>{traduccion}</div>
            </div>
          )}
        </div>

        {/* DICCIONARIO */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>📖 {t.todasPalabras} ({palabrasFiltradas.length})</h2>
          </div>
          <input
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            placeholder={t.buscador}
            style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #d1d5db', fontSize: 14, outline: 'none', boxSizing: 'border-box', marginBottom: 16 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {palabrasFiltradas.map((p, i) => (
              <div key={i} onClick={() => setTexto(p.lunfardo)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8faff', borderRadius: 12, border: '1.5px solid #e5e7eb', cursor: 'pointer' }}>
                <div>
                  <span style={{ fontWeight: 800, fontSize: 15, color: '#4B6CB7' }}>{p.lunfardo}</span>
                  <span style={{ fontSize: 12, color: '#aaa', marginLeft: 8 }}>🇦🇷</span>
                </div>
                <div style={{ fontSize: 14, color: '#333', fontWeight: 500, textAlign: 'right' }}>
                  {lang === 'es' ? p.es : (p[lang] || p.es)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
