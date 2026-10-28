import { ChevronDown, ExternalLink, Github, Search, SearchX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { projectStatusLabels, projects } from '../data/projects';
import { EASE_OUT } from '../lib/motion';
import type { Project, ProjectStatus } from '../types';

const statusStyles: Record<ProjectStatus, string> = {
  idea: 'border-lab-line-strong text-fg-muted',
  planned: 'border-accent-violet/40 text-accent-violet',
  'in-progress': 'border-accent/40 text-accent',
  completed: 'border-accent-mint/40 text-accent-mint',
};

function ProjectCard({ project, expanded, onToggle }: { project: Project; expanded: boolean; onToggle: () => void }) {
  const detailsId = `project-${project.id}-details`;
  const hasLinks = Boolean(project.repoUrl || project.demoUrl);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      whileHover={{ y: -4 }}
      className="glass group flex flex-col overflow-hidden rounded-2xl transition-shadow hover:shadow-[0_0_44px_-18px_rgba(103,232,249,0.45)]"
    >
      {project.screenshot && (
        <img
          src={`${import.meta.env.BASE_URL}${project.screenshot.src}`}
          alt={project.screenshot.alt}
          loading="lazy"
          className="aspect-video w-full border-b border-lab-line object-cover"
        />
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-md border px-2 py-0.5 font-mono text-[10px] ${statusStyles[project.status]}`}>
            {projectStatusLabels[project.status]}
          </span>
          {project.isPlaceholder && (
            <span className="rounded-md border border-dashed border-[#FBBF24]/50 px-2 py-0.5 font-mono text-[10px] text-[#FBBF24]">
              Example placeholder
            </span>
          )}
        </div>

        <h3 className="mt-4 font-display text-lg font-semibold leading-snug">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{project.problem}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-fg-muted">
              {tech}
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              id={detailsId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-4 border-t border-lab-line pt-4 text-sm">
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">Solution</h4>
                  <p className="mt-1.5 leading-relaxed text-fg-muted">{project.solution}</p>
                </div>
                <div>
                  <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">Key learning outcomes</h4>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-fg-muted marker:text-accent">
                    {project.learnings.map((learning) => (
                      <li key={learning}>{learning}</li>
                    ))}
                  </ul>
                </div>
                {hasLinks ? (
                  <div className="flex flex-wrap gap-2">
                    {project.repoUrl && (
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="chip">
                        <Github size={14} aria-hidden="true" />
                        Repository
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="chip">
                        <ExternalLink size={14} aria-hidden="true" />
                        Live demo
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    )}
                  </div>
                ) : (
                  <p className="font-mono text-[11px] text-fg-faint">
                    Repository and demo links will be added when available.
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={expanded}
          aria-controls={detailsId}
          className="mt-auto inline-flex items-center gap-1.5 self-start rounded-md pt-5 font-mono text-xs text-accent hover:text-fg"
        >
          {expanded ? 'Hide details' : 'Show details'}
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [query, setQuery] = useState('');
  const [tech, setTech] = useState<string>('all');
  const [status, setStatus] = useState<ProjectStatus | 'all'>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const allTechs = useMemo(() => Array.from(new Set(projects.flatMap((p) => p.technologies))).sort(), []);
  const usedStatuses = useMemo(
    () => (Object.keys(projectStatusLabels) as ProjectStatus[]).filter((s) => projects.some((p) => p.status === s)),
    [],
  );

  const normalized = query.trim().toLowerCase();
  const visible = projects.filter((project) => {
    const matchesQuery =
      !normalized ||
      [project.title, project.problem, project.solution, ...project.technologies].some((field) =>
        field.toLowerCase().includes(normalized),
      );
    const matchesTech = tech === 'all' || project.technologies.includes(tech);
    const matchesStatus = status === 'all' || project.status === status;
    return matchesQuery && matchesTech && matchesStatus;
  });

  const clearFilters = () => {
    setQuery('');
    setTech('all');
    setStatus('all');
  };

  return (
    <Section
      id="projects"
      eyebrow="05 · Projects"
      title="Ideas in Progress. Systems in the Making."
      intro="The project gallery below currently holds clearly marked examples. They'll be replaced by real work as it's built — nothing here is presented as finished."
      className="bg-gradient-to-b from-transparent via-lab-bg2/50 to-transparent"
    >
      <Reveal>
        <div className="glass flex flex-col gap-5 rounded-2xl p-5">
          <div className="relative">
            <label htmlFor="project-search" className="sr-only">
              Search projects
            </label>
            <Search
              size={16}
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-fg-faint"
              aria-hidden="true"
            />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, problem, or technology…"
              className="w-full rounded-xl border border-lab-line-strong bg-lab-bg/60 py-2.5 pl-10 pr-4 text-base text-fg placeholder:text-fg-faint focus:border-accent/60 focus:outline-none sm:text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by technology">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">Tech</span>
            <button type="button" className="chip" aria-pressed={tech === 'all'} onClick={() => setTech('all')}>
              All
            </button>
            {allTechs.map((name) => (
              <button
                key={name}
                type="button"
                className="chip"
                aria-pressed={tech === name}
                onClick={() => setTech(name)}
              >
                {name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by status">
            <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">Status</span>
            <button type="button" className="chip" aria-pressed={status === 'all'} onClick={() => setStatus('all')}>
              Any
            </button>
            {usedStatuses.map((value) => (
              <button
                key={value}
                type="button"
                className="chip"
                aria-pressed={status === value}
                onClick={() => setStatus(value)}
              >
                {projectStatusLabels[value]}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <p className="mt-6 font-mono text-[11px] text-fg-faint" aria-live="polite">
        {visible.length} of {projects.length} project{projects.length === 1 ? '' : 's'} shown
      </p>

      {visible.length > 0 ? (
        <motion.div layout className="mt-4 grid items-start gap-4 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                expanded={expanded === project.id}
                onToggle={() => setExpanded((current) => (current === project.id ? null : project.id))}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="glass mt-4 flex flex-col items-center rounded-2xl px-6 py-12 text-center">
          <SearchX size={28} className="text-fg-faint" aria-hidden="true" />
          <p className="mt-4 font-display text-lg">No projects match these filters.</p>
          <p className="mt-2 max-w-sm text-sm text-fg-muted">
            Try a different search term or technology, or clear the filters to see everything.
          </p>
          <button type="button" className="chip mt-5" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </Section>
  );
}
