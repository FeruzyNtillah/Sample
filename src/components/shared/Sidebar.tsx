'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Monitor, 
  CircleDollarSign,
  Activity,
  FolderDown,
  AlignLeft,
  BarChart2,
  Timer,
  Settings,
  ChevronRight,
  Shield,
  User,
  LogOut,
  Moon,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

interface SidebarProps {
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

const navigationGroups: NavGroup[] = [
  {
    label: 'MAIN',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard size={18} /> },
      { label: 'Jobs', href: '/dashboard/jobs', icon: <Briefcase size={18} /> },
      { label: 'Invoice Documents', href: '/dashboard/invoice-documents', icon: <FileText size={18} /> },
      { label: 'PO Documents', href: '/dashboard/po-documents', icon: <Monitor size={18} /> },
      { label: 'Payment Notifications', href: '/dashboard/payment-notifications', icon: <CircleDollarSign size={18} /> },
    ],
  },
  {
    label: 'OPERATIONS',
    items: [
      { label: 'Status', href: '/dashboard/status', icon: <Activity size={18} /> },
      { label: 'Imports', href: '/dashboard/imports', icon: <FolderDown size={18} /> },
      { label: 'Requests', href: '/dashboard/requests', icon: <AlignLeft size={18} /> },
    ],
  },
  {
    label: 'ANALYTICS',
    items: [
      { label: 'Executive KPI', href: '/dashboard/dashboards/kpi', icon: <BarChart2 size={18} /> },
      { label: 'Reporting SLA', href: '/dashboard/dashboards/sla', icon: <Timer size={18} /> },
    ],
  },
  {
    label: 'ADMIN',
    items: [
      { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={18} /> },
    ],
  },
];

export function Sidebar({ isMobileMenuOpen = false, setIsMobileMenuOpen }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard' || pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const handleSignOut = () => {
    logout();
    setIsProfileOpen(false);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (href: string) => {
    router.push(href);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-[280px] bg-[#0d1117] border-r border-[#21262d] flex-col overflow-y-auto z-50">
        {/* Top Section - Logo */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#5eead4] rounded-full flex items-center justify-center">
              <Shield size={20} className="text-[#0d1117]" />
            </div>
            <div>
              <div className="text-white font-bold">Microsoft Reports</div>
              <div className="text-gray-400 text-xs">Workspace</div>
            </div>
          </div>
          <div className="border-t border-[#21262d]"></div>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 px-3">
          {navigationGroups.map((group) => (
            <div key={group.label} className="mb-6">
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 px-2">
                {group.label}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-[#161b22] text-white border-l-[3px] border-[#5eead4]'
                        : 'text-gray-400 hover:bg-[#161b22] hover:text-white'
                    }`}
                  >
                    {item.icon}
                    <span className="text-sm">{item.label}</span>
                    {isActive(item.href) && (
                      <ChevronRight size={16} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section - User Profile */}
        <div className="border-t border-[#21262d] p-4">
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#161b22] transition-colors"
            >
              <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">A</span>
              </div>
              <div className="flex-1 text-left">
                <div className="text-white font-semibold text-sm">Admin</div>
                <div className="text-gray-400 text-xs">{user?.email}</div>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#161b22] border border-[#21262d] rounded-lg shadow-lg p-2">
                <div className="flex items-center justify-between p-2">
                  <div className="flex items-center gap-2">
                    <Moon size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-300">Dark Mode</span>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    title="Toggle dark mode"
                    className={`w-10 h-5 rounded-full transition-colors ${
                      darkMode ? 'bg-[#5eead4]' : 'bg-gray-600'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 bg-white rounded-full transition-transform ${
                        darkMode ? 'translate-x-5' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
                <div className="border-t border-[#21262d] my-2"></div>
                <button
                  onClick={() => {
                    router.push('/dashboard/profile');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded hover:bg-[#0d1117] transition-colors"
                >
                  <User size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-300">Profile</span>
                </button>
                <button
                  onClick={() => {
                    router.push('/dashboard/settings');
                    setIsProfileOpen(false);
                  }}
                  className="w-full flex items-center gap-2 p-2 rounded hover:bg-[#0d1117] transition-colors"
                >
                  <Settings size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-300">Settings</span>
                </button>
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 p-2 rounded hover:bg-[#0d1117] transition-colors"
                >
                  <LogOut size={16} className="text-red-400" />
                  <span className="text-sm text-red-400">Sign out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`
        lg:hidden fixed inset-0 z-50 transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
        />
        
        {/* Sidebar Content */}
        <div className="relative w-[280px] h-full bg-[#0d1117] border-r border-[#21262d] flex flex-col overflow-y-auto">
          {/* Close Button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setIsMobileMenuOpen && setIsMobileMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white hover:bg-[#161b22] rounded-lg transition-colors"
              title="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Top Section - Logo */}
          <div className="p-5 pt-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#5eead4] rounded-full flex items-center justify-center">
                <Shield size={20} className="text-[#0d1117]" />
              </div>
              <div>
                <div className="text-white font-bold">Microsoft Reports</div>
                <div className="text-gray-400 text-xs">Workspace</div>
              </div>
            </div>
            <div className="border-t border-[#21262d]"></div>
          </div>

          {/* Navigation Sections */}
          <div className="flex-1 px-3">
            {navigationGroups.map((group) => (
              <div key={group.label} className="mb-6">
                <div className="text-xs text-gray-400 uppercase tracking-wider mb-2 px-2">
                  {group.label}
                </div>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleNavigation(item.href)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive(item.href)
                          ? 'bg-[#161b22] text-white border-l-[3px] border-[#5eead4]'
                          : 'text-gray-400 hover:bg-[#161b22] hover:text-white'
                      }`}
                    >
                      {item.icon}
                      <span className="text-sm">{item.label}</span>
                      {isActive(item.href) && (
                        <ChevronRight size={16} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section - User Profile */}
          <div className="border-t border-[#21262d] p-4">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-[#161b22] transition-colors"
              >
                <div className="w-8 h-8 bg-[#1e3a5f] rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">A</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="text-white font-semibold text-sm">Admin</div>
                  <div className="text-gray-400 text-xs">{user?.email}</div>
                </div>
                <ChevronRight size={16} className="text-gray-400" />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-[#161b22] border border-[#21262d] rounded-lg shadow-lg p-2">
                  <div className="flex items-center justify-between p-2">
                    <div className="flex items-center gap-2">
                      <Moon size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-300">Dark Mode</span>
                    </div>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      title="Toggle dark mode"
                      className={`w-10 h-5 rounded-full transition-colors ${
                        darkMode ? 'bg-[#5eead4]' : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          darkMode ? 'translate-x-5' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="border-t border-[#21262d] my-2"></div>
                  <button
                    onClick={() => {
                      router.push('/dashboard/profile');
                      setIsProfileOpen(false);
                      if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded hover:bg-[#0d1117] transition-colors"
                  >
                    <User size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-300">Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      router.push('/dashboard/settings');
                      setIsProfileOpen(false);
                      if (setIsMobileMenuOpen) setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded hover:bg-[#0d1117] transition-colors"
                  >
                    <Settings size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-300">Settings</span>
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 p-2 rounded hover:bg-[#0d1117] transition-colors"
                  >
                    <LogOut size={16} className="text-red-400" />
                    <span className="text-sm text-red-400">Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Overlay (for profile dropdown) */}
      {isProfileOpen && !isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileOpen(false)}
        />
      )}
    </>
  );
}
