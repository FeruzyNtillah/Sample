'use client';

import { Bell } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="h-[60px] bg-[#0d1117] border-b border-[#21262d] flex items-center justify-between px-6">
      <h1 className="text-lg font-semibold text-white">{title}</h1>
      
      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 text-gray-400 hover:text-white transition-colors"
          title="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </span>
        </div>
      </div>
    </header>
  );
}
