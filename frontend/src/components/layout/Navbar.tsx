import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'motion/react';
import { NAV_LINKS } from '../../constants';
import { NavLogo } from './NavLogo';
import { NavbarLink } from './NavbarLink';
import { AuthActions } from './AuthActions';
import { MobileMenu } from './MobileMenu';

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
        <NavLogo onClick={() => setIsOpen(false)} />

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <NavbarLink key={link.href} href={link.href}>
              {link.label}
            </NavbarLink>
          ))}
        </div>

        <AuthActions className="hidden md:flex" />

        <button
          className="md:hidden text-(--color-text-white)"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </motion.nav>
  );
};
