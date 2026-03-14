import { LogOut, FileText } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import { navItems } from '../../constants';
import { useLogout } from '../../features/auth/hooks/useAuth';
import { SeedDemoButton } from '../../features/dashboard/components/SeedDemoButton';

export const Sidebar = () => {
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  return (
    <aside className="w-64 border-r border-(--color-border) bg-(--color-bg-deep) flex flex-col h-screen sticky top-0">
      {/* Brand Header */}
      <Link to="/">
        <div className="p-6 border-b border-(--color-border)">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-linear-to-br from-(--color-primary) to-(--color-primary-hover) rounded-lg flex items-center justify-center shadow-(--shadow-neon) group-hover:scale-110 transition-transform">
              <FileText className="w-4 h-4 text-(--color-bg-deep)" />
            </div>
            <span className="text-xl font-black tracking-tighter text-(--color-text-white)">
              AI Invoicer
            </span>
          </div>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
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
            Pro Plan
          </p>
          <p className="text-xs text-(--color-text-dim) mb-4">
            Get unlimited AI insights and custom templates.
          </p>
          <button className="w-full py-2 bg-(--color-primary) text-(--color-bg-deep) text-sm font-bold rounded hover:bg-(--color-primary-hover) hover:shadow-(--shadow-neon) transition-all">
            Upgrade Now
          </button>
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
