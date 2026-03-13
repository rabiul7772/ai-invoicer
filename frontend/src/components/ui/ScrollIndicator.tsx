import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export const ScrollIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
      className="mt-16 flex flex-col items-center gap-2"
    >
      <span className="text-xs font-bold tracking-[0.2em] text-(--color-text-muted) uppercase">
        Scroll Down
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-6 h-10 border-2 border-(--color-border) rounded-full flex justify-center p-1"
      >
        <motion.div className="w-1 h-2 bg-(--color-primary) rounded-full" />
      </motion.div>
      <ChevronDown className="w-4 h-4 text-(--color-primary) opacity-50" />
    </motion.div>
  );
};
