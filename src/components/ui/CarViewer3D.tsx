import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

interface CarViewer3DProps {
  modelUrl?: string;
  initialColor?: string;
  autoRotate?: boolean;
  className?: string;
}

export const CarViewer3D: React.FC<CarViewer3DProps> = ({
  modelUrl = '/assets/_next/static/media/ferrari.glb',
  initialColor = '#cc0000',
  autoRotate = true,
  className = 'w-full h-[450px] relative'
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [activeColor, setActiveColor] = useState(initialColor);
  const bodyMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);

  const colors = [
    { name: 'Rosso Corsa', hex: '#cc0000' },
    { name: 'Nero Daytona', hex: '#111115' },
    { name: 'Giallo Modena', hex: '#e6b800' },
    { name: 'Bianco Avus', hex: '#f0f0f5' },
    { name: 'Blu Tour de France', hex: '#004499' }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(4.2, 1.3, 3.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxDistance = 8.5;
    controls.minDistance = 2.4;
    controls.maxPolarAngle = Math.PI / 2 - 0.04;
    controls.minPolarAngle = 0.15;
    controls.target.set(0, 0.45, 0);
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 1.0;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff5e6, 3.0);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x77aaff, 2.0);
    dirLight2.position.set(-6, 6, -5);
    scene.add(dirLight2);

    const underGlow = new THREE.PointLight(0xd4a359, 3.5, 7);
    underGlow.position.set(0, 0.1, 0);
    scene.add(underGlow);

    // Materials
    const bodyMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(activeColor),
      metalness: 0.9,
      roughness: 0.35,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03
    });
    bodyMaterialRef.current = bodyMaterial;

    const detailsMaterial = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.95,
      roughness: 0.2
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.05,
      transmission: 0.95,
      transparent: true,
      opacity: 0.8
    });

    // Load Model with Draco
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/assets/_next/static/draco/');

    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);

    const wheels: THREE.Object3D[] = [];

    loader.load(
      modelUrl,
      gltf => {
        const carModel = gltf.scene.children[0];

        const bodyMesh = carModel.getObjectByName('body') as THREE.Mesh;
        if (bodyMesh) bodyMesh.material = bodyMaterial;

        const rimFL = carModel.getObjectByName('rim_fl') as THREE.Mesh;
        const rimFR = carModel.getObjectByName('rim_fr') as THREE.Mesh;
        const rimRR = carModel.getObjectByName('rim_rr') as THREE.Mesh;
        const rimRL = carModel.getObjectByName('rim_rl') as THREE.Mesh;
        const trim = carModel.getObjectByName('trim') as THREE.Mesh;
        const glass = carModel.getObjectByName('glass') as THREE.Mesh;

        if (rimFL) rimFL.material = detailsMaterial;
        if (rimFR) rimFR.material = detailsMaterial;
        if (rimRR) rimRR.material = detailsMaterial;
        if (rimRL) rimRL.material = detailsMaterial;
        if (trim) trim.material = detailsMaterial;
        if (glass) glass.material = glassMaterial;

        const wheelFL = carModel.getObjectByName('wheel_fl');
        const wheelFR = carModel.getObjectByName('wheel_fr');
        const wheelRL = carModel.getObjectByName('wheel_rl');
        const wheelRR = carModel.getObjectByName('wheel_rr');
        if (wheelFL && wheelFR && wheelRL && wheelRR) {
          wheels.push(wheelFL, wheelFR, wheelRL, wheelRR);
        }

        carModel.position.set(0, 0, 0);
        scene.add(carModel);
        setLoading(false);
      },
      undefined,
      error => {
        console.error('Error loading 3D car model:', error);
        setLoading(false);
      }
    );

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      controls.update();

      const time = -performance.now() / 1000;
      wheels.forEach(w => {
        w.rotation.x = time * Math.PI * 1.5;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelUrl, autoRotate]);

  const handleColorChange = (hex: string) => {
    setActiveColor(hex);
    if (bodyMaterialRef.current) {
      bodyMaterialRef.current.color.set(hex);
    }
  };

  return (
    <div className={className}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm z-20">
          <div className="w-10 h-10 border-3 border-[#cda869]/20 border-t-[#cda869] rounded-full animate-spin" />
          <span className="text-[#cda869] text-sm font-semibold tracking-wider">Loading 3D Model...</span>
        </div>
      )}

      {/* Paint Selector Controls */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-[#0c1018]/85 backdrop-blur-md border border-[#cda869]/40 rounded-full z-20 shadow-2xl">
        <span className="text-white/70 text-xs font-bold uppercase tracking-wider">Paint:</span>
        <div className="flex items-center gap-2">
          {colors.map(c => (
            <button
              key={c.hex}
              type="button"
              title={c.name}
              onClick={() => handleColorChange(c.hex)}
              style={{ backgroundColor: c.hex }}
              className={`w-5 h-5 rounded-full border-2 transition-transform ${
                activeColor === c.hex
                  ? 'border-[#cda869] scale-125 shadow-[0_0_10px_rgba(205,168,105,0.8)]'
                  : 'border-white/30 hover:scale-110 hover:border-white'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarViewer3D;
