'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';
export default function Retry() {
  const router = useRouter();
  useEffect(() => {
    api.get('/api/stripe/seller/onboarding')
      .then(r => { window.location.href = r.data.url; })
      .catch(() => router.push('/dashboard'));
  }, []);
  return <div className="spinner">Redirigiendo a Stripe...</div>;
}
