import React, { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  Bell,
  Calendar,
  Users,
  Image as ImageIcon,
  Mail,
  FileEdit,
  Settings,
  Shield,
  LogOut,
  ExternalLink,
  Menu,
  X,
  GraduationCap,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const AdminLayout = () => {
  const { user, logout, isSuperAdmin } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    addToast('You have been securely signed out.', 'info');
    navigate('/admin22/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin22/dashboard', icon: LayoutDashboard },
    { name: 'Admission Enquiries', path: '/admin22/admissions', icon: UserCheck },
    { name: 'Notices & Circulars', path: '/admin22/notices', icon: Bell },
    { name: 'School Events', path: '/admin22/events', icon: Calendar },
    { name: 'Faculty Management', path: '/admin22/faculty', icon: Users },
    { name: 'Gallery Media', path: '/admin22/gallery', icon: ImageIcon },
    { name: 'Contact Messages', path: '/admin22/messages', icon: Mail },
    { name: 'Page Content', path: '/admin22/content', icon: FileEdit },
    { name: 'Website Settings', path: '/admin22/settings', icon: Settings },
    ...(isSuperAdmin
      ? [{ name: 'Admin Users & Roles', path: '/admin22/users', icon: ShieldAlert }]
      : []),
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* TOP HEADER */}
      <header className="bg-brand-navy text-white sticky top-0 z-30 shadow-md">
        <div className="flex items-center justify-between px-4 sm:px-6 h-16">
          {/* Left: Mobile hamburger + School Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-white focus:outline-none"
              aria-label="Toggle navigation drawer"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <Link to="/admin22/dashboard" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-brand-blue flex items-center justify-center text-white shadow-xs">
                <GraduationCap className="w-5 h-5 text-brand-cyan" />
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-base tracking-tight font-display">
                  XYZ SCHOOL <span className="text-brand-cyan text-xs font-semibold">ADMIN PANEL</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Right: Public Website Link + User Profile & Logout */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-brand-cyan" />
              <span>View Public Portal</span>
            </Link>

            <div className="h-6 w-px bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-blue/80 flex items-center justify-center text-white font-bold text-xs uppercase border border-brand-cyan/40">
                {user?.name ? user.name.charAt(0) : 'A'}
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold leading-tight">{user?.name || 'Administrator'}</div>
                <div className="text-[10px] text-brand-cyan uppercase tracking-wider font-semibold">
                  {user?.role || 'Super Admin'}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* BODY SHELL: SIDEBAR + MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION (Desktop & Drawer) */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto flex flex-col justify-between pt-16 lg:pt-0 ${
            sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
        >
          {/* Nav links */}
          <div className="p-4 space-y-1.5 overflow-y-auto">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Management Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-brand-navy text-white shadow-xs'
                        : 'text-slate-600 hover:text-brand-navy hover:bg-slate-100'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="flex-1">{item.name}</span>
                </NavLink>
              );
            })}
          </div>

          {/* Bottom user footer */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="text-[11px] text-slate-500 font-medium">
              Connected as: <span className="font-bold text-slate-700">{user?.email}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Role: <span className="uppercase text-brand-blue font-bold">{user?.role}</span>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile sidebar */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-xs"
          />
        )}

        {/* MAIN OUTLET CONTAINER */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
