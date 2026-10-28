import { ChevronDown } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { mapEdges, mapNodes, technologies } from '../data/technologies';
import { EASE_OUT } from '../lib/motion';
import type { MapNodeId, Technology } from '../types';

const MAP_W = 400;
const MAP_H = 360;

interface TechCardProps {
  tech: Technology;
  expanded: boolean;
  related: boolean;
  onToggle: () => void;
}

function TechCard({ tech, expanded, related, onToggle }: TechCardProps) {
  const Icon = tech.icon;
  const detailsId = `tech-${tech.id}-details`;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={`glass group relative overflow-hidden rounded-2xl p-5 transition-shadow duration-300 ${
        expanded
          ? 'ring-1 ring-accent/60 shadow-[0_0_44px_-12px_rgba(103,232,249,0.45)]'
          : related
            ? 'ring-1 ring-accent-violet/60'
            : 'hover:shadow-[0_0_44px_-18px_rgba(103,232,249,0.4)]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        aria-controls={detailsId}
        className="w-full rounded-lg text-left"
      >
        <div className="flex items-start justify-between">
          <span className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-lab-line-strong bg-lab-bg/60">
            {expanded && (
              <span className="absolute inset-0 rounded-xl border border-accent/50 motion-safe:animate-ping" aria-hidden="true" />
            )}
            <Icon
              size={20}
              className="text-accent transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110"
              aria-hidden="true"
            />
          </span>
          <ChevronDown
            size={18}
            className={`mt-1 text-fg-faint transition-transform duration-300 ${expanded ? 'rotate-180 text-accent' : ''}`}
            aria-hidden="true"
          />
        </div>

        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">{tech.category}</p>
        <h3 className="mt-1 font-display text-lg font-semibold">{tech.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">{tech.summary}</p>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Connects to">
          {tech.connections.map((connection) => (
            <span
              key={connection}
              className="inline-flex items-center gap-1.5 rounded-md border border-lab-line bg-lab-bg/50 px-2 py-0.5 font-mono text-[10px] text-fg-muted"
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${connection === 'AI' ? 'bg-accent-violet' : 'bg-accent'}`}
                aria-hidden="true"
              />
              {connection}
            </span>
          ))}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={detailsId}
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="mt-5 border-t border-lab-line pt-4">
              <p className="text-sm leading-relaxed text-fg-muted">{tech.details}</p>
              <h4 className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-faint">
                Related learning topics
              </h4>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {tech.topics.map((topic) => (
                  <li key={topic} className="rounded-md bg-white/[0.04] px-2 py-1 text-xs text-fg-muted">
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

interface SystemMapProps {
  highlighted: Set<MapNodeId>;
  focusNode: MapNodeId | null;
  selectedTech: Technology | null;
  onSelectNode: (id: MapNodeId) => void;
}

function SystemMap({ highlighted, focusNode, selectedTech, onSelectNode }: SystemMapProps) {
  const nodeById = Object.fromEntries(mapNodes.map((node) => [node.id, node])) as Record<
    MapNodeId,
    (typeof mapNodes)[number]
  >;
  const focused = focusNode ? nodeById[focusNode] : null;
  const relatedTechs = focusNode ? technologies.filter((tech) => tech.mapNodes.includes(focusNode)) : [];

  let caption: string;
  if (selectedTech) {
    caption = `${selectedTech.name} touches: ${selectedTech.mapNodes.map((id) => nodeById[id].label).join(', ')}.`;
  } else if (focused) {
    caption = `${focused.description} Related here: ${relatedTechs.map((tech) => tech.name).join(', ')}.`;
  } else {
    caption =
      'Data flows from cloud infrastructure through processing and storage into analytics and AI. Select a technology or a layer to trace its connections.';
  }

  return (
    <div className="glass rounded-2xl p-5 sm:p-6">
      <div className="flex items-center justify-between font-mono text-[11px] text-fg-faint">
        <span>system.map</span>
        <span>{selectedTech ? selectedTech.name : focused ? focused.label : 'overview'}</span>
      </div>

      <div className="relative mx-auto mt-4 aspect-[10/9] w-full max-w-md">
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
          {mapEdges.map(({ from, to }) => {
            const a = nodeById[from];
            const b = nodeById[to];
            const active = highlighted.has(from) && highlighted.has(to);
            const touched = highlighted.has(from) || highlighted.has(to);
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                className={active ? 'map-edge-active' : undefined}
                stroke={active ? '#67E8F9' : '#2A3B56'}
                strokeOpacity={active ? 0.9 : touched && focusNode ? 0.9 : 0.7}
                strokeWidth={active ? 2 : 1.2}
                style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
              />
            );
          })}
        </svg>

        {mapNodes.map((node) => {
          const active = highlighted.has(node.id);
          return (
            <button
              key={node.id}
              type="button"
              aria-pressed={focusNode === node.id}
              onClick={() => onSelectNode(node.id)}
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 rounded-lg p-1"
              style={{ left: `${(node.x / MAP_W) * 100}%`, top: `${(node.y / MAP_H) * 100}%` }}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all duration-300 ${
                  active
                    ? 'border-accent bg-accent shadow-[0_0_18px_4px_rgba(103,232,249,0.45)]'
                    : 'border-lab-line-strong bg-lab-card group-hover:border-accent/60'
                }`}
                aria-hidden="true"
              />
              <span
                className={`whitespace-nowrap rounded-md px-1.5 py-0.5 font-mono text-[10px] transition-colors sm:text-[11px] ${
                  active ? 'bg-accent/10 text-accent' : 'text-fg-muted group-hover:text-fg'
                }`}
              >
                {node.label}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-4 min-h-[4.5rem] text-sm leading-relaxed text-fg-muted" aria-live="polite">
        {caption}
      </p>
    </div>
  );
}

export function TechStack() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [focusNode, setFocusNode] = useState<MapNodeId | null>(null);

  const selectedTech = technologies.find((tech) => tech.id === expandedId) ?? null;
  const highlighted = new Set<MapNodeId>(selectedTech ? selectedTech.mapNodes : focusNode ? [focusNode] : []);

  const toggleTech = (id: string) => {
    setExpandedId((current) => (current === id ? null : id));
    setFocusNode(null);
  };

  const selectNode = (id: MapNodeId) => {
    setFocusNode((current) => (current === id ? null : id));
    setExpandedId(null);
  };

  return (
    <Section
      id="stack"
      eyebrow="02 · Tech Stack"
      title="The Technology Ecosystem"
      intro="Four platforms I'm exploring, and how they fit together. Open a card for details — its connections light up on the system map."
    >
      <div className="grid items-start gap-8 lg:grid-cols-[1.25fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {technologies.map((tech, i) => (
            <Reveal key={tech.id} delay={i * 0.06}>
              <TechCard
                tech={tech}
                expanded={expandedId === tech.id}
                related={focusNode !== null && tech.mapNodes.includes(focusNode)}
                onToggle={() => toggleTech(tech.id)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="lg:sticky lg:top-24">
          <SystemMap
            highlighted={highlighted}
            focusNode={focusNode}
            selectedTech={selectedTech}
            onSelectNode={selectNode}
          />
        </Reveal>
      </div>
    </Section>
  );
}
