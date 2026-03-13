import { FileText } from 'lucide-react';
import { Link } from 'react-router';

export const NavLogo = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Link
      to="/"
      onClick={() => {
        window.scrollTo({ top: 0 });
        onClick?.();
      }}
      className="flex items-center gap-2 group cursor-pointer"
    >
      <div className="w-8 h-8 bg-linear-to-br from-(--color-primary) to-(--color-primary-hover) rounded-lg flex items-center justify-center shadow-(--shadow-neon) group-hover:scale-110 transition-transform">
        <FileText className="w-4 h-4 text-(--color-bg-deep)" />
      </div>
      <span className="text-xl font-black tracking-tighter text-(--color-text-white)">
        AI Invoicer
      </span>
    </Link>
  );
};
