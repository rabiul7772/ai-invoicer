import {
  Sparkles,
  AlertTriangle,
  TrendingUp,
  Zap,
  ShieldCheck,
  BarChart3,
  UserCheck,
  Loader2
} from 'lucide-react';
import { InsightCard } from './InsightCard';
import { useAiInsights } from '../hooks/useAiInsights';

const ICON_MAP: Record<string, any> = {
  TrendingUp,
  AlertTriangle,
  Zap,
  ShieldCheck,
  BarChart3,
  UserCheck,
  Sparkles
};

export const InsightsSection = () => {
  const { data: insights, isLoading, isError } = useAiInsights();

  if (isLoading) {
    return (
      <div className="card-premium border-[rgba(0,255,136,0.05)]! py-8! min-h-[200px] flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-[#00ff88] animate-spin" />
        <p className="text-(--color-text-dim) animate-pulse font-medium">
          Gemini is analyzing your business data...
        </p>
      </div>
    );
  }

  if (isError || !insights) return null;

  return (
    <div className="card-premium border-[rgba(0,255,136,0.05)]! py-8!">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="w-5 h-5 text-[#00ff88]" />
        <h2 className="text-lg font-bold">AI Business Insights</h2>
      </div>

      <div
        className={`grid gap-6 ${
          insights.length === 1
            ? 'grid-cols-1 max-w-md mx-auto text-center'
            : 'grid-cols-1 lg:grid-cols-3'
        }`}
      >
        {insights
          .filter(
            (insight: any) => typeof insight === 'object' && insight.content
          )
          .map((insight: any, i: number) => {
            const IconComponent = ICON_MAP[insight.icon] || Sparkles;
            return (
              <div
                key={i}
                className={insights.length === 1 ? 'flex justify-center' : ''}
              >
                <InsightCard
                  icon={IconComponent}
                  iconColor={insight.iconColor || '#00ff88'}
                  content={insight.content}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};
