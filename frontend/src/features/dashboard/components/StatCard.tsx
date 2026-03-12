import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export const StatCard = ({ label, value, icon: Icon }: StatCardProps) => {
  return (
    <div className="card-premium group hover:border-[rgba(0,255,136,0.2)]! transition-all duration-300">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] group-hover:bg-[rgba(0,255,136,0.05)] transition-colors">
          <Icon className="w-5 h-5 text-[#00ff88] transition-colors" />
        </div>
        <p className="text-sm font-medium text-[rgba(255,255,255,0.4)]">
          {label}
        </p>
      </div>

      <p className="text-2xl font-black text-white tracking-tight">{value}</p>
    </div>
  );
};
