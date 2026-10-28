import type { LucideIcon } from 'lucide-react';

/* ---------- Navigation ---------- */

export type SectionId =
  | 'hero'
  | 'about'
  | 'stack'
  | 'pipeline'
  | 'skills'
  | 'projects'
  | 'learning'
  | 'contact';

export interface NavItem {
  label: string;
  /** Section the link scrolls to. */
  target: SectionId;
  /** Sections that keep this link highlighted while in view. */
  sections: SectionId[];
}

/* ---------- Site identity & contact ---------- */

export interface ContactLinks {
  /** Full profile URL, e.g. https://github.com/your-handle — leave empty to hide. */
  github: string;
  /** Full profile URL, e.g. https://www.linkedin.com/in/your-handle — leave empty to hide. */
  linkedin: string;
  /** Professional email address — leave empty to hide. */
  email: string;
}

/* ---------- Technology ecosystem ---------- */

export type MapNodeId = 'cloud' | 'processing' | 'storage' | 'analytics' | 'ai';

export interface MapNode {
  id: MapNodeId;
  label: string;
  description: string;
  /** Position inside a 400 × 360 coordinate space. */
  x: number;
  y: number;
}

export interface MapEdge {
  from: MapNodeId;
  to: MapNodeId;
}

export type TechConnection = 'AI' | 'Data Engineering';

export interface Technology {
  id: string;
  name: string;
  category: string;
  summary: string;
  details: string;
  topics: string[];
  connections: TechConnection[];
  mapNodes: MapNodeId[];
  icon: LucideIcon;
}

/* ---------- Pipeline simulation ---------- */

export interface PipelineStage {
  id: string;
  label: string;
  what: string;
  why: string;
  technologies: string[];
  example: string;
  /** Illustrative snapshot of a sample record at this stage. */
  sample: string;
  icon: LucideIcon;
}

/* ---------- Skills explorer ---------- */

export type SkillStatus = 'learning' | 'explored' | 'demonstrated';

export type SkillCategoryId = 'ai' | 'cloud' | 'data-engineering' | 'platforms';

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  icon: LucideIcon;
}

export interface Skill {
  name: string;
  category: SkillCategoryId;
  description: string;
  status: SkillStatus;
}

/* ---------- Projects ---------- */

export type ProjectStatus = 'idea' | 'planned' | 'in-progress' | 'completed';

export interface Project {
  id: string;
  title: string;
  problem: string;
  solution: string;
  technologies: string[];
  learnings: string[];
  status: ProjectStatus;
  /** Public repository URL. Leave undefined until it exists. */
  repoUrl?: string;
  /** Live demo URL. Leave undefined if there is no demo. */
  demoUrl?: string;
  /** Image path relative to /public, e.g. "screenshots/my-project.png". */
  screenshot?: { src: string; alt: string };
  /** Marks example content that should be replaced with a real project. */
  isPlaceholder?: boolean;
}

/* ---------- Learning journal ---------- */

export type LearningStatus = 'up-next' | 'in-progress' | 'completed';

export interface LearningEntry {
  id: string;
  /** Short heading for the entry. */
  title: string;
  /** Subject area used by the topic filter, e.g. "Data Engineering". */
  topic: string;
  /** ISO date (YYYY-MM-DD). Omit if you'd rather not show one. */
  date?: string;
  summary: string;
  technology: string;
  projectUrl?: string;
  status: LearningStatus;
  isPlaceholder?: boolean;
}
