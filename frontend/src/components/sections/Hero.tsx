import { Zap, Play } from 'lucide-react';
import { motion } from 'motion/react';
import {
  fadeUp,
  staggerContainer,
  buttonSpring
} from '../../animations/variants';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { useNavigate } from 'react-router';
import { useUser } from '../../features/auth/hooks/useAuth';

export const Hero = () => {
  const navigate = useNavigate();
  const { data: userResponse } = useUser();
  const isLoggedIn = !!userResponse?.data?.user;

  const handleGetStarted = () => {
    navigate(isLoggedIn ? '/invoices' : '/login');
  };

  return (
    <section className="relative pt-24 pb-10 md:pt-32 md:pb-12 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-(--color-primary-muted) blur-[120px] rounded-full -z-10 opacity-30" />

      <motion.div
        className="container-custom text-center"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-(--color-bg-accent) border border-(--color-border) mb-8"
        >
          <div className="w-2 h-2 rounded-full bg-(--color-primary) animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-(--color-primary)">
            NEW: AI AUTO-RECONCILIATION
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]"
        >
          AI-Powered Invoicing, <br />
          <span className="gradient-text">Generate in seconds.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="max-w-2xl mx-auto text-lg md:text-xl text-(--color-text-dim) mb-10"
        >
          Stop wasting time on manual invoicing. Our AI-powered invoice
          generator automates, organizes, and simplifies your billing process.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={handleGetStarted}
            className="btn-neon-primary w-full sm:w-auto text-lg group"
            whileHover="hover"
            whileTap="tap"
            variants={buttonSpring}
          >
            Get Started for Free
            <Zap className="w-5 h-5 group-hover:fill-current transition-all" />
          </motion.button>
          <motion.button
            className="btn-neon-outline w-full sm:w-auto text-lg"
            whileHover="hover"
            whileTap="tap"
            variants={buttonSpring}
          >
            <span>How to use</span>
            <Play className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <ScrollIndicator />
      </motion.div>
    </section>
  );
};
