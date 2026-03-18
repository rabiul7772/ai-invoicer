import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatsGrid } from '../features/dashboard/components/StatsGrid';
import { InsightsSection } from '../features/dashboard/components/InsightsSection';
import { RecentInvoicesTable } from '../features/dashboard/components/RecentInvoicesTable';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 md:space-y-10">
        <StatsGrid />
        <InsightsSection />
        <RecentInvoicesTable />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
