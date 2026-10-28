import type { ReactNode } from 'react';
import type { SectionId } from '../types';
import { Reveal } from './Reveal';

interface SectionProps {
  id: SectionId;
  eyebrow: string;
  title: string;
  intro?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, intro, children, className = '' }: SectionProps) {
  const titleId = `${id}-title`;

  return (
    <section id={id} aria-labelledby={titleId} className={`relative py-24 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            id={titleId}
            className="mt-4 font-display text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
          >
            {title}
          </h2>
          {intro && <p className="mt-5 text-base leading-relaxed text-fg-muted sm:text-lg">{intro}</p>}
        </Reveal>
        {children}
      </div>
    </section>
  );
}
