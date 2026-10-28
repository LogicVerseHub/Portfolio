import { BrainCircuit } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { site } from '../data/site';

const floatingLabels = [
  { label: 'AI', className: 'left-[6%] top-[14%]', color: 'text-accent-violet', delay: '0s' },
  { label: 'CLOUD', className: 'right-[2%] top-[34%]', color: 'text-accent', delay: '-2.3s' },
  { label: 'DATA', className: 'bottom-[10%] left-[18%]', color: 'text-accent-mint', delay: '-4.6s' },
];

function AboutIllustration() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
      <div className="orb left-1/4 top-1/4 h-1/2 w-1/2 bg-accent/25" />

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="about-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#67E8F9" stopOpacity="0.7" />
            <stop offset="1" stopColor="#A78BFA" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="70" fill="none" stroke="#2A3B56" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="#1C2A40" />
        <circle cx="200" cy="200" r="170" fill="none" stroke="#1C2A40" strokeDasharray="2 6" />

        <g className="origin-center motion-safe:animate-[spin_40s_linear_infinite]" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="200" r="120" fill="none" stroke="url(#about-ring)" strokeWidth="1.5" strokeDasharray="60 300" />
          <circle cx="320" cy="200" r="4" fill="#67E8F9" />
          <circle cx="80" cy="200" r="3" fill="#A78BFA" />
        </g>
        <g className="motion-safe:animate-[spin_70s_linear_infinite_reverse]" style={{ transformOrigin: '200px 200px' }}>
          <circle cx="200" cy="200" r="170" fill="none" stroke="url(#about-ring)" strokeWidth="1" strokeDasharray="30 420" />
          <circle cx="200" cy="30" r="3" fill="#6EE7B7" />
        </g>

        {/* Spokes from the core to each label */}
        <path d="M200 200 L70 90" stroke="#A78BFA" strokeOpacity="0.35" strokeDasharray="3 5" />
        <path d="M200 200 L355 160" stroke="#67E8F9" strokeOpacity="0.35" strokeDasharray="3 5" />
        <path d="M200 200 L120 340" stroke="#6EE7B7" strokeOpacity="0.35" strokeDasharray="3 5" />
      </svg>

      <div className="glass absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full">
        <BrainCircuit className="text-accent" size={30} />
        <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-fg-muted">CORE</span>
      </div>

      {floatingLabels.map(({ label, className, color, delay }) => (
        <span
          key={label}
          className={`glass float-slow absolute rounded-lg px-3 py-1.5 font-mono text-xs tracking-[0.2em] ${className} ${color}`}
          style={{ animationDelay: delay }}
        >
          {label}
        </span>
      ))}
    </div>
  );
}

export function About() {
  return (
    <Section id="about" eyebrow="01 · About" title="Curiosity Is the Starting Point.">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="space-y-5 text-base leading-relaxed text-fg-muted sm:text-lg">
          {site.bio.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{paragraph}</p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="glass mt-8 rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-faint">My philosophy</p>
              <ol className="mt-4 space-y-2">
                {site.philosophy.map((line, i) => (
                  <li key={line} className="flex items-baseline gap-4 font-display text-lg text-fg sm:text-xl">
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {line}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <AboutIllustration />
        </Reveal>
      </div>
    </Section>
  );
}
