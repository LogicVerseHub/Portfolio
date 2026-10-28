import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { skillCategories, skillStatusMeta, skills } from '../data/skills';
import { EASE_OUT } from '../lib/motion';
import type { SkillCategoryId, SkillStatus } from '../types';

const statuses = Object.keys(skillStatusMeta) as SkillStatus[];

export function Skills() {
  const [category, setCategory] = useState<SkillCategoryId | 'all'>('all');
  const [status, setStatus] = useState<SkillStatus | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const visible = skills.filter(
    (skill) => (category === 'all' || skill.category === category) && (status === 'all' || skill.status === status),
  );
  const countFor = (value: SkillStatus) => skills.filter((skill) => skill.status === value).length;

  return (
    <Section
      id="skills"
      eyebrow="04 · Learning map"
      title="What I'm Exploring"
      intro="No percentages or ratings — just an honest view of where each topic stands: currently learning, explored hands-on, or demonstrated through a project."
    >
      <Reveal>
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <button type="button" className="chip" aria-pressed={category === 'all'} onClick={() => setCategory('all')}>
              All topics
            </button>
            {skillCategories.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                className="chip"
                aria-pressed={category === id}
                onClick={() => setCategory(id)}
              >
                <Icon size={14} aria-hidden="true" />
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by status">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">Status</span>
            <button type="button" className="chip" aria-pressed={status === 'all'} onClick={() => setStatus('all')}>
              Any
            </button>
            {statuses.map((value) => {
              const meta = skillStatusMeta[value];
              const Icon = meta.icon;
              return (
                <button
                  key={value}
                  type="button"
                  className="chip"
                  aria-pressed={status === value}
                  onClick={() => setStatus(value)}
                  title={meta.description}
                >
                  <Icon size={14} aria-hidden="true" />
                  {meta.label}
                  <span className="text-fg-faint">({countFor(value)})</span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <p className="sr-only" aria-live="polite">
        {visible.length} topic{visible.length === 1 ? '' : 's'} shown
      </p>

      <motion.ul layout className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((skill) => {
            const meta = skillStatusMeta[skill.status];
            const StatusIcon = meta.icon;
            const categoryMeta = skillCategories.find((c) => c.id === skill.category);
            const isOpen = expanded === skill.name;
            const panelId = `skill-${skill.name.replace(/\W+/g, '-').toLowerCase()}`;
            return (
              <motion.li
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="glass rounded-xl transition-colors hover:border-accent/30"
              >
                <button
                  type="button"
                  className="w-full rounded-xl p-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setExpanded((current) => (current === skill.name ? null : skill.name))}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-fg-faint">
                        {categoryMeta?.label}
                      </p>
                      <h3 className="mt-1 font-display text-base font-semibold">{skill.name}</h3>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`mt-1 shrink-0 text-fg-faint transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </div>
                  <span
                    className={`mt-3 inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 font-mono text-[10px] ${meta.className}`}
                  >
                    <StatusIcon size={12} aria-hidden="true" />
                    {meta.label}
                  </span>
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
                      <p className="px-4 pb-4 text-sm leading-relaxed text-fg-muted">{skill.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <div className="glass mt-8 rounded-2xl p-8 text-center">
          <p className="font-display text-lg">Nothing here yet.</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-fg-muted">
            {status === 'demonstrated'
              ? 'Topics move here once a project on this site demonstrates them.'
              : 'No topics match this combination of filters.'}
          </p>
          <button
            type="button"
            className="chip mt-5"
            onClick={() => {
              setCategory('all');
              setStatus('all');
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </Section>
  );
}
