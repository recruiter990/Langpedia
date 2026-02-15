'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { hasCompletedOnboarding } from '@/lib/user';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page (landing) or learn page based on onboarding status
    if (hasCompletedOnboarding()) {
      router.push('/learn');
    } else {
      router.push('/home');
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
}
