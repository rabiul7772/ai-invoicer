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
          <div className="p-6 flex flex-col gap-6">
            {NAV_LINKS.map(link => (
              <NavbarLink key={link.href} href={link.href} onClick={onClose}>
                {link.label}
              </NavbarLink>
            ))}
            <div className="pt-4 border-t border-(--color-border)">
              <AuthActions className="flex-col gap-4" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
