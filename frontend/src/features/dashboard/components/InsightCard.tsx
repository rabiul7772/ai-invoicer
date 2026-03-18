import type { LucideIcon } from 'lucide-react';

interface InsightCardProps {
  icon: LucideIcon;
  content: string;
  iconColor?: string;
}

export const InsightCard = ({
  icon: Icon,
  content,
  iconColor = '#00ff88'
}: InsightCardProps) => {
  return (
    <div className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-xl p-6 flex flex-col items-center text-center gap-4 transition-all hover:bg-[rgba(255,255,255,0.03)] hover:border-[rgba(0,255,136,0.1)]">
      <div
        className="p-2 rounded-lg shrink-0"
        style={{ backgroundColor: `${iconColor}10`, color: iconColor }}
      >
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-[rgba(255,255,255,0.7)] leading-relaxed font-medium text-left">
        {content}
      </p>
    </div>
  );
};
