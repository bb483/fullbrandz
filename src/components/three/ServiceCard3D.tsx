'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type CardType = 'platform' | 'system' | 'ai';

// ─── Platform: rotating cube with glowing edges ───────────────────────────────
function PlatformGeometry() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.4;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
  });

  const edges = useMemo(() => {
    const geo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    return new THREE.EdgesGeometry(geo);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Solid cube, very transparent */}
      <mesh>
        <boxGeometry args={[1.6, 1.6, 1.6]} />
        <meshStandardMaterial color="#0077CC" transparent opacity={0.04} />
      </mesh>

      {/* Glowing edges */}
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#0077CC" transparent opacity={0.7} />
      </lineSegments>

      {/* Inner rotated cube */}
      <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color="#7C10CC"
          emissive="#7C10CC"
          emissiveIntensity={0.4}
          transparent
          opacity={0.15}
        />
      </mesh>

      <pointLight color="#0077CC" intensity={2} distance={4} />
    </group>
  );
}

// ─── System: torus / network ring ─────────────────────────────────────────────
function SystemGeometry() {
  const torusRef = useRef<THREE.Mesh>(null);
  const torusRef2 = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!torusRef.current || !torusRef2.current || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    torusRef.current.rotation.y = t * 0.5;
    torusRef.current.rotation.x = t * 0.3;
    torusRef2.current.rotation.y = -t * 0.4;
    torusRef2.current.rotation.z = t * 0.2;
    groupRef.current.rotation.y = t * 0.1;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={torusRef}>
        <torusGeometry args={[0.9, 0.04, 8, 60]} />
        <meshStandardMaterial
          color="#0077CC"
          emissive="#0077CC"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      <mesh ref={torusRef2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.9, 0.03, 8, 60]} />
        <meshStandardMaterial
          color="#7C10CC"
          emissive="#7C10CC"
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Third torus, tilted */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[0.9, 0.02, 8, 60]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>

      {/* Core sphere */}
      <mesh>
        <sphereGeometry args={[0.15, 12, 12]} />
        <meshStandardMaterial
          color="#0077CC"
          emissive="#0077CC"
          emissiveIntensity={1}
        />
      </mesh>

      <pointLight color="#0077CC" intensity={2} distance={4} />
      <pointLight color="#7C10CC" intensity={1} distance={3} position={[1, 0, 0]} />
    </group>
  );
}

// ─── AI: particle neural mesh ─────────────────────────────────────────────────
function AIGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, indices } = useMemo(() => {
    const nodeCount = 18;
    const pos: number[] = [];
    const idx: number[] = [];

    // Generate nodes on an icosahedron-ish distribution
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 0.8 + Math.random() * 0.4;
      pos.push(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
    }

    // Connect nearby nodes
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.9) {
          idx.push(i * 3, i * 3 + 1, i * 3 + 2, j * 3, j * 3 + 1, j * 3 + 2);
        }
      }
    }

    return { positions: new Float32Array(pos), indices: idx };
  }, []);

  const linePositions = useMemo(() => {
    return new Float32Array(indices);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indices]);

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    return geo;
  }, [linePositions]);

  const pointGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.15) * 0.3;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -t * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Lines between nodes */}
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color="#0077CC" transparent opacity={0.3} />
      </lineSegments>

      {/* Node points */}
      <points ref={pointsRef} geometry={pointGeo}>
        <pointsMaterial
          color="#7C10CC"
          size={0.08}
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Central glowing core */}
      <mesh>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color="#0077CC"
          emissive="#0077CC"
          emissiveIntensity={1}
          wireframe
          transparent
          opacity={0.8}
        />
      </mesh>

      <pointLight color="#0077CC" intensity={2} distance={5} />
      <pointLight color="#7C10CC" intensity={1.5} distance={3} position={[0, 1, 0]} />
    </group>
  );
}

const geometryMap: Record<CardType, React.FC> = {
  platform: PlatformGeometry,
  system: SystemGeometry,
  ai: AIGeometry,
};

interface ServiceCard3DProps {
  type: CardType;
  className?: string;
}

export default function ServiceCard3D({ type, className = '' }: ServiceCard3DProps) {
  const Geometry = geometryMap[type];

  return (
    <div className={`three-canvas-container ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <Suspense fallback={null}>
          <Geometry />
        </Suspense>
      </Canvas>
    </div>
  );
}
