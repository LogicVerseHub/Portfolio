import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { EASE_OUT } from '../lib/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/** Fades content up once when it scrolls into view. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
