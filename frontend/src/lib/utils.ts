import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge.
 * This ensures that conflicting classes are resolved correctly.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const calculateTrend = (current: number, previous: number) => {
  if (previous === 0) return current > 0 ? '100%' : '0%';
  const diff = ((current - previous) / previous) * 100;
  return `${diff > 0 ? '+' : ''}${diff.toFixed(1)}%`;
};

export const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
