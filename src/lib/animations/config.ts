/**
 * The single source of truth for page choreography timings.
 * Keeping these values together is what makes the page feel like one system
 * rather than a collection of unrelated animations.
 */
export const motionConfig = {
  ease: {
    out: 'power3.out',
    inOut: 'power2.inOut',
    reveal: 'expo.out',
  },
  duration: {
    reveal: 0.85,
  },
  distance: {
    xs: 10,
    sm: 20,
    md: 34,
  },
  stagger: {
    tight: 0.045,
    base: 0.075,
  },
  scroll: {
    statementShift: 46,
  },
} as const;
