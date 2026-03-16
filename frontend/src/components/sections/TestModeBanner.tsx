import { motion } from 'motion/react';
import { fadeUp } from '../../animations/variants';
import { TEST_CARD_DETAILS } from '../../constants';
import toast from 'react-hot-toast';

export const TestModeBanner = () => {
  const handleCopy = (value: string, label: string) => {
    // Remove spaces only for the raw card number string
    const textToCopy =
      label === 'Card Number' ? value.replace(/\s/g, '') : value;
    navigator.clipboard.writeText(textToCopy);
    toast.success(`${label} copied!`, {
      style: {
        fontSize: '16px',
        maxWidth: '500px',
        padding: '16px 24px',
        backgroundColor: 'var(--color-bg-card)',
        color: 'var(--color-text-bright)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)'
      },
      icon: '📋'
    });
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-10 mx-auto max-w-2xl rounded-xl border border-amber-500/30 bg-amber-500/5 px-6 py-4"
    >
      <p className="text-center text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
        For Testing Purpose Only — Click to copy
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 text-center">
        {TEST_CARD_DETAILS.map(({ label, value }) => (
          <div
            key={label}
            onClick={() => handleCopy(value, label)}
            title={`Copy ${label}`}
            className="rounded-lg bg-amber-500/10 px-3 py-2 cursor-pointer hover:bg-amber-500/20 transition-colors group"
          >
            <p className="text-[10px] text-amber-400/70 uppercase tracking-wider mb-1">
              {label}
            </p>
            <p className="font-mono font-bold text-amber-300 text-sm group-hover:text-amber-200 transition-colors">
              {value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
