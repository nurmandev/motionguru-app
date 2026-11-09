import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as SplitTextPlugin } from 'gsap/SplitText';

/**
 * Single GSAP registration point for the whole marketing page.
 *
 * Importing this module from more than one client component is safe: the
 * registration guard below makes the plugin registration idempotent.
 */
let registered = false;

export function registerGsap() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger, SplitTextPlugin);
  registered = true;
}

/** Media queries that decide whether motion is appropriate. */
export const motionBreakpoints = {
  motionAllowed: '(prefers-reduced-motion: no-preference)',
  finePointer: '(pointer: fine)',
} as const;

/**
 * Subtle magnetic pull for primary actions. It only runs for fine pointers and
 * never on reduced-motion setups, and always returns a cleanup function.
 */
export function createMagnetic(element: HTMLElement, strength = 0.22) {
  const query = window.matchMedia(motionBreakpoints.finePointer);
  if (!query.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return () => {};
  }

  const xTo = gsap.quickTo(element, 'x', { duration: 0.45, ease: 'power3.out' });
  const yTo = gsap.quickTo(element, 'y', { duration: 0.45, ease: 'power3.out' });

  const onMove = (event: PointerEvent) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    xTo(x * strength);
    yTo(y * strength);
  };

  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  element.addEventListener('pointermove', onMove);
  element.addEventListener('pointerleave', onLeave);

  return () => {
    element.removeEventListener('pointermove', onMove);
    element.removeEventListener('pointerleave', onLeave);
    gsap.set(element, { x: 0, y: 0 });
  };
}

export { gsap, ScrollTrigger };
export type { SplitText } from 'gsap/SplitText';
