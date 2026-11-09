'use client';

import { useRef } from 'react';
import { gsap, registerGsap, ScrollTrigger } from '@/lib/animations/gsap';
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';

/**
 * A quiet, one-pixel read of how far the visitor has travelled.
 * It is driven by ScrollTrigger and updates a transform only, so it never
 * causes React renders or layout work while scrolling.
 */
export function ScrollProgress({ showAfterHero = true }: { showAfterHero?: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    registerGsap();
    const root = rootRef.current;
    const bar = barRef.current;
    if (!root || !bar) return;

    const context = gsap.context(() => {
      gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' });
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          gsap.set(bar, { scaleX: self.progress });
          const threshold = showAfterHero ? window.innerHeight * 0.72 : 24;
          root.classList.toggle('is-visible', self.scroll() > threshold);
        },
      });
    }, root);

    return () => context.revert();
  }, [showAfterHero]);

  return (
    <div ref={rootRef} className="scroll-progress" aria-hidden="true">
      <div ref={barRef} className="scroll-progress-bar" />
    </div>
  );
}
