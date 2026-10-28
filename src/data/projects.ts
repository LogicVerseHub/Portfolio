import type { Project, ProjectStatus } from '../types';

export const projectStatusLabels: Record<ProjectStatus, string> = {
  idea: 'Idea',
  planned: 'Planned',
  'in-progress': 'In progress',
  completed: 'Completed',
};

/*
 * REPLACE THESE EXAMPLES WITH YOUR OWN PROJECTS.
 * - Remove `isPlaceholder` once an entry is real.
 * - Add `repoUrl` / `demoUrl` only when those links actually exist.
 * - Screenshots go in /public/screenshots and are referenced as
 *   { src: 'screenshots/file.png', alt: 'Description' }.
 */
export const projects: Project[] = [
  {
    id: 'example-lakehouse',
    title: 'Example: Retail Sales Lakehouse',
    problem:
      'Sales data spread across CSV exports and a transactional database makes it hard to answer simple questions like "which categories are growing?"',
    solution:
      'Ingest the raw files into a lakehouse, clean and join them into bronze / silver / gold tables, and expose a small dashboard on top.',
    technologies: ['Databricks', 'Python', 'SQL', 'Delta Lake'],
    learnings: [
      'Placeholder — describe what you learned about medallion architecture.',
      'Placeholder — note any data quality issues you had to solve.',
    ],
    status: 'idea',
    isPlaceholder: true,
  },
  {
    id: 'example-doc-qa',
    title: 'Example: Document Q&A Assistant',
    problem: 'Course notes and reference PDFs are long, and finding a specific answer takes time.',
    solution:
      'Split documents into chunks, index them for retrieval, and use a language model to answer questions with citations back to the source text.',
    technologies: ['Azure AI services', 'Python', 'Generative AI'],
    learnings: [
      'Placeholder — explain how retrieval quality affected answers.',
      'Placeholder — note what you learned about evaluating outputs.',
    ],
    status: 'planned',
    isPlaceholder: true,
  },
  {
    id: 'example-warehouse',
    title: 'Example: Analytics Warehouse Model',
    problem: 'Analytical queries on raw, normalized tables are slow and difficult for others to understand.',
    solution:
      'Design a star schema with fact and dimension tables, load it with SQL transformations, and document the model.',
    technologies: ['Snowflake', 'SQL', 'Microsoft Fabric'],
    learnings: [
      'Placeholder — summarize trade-offs you found in dimensional modeling.',
      'Placeholder — describe how you validated the loaded data.',
    ],
    status: 'idea',
    isPlaceholder: true,
  },
];
