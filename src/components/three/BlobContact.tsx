'use client';

import { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface MousePos {
  x: number;
  y: number;
}

function BlobMesh({ mouse }: { mouse: React.RefObject<MousePos> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { size } = useThree();

  useFrame((state) => {
    if (!meshRef.current || !mouse.current) return;
    const t = state.clock.getElapsedTime();

    // Convert mouse to normalized device coordinates
    const nx = (mouse.current.x / size.width) * 2 - 1;
    const ny = -(mouse.current.y / size.height) * 2 + 1;

    // Gentle magnetic follow
    meshRef.current.position.x += (nx * 1.2 - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (ny * 0.8 - meshRef.current.position.y) * 0.05;

    // Constant slow rotation
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;

    // Scale pulse on mouse proximity
    const dist = Math.sqrt(nx * nx + ny * ny);
    const targetScale = 1 + (1 - Math.min(1, dist)) * 0.15;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.1
    );
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.8, 64, 64]} />
      <MeshDistortMaterial
        color="#0077CC"
        emissive="#0077CC"
        emissiveIntensity={0.3}
        distort={0.5}
        speed={2}
        transparent
        opacity={0.25}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  );
}

function BlobWireframe({ mouse }: { mouse: React.RefObject<MousePos> }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = -t * 0.15;
    meshRef.current.rotation.y = t * 0.25;
  });

  return (
    <mesh ref={meshRef} scale={1.05}>
      <icosahedronGeometry args={[1.8, 2]} />
      <meshBasicMaterial color="#7C10CC" wireframe transparent opacity={0.2} />
    </mesh>
  );
}

export default function BlobContact({ className = '' }: { className?: string }) {
  const mouseRef = useRef<MousePos>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <div
      className={`three-canvas-container ${className}`}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.2} />
        <pointLight color="#0077CC" intensity={3} distance={10} position={[2, 2, 2]} />
        <pointLight color="#7C10CC" intensity={2} distance={8} position={[-2, -1, 1]} />
        <Suspense fallback={null}>
          <BlobMesh mouse={mouseRef} />
          <BlobWireframe mouse={mouseRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
