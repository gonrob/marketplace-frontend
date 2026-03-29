'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';

export default function Retry() {
  const router = useRouter();
  useEffect(() => {
    api.get('/api/stripe/seller/onboarding')
      .then(res => { window.location.href = res.data.url; })
      .catch(() => router.push('/dashboard'));
  }, []);
  return <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>Redirigiendo a Stripe...</div>;
}
