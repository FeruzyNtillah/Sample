'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { Toaster } from 'sonner';
import { Menu } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#161b22] border border-[#21262d] rounded-lg text-white hover:bg-[#21262d] transition-colors"
        title="Toggle menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar */}
      <Sidebar 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen} 
      />
      
      {/* Main Content */}
      <main className="ml-0 lg:ml-[280px] flex-1 flex flex-col min-h-screen transition-all duration-300">
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 pt-16 lg:pt-8">
          {children}
        </div>
      </main>
      
      <Toaster richColors position="top-right" />
    </div>
  );
}
