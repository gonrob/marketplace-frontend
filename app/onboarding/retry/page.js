'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../../lib/api';

export default function OnboardingRetry() {
  const router = useRouter();

  useEffect(() => {
    const retry = async () => {
      try {
        const res = await api.get('/api/stripe/seller/onboarding');
        window.location.href = res.data.url;
      } catch {
        router.push('/dashboard');
      }
    };
    retry();
  }, []);

  return (
    <div className="spinner">Redirigiendo a Stripe...</div>
  );
}
