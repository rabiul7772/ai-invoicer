import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

interface ModalPortalProps {
  children: ReactNode;
}

export const ModalPortal = ({ children }: ModalPortalProps) => {
  return createPortal(children, document.body);
};
