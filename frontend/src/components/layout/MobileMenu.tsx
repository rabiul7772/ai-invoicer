import { motion, AnimatePresence } from 'motion/react';
import { NAV_LINKS } from '../../constants';
import { NavbarLink } from './NavbarLink';
import { AuthActions } from './AuthActions';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-(--color-bg-deep) border-b border-(--color-border) flex flex-col overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col">
            {NAV_LINKS.map(link => (
              <div
                key={link.href}
                className="border-b border-(--color-border) py-3 first:pt-0 last:border-none"
              >
                <NavbarLink href={link.href} onClick={onClose}>
                  {link.label}
                </NavbarLink>
              </div>
            ))}
            <div className="pt-6">
              <AuthActions className="flex-col gap-4" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
