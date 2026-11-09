'use client';

import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') return () => {};
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(query).matches;
}

/**
 * SSR-safe reduced-motion preference. The server renders the motion-enabled
 * branch; the client corrects itself during hydration before paint.
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
