'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';

// Preload GLB models in browser cache
if (typeof window !== 'undefined') {
  useGLTF.preload('/assets/_next/static/media/audi_a7.glb');
  useGLTF.preload('/assets/_next/static/media/tesla_model_s.glb');
}

// ── Car Model ──────────────────────────────────────────────
function CarModel({ url, onModelReady }: { url: string; onModelReady?: () => void }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!ref.current) return;

    // Reset transformations before measuring
    ref.current.scale.set(1, 1, 1);
    ref.current.position.set(0, 0, 0);

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Scale sizing matched to podium perspective
    const isTesla = url.toLowerCase().includes('tesla');
    const targetSize = isTesla ? 5.2 : 4.8;
    const scale = targetSize / (maxDim || 1);
    ref.current.scale.setScalar(scale);

    // Center in 3D space
    box.setFromObject(ref.current);
    box.getCenter(center);
    ref.current.position.set(-center.x, -center.y, -center.z);

    if (onModelReady) {
      onModelReady();
    }
  }, [scene, url, onModelReady]);

  return <primitive ref={ref} object={scene} />;
}

// ── Loading Fallback ────────────────────────────────────────
function Loader() {
  return (
    <mesh position={[0, 0, 0]}>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="#d4a359" wireframe />
    </mesh>
  );
}

// ── Main Canvas Component ───────────────────────────────────
export default function CarCanvas({
  modelUrl,
  onModelReady,
}: {
  modelUrl: string;
  onModelReady?: () => void;
}) {
  return (
    <Canvas
      camera={{ position: [4.4, 1.45, 4.6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%', background: 'transparent', overflow: 'visible' }}
      shadows
    >
      {/* Showroom & Podium Ambient Lighting */}
      <ambientLight intensity={2.4} />
      <directionalLight
        position={[8, 14, 10]}
        intensity={4.8}
        color="#fff6e8"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-9, 8, -8]} intensity={2.8} color="#90b0ff" />
      <directionalLight position={[0, 6, -12]} intensity={2.0} color="#ffffff" />
      
      {/* Warm Golden Glow from Podium Rim */}
      <pointLight position={[0, -0.6, 0]} intensity={7.5} color="#d4a359" distance={12} />
      <pointLight position={[2, -0.4, 2]} intensity={4.0} color="#e5c27a" distance={8} />
      <pointLight position={[-2, -0.4, -2]} intensity={4.0} color="#e5c27a" distance={8} />

      {/* Car model with Suspense & Ground Contact Shadows on Podium */}
      <Suspense fallback={<Loader />}>
        <CarModel url={modelUrl} onModelReady={onModelReady} />
        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.7}
          scale={18}
          blur={2.4}
          far={5}
          color="#000000"
        />
        <Environment preset="city" />
      </Suspense>

      {/* Orbit controls with showroom polar angle constraints */}
      <OrbitControls
        enableZoom={false}
        enableDamping
        dampingFactor={0.07}
        maxPolarAngle={Math.PI / 2 - 0.08}
        minPolarAngle={Math.PI / 6}
        target={[0, 0.05, 0]}
        autoRotate
        autoRotateSpeed={0.7}
      />
    </Canvas>
  );
}
