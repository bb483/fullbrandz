'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

function InnerShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const scrollBoost = useRef(0); // lerped scroll velocity boost

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.4, 1), []);

  useEffect(() => {
    let lastScroll = window.scrollY;
    const onScroll = () => {
      const delta = window.scrollY - lastScroll;
      lastScroll = window.scrollY;
      // Add a small velocity boost based on scroll speed
      scrollBoost.current += delta * 0.003;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    // Decay the scroll boost each frame
    scrollBoost.current *= 0.9;
    groupRef.current.rotation.y += 0.003 + scrollBoost.current;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    const scalePulse = 1 + Math.sin(t * 0.8) * 0.04;
    meshRef.current.scale.setScalar(scalePulse);
  });

  return (
    <group ref={groupRef}>
      {/* Solid inner */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          color="#0077CC"
          transparent
          opacity={0.06}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Wireframe outer */}
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#0077CC"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Magenta wireframe offset */}
      <mesh geometry={geometry} scale={1.08}>
        <meshBasicMaterial
          color="#7C10CC"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Core glow sphere */}
      <Sphere args={[0.35, 16, 16]}>
        <MeshDistortMaterial
          color="#0077CC"
          emissive="#0077CC"
          emissiveIntensity={0.8}
          distort={0.4}
          speed={3}
          transparent
          opacity={0.9}
        />
      </Sphere>

      {/* Point lights for glow */}
      <pointLight color="#0077CC" intensity={3} distance={6} />
      <pointLight color="#7C10CC" intensity={1.5} distance={5} position={[2, 1, 0]} />
    </group>
  );
}

interface MorphingShapeProps {
  className?: string;
}

export default function MorphingShape({ className = '' }: MorphingShapeProps) {
  return (
    <div className={`three-canvas-container ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <InnerShape />
        </Suspense>
      </Canvas>
    </div>
  );
}
