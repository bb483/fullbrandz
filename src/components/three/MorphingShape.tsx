'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Suspense } from 'react';

interface ShapeProps {
  scrollProgress?: number;
}

function InnerShape({ scrollProgress = 0 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Icosahedron wireframe that slowly morphs
  const geometry = useMemo(() => {
    return new THREE.IcosahedronGeometry(1.4, 1);
  }, []);

  useFrame((state) => {
    if (!meshRef.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Base continuous rotation
    groupRef.current.rotation.y = t * 0.15 + scrollProgress * Math.PI * 2;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;

    // Scale pulse
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
  scrollProgress?: number;
  className?: string;
}

export default function MorphingShape({ scrollProgress = 0, className = '' }: MorphingShapeProps) {
  return (
    <div className={`three-canvas-container ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <InnerShape scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
