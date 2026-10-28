import type { ContactLinks, NavItem } from '../types';

export const site = {
  title: 'INTELLIGENCE LAB',
  role: 'Computer Science Student | AI & Data Engineering',
  status: 'LEARNING & BUILDING',
  heroLabel: 'COMPUTER SCIENCE / AI / DATA',
  headline: 'Turning Data Into Intelligence.',
  heroText:
    'Exploring the intersection of artificial intelligence, cloud computing, and modern data engineering.',
  tagline:
    'Exploring AI, engineering modern data platforms, and building intelligent systems at the intersection of cloud and data.',
  bio: [
    "I'm a Computer Science student exploring the intersection of Artificial Intelligence, Cloud Computing, and Data Engineering.",
    "I'm interested in how intelligent systems, scalable cloud infrastructure, and modern data platforms work together to solve meaningful problems.",
    'My technical journey includes exploring Microsoft Azure, Microsoft Fabric, Databricks, and Snowflake while developing practical skills through experimentation and projects.',
  ],
  philosophy: ['Learn continuously.', 'Build intentionally.', 'Think beyond the data.'],
  closing: 'Built with curiosity. Driven by data.',
  footer: 'INTELLIGENCE LAB · AI · CLOUD · DATA',
} as const;

/**
 * Contact links. Every field is optional: leave a value as an empty string
 * and its button is not rendered. When all are empty the Contact section
 * shows a non-identifying closing message instead.
 */
export const contact: ContactLinks = {
  github: '',
  linkedin: '',
  email: '',
};

export const navItems: NavItem[] = [
  { label: 'About', target: 'about', sections: ['about'] },
  { label: 'Tech Stack', target: 'stack', sections: ['stack', 'pipeline', 'skills'] },
  { label: 'Projects', target: 'projects', sections: ['projects'] },
  { label: 'Learning', target: 'learning', sections: ['learning'] },
  { label: 'Contact', target: 'contact', sections: ['contact'] },
];
