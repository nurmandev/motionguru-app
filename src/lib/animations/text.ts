import { SplitText } from 'gsap/SplitText';
import { gsap } from 'gsap';

/**
 * Split a headline into masked lines so it can rise out of its own leading.
 * The caller owns the returned instance and must revert it on cleanup.
 */
export function splitLines(element: HTMLElement) {
  const split = new SplitText(element, {
    type: 'lines',
    linesClass: 'split-line',
    mask: 'lines',
  });

  gsap.set(element, { autoAlpha: 1 });
  return split;
}
