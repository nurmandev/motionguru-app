'use client';

import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Variant = 'hero' | 'closing';

/**
 * A slow atmospheric field that sits behind the sculpture.
 * It is intentionally low-density and low pixel ratio: it should read as
 * light and air, never as a competing focal point.
 */
export default function AtmosphereCanvas({ variant = 'hero' }: { variant?: Variant }) {
  const reduced = useReducedMotion();
  const closing = variant === 'closing';

  return (
    <ShaderGradientCanvas
      className="atmosphere-canvas"
      pixelDensity={0.6}
      pointerEvents="none"
      powerPreference="low-power"
      lazyLoad
      threshold={0.08}
      rootMargin="160px"
      style={{ position: 'absolute', inset: 0 }}
    >
      <ShaderGradient
        type="plane"
        animate={reduced ? 'off' : 'on'}
        uSpeed={0.11}
        uAmplitude={1.05}
        uDensity={1.08}
        uFrequency={0.75}
        uStrength={1.05}
        uTime={0.15}
        color1={closing ? '#121019' : '#151322'}
        color2={closing ? '#6a5fbe' : '#5b55c9'}
        color3={closing ? '#e5b7a2' : '#a9d7ff'}
        brightness={closing ? 0.72 : 0.8}
        lightType="3d"
        grain="off"
        cAzimuthAngle={210}
        cPolarAngle={95}
        cDistance={4.2}
        cameraZoom={1}
        positionX={0}
        positionY={0}
        positionZ={-2}
      />
    </ShaderGradientCanvas>
  );
}
