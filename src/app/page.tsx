'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5eead4]"></div>
    </div>
  );
}
