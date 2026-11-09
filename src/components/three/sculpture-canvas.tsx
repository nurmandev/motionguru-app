'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type Variant = 'hero' | 'closing';

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

function Sculpture({ variant, reduced }: { variant: Variant; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const pointer = useRef(new THREE.Vector2());
  const scroll = useRef(0);
  const entrance = useRef(reduced ? 1 : 0);

  const palette =
    variant === 'closing'
      ? { core: '#d9d2ff', shell: '#b7a6ff', ringA: '#cfc7ff', ringB: '#9fd6ff', key: '#f2ecff' }
      : { core: '#cfc9ff', shell: '#9e97f2', ringA: '#c6c0ff', ringB: '#a9dcff', key: '#f4f1ff' };

  useEffect(() => {
    const onScroll = () => {
      scroll.current = window.scrollY / Math.max(1, window.innerHeight);
    };
    const onPointer = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      );
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  useFrame((state, delta) => {
    const object = group.current;
    if (!object) return;

    const d = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    entrance.current = THREE.MathUtils.damp(entrance.current, 1, 2.1, d);

    if (!reduced) {
      const targetX = pointer.current.y * 0.2 + Math.sin(t * 0.11) * 0.035;
      const targetY = pointer.current.x * 0.28 + Math.sin(t * 0.17) * 0.09;
      object.rotation.x = THREE.MathUtils.damp(object.rotation.x, targetX, 2.4, d);
      object.rotation.y = THREE.MathUtils.damp(object.rotation.y, targetY, 2.4, d);

      const drift = Math.sin(t * 0.42) * 0.1;
      object.position.y = THREE.MathUtils.damp(object.position.y, drift, 2.8, d);
      object.position.z = THREE.MathUtils.damp(
        object.position.z,
        -Math.min(scroll.current, 3) * (variant === 'closing' ? 0.08 : 0.05),
        2.2,
        d,
      );

      if (core.current) core.current.rotation.y += d * 0.055;
      if (shell.current) shell.current.rotation.y -= d * 0.025;
      if (ringA.current) ringA.current.rotation.z += d * 0.035;
      if (ringB.current) ringB.current.rotation.z -= d * 0.022;
    }

    const scale = 0.86 + entrance.current * 0.14;
    object.scale.setScalar(scale);
  });

  const isClosing = variant === 'closing';

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4.5, 5, 6]} intensity={2.6} color={palette.key} />
      <pointLight position={[-4, -1.5, 3.5]} intensity={isClosing ? 26 : 22} color={palette.shell} distance={14} />
      <pointLight position={[4.5, 2.5, -2]} intensity={isClosing ? 20 : 17} color={palette.ringB} distance={16} />

      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4.5} position={[0, 5, -5]} scale={[10, 6, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3.2} position={[-5.5, 1, 3]} scale={[4, 9, 1]} color={palette.ringA} />
        <Lightformer form="rect" intensity={2.6} position={[5.5, -2, 2]} scale={[4, 7, 1]} color={palette.ringB} />
        <Lightformer form="circle" intensity={2.2} position={[0, -4, 4]} scale={[6, 6, 1]} color="#7c74e8" />
      </Environment>

      <group ref={group}>
        <mesh ref={core}>
          <icosahedronGeometry args={[1.24, 6]} />
          <meshPhysicalMaterial
            color={palette.core}
            metalness={0.9}
            roughness={0.16}
            clearcoat={1}
            clearcoatRoughness={0.18}
            envMapIntensity={1.45}
            iridescence={0.58}
            iridescenceIOR={1.32}
            iridescenceThicknessRange={[110, 760]}
          />
        </mesh>

        <mesh ref={shell} scale={1.18}>
          <icosahedronGeometry args={[1.24, 2]} />
          <meshBasicMaterial
            color={palette.shell}
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>

        <mesh scale={1.62}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={palette.ringB}
            transparent
            opacity={0.045}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>

        <mesh ref={ringA} rotation={[1.16, 0.24, 0.42]}>
          <torusGeometry args={[1.72, 0.006, 8, 220]} />
          <meshBasicMaterial color={palette.ringA} transparent opacity={0.62} />
        </mesh>

        <mesh ref={ringB} rotation={[0.58, 1.05, -0.4]} scale={[1.02, 0.94, 1]}>
          <torusGeometry args={[1.9, 0.0045, 8, 220]} />
          <meshBasicMaterial color={palette.ringB} transparent opacity={0.4} />
        </mesh>

        <mesh position={[1.95, 0.72, 0.5]}>
          <sphereGeometry args={[0.026, 16, 16]} />
          <meshBasicMaterial color="#e5f4ff" />
        </mesh>
        <mesh position={[-1.8, -0.86, 0.3]}>
          <sphereGeometry args={[0.018, 16, 16]} />
          <meshBasicMaterial color={palette.ringA} />
        </mesh>
      </group>
    </>
  );
}

export default function SculptureCanvas({ variant = 'hero' }: { variant?: Variant }) {
  const reduced = useReducedMotion();
  // This module is loaded with ssr: false, so the browser check is safe.
  const [supported] = useState<boolean | null>(() =>
    typeof window === 'undefined' ? null : supportsWebGL(),
  );

  if (supported === false) {
    return <div className="sculpture-fallback" aria-hidden="true" />;
  }

  return (
    <Canvas
      className="sculpture-canvas"
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 6.2], fov: 33 }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Suspense fallback={null}>
        <Sculpture variant={variant} reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}
