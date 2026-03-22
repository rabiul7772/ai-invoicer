import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { fadeUp, staggerContainer } from '../animations/variants';

const CheckoutSuccess = () => {
  return (
    <div className="min-h-screen bg-(--color-bg-deep) flex items-center justify-center p-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full text-center"
      >
        <motion.div
          variants={fadeUp}
          className="w-20 h-20 bg-(--color-primary-muted) rounded-full flex items-center justify-center mx-auto mb-8 relative"
        >
          <CheckCircle2 className="w-10 h-10 text-(--color-primary)" />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-(--color-primary) rounded-full -z-10"
          />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-4xl font-black text-(--color-text-white) mb-4"
        >
          Subscription Active!
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-(--color-text-dim) mb-10 text-lg leading-relaxed"
        >
          Welcome to the premium club. Your account has been upgraded, and all
          professional features are now unlocked.
        </motion.p>

        <motion.div variants={fadeUp} className="space-y-4">
          <Link
            to="/dashboard"
            className="btn-neon-primary w-full flex items-center justify-center gap-2 py-4 text-md"
          >
            Go to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-2 text-(--color-primary) font-medium">
            <span>Please check your email for more information.</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CheckoutSuccess;
