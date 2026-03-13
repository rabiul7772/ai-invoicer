import { Sparkles, AlertTriangle, TrendingUp, Calculator } from 'lucide-react';
import { InsightCard } from './InsightCard';

const INSIGHTS = [
  {
    icon: AlertTriangle,
    iconColor: '#ff5555',
    content:
      '3 invoices are overdue by more than 7 days. Automatic follow-ups have been drafted.'
  },
  {
    icon: TrendingUp,
    iconColor: '#00ff88',
    content:
      'Projected cash flow for next month is $45,200 based on historical client payment patterns.'
  },
  {
    icon: Calculator,
    iconColor: '#3b82f6',
    content:
      'Tax estimation for Q3 is currently $12,400. Set aside 15% of upcoming revenue.'
  }
];

export const InsightsSection = () => {
  return (
    <div className="card-premium border-[rgba(0,255,136,0.05)]! py-8!">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="w-5 h-5 text-[#00ff88]" />
        <h2 className="text-lg font-bold">AI Business Insights</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {INSIGHTS.map((insight, i) => (
          <InsightCard key={i} {...insight} />
        ))}
      </div>
    </div>
  );
};
