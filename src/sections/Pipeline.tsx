import { ChevronLeft, ChevronRight, Info, Pause, Play, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useState } from 'react';
import { FlowConnector } from '../components/FlowConnector';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { pipelineStages } from '../data/pipeline';
import { EASE_OUT } from '../lib/motion';

const STEP_MS = 1600;

export function Pipeline() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(!reduceMotion);
  const [pulse, setPulse] = useState(0);
  const [runId, setRunId] = useState(0);

  // The moving highlight walks through the stages while playing.
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setPulse((current) => (current + 1) % pipelineStages.length);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [playing, runId]);

  const reset = () => {
    setSelected(0);
    setPulse(0);
    setPlaying(!reduceMotion);
    setRunId((current) => current + 1);
  };

  const stage = pipelineStages[selected];
  const StageIcon = stage.icon;
  const last = pipelineStages.length - 1;

  return (
    <Section
      id="pipeline"
      eyebrow="03 · Simulation"
      title="From Raw Data to Intelligence"
      intro="Follow a single example — an online store's orders — through a typical modern data pipeline. Select any stage to see what happens there."
      className="bg-gradient-to-b from-transparent via-lab-bg2/50 to-transparent"
    >
      <Reveal>
        <div className="glass rounded-2xl p-5 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="inline-flex items-start gap-2 text-xs text-fg-muted">
              <Info size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
              Educational simulation — no real data is processed and no cloud services are contacted.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="chip"
                onClick={() => setPlaying((current) => !current)}
                aria-label={playing ? 'Pause animation' : 'Resume animation'}
              >
                {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
                {playing ? 'Pause' : 'Resume'}
              </button>
              <button type="button" className="chip" onClick={reset}>
                <RotateCcw size={14} aria-hidden="true" />
                Reset
              </button>
            </div>
          </div>

          <ol key={runId} className="mt-8 flex flex-col lg:flex-row lg:items-stretch" aria-label="Pipeline stages">
            {pipelineStages.map((item, i) => {
              const Icon = item.icon;
              const isSelected = selected === i;
              const isPulsing = playing && pulse === i;
              return (
                <li key={item.id} className={`flex flex-col lg:flex-row ${i > 0 ? 'lg:flex-1' : ''}`}>
                  {i > 0 && <FlowConnector horizontalFrom="lg" paused={!playing} />}
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelected(i)}
                    className={`relative isolate flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors duration-300 lg:w-[8.25rem] lg:flex-none lg:flex-col lg:gap-2 lg:px-2 lg:py-4 lg:text-center ${
                      isSelected
                        ? 'border-accent/70 bg-accent/10'
                        : 'border-lab-line-strong bg-lab-bg/50 hover:border-accent/40'
                    }`}
                  >
                    {isPulsing && (
                      <motion.span
                        layoutId="pipeline-pulse"
                        className="absolute inset-0 -z-10 rounded-xl shadow-[0_0_34px_-6px_rgba(103,232,249,0.65)]"
                        transition={{ type: 'spring', stiffness: 200, damping: 26 }}
                        aria-hidden="true"
                      />
                    )}
                    <Icon
                      size={20}
                      className={isSelected || isPulsing ? 'text-accent' : 'text-fg-muted'}
                      aria-hidden="true"
                    />
                    <span>
                      <span className="block font-mono text-[10px] text-fg-faint">0{i + 1}</span>
                      <span className="block font-display text-sm font-semibold">{item.label}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="mt-8 grid gap-6 border-t border-lab-line pt-8 md:grid-cols-2"
              aria-live="polite"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/40 bg-accent/10">
                    <StageIcon size={18} className="text-accent" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-semibold">
                    <span className="mr-2 font-mono text-xs text-fg-faint">0{selected + 1}</span>
                    {stage.label}
                  </h3>
                </div>
                <h4 className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">What it does</h4>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{stage.what}</p>
                <h4 className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">Why it matters</h4>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">{stage.why}</p>
                <h4 className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">
                  Relevant technologies
                </h4>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {stage.technologies.map((tech) => (
                    <li key={tech} className="rounded-md border border-lab-line bg-white/[0.03] px-2 py-1 text-xs text-fg-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">Example</h4>
                <p className="mt-2 text-sm leading-relaxed text-fg">{stage.example}</p>
                <h4 className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">
                  Sample at this stage (illustrative)
                </h4>
                <pre className="mt-2 overflow-x-auto rounded-xl border border-lab-line bg-[#060a14] p-4 font-mono text-[12px] leading-relaxed text-accent/90">
                  <code>{stage.sample}</code>
                </pre>

                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    className="chip"
                    onClick={() => setSelected((current) => Math.max(0, current - 1))}
                    disabled={selected === 0}
                    aria-label="Previous stage"
                  >
                    <ChevronLeft size={14} aria-hidden="true" />
                    Prev
                  </button>
                  <button
                    type="button"
                    className="chip"
                    onClick={() => setSelected((current) => Math.min(last, current + 1))}
                    disabled={selected === last}
                    aria-label="Next stage"
                  >
                    Next
                    <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
