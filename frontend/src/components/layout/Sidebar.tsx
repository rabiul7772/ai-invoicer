import { LogOut, FileText, X } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { navItems } from '../../constants';
import { useLogout, useUser } from '../../features/auth/hooks/useAuth';
import { SeedDemoButton } from '../../features/dashboard/components/SeedDemoButton';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();
  const { data: userResponse } = useUser();
  const plan = userResponse?.data?.user?.plan || 'starter';

  return (
    <aside
      className={`fixed md:sticky top-0 left-0 z-50 w-64 h-screen bg-(--color-bg-deep) border-r border-(--color-border) flex flex-col transition-transform duration-300 md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-(--color-border) flex items-center justify-between">
        <Link to="/" onClick={onClose}>
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-linear-to-br from-(--color-primary) to-(--color-primary-hover) rounded-lg flex items-center justify-center shadow-(--shadow-neon) group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4 text-(--color-bg-deep)" />
            </div>
            <span className="text-xl font-black tracking-tighter text-(--color-text-white)">
              AI Invoicer
            </span>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="md:hidden p-1 text-(--color-text-dim) hover:text-(--color-primary)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-linear-to-r from-[rgba(0,255,136,0.1)] to-transparent text-(--color-primary)'
                  : 'text-(--color-text-dim) hover:text-(--color-text-white) hover:bg-[rgba(255,255,255,0.03)]'
              }`
            }
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Pro Plan Upgrade & Logout */}
      <div className="p-4 space-y-4">
        {/* Seed Demo Data Button */}
        <SeedDemoButton />

        {/* Upgrade Card */}
        <div className="p-4 rounded-xl bg-(--color-bg-accent) border border-[rgba(0,255,136,0.1)]">
          <p className="text-[10px] font-bold text-(--color-primary) uppercase tracking-wider mb-2">
            Current Plan:{' '}
            <span className="text-(--color-text-white)">{plan}</span>
          </p>
          <p className="text-xs text-(--color-text-dim) mb-4">
            Get unlimited AI insights & more.
          </p>
          <a
            href="/#pricing"
            className="flex items-center justify-center w-full py-2 bg-(--color-primary) text-(--color-bg-deep) text-sm font-bold rounded hover:bg-(--color-primary-hover) hover:shadow-(--shadow-neon) transition-all"
          >
            Update Plan
          </a>
        </div>

        {/* Logout */}
        <button
          onClick={() => logout?.()}
          className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-medium text-(--color-text-dim) hover:bg-red-500/10 rounded-lg transition-colors"
          disabled={isLoggingOut}
        >
          <div className="text-red-400 flex items-center gap-2">
            <LogOut className="w-5 h-5" />
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </div>
        </button>
      </div>
    </aside>
  );
};
