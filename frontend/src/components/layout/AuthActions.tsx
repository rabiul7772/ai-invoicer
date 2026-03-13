import { Link } from 'react-router';
import { motion } from 'motion/react';
import { buttonSpring } from '../../animations/variants';

export const AuthActions = ({ className = '' }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <Link to="/login">
        <motion.span
          className="text-(--color-text-white) font-bold hover:text-(--color-primary) transition-colors cursor-pointer"
          whileHover="hover"
          whileTap="tap"
          variants={buttonSpring}
        >
          Login
        </motion.span>
      </Link>
      <Link to="/signup">
        <motion.button
          whileHover="hover"
          whileTap="tap"
          variants={buttonSpring}
          className="btn-neon-primary py-2! px-5! text-sm"
        >
          Sign Up
        </motion.button>
      </Link>
    </div>
  );
};
