'use client';

import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect';
import {
  createMagnetic,
  gsap,
  motionBreakpoints,
  registerGsap,
  ScrollTrigger,
  type SplitText,
} from '@/lib/animations/gsap';
import { motionConfig } from '@/lib/animations/config';
import { splitLines } from '@/lib/animations/text';
import { ScrollProgress } from './animations/ScrollProgress';

const m = motionConfig;

export function PageMotion() {
  useIsomorphicLayoutEffect(() => {
    registerGsap();

    const html = document.documentElement;
    const splits: SplitText[] = [];
    const cleanups: Array<() => void> = [];
    const media = gsap.matchMedia();
    let alive = true;

    media.add(motionBreakpoints.motionAllowed, () => {
      const context = gsap.context(() => {
        const headline = document.querySelector<HTMLElement>('[data-motion="hero-headline"]');
        if (headline) {
          headline.style.visibility = 'visible';
          try {
            const split = splitLines(headline);
            splits.push(split);
            gsap.set(split.lines, { yPercent: 112 });
          } catch {
            gsap.set(headline, { autoAlpha: 0, y: m.distance.md });
          }
        }

        gsap.set(
          '.notch-logo, .notch-link, .notch-cta',
          { autoAlpha: 0, y: m.distance.xs },
        );
        gsap.set(
          '[data-motion="hero-label"], [data-motion="hero-copy"], [data-motion="hero-actions"], [data-motion="hero-caption"]',
          { autoAlpha: 0, y: m.distance.sm },
        );
        gsap.set('[data-motion="hero-visual"]', { autoAlpha: 0, y: 30, scale: 0.98 });

        const entrance = gsap.timeline({ defaults: { ease: m.ease.out } });
        entrance
          .to('.notch-logo', { autoAlpha: 1, y: 0, duration: 0.42 }, 0.05)
          .to('.notch-link', { autoAlpha: 1, y: 0, duration: 0.36, stagger: 0.055 }, 0.12)
          .to('.notch-cta', { autoAlpha: 1, y: 0, duration: 0.36 }, 0.2)
          .to('[data-motion="hero-label"]', { autoAlpha: 1, y: 0, duration: 0.5 }, 0.16);

        if (splits[0]?.lines?.length) {
          entrance.to(
            splits[0].lines,
            { yPercent: 0, duration: 0.9, stagger: 0.08, ease: m.ease.reveal },
            0.22,
          );
        } else if (headline) {
          entrance.to(headline, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.22);
        }

        entrance
          .to('[data-motion="hero-copy"]', { autoAlpha: 1, y: 0, duration: 0.6 }, 0.55)
          .to('[data-motion="hero-actions"]', { autoAlpha: 1, y: 0, duration: 0.55 }, 0.68)
          .to('[data-motion="hero-caption"]', { autoAlpha: 1, y: 0, duration: 0.5 }, 0.78)
          .to(
            '[data-motion="hero-visual"]',
            { autoAlpha: 1, y: 0, scale: 1, duration: 1.1, ease: m.ease.reveal },
            0.6,
          );

        document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((element) => {
          cleanups.push(createMagnetic(element));
        });

        if (document.fonts?.ready) {
          document.fonts.ready.then(() => {
            if (alive) ScrollTrigger.refresh();
          });
        }
      }, document.body);

      return () => {
        context.revert();
        splits.forEach((split) => split.revert());
        splits.length = 0;
        cleanups.forEach((cleanup) => cleanup());
        cleanups.length = 0;
      };
    });

    html.classList.remove('motion-pending');

    return () => {
      alive = false;
      media.revert();
      html.classList.remove('motion-pending');
    };
  }, []);

  return <ScrollProgress />;
}
