import { useReducedMotion } from 'motion/react';
import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const SIZE = 420;

/** Soft light that follows the pointer. Desktop (fine pointer) only. */
export function CursorGlow() {
  const finePointer = useMediaQuery('(pointer: fine)');
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const enabled = finePointer && !reduceMotion;

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let x = 0;
    let y = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const el = ref.current;
        if (!el) return;
        el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0)`;
        el.style.opacity = '1';
      });
    };
    const onLeave = () => {
      if (ref.current) ref.current.style.opacity = '0';
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500"
      style={{
        width: SIZE,
        height: SIZE,
        background:
          'radial-gradient(circle, rgba(103,232,249,0.09), rgba(167,139,250,0.04) 40%, transparent 70%)',
      }}
    />
  );
}
