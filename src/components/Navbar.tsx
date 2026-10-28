import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { navItems, site } from '../data/site';
import { useMediaQuery } from '../hooks/useMediaQuery';
import type { SectionId } from '../types';
import { Logo } from './Logo';

function StatusLabel({ className = '' }: { className?: string }) {
  return (
    <span
      className={`items-center gap-2 rounded-full border border-lab-line-strong bg-white/[0.02] px-3 py-1 font-mono text-[10px] tracking-[0.18em] text-fg-muted ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {site.status}
    </span>
  );
}

export function Navbar({ activeSection }: { activeSection: SectionId | null }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isDesktop) setOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const activeTarget =
    navItems.find((item) => activeSection !== null && item.sections.includes(activeSection))?.target ?? null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open ? 'border-lab-line bg-lab-bg/75 backdrop-blur-xl' : 'border-transparent'
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-content items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#hero" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo />
          <span className="font-display text-[13px] font-semibold tracking-[0.2em]">
            INTELLIGENCE <span className="text-accent">LAB</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeTarget === item.target;
            return (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative isolate block rounded-lg px-3.5 py-2 text-sm transition-colors ${
                    isActive ? 'text-fg' : 'text-fg-muted hover:text-fg'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg border border-accent/30 bg-accent/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <StatusLabel className="hidden lg:inline-flex" />

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-lab-line-strong text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-lab-line md:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {navItems.map((item) => {
                const isActive = activeTarget === item.target;
                return (
                  <li key={item.target}>
                    <a
                      href={`#${item.target}`}
                      aria-current={isActive ? 'true' : undefined}
                      onClick={() => setOpen(false)}
                      className={`block rounded-lg px-3 py-3 text-base ${
                        isActive ? 'bg-accent/10 text-accent' : 'text-fg-muted hover:bg-white/5 hover:text-fg'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="px-5 pb-5">
              <StatusLabel className="inline-flex" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
