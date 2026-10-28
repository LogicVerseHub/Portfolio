import { useEffect, useRef, useState } from 'react';
import type { FormEvent, KeyboardEvent } from 'react';
import { projectStatusLabels, projects } from '../data/projects';
import { site } from '../data/site';
import { technologies } from '../data/technologies';

/*
 * A portfolio interaction styled as a terminal. It only matches input against
 * a fixed list of commands — no shell, no eval, no network access.
 */

type LineKind = 'input' | 'output' | 'error';

interface Line {
  id: number;
  kind: LineKind;
  text: string;
}

const PROMPT = 'guest@intelligence-lab:~$';
const COMMANDS = ['help', 'about', 'stack', 'projects', 'clear'] as const;
type Command = (typeof COMMANDS)[number];

function isCommand(value: string): value is Command {
  return (COMMANDS as readonly string[]).includes(value);
}

function commandOutput(command: Exclude<Command, 'clear'>): string[] {
  switch (command) {
    case 'help':
      return [
        'Available commands:',
        '  help      list available commands',
        '  about     who is behind this lab',
        '  stack     technologies being explored',
        '  projects  project ideas and their status',
        '  clear     clear the screen',
        '',
        'Tip: use ↑ / ↓ for history and Tab to autocomplete.',
      ];
    case 'about':
      return [site.role, '', ...site.bio, '', `Philosophy: ${site.philosophy.join(' ')}`];
    case 'stack':
      return [
        'Technology ecosystem (exploring, not certified):',
        ...technologies.map((tech) => `  ${tech.name.padEnd(18)} ${tech.category}`),
      ];
    case 'projects':
      return [
        `${projects.length} project${projects.length === 1 ? '' : 's'} listed:`,
        ...projects.map(
          (project) =>
            `  [${projectStatusLabels[project.status]}] ${project.title}${
              project.isPlaceholder ? ' (placeholder)' : ''
            }`,
        ),
        '',
        'Scroll to the Projects section for details.',
      ];
  }
}

const WELCOME: Line[] = [
  { id: -2, kind: 'output', text: 'Intelligence Lab console — a simulated, read-only terminal.' },
  { id: -1, kind: 'output', text: 'Type "help" to get started.' },
];

export function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const nextId = useRef(0);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const makeLine = (kind: LineKind, text: string): Line => ({ id: nextId.current++, kind, text });

  const execute = (raw: string) => {
    const input = raw.trim();
    setValue('');
    setHistoryIndex(null);

    if (!input) {
      const blank = makeLine('input', '');
      setLines((current) => [...current, blank]);
      return;
    }

    setHistory((current) => [...current, input]);
    const command = input.toLowerCase();

    if (command === 'clear') {
      setLines([]);
      return;
    }

    const added: Line[] = [makeLine('input', input)];
    if (isCommand(command)) {
      added.push(...commandOutput(command).map((text) => makeLine('output', text)));
    } else {
      added.push(makeLine('error', `command not found: ${input}. Type "help" to see available commands.`));
    }
    setLines((current) => [...current, ...added]);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    execute(value);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowUp') {
      if (history.length === 0) return;
      event.preventDefault();
      const index = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(index);
      setValue(history[index]);
    } else if (event.key === 'ArrowDown') {
      if (historyIndex === null) return;
      event.preventDefault();
      const index = historyIndex + 1;
      if (index >= history.length) {
        setHistoryIndex(null);
        setValue('');
      } else {
        setHistoryIndex(index);
        setValue(history[index]);
      }
    } else if (event.key === 'Tab' && value.trim()) {
      const matches = COMMANDS.filter((cmd) => cmd.startsWith(value.trim().toLowerCase()));
      // Only capture Tab when it completes something, so keyboard navigation still works.
      if (matches.length === 1) {
        event.preventDefault();
        setValue(matches[0]);
      }
    }
  };

  const focusInput = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-lab-line-strong bg-[#060a14]/90 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-3 border-b border-lab-line bg-white/[0.02] px-4 py-3">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F87171]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FBBF24]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]/70" />
        </span>
        <p className="font-mono text-xs text-fg-muted">guest@intelligence-lab:~</p>
      </div>

      {/* Clicking the output focuses the input (a mouse convenience; keyboard users tab to it). */}
      <div
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        onClick={focusInput}
        className="terminal-scroll h-72 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
      >
        {lines.map((line) => (
          <p
            key={line.id}
            className={`whitespace-pre-wrap break-words ${
              line.kind === 'error' ? 'text-[#FCA5A5]' : line.kind === 'input' ? 'text-fg' : 'text-fg-muted'
            }`}
          >
            {line.kind === 'input' && <span className="mr-2 text-accent">{PROMPT}</span>}
            {line.text || ' '}
          </p>
        ))}
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-lab-line px-4 py-3 font-mono">
        <label htmlFor="terminal-input" className="sr-only">
          Terminal command
        </label>
        <span className="hidden shrink-0 text-[13px] text-accent sm:inline" aria-hidden="true">
          {PROMPT}
        </span>
        <span className="shrink-0 text-[13px] text-accent sm:hidden" aria-hidden="true">
          $
        </span>
        <input
          ref={inputRef}
          id="terminal-input"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setHistoryIndex(null);
          }}
          onKeyDown={onKeyDown}
          maxLength={64}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="type a command…"
          className="min-w-0 flex-1 bg-transparent text-base text-fg placeholder:text-fg-faint focus:outline-none sm:text-[13px]"
          aria-describedby="terminal-help"
        />
      </form>

      <div className="flex flex-wrap items-center gap-2 border-t border-lab-line px-4 py-3">
        <span id="terminal-help" className="mr-1 font-mono text-[11px] text-fg-faint">
          Quick run:
        </span>
        {COMMANDS.map((command) => (
          <button key={command} type="button" className="chip !py-1" onClick={() => execute(command)}>
            {command}
          </button>
        ))}
      </div>
    </div>
  );
}
