import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
}

export const StatCard = ({ label, value, icon: Icon }: StatCardProps) => {
  return (
    <div className="card-premium p-4 md:p-6 group hover:border-[rgba(0,255,136,0.2)]! transition-all duration-300">
      <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
        <div className="p-2 md:p-2.5 rounded-xl bg-[rgba(255,255,255,0.03)] group-hover:bg-[rgba(0,255,136,0.05)] transition-colors">
          <Icon className="w-4 h-4 md:w-5 md:h-5 text-[#00ff88] transition-colors" />
        </div>
        <p className="text-xs md:text-sm font-medium text-[rgba(255,255,255,0.4)]">
          {label}
        </p>
      </div>

      <p className="text-md md:text-2xl font-black text-white tracking-tight">
        {value}
      </p>
    </div>
  );
};
