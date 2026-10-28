import type { LearningEntry, LearningStatus } from '../types';

export const learningStatusLabels: Record<LearningStatus, string> = {
  'up-next': 'Up next',
  'in-progress': 'In progress',
  completed: 'Completed',
};

/*
 * YOUR LEARNING JOURNAL.
 * Add entries to this array (newest first). Each entry needs:
 *   id, title, topic, summary, technology, status
 * Optional: date ('YYYY-MM-DD'), projectUrl.
 * Delete the placeholder entries below once you add real ones.
 */
export const learningEntries: LearningEntry[] = [
  {
    id: 'placeholder-1',
    title: 'Placeholder entry — lakehouse fundamentals',
    topic: 'Data Engineering',
    summary:
      'Replace this with what you actually learned, for example how bronze, silver, and gold layers separate raw and curated data.',
    technology: 'Databricks',
    status: 'in-progress',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-2',
    title: 'Placeholder entry — cloud storage basics',
    topic: 'Cloud Computing',
    summary: 'Replace this with notes on a real topic you studied, such as storage accounts and access tiers.',
    technology: 'Microsoft Azure',
    status: 'up-next',
    isPlaceholder: true,
  },
  {
    id: 'placeholder-3',
    title: 'Placeholder entry — SQL warehousing',
    topic: 'Data Platforms',
    summary: 'Replace this with a real learning milestone, such as loading data into a warehouse and writing analytical queries.',
    technology: 'Snowflake',
    status: 'up-next',
    isPlaceholder: true,
  },
];
