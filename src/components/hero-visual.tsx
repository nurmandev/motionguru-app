'use client';

import dynamic from 'next/dynamic';
import { Component, useRef, type ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

const SculptureCanvas = dynamic(() => import('./three/sculpture-canvas'), {
  ssr: false,
  loading: () => <div className="sculpture-fallback" aria-hidden="true" />,
});

const AtmosphereCanvas = dynamic(() => import('./three/atmosphere'), {
  ssr: false,
  loading: () => <div className="atmosphere-fallback" aria-hidden="true" />,
});

type VisualVariant = 'hero' | 'closing';

class VisualBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    // WebGL can fail on constrained devices. The page keeps its composition
    // and content; only the optional visual is replaced.
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

/**
 * Mounts the sculpture only while it is near the viewport.
 * This keeps at most one hero/closing WebGL context alive on the page.
 */
export function HeroVisual({
  variant = 'hero',
  className = '',
}: {
  variant?: VisualVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, '420px');

  return (
    <div ref={ref} className={`sculpture-mount ${className}`.trim()} aria-hidden="true">
      <VisualBoundary fallback={<div className="sculpture-fallback" />}>
        {inView ? <SculptureCanvas variant={variant} /> : <div className="sculpture-fallback is-idle" />}
      </VisualBoundary>
    </div>
  );
}

export function Atmosphere({
  variant = 'hero',
  className = '',
}: {
  variant?: VisualVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, '640px');

  return (
    <div ref={ref} className={`atmosphere ${className}`.trim()} aria-hidden="true">
      <VisualBoundary fallback={<div className="atmosphere-fallback" />}>
        {inView && <AtmosphereCanvas variant={variant} />}
      </VisualBoundary>
    </div>
  );
}
