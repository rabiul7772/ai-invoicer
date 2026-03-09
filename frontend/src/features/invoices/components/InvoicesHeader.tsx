import { Plus, Sparkles } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Link } from 'react-router';

export const InvoicesHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-3xl font-black text-(--color-text-bright) tracking-tight">
          All Invoices
        </h1>
        <p className="text-sm text-(--color-text-dim) mt-1">
          Manage and track your business billing with ease.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          className="border-[rgba(0,255,136,0.2)] text-[#00ff88] hover:bg-[rgba(0,255,136,0.05)]"
          icon={Sparkles}
        >
          Create with AI
        </Button>
        <Link to="/create-invoice">
          <Button variant="neon" icon={Plus}>
            Create Invoice
          </Button>
        </Link>
      </div>
    </div>
  );
};
