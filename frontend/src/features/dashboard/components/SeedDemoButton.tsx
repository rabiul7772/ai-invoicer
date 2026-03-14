import { useSeedDemoData } from '../hooks/useSeedData';

export const SeedDemoButton = () => {
  const { mutate: seedData, isPending: isSeeding } = useSeedDemoData();

  const handleSeed = () => {
    if (
      window.confirm(
        'This will delete all your current invoices and replace them with demo data. Continue?'
      )
    ) {
      seedData();
    }
  };

  return (
    <button
      onClick={handleSeed}
      disabled={isSeeding}
      className="w-full flex items-center gap-3 px-4 py-3 bg-(--color-bg-deep) cursor-default"
    ></button>
  );
};
