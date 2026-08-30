import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const CARS = [
  { name: 'LUXURY CARS', url: '/assets/_next/static/media/audi_a7.glb',      targetSize: 4.8 },
  { name: 'SEDAN CARS',  url: '/assets/_next/static/media/tesla_model_s.glb', targetSize: 5.2 },
];

let currentIdx = 0;
let scene, camera, renderer, controls;
let currentCarGroup = null;
const loader = new GLTFLoader();

function init() {
  const container = document.getElementById('threeCanvasContainer');
  if (!container) return;

  scene  = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(36, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(4.4, 0.95, 4.6);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom    = false;
  controls.enableDamping  = true;
  controls.dampingFactor  = 0.07;
  controls.maxPolarAngle  = Math.PI / 2 - 0.05;
  controls.minPolarAngle  = Math.PI / 6;
  controls.target.set(0, 0, 0);
  controls.autoRotate      = true;
  controls.autoRotateSpeed = 0.7;

  // Studio Lighting
  const amb = new THREE.AmbientLight(0xffffff, 2.6);
  scene.add(amb);

  const mainLight = new THREE.DirectionalLight(0xfff6e8, 4.8);
  mainLight.position.set(8, 14, 10);
  mainLight.castShadow = true;
  mainLight.shadow.mapSize.width  = 2048;
  mainLight.shadow.mapSize.height = 2048;
  scene.add(mainLight);

  const rimLight = new THREE.DirectionalLight(0x90b0ff, 2.8);
  rimLight.position.set(-9, 8, -8);
  scene.add(rimLight);

  const fillLight = new THREE.DirectionalLight(0xffffff, 2.0);
  fillLight.position.set(0, 6, -12);
  scene.add(fillLight);

  const glowLight = new THREE.PointLight(0xd4a359, 5.5, 14);
  glowLight.position.set(0, -0.4, 0);
  scene.add(glowLight);

  loadCar(currentIdx);

  window.addEventListener('resize', onWindowResize);
  animate();
  setupUI();
}

function loadCar(index) {
  const loaderEl = document.getElementById('canvasLoader');
  if (loaderEl) loaderEl.style.opacity = '1';

  if (currentCarGroup) {
    scene.remove(currentCarGroup);
    currentCarGroup = null;
  }

  const carInfo = CARS[index];
  loader.load(carInfo.url, (gltf) => {
    const root = gltf.scene;

    root.traverse((node) => {
      if (node.isMesh) {
        node.castShadow    = true;
        node.receiveShadow = true;
      }
    });

    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    const scale = carInfo.targetSize / (maxDim || 1);
    root.scale.setScalar(scale);

    box.setFromObject(root);
    box.getCenter(center);
    root.position.set(-center.x, -center.y, -center.z);

    currentCarGroup = root;
    scene.add(currentCarGroup);

    if (loaderEl) loaderEl.style.opacity = '0';
    updateBadge();
  }, undefined, (err) => {
    console.error('Error loading car GLB:', err);
    if (loaderEl) loaderEl.style.opacity = '0';
  });
}

function updateBadge() {
  const badge = document.getElementById('carPlateBadge');
  if (badge) {
    badge.textContent = CARS[currentIdx].name;
  }

  const tabLuxury = document.getElementById('tabLuxury');
  const tabSedan  = document.getElementById('tabSedan');
  if (tabLuxury && tabSedan) {
    if (currentIdx === 0) {
      tabLuxury.className = 'Demo2_SegmentTab active';
      tabSedan.className  = 'Demo2_SegmentTab';
    } else {
      tabLuxury.className = 'Demo2_SegmentTab';
      tabSedan.className  = 'Demo2_SegmentTab active';
    }
  }
}

function setupUI() {
  const prevBtn = document.getElementById('carPrevBtn');
  const nextBtn = document.getElementById('carNextBtn');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIdx = (currentIdx - 1 + CARS.length) % CARS.length;
      loadCar(currentIdx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIdx = (currentIdx + 1) % CARS.length;
      loadCar(currentIdx);
    });
  }

  const tabLuxury = document.getElementById('tabLuxury');
  const tabSedan  = document.getElementById('tabSedan');
  if (tabLuxury) {
    tabLuxury.addEventListener('click', () => {
      if (currentIdx !== 0) {
        currentIdx = 0;
        loadCar(0);
      }
    });
  }
  if (tabSedan) {
    tabSedan.addEventListener('click', () => {
      if (currentIdx !== 1) {
        currentIdx = 1;
        loadCar(1);
      }
    });
  }
}

function onWindowResize() {
  const container = document.getElementById('threeCanvasContainer');
  if (!container || !renderer || !camera) return;
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);
  if (controls) controls.update();
  if (renderer && scene && camera) renderer.render(scene, camera);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
