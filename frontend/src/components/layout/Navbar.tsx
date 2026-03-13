import React, { useState } from 'react';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_LINKS } from '../../constants';
import { buttonSpring } from '../../animations/variants';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
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
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-(--color-bg-deep)/80 backdrop-blur-md border-b border-(--color-border)"
    >
      <div className="container-custom py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => {
            window.scrollTo({ top: 0 });
            setIsOpen(false);
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 bg-linear-to-br from-(--color-primary) to-(--color-primary-hover) rounded-lg flex items-center justify-center shadow-(--shadow-neon) group-hover:scale-110 transition-transform">
            <FileText className="w-4 h-4 text-(--color-bg-deep)" />
          </div>
          <span className="text-xl font-black tracking-tighter text-(--color-text-white)">
            AI Invoicer
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Auth Actions */}
        <div className="hidden md:flex items-center gap-6">
          <motion.a
            href="/login"
            className="text-(--color-text-white) font-bold hover:text-(--color-primary) transition-colors"
            whileHover="hover"
            whileTap="tap"
            variants={buttonSpring}
          >
            Login
          </motion.a>
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonSpring}
            className="btn-neon-primary py-2! px-5! text-sm"
          >
            Sign Up
          </motion.button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-(--color-text-white)"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-(--color-bg-deep) border-b border-(--color-border) flex flex-col overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-6">
              {NAV_LINKS.map(link => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-4 border-t border-(--color-border) flex flex-col gap-4">
                <a
                  href="/login"
                  className="text-(--color-text-white) font-bold text-center"
                >
                  Login
                </a>
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonSpring}
                  className="btn-neon-primary w-full"
                >
                  Sign Up
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
