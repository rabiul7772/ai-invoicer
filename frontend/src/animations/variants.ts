import type { Variants } from 'motion/react';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeInOut' }
  }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeInOut' }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export const scaleHover: Variants = {
  hover: { scale: 1.04 },
  tap: { scale: 0.97 }
};

export const buttonSpring: Variants = {
  hover: {
    scale: 1.03,
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  },
  tap: {
    scale: 0.95,
    transition: { type: 'spring', stiffness: 400, damping: 17 }
  }
};
