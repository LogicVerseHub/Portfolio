import { ChevronDown, ExternalLink } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { learningEntries, learningStatusLabels } from '../data/learning';
import { EASE_OUT } from '../lib/motion';
import type { LearningStatus } from '../types';

const markerStyles: Record<LearningStatus, string> = {
  'up-next': 'border-lab-line-strong bg-lab-card',
  'in-progress': 'border-accent bg-accent/30',
  completed: 'border-accent-mint bg-accent-mint',
};

const statusText: Record<LearningStatus, string> = {
  'up-next': 'text-fg-muted border-lab-line-strong',
  'in-progress': 'text-accent border-accent/40',
  completed: 'text-accent-mint border-accent-mint/40',
};

function formatDate(date: string) {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function Learning() {
  const [topic, setTopic] = useState('all');
  const [technology, setTechnology] = useState('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const topics = useMemo(() => Array.from(new Set(learningEntries.map((e) => e.topic))).sort(), []);
  const techOptions = useMemo(() => Array.from(new Set(learningEntries.map((e) => e.technology))).sort(), []);
  const hasPlaceholders = learningEntries.some((entry) => entry.isPlaceholder);

  const visible = learningEntries.filter(
    (entry) => (topic === 'all' || entry.topic === topic) && (technology === 'all' || entry.technology === technology),
  );

  return (
    <Section
      id="learning"
      eyebrow="06 · Journal"
      title="Always Learning. Always Building."
      intro="A running log of what I'm studying and what I take away from it."
    >
      <Reveal>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
            <button type="button" className="chip" aria-pressed={topic === 'all'} onClick={() => setTopic('all')}>
              All topics
            </button>
            {topics.map((value) => (
              <button
                key={value}
                type="button"
                className="chip"
                aria-pressed={topic === value}
                onClick={() => setTopic(value)}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="learning-tech" className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">
              Technology
            </label>
            <select
              id="learning-tech"
              value={technology}
              onChange={(event) => setTechnology(event.target.value)}
              className="rounded-lg border border-lab-line-strong bg-lab-card px-3 py-2 font-mono text-xs text-fg focus:border-accent/60 focus:outline-none"
            >
              <option value="all">All</option>
              {techOptions.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Reveal>

      {hasPlaceholders && (
        <p className="mt-6 rounded-xl border border-dashed border-[#FBBF24]/40 px-4 py-3 text-sm text-[#FCD34D]">
          These are placeholder entries. Real learning milestones will appear here as they happen.
        </p>
      )}

      {visible.length > 0 ? (
        <ol className="relative mt-10 space-y-6 pl-8 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-gradient-to-b before:from-accent/60 before:via-lab-line-strong before:to-transparent">
          <AnimatePresence initial={false}>
            {visible.map((entry, i) => {
              const isOpen = expanded === entry.id;
              const panelId = `learning-${entry.id}`;
              return (
                <motion.li
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: EASE_OUT }}
                  className="relative"
                >
                  <span className="absolute -left-8 top-5 flex h-[15px] w-[15px] items-center justify-center" aria-hidden="true">
                    {entry.status === 'in-progress' && (
                      <span className="absolute h-full w-full rounded-full bg-accent/40 motion-safe:animate-ping" />
                    )}
                    <span className={`relative h-[15px] w-[15px] rounded-full border-2 ${markerStyles[entry.status]}`} />
                  </span>

                  <div className="glass rounded-2xl">
                    <button
                      type="button"
                      className="w-full rounded-2xl p-5 text-left"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setExpanded((current) => (current === entry.id ? null : entry.id))}
                    >
                      <div className="flex flex-wrap items-center gap-2 font-mono text-[10px]">
                        <span className={`rounded-md border px-2 py-0.5 ${statusText[entry.status]}`}>
                          {learningStatusLabels[entry.status]}
                        </span>
                        <span className="text-fg-faint">{entry.topic}</span>
                        {entry.date && (
                          <time dateTime={entry.date} className="text-fg-faint">
                            · {formatDate(entry.date)}
                          </time>
                        )}
                        {entry.isPlaceholder && (
                          <span className="rounded-md border border-dashed border-[#FBBF24]/50 px-2 py-0.5 text-[#FBBF24]">
                            Placeholder
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex items-start justify-between gap-3">
                        <h3 className="font-display text-base font-semibold sm:text-lg">{entry.title}</h3>
                        <ChevronDown
                          size={16}
                          className={`mt-1 shrink-0 text-fg-faint transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          aria-hidden="true"
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-3 px-5 pb-5 text-sm">
                            <p className="leading-relaxed text-fg-muted">{entry.summary}</p>
                            <p className="font-mono text-[11px] text-fg-faint">
                              Related technology: <span className="text-fg-muted">{entry.technology}</span>
                            </p>
                            {entry.projectUrl && (
                              <a
                                href={entry.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="chip"
                              >
                                <ExternalLink size={14} aria-hidden="true" />
                                Related project
                                <span className="sr-only">(opens in a new tab)</span>
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      ) : (
        <div className="glass mt-10 rounded-2xl p-8 text-center">
          <p className="font-display text-lg">No entries match these filters.</p>
          <button
            type="button"
            className="chip mt-5"
            onClick={() => {
              setTopic('all');
              setTechnology('all');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </Section>
  );
}
