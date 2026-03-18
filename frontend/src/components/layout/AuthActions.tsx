import { Link } from 'react-router';
import { motion } from 'motion/react';
import { buttonSpring } from '../../animations/variants';
import { useUser, useLogout } from '../../features/auth/hooks/useAuth';
import { LayoutDashboard, LogOut, User } from 'lucide-react';

export const AuthActions = ({ className = '' }: { className?: string }) => {
  const { data: userResponse } = useUser();
  const { mutate: logout } = useLogout();
  const user = userResponse?.data?.user;

  if (user) {
    return (
      <div className={`flex items-center gap-4 ${className}`}>
        <div className="flex items-center gap-2 text-sm font-bold text-(--color-text-bright)">
          <User className="w-4 h-4 text-(--color-primary)" />
          <span>{user.fullName.split(' ')[0]}</span>
        </div>
        <Link
          to="/dashboard"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-(--color-primary-muted) text-(--color-primary) text-sm font-bold hover:bg-(--color-primary)/20 transition-colors"
          title="Dashboard"
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>
        <button
          onClick={() => logout()}
          className="p-2 rounded-lg bg-(--color-bg-accent) text-red-400 transition-colors"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <Link to="/login">
        <motion.span
          className="text-(--color-text-white) font-bold hover:text-(--color-primary) transition-colors cursor-pointer border border-(--color-primary) rounded-lg px-5 py-2"
          whileHover="hover"
          whileTap="tap"
          variants={buttonSpring}
        >
          Login
        </motion.span>
      </Link>
      <motion.div whileHover="hover" whileTap="tap" variants={buttonSpring}>
        <Link
          to="/signup"
          className="btn-neon-primary py-2! px-5! text-sm inline-flex items-center"
        >
          Sign Up
        </Link>
      </motion.div>
    </div>
  );
};
