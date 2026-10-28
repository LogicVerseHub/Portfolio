import { Github, Linkedin, Mail } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Section } from '../components/Section';
import { Terminal } from '../components/Terminal';
import { contact, site } from '../data/site';

interface ContactLink {
  label: string;
  href: string;
  icon: LucideIcon;
  external: boolean;
}

function buildLinks(): ContactLink[] {
  const links: ContactLink[] = [];
  if (contact.github) links.push({ label: 'GitHub', href: contact.github, icon: Github, external: true });
  if (contact.linkedin) links.push({ label: 'LinkedIn', href: contact.linkedin, icon: Linkedin, external: true });
  if (contact.email) links.push({ label: 'Email', href: `mailto:${contact.email}`, icon: Mail, external: false });
  return links;
}

export function Contact() {
  const links = buildLinks();

  return (
    <Section id="contact" eyebrow="07 · Contact" title="Let's Build Something Meaningful.">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">{site.tagline}</p>

          {links.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-3">
              {links.map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="btn btn-ghost"
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <Icon size={16} aria-hidden="true" />
                    {label}
                    {external && <span className="sr-only">(opens in a new tab)</span>}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="glass mt-8 rounded-2xl p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Status</p>
              <p className="mt-3 leading-relaxed text-fg-muted">
                This lab is a work in progress. New projects and learning notes are added as they're built — thanks
                for exploring.
              </p>
            </div>
          )}

          <p className="mt-10 font-display text-2xl font-semibold text-gradient sm:text-3xl">{site.closing}</p>
        </Reveal>

        <Reveal delay={0.15}>
          <Terminal />
        </Reveal>
      </div>
    </Section>
  );
}
