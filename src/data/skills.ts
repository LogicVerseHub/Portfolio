import { BookOpen, BrainCircuit, CheckCircle2, Cloud, Compass, Database, Layers } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Skill, SkillCategory, SkillStatus } from '../types';

export const skillCategories: SkillCategory[] = [
  { id: 'ai', label: 'AI & Machine Learning', icon: BrainCircuit },
  { id: 'cloud', label: 'Cloud Computing', icon: Cloud },
  { id: 'data-engineering', label: 'Data Engineering', icon: Database },
  { id: 'platforms', label: 'Data Platforms', icon: Layers },
];

export const skillStatusMeta: Record<
  SkillStatus,
  { label: string; description: string; icon: LucideIcon; className: string }
> = {
  learning: {
    label: 'Currently learning',
    description: 'Actively studying right now.',
    icon: BookOpen,
    className: 'border-accent/40 bg-accent/10 text-accent',
  },
  explored: {
    label: 'Explored',
    description: 'Hands-on exploration through tutorials or experiments.',
    icon: Compass,
    className: 'border-accent-violet/40 bg-accent-violet/10 text-accent-violet',
  },
  demonstrated: {
    label: 'Demonstrated in projects',
    description: 'Used in a project listed on this site.',
    icon: CheckCircle2,
    className: 'border-accent-mint/40 bg-accent-mint/10 text-accent-mint',
  },
};

/*
 * EDIT STATUSES HERE.
 * Set `status` to 'learning', 'explored', or 'demonstrated'.
 * Only use 'demonstrated' once a matching project is listed in projects.ts.
 */
export const skills: Skill[] = [
  // AI & Machine Learning
  {
    name: 'Artificial Intelligence',
    category: 'ai',
    description: 'Core ideas behind systems that reason, perceive, and make decisions — search, knowledge, and learning.',
    status: 'learning',
  },
  {
    name: 'Machine Learning',
    category: 'ai',
    description: 'Training models from data: supervised and unsupervised learning, evaluation, and avoiding overfitting.',
    status: 'learning',
  },
  {
    name: 'Generative AI',
    category: 'ai',
    description: 'How large language models and other generative models work, and how to use them responsibly.',
    status: 'learning',
  },
  {
    name: 'AI applications',
    category: 'ai',
    description: 'Connecting models to real use cases — from prompt design to retrieval over your own documents.',
    status: 'learning',
  },

  // Cloud Computing
  {
    name: 'Microsoft Azure',
    category: 'cloud',
    description: 'Navigating Azure services, subscriptions, and resource organization.',
    status: 'explored',
  },
  {
    name: 'Cloud architecture',
    category: 'cloud',
    description: 'Designing systems that are scalable, secure, and cost-aware in the cloud.',
    status: 'learning',
  },
  {
    name: 'Storage and compute',
    category: 'cloud',
    description: 'Choosing between storage tiers and compute options, and understanding how they scale independently.',
    status: 'learning',
  },
  {
    name: 'Azure AI services',
    category: 'cloud',
    description: 'Pre-built, managed AI capabilities such as language, vision, and speech exposed through APIs.',
    status: 'learning',
  },

  // Data Engineering
  {
    name: 'SQL',
    category: 'data-engineering',
    description: 'Querying, joining, aggregating, and modeling relational data.',
    status: 'learning',
  },
  {
    name: 'Python',
    category: 'data-engineering',
    description: 'Scripting data workflows, working with DataFrames, and automating repetitive tasks.',
    status: 'learning',
  },
  {
    name: 'Data pipelines',
    category: 'data-engineering',
    description: 'Orchestrating repeatable steps that move data from sources to consumers.',
    status: 'learning',
  },
  {
    name: 'ETL / ELT',
    category: 'data-engineering',
    description: 'Extract-transform-load versus extract-load-transform, and when each pattern fits.',
    status: 'learning',
  },
  {
    name: 'Data transformation',
    category: 'data-engineering',
    description: 'Cleaning, validating, and reshaping data into reliable, analysis-ready tables.',
    status: 'learning',
  },

  // Data Platforms
  {
    name: 'Microsoft Fabric',
    category: 'platforms',
    description: 'Lakehouses, pipelines, notebooks, and Power BI within a single SaaS analytics platform.',
    status: 'explored',
  },
  {
    name: 'Databricks',
    category: 'platforms',
    description: 'Spark-based processing, Delta Lake tables, and the lakehouse approach.',
    status: 'explored',
  },
  {
    name: 'Snowflake',
    category: 'platforms',
    description: 'Cloud data warehousing with separate storage and compute and SQL-first analytics.',
    status: 'explored',
  },
  {
    name: 'Analytics and data warehousing',
    category: 'platforms',
    description: 'Dimensional modeling and structuring data so that analytical queries stay fast and understandable.',
    status: 'learning',
  },
];
