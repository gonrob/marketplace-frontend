'use client';
import { useState, useEffect } from 'react';

export default function useLang() {
  const [lang, setLangState] = useState(() => {
    if (typeof window !== 'undefined') return localStorage.getItem('lang') || 'es';
    return 'es';
  });

  useEffect(() => {
    const saved = localStorage.getItem('lang') || 'es';
    setLangState(saved);

    const handler = () => {
      const updated = localStorage.getItem('lang') || 'es';
      setLangState(updated);
    };

    window.addEventListener('langchange', handler);
    return () => window.removeEventListener('langchange', handler);
  }, []);

  const setLang = (code) => {
    setLangState(code);
    localStorage.setItem('lang', code);
    window.dispatchEvent(new Event('langchange'));
  };

  return { lang, setLang };
}