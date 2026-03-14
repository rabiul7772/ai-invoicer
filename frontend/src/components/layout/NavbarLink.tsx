import React, { useState } from 'react';
import { motion } from 'motion/react';

interface NavbarLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavbarLink = ({ href, children, onClick }: NavbarLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className="relative text-(--color-text-dim) hover:text-(--color-primary) font-medium py-1 transition-colors duration-200"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {children}
      {isHovered && (
        <motion.div
          layoutId="navbar-underline"
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-(--color-primary) rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.a>
  );
};
