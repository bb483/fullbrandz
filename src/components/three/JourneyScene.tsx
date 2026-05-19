'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Data points — scattered particles ────────────────────────────────────────
function DataPoints({ progress }: { progress: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, count } = useMemo(() => {
    const count = 300;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
    }
    return { positions: pos, count };
  }, []);

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.02;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial
        color="#0077CC"
        size={0.1}
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Connection lines — appear as progress increases ──────────────────────────
function ConnectionLines({ progress }: { progress: number }) {
  const linesRef = useRef<THREE.Group>(null);

  // Pre-build all geometries once — never recreate on render
  const geos = useMemo(() => {
    const nodeCount = 25;
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 30
        )
      );
    }

    const built: THREE.BufferGeometry[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 7) {
          built.push(new THREE.BufferGeometry().setFromPoints([nodes[i], nodes[j]]));
        }
      }
    }
    return built;
  }, []);

  const visibleCount = Math.floor(geos.length * Math.min(progress * 2, 1));

  return (
    <group ref={linesRef}>
      {geos.map((geo, i) => (
        <lineSegments key={i} geometry={geo} visible={i < visibleCount}>
          <lineBasicMaterial color="#7C10CC" transparent opacity={0.6} />
        </lineSegments>
      ))}
    </group>
  );
}

// ─── Central AI architecture — emerges at progress > 0.7 ─────────────────────
function AIArchitecture({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const opacity = Math.max(0, (progress - 0.6) / 0.4);

  const rings = [1.2, 2.0, 2.8];

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.3 * opacity;
  });

  if (opacity < 0.01) return null;

  return (
    <group ref={groupRef} position={[0, 0, -10]}>
      {rings.map((r, i) => (
        <mesh key={i} rotation={[i * 0.4, i * 0.5, i * 0.3]}>
          <torusGeometry args={[r, 0.02, 8, 80]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? '#0077CC' : '#7C10CC'}
            emissive={i % 2 === 0 ? '#0077CC' : '#7C10CC'}
            emissiveIntensity={0.8}
            transparent
            opacity={opacity * 0.7}
          />
        </mesh>
      ))}

      {/* Icosahedron center */}
      <mesh>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshStandardMaterial
          color="#0077CC"
          emissive="#0077CC"
          emissiveIntensity={1.5}
          transparent
          opacity={opacity * 0.9}
          wireframe
        />
      </mesh>

      <pointLight color="#0077CC" intensity={opacity * 5} distance={8} />
      <pointLight color="#7C10CC" intensity={opacity * 3} distance={6} position={[2, 0, 0]} />
    </group>
  );
}

// ─── Camera movement ──────────────────────────────────────────────────────────
function CameraRig({ progress }: { progress: number }) {
  const { camera } = useThree();

  // Camera path: starts far back, moves forward into the scene
  const path = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2, 20),
      new THREE.Vector3(2, 0, 10),
      new THREE.Vector3(-1, -1, 0),
      new THREE.Vector3(0, 1, -8),
      new THREE.Vector3(0, 0, -16),
    ]);
  }, []);

  useFrame(() => {
    const clamped = Math.max(0, Math.min(1, progress));
    const pos = path.getPoint(clamped);
    const lookAt = path.getPoint(Math.min(1, clamped + 0.05));

    camera.position.lerp(pos, 0.08);
    const target = new THREE.Vector3();
    target.lerpVectors(camera.position, lookAt, 1);
    camera.lookAt(target);
  });

  return null;
}

// ─── Grid floor ───────────────────────────────────────────────────────────────
function GridFloor({ progress }: { progress: number }) {
  return (
    <gridHelper
      args={[60, 40, '#0077CC', '#C8DCF0']}
      position={[0, -5, -5]}
      rotation={[0, 0, 0]}
    />
  );
}

// ─── Main scene component ─────────────────────────────────────────────────────
function JourneySceneInner({ progress }: { progress: number }) {
  return (
    <>
      <CameraRig progress={progress} />
      <ambientLight intensity={1.5} color="#ffffff" />
      <directionalLight intensity={0.8} position={[5, 10, 5]} color="#ffffff" />
      <fog attach="fog" color="#F8FAFC" near={25} far={60} />

      <DataPoints progress={progress} />
      <ConnectionLines progress={progress} />
      <AIArchitecture progress={progress} />
      <GridFloor progress={progress} />
    </>
  );
}

interface JourneySceneProps {
  progress: number;
  className?: string;
}

export default function JourneyScene({ progress, className = '' }: JourneySceneProps) {
  return (
    <div className={`three-canvas-container ${className}`}>
      <Canvas
        camera={{ position: [0, 2, 20], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
        style={{ background: '#F8FAFC' }}
      >
        <Suspense fallback={null}>
          <JourneySceneInner progress={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
