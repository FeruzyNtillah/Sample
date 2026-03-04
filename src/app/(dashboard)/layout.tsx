'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Sidebar } from '@/components/shared/Sidebar';
import { Toaster } from 'sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, initialize } = useAuth();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5eead4]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <Sidebar />
      
      <main className="ml-[280px] flex-1 flex flex-col min-h-screen">
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
      
      <Toaster richColors position="top-right" />
    </div>
  );
}
