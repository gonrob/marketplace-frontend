'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Nav({ links = [] }) {
  const router = useRouter();

  return (
    <nav className="nav">
      <Link href="/" style={{textDecoration:'none'}}>
        <span className="nav-logo">Argen<span>talk</span> 🧉</span>
      </Link>
      <div className="nav-links">
        <Link href="/" style={{fontSize:13,color:'white',textDecoration:'none',opacity:0.8}}>🏠 Home</Link>
        {links.map((l, i) => (
          <Link key={i} href={l.href} style={{fontSize:13,color:'white',textDecoration:'none'}}>{l.label}</Link>
        ))}
      </div>
    </nav>
  );
}