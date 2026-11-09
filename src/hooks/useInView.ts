'use client';

import { useEffect, useState, type RefObject } from 'react';

/**
 * Tracks whether an element is near the viewport. Used to mount / pause
 * expensive WebGL scenes without keeping them alive offscreen.
 */
export function useInView(ref: RefObject<Element | null>, rootMargin = '300px') {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      const frame = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
