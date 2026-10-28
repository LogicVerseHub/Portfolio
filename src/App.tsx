import { MotionConfig } from 'motion/react';
import { CursorGlow } from './components/CursorGlow';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { useActiveSection } from './hooks/useActiveSection';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Hero } from './sections/Hero';
import { Learning } from './sections/Learning';
import { Pipeline } from './sections/Pipeline';
import { Projects } from './sections/Projects';
import { Skills } from './sections/Skills';
import { TechStack } from './sections/TechStack';
import type { SectionId } from './types';

const SECTION_IDS: SectionId[] = ['hero', 'about', 'stack', 'pipeline', 'skills', 'projects', 'learning', 'contact'];

export default function App() {
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    // reducedMotion="user" turns transform animations off for visitors who ask for less motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-lab-bg"
      >
        Skip to content
      </a>
      <CursorGlow />
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <TechStack />
        <Pipeline />
        <Skills />
        <Projects />
        <Learning />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
