import { ArrowUp } from 'lucide-react';
import { site } from '../data/site';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="relative border-t border-lab-line bg-lab-bg2/60">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <Logo className="h-6 w-6" />
          <p className="font-mono text-[11px] tracking-[0.2em] text-fg-muted">{site.footer}</p>
        </div>
        <p className="text-sm text-fg-muted">{site.closing}</p>
        <a
          href="#hero"
          className="inline-flex items-center gap-2 self-start rounded-lg font-mono text-xs text-fg-muted transition-colors hover:text-accent md:self-auto"
        >
          <ArrowUp size={14} aria-hidden="true" />
          Back to top
        </a>
      </div>
      <p className="mx-auto max-w-content px-5 pb-8 text-[11px] text-fg-faint sm:px-8">
        Product names mentioned on this site are trademarks of their respective owners and are used for identification only.
      </p>
    </footer>
  );
}
