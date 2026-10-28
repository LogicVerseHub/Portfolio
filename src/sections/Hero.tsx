import { ArrowRight, BrainCircuit, Cloud, Cpu, Database, Layers, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { FlowConnector } from '../components/FlowConnector';
import { HeroNetwork } from '../components/HeroNetwork';
import type { FocusArea } from '../components/HeroNetwork';
import { site } from '../data/site';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { EASE_OUT } from '../lib/motion';

interface FocusOption {
  id: FocusArea;
  label: string;
  icon: LucideIcon;
  description: string;
}

const focusOptions: FocusOption[] = [
  {
    id: 'ai',
    label: 'AI & ML',
    icon: BrainCircuit,
    description: 'Models that learn patterns from prepared data — the "intelligence" end of the system.',
  },
  {
    id: 'cloud',
    label: 'Cloud Systems',
    icon: Cloud,
    description: 'Scalable infrastructure where data is processed and where models run.',
  },
  {
    id: 'data',
    label: 'Data Engineering',
    icon: Database,
    description: 'Pipelines that collect, clean, and organize data so it can be trusted downstream.',
  },
];

const heroStages: { focus: FocusArea; label: string; caption: string; icon: LucideIcon }[] = [
  { focus: 'data', label: 'Source', caption: 'raw data', icon: Layers },
  { focus: 'cloud', label: 'Processing', caption: 'clean · transform', icon: Cpu },
  { focus: 'ai', label: 'Intelligence', caption: 'insight', icon: Sparkles },
];

export function Hero() {
  const [focus, setFocus] = useState<FocusArea | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const finePointer = useMediaQuery('(pointer: fine)');

  // Lightweight parallax + spotlight: write pointer position into CSS variables.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || reduceMotion || !finePointer) return;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--mx', (px - 0.5).toFixed(3));
        el.style.setProperty('--my', (py - 0.5).toFixed(3));
        el.style.setProperty('--px', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--py', `${(py * 100).toFixed(1)}%`);
      });
    };

    el.addEventListener('pointermove', onMove);
    return () => {
      el.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduceMotion, finePointer]);

  const toggleFocus = (area: FocusArea) => setFocus((current) => (current === area ? null : area));
  const activeOption = focusOptions.find((option) => option.id === focus) ?? null;
  const words = site.headline.split(' ');

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28"
    >
      {/* ---------- Background layers ---------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div
          className="grid-lines absolute -inset-10 transition-transform duration-300 ease-out"
          style={{ transform: 'translate3d(calc(var(--mx, 0) * -10px), calc(var(--my, 0) * -10px), 0)' }}
        />
        <div className="orb orb-drift left-[60%] top-[8%] h-72 w-72 bg-accent/40" />
        <div className="orb orb-drift bottom-[6%] left-[4%] h-80 w-80 bg-accent-violet/40 [animation-delay:-9s]" />
        <div
          className="absolute -inset-8 opacity-80 transition-transform duration-300 ease-out"
          style={{ transform: 'translate3d(calc(var(--mx, 0) * -26px), calc(var(--my, 0) * -20px), 0)' }}
        >
          <HeroNetwork focus={focus} />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(600px circle at var(--px, 70%) var(--py, 40%), rgba(103,232,249,0.07), transparent 60%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-lab-bg via-lab-bg/80 to-lab-bg/20" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-lab-bg to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <div className="mx-auto grid w-full max-w-content items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            {site.heroLabel}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {words.map((word, i) => (
              <Fragment key={`${word}-${i}`}>
                <motion.span
                  className={`inline-block ${i === words.length - 1 ? 'text-gradient' : ''}`}
                  initial={{ opacity: 0, y: '0.45em', filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: EASE_OUT }}
                >
                  {word}
                </motion.span>
                {i < words.length - 1 && ' '}
              </Fragment>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT }}
          >
            {site.heroText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7, ease: EASE_OUT }}
          >
            <p className="mt-6 font-mono text-xs text-fg-faint">{site.role}</p>

            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Highlight a focus area in the network">
              {focusOptions.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  className="chip"
                  aria-pressed={focus === id}
                  onClick={() => toggleFocus(id)}
                >
                  <Icon size={14} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
            <p className="mt-3 min-h-[2.75rem] max-w-md text-sm text-fg-muted" aria-live="polite">
              {activeOption
                ? activeOption.description
                : 'Select a focus area to trace it through the network and the pipeline.'}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="btn btn-primary">
                Explore Projects
                <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a href="#stack" className="btn btn-ghost">
                Explore Tech Stack
              </a>
            </div>
          </motion.div>
        </div>

        {/* ---------- Mini pipeline ---------- */}
        <motion.div
          className="glass rounded-2xl p-5 sm:p-6"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: EASE_OUT }}
        >
          <div className="flex items-center justify-between font-mono text-[11px] text-fg-faint">
            <span>pipeline.sim</span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" aria-hidden="true" />
              illustrative flow
            </span>
          </div>

          <div className="mt-6 flex flex-col items-stretch sm:flex-row">
            {heroStages.map(({ focus: area, label, caption, icon: Icon }, i) => {
              const active = focus === area;
              return (
                <Fragment key={area}>
                  {i > 0 && <FlowConnector horizontalFrom="sm" />}
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleFocus(area)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 sm:w-[6.75rem] sm:flex-none sm:flex-col sm:gap-2 sm:px-2 sm:py-4 sm:text-center ${
                      active
                        ? 'border-accent/60 bg-accent/10 shadow-[0_0_30px_-8px_rgba(103,232,249,0.6)]'
                        : 'border-lab-line-strong bg-lab-bg/40 hover:border-accent/40'
                    }`}
                  >
                    <Icon size={20} className={active ? 'text-accent' : 'text-fg-muted'} aria-hidden="true" />
                    <span>
                      <span className="block font-display text-sm font-semibold">{label}</span>
                      <span className="block font-mono text-[10px] text-fg-faint">{caption}</span>
                    </span>
                  </button>
                </Fragment>
              );
            })}
          </div>

          <p className="mt-6 border-t border-lab-line pt-4 font-mono text-[11px] leading-relaxed text-fg-faint">
            source → processing → intelligence
            <br />
            Click a stage to highlight its part of the network.
          </p>
        </motion.div>
      </div>

      {/* ---------- Scroll indicator ---------- */}
      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-fg-faint transition-colors hover:text-accent sm:flex"
        aria-label="Scroll to the About section"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-lab-line-strong pt-1.5">
          <span className="scroll-cue h-1.5 w-1 rounded-full bg-accent" />
        </span>
        SCROLL
      </a>
    </section>
  );
}
