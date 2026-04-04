'use client';
import Link from 'next/link';
import useLang from '../../lib/useLang';

export default function Nav({ links = [] }) {
  const { lang } = useLang();

  const HOME = {
    es:'🏠 Home', en:'🏠 Home', pt:'🏠 Home',
    fr:'🏠 Home', it:'🏠 Home', de:'🏠 Home',
    zh:'🏠 主页', ru:'🏠 Главная'
  };

  return (
    <nav className="nav">
      <Link href="/" style={{textDecoration:'none'}}>
        <span className="nav-logo">Know<span>an</span> 🌐</span>
      </Link>
      <div className="nav-links">
        <Link href="/" style={{fontSize:13,color:'white',textDecoration:'none',opacity:0.8}}>{HOME[lang]||'🏠 Home'}</Link>
        {links.map((l, i) => (
          <Link key={i} href={l.href} style={{fontSize:13,color:'white',textDecoration:'none'}}>{l.label}</Link>
        ))}
      </div>
    </nav>
  );
}