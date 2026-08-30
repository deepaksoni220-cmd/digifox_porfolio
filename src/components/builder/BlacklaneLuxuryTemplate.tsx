import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { GeneratedWebsiteData } from '../../services/aiBuilderService';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Car, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Star, 
  Phone, 
  CheckCircle2, 
  Sparkles, 
  Plane, 
  Compass, 
  Crown,
  RotateCw,
  Eye
} from 'lucide-react';

interface BlacklaneTemplateProps {
  data: GeneratedWebsiteData;
  fullScreen?: boolean;
  logoUrl?: string;
  updateData: (path: string[], val: string) => void;
  EditableField: React.FC<{
    value: string;
    onChange: (val: string) => void;
    as?: any;
    className?: string;
    multiline?: boolean;
  }>;
}

export const BlacklaneLuxuryTemplate: React.FC<BlacklaneTemplateProps> = ({
  data,
  logoUrl,
  updateData,
  EditableField
}) => {
  const [activeTab, setActiveTab] = useState<'oneway' | 'hourly'>('oneway');
  const [selectedFleet, setSelectedFleet] = useState<number>(0);
  const [activeCarModel, setActiveCarModel] = useState<'audi' | 'tesla'>('audi');
  const [carLoading, setCarLoading] = useState<boolean>(true);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Interactive 3D WebGL Car Canvas
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(4.5, 1.8, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // don't go below floor
    controls.minDistance = 3;
    controls.maxDistance = 10;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
    mainKeyLight.position.set(5, 8, 5);
    mainKeyLight.castShadow = true;
    scene.add(mainKeyLight);

    const blueRimLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
    blueRimLight.position.set(-6, 4, -5);
    scene.add(blueRimLight);

    const goldAccentLight = new THREE.PointLight(0xf59e0b, 3, 20);
    goldAccentLight.position.set(0, 3, -3);
    scene.add(goldAccentLight);

    // Podium Disc
    const discGeo = new THREE.CylinderGeometry(3.5, 3.6, 0.1, 64);
    const discMat = new THREE.MeshStandardMaterial({
      color: 0x11131a,
      roughness: 0.2,
      metalness: 0.8,
    });
    const disc = new THREE.Mesh(discGeo, discMat);
    disc.position.y = -0.05;
    disc.receiveShadow = true;
    scene.add(disc);

    // Subtle Glowing Ring on Podium
    const ringGeo = new THREE.RingGeometry(3.4, 3.48, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.01;
    scene.add(ring);

    // Load 3D GLB Model
    const loader = new GLTFLoader();
    const modelPath = activeCarModel === 'audi'
      ? '/templates/blacklane/static.blacklane.com/assets/_next/static/media/audi_a7.glb'
      : '/templates/blacklane/static.blacklane.com/assets/_next/static/media/tesla_model_s.glb';

    let currentModel: THREE.Group | null = null;
    setCarLoading(true);

    loader.load(
      modelPath,
      (gltf) => {
        currentModel = gltf.scene;
        // Auto-center & scale
        const box = new THREE.Box3().setFromObject(currentModel);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.6 / maxDim;
        currentModel.scale.setScalar(scale);

        // Re-center on floor
        box.setFromObject(currentModel);
        const center = box.getCenter(new THREE.Vector3());
        currentModel.position.x = -center.x;
        currentModel.position.y = -box.min.y;
        currentModel.position.z = -center.z;

        currentModel.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });

        scene.add(currentModel);
        setCarLoading(false);
      },
      undefined,
      () => {
        // Fallback procedural luxury car geometry if GLB is loading
        const bodyGeo = new THREE.BoxGeometry(3.4, 0.9, 1.6);
        const bodyMat = new THREE.MeshPhysicalMaterial({
          color: 0x0a0c12,
          metalness: 0.9,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        });
        const mesh = new THREE.Mesh(bodyGeo, bodyMat);
        mesh.position.y = 0.6;
        mesh.castShadow = true;
        scene.add(mesh);
        setCarLoading(false);
      }
    );

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [activeCarModel]);

  const defaultBento = [
    {
      tag: "Global Telemetry",
      title: "Worldwide Flight Radar Tracking",
      description: "Continuous flight radar monitoring automatically synchronizes driver dispatch with early arrivals or international tarmac delays.",
      metric: "500+ Global Cities",
      icon: "⚡"
    },
    {
      tag: "First-Class Fleet",
      title: "Immaculate European Fleet",
      description: "Late-model Mercedes-Benz S-Class, BMW 7 Series, and Mercedes V-Class sanitized before every journey.",
      metric: "Euro NCAP 5★",
      icon: "🛡️"
    },
    {
      tag: "Financial Certainty",
      title: "All-Inclusive Upfront Fixed Rates",
      description: "Zero dynamic peak-hour surge pricing. All tolls, airport parking fees, and driver gratuities are 100% included.",
      metric: "0% Surge Multiplier",
      icon: "💎"
    },
    {
      tag: "VIP Protocol",
      title: "Terminal Meet & Greet Escort",
      description: "Professional suited chauffeurs meeting you inside the arrivals hall with personalized digital name tablets.",
      metric: "VIP Baggage Escort",
      icon: "👑"
    }
  ];

  const defaultFleet = [
    {
      title: "First Class Mercedes S-Class",
      description: "The pinnacle of executive luxury. Reclining rear seats, acoustic glass, and ambient climate control.",
      price: "$195 Fixed",
      icon: "🚗",
      passengers: "3 Guests",
      luggage: "2 Bags"
    },
    {
      title: "Business Class Mercedes E-Class",
      description: "Sophisticated, punctual mobility for executive day commutes, meetings, and airport transfers.",
      price: "$145 Fixed",
      icon: "💼",
      passengers: "3 Guests",
      luggage: "2 Bags"
    },
    {
      title: "Business Van Mercedes V-Class",
      description: "Spacious luxury people mover seating up to 7 passengers with generous luggage capacity.",
      price: "$210 Fixed",
      icon: "🚐",
      passengers: "6 Guests",
      luggage: "6 Bags"
    },
    {
      title: "By-the-Hour Private Chauffeur",
      description: "Flexible hourly disposal for multi-stop corporate roadshows, diplomatic visits, and luxury shopping.",
      price: "$130 / hr",
      icon: "⏱️",
      passengers: "Tailored",
      luggage: "Tailored"
    }
  ];

  const bentoItems = data.bentoFeatures && data.bentoFeatures.length > 0 ? data.bentoFeatures : defaultBento;
  const fleetItems = data.items && data.items.length > 0 ? data.items : defaultFleet;

  return (
    <div className="w-full min-h-screen bg-[#07080c] text-white font-sans selection:bg-[#ca8a04] selection:text-black overflow-x-hidden">
      
      {/* Luxury Ambient Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-10 w-[500px] h-[500px] bg-[#ca8a04]/10 rounded-full blur-[160px] pointer-events-none" />

      {/* VIP Header Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#07080c]/85 backdrop-blur-xl px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-9 w-auto object-contain" />
          ) : (
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#ca8a04] to-[#eab308] flex items-center justify-center text-black font-extrabold text-lg shadow-lg shadow-yellow-500/20">
                B
              </span>
              <span className="text-xl font-bold tracking-wider text-white uppercase font-mono">
                BLACKLANE
              </span>
            </div>
          )}
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-[11px] font-medium text-white/60">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Global 500+ Cities Active
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#booking" className="hover:text-white transition-colors">Book Chauffeur</a>
          <a href="#3d-showroom" className="hover:text-white transition-colors flex items-center gap-1.5 text-blue-400 font-semibold">
            <Sparkles size={14} /> 3D Showroom
          </a>
          <a href="#fleet" className="hover:text-white transition-colors">Fleet Tiers</a>
          <a href="#telemetry" className="hover:text-white transition-colors">Flight Telemetry</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Client Reviews</a>
        </nav>

        <div className="flex items-center gap-3">
          <a 
            href="https://wa.me/447400000000" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-medium text-xs tracking-wider transition-all"
          >
            <Phone size={14} className="text-[#ca8a04]" />
            <span>VIP Dispatch</span>
          </a>
          <a 
            href="#booking"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ca8a04] to-[#eab308] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider shadow-lg shadow-yellow-500/20 transition-all cursor-pointer"
          >
            Reserve Ride
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-semibold text-[#ca8a04] mb-6 backdrop-blur-md"
        >
          <Crown size={14} />
          <span>FIRST-CLASS EXECUTIVE CHAUFFEUR MOBILITY</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-[1.08] mb-6"
        >
          <EditableField
            value={data.hero?.title || "Your Chauffeur Awaits."}
            onChange={(val) => updateData(['hero', 'title'], val)}
            className="text-white"
          />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-white/60 max-w-3xl mb-12 leading-relaxed"
        >
          <EditableField
            value={data.hero?.subtitle || "First-class global mobility engineered for C-suite leaders. Guaranteed fixed rates, flight radar telemetry, and pristine European luxury fleet in 500+ cities."}
            onChange={(val) => updateData(['hero', 'subtitle'], val)}
            multiline
          />
        </motion.p>

        {/* INTERACTIVE BOOKING WIDGET */}
        <motion.div 
          id="booking"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-4xl bg-[#0e1018]/90 border border-white/[0.12] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative z-20 mb-20 text-left"
        >
          {/* Tab Selector */}
          <div className="flex items-center gap-3 mb-6 border-b border-white/[0.08] pb-4">
            <button 
              onClick={() => setActiveTab('oneway')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'oneway' 
                  ? 'bg-gradient-to-r from-[#ca8a04] to-[#eab308] text-black shadow-lg shadow-yellow-500/20' 
                  : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              One-Way Transfer
            </button>
            <button 
              onClick={() => setActiveTab('hourly')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'hourly' 
                  ? 'bg-gradient-to-r from-[#ca8a04] to-[#eab308] text-black shadow-lg shadow-yellow-500/20' 
                  : 'bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              By The Hour
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-black/50 border border-white/[0.08] rounded-2xl p-3.5 focus-within:border-[#ca8a04] transition-all">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5 mb-1">
                <MapPin size={12} className="text-[#ca8a04]" /> Pickup Location / Airport Code
              </label>
              <input 
                type="text" 
                defaultValue="Frankfurt Airport (FRA) Terminal 1" 
                className="w-full bg-transparent border-none text-white text-sm font-medium outline-none"
              />
            </div>

            <div className="bg-black/50 border border-white/[0.08] rounded-2xl p-3.5 focus-within:border-[#ca8a04] transition-all">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5 mb-1">
                <Compass size={12} className="text-[#ca8a04]" /> Destination / Hotel
              </label>
              <input 
                type="text" 
                defaultValue="Steigenberger Frankfurter Hof" 
                className="w-full bg-transparent border-none text-white text-sm font-medium outline-none"
              />
            </div>

            <div className="bg-black/50 border border-white/[0.08] rounded-2xl p-3.5 focus-within:border-[#ca8a04] transition-all">
              <label className="text-[10px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-1.5 mb-1">
                <Calendar size={12} className="text-[#ca8a04]" /> Date & Wheels-Down Time
              </label>
              <input 
                type="text" 
                defaultValue="Today, 18:30 CET" 
                className="w-full bg-transparent border-none text-white text-sm font-medium outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 size={14} /> Fixed Price Guarantee
              </span>
              <span>•</span>
              <span>Tolls & Meet & Greet Included</span>
            </div>
            <button 
              onClick={() => alert("Chauffeur Search Initiated! Connected to Global Flight Telemetry.")}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#ca8a04] to-[#eab308] hover:brightness-110 text-black font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-yellow-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Search Chauffeurs</span>
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 3D INTERACTIVE CAR SHOWROOM STAGE */}
      <section id="3d-showroom" className="relative py-16 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="bg-[#0b0d14] border border-white/[0.1] rounded-[36px] p-8 lg:p-12 relative overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.9)]">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-8 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 uppercase tracking-widest mb-3">
                <Sparkles size={12} /> Interactive 3D WebGL Showroom
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Inspect The Fleet in 360° Real-Time 3D
              </h2>
              <p className="text-white/60 text-sm mt-2 max-w-xl">
                Drag to rotate the 3D model in full 360 degrees. Zoom in to inspect luxury obsidian finishes and aerodynamic European contours.
              </p>
            </div>

            {/* Car Switcher Pills */}
            <div className="flex items-center gap-2 bg-black/60 border border-white/10 p-1.5 rounded-2xl backdrop-blur-lg">
              <button 
                onClick={() => setActiveCarModel('audi')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCarModel === 'audi' 
                    ? 'bg-[#ca8a04] text-black shadow-lg' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Audi A7 Luxury
              </button>
              <button 
                onClick={() => setActiveCarModel('tesla')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCarModel === 'tesla' 
                    ? 'bg-[#ca8a04] text-black shadow-lg' 
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Tesla Model S Plaid
              </button>
            </div>
          </div>

          {/* 3D Canvas Viewport */}
          <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl bg-gradient-to-b from-[#121524] to-[#08090e] border border-white/[0.06] overflow-hidden flex items-center justify-center">
            
            {carLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#07080c]/80 backdrop-blur-sm gap-3">
                <RotateCw className="w-8 h-8 text-[#ca8a04] animate-spin" />
                <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
                  Loading 3D WebGL Vehicle Model...
                </span>
              </div>
            )}

            <div ref={canvasContainerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] text-white/50">
              <Eye size={12} className="text-blue-400" />
              <span>360° Orbit Active • Touch & Drag</span>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO FLIGHT TELEMETRY & FEATURES */}
      <section id="telemetry" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-bold text-[#ca8a04] uppercase tracking-widest mb-4">
            <Plane size={14} /> FLIGHT TELEMETRY & VIP ASSURANCE
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            <EditableField
              value={data.about?.heading || "Unrivalled Global Precision & Discretion"}
              onChange={(val) => updateData(['about', 'heading'], val)}
            />
          </h2>
          <p className="text-white/60 text-base sm:text-lg mt-4 leading-relaxed">
            <EditableField
              value={data.about?.description || "Blacklane delivers a seamless global standard of executive transit. From Frankfurt to New York, London, and Tokyo, our licensed chauffeurs ensure absolute punctuality, quiet mobile workspace acoustics, and personalized terminal meet & greet."}
              onChange={(val) => updateData(['about', 'description'], val)}
              multiline
            />
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bentoItems.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6 }}
              className="p-8 rounded-3xl bg-[#0c0e18] border border-white/[0.08] hover:border-[#ca8a04]/40 transition-all flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-2xl mb-6">
                  {item.icon || "⚡"}
                </div>
                <span className="text-[10px] font-mono text-[#ca8a04] uppercase tracking-widest font-bold">
                  {item.tag || "Protocol"}
                </span>
                <h3 className="text-xl font-bold text-white mt-1 mb-3">
                  {item.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-white/40 font-mono">Standard</span>
                <span className="text-white font-bold text-sm text-[#ca8a04]">{item.metric || "Verified"}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FLEET TIERS & PRICING */}
      <section id="fleet" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-bold text-[#ca8a04] uppercase tracking-widest mb-3">
              <Car size={14} /> EUROPEAN EXECUTIVE FLEET
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Pristine Fleet Tiers
            </h2>
          </div>
          <p className="text-white/60 text-sm max-w-md">
            Every vehicle is thoroughly detailed, climate controlled, and stocked with chilled mineral water and high-speed mobile Wi-Fi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fleetItems.map((fleet, idx) => (
            <div 
              key={idx}
              className={`rounded-3xl border p-7 flex flex-col justify-between transition-all ${
                selectedFleet === idx 
                  ? 'bg-gradient-to-b from-[#181a28] to-[#0d0f18] border-[#ca8a04] shadow-[0_10px_40px_rgba(202,138,4,0.15)]' 
                  : 'bg-[#0c0e18] border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{fleet.icon || "🚗"}</span>
                  <span className="px-3 py-1 rounded-full bg-white/[0.06] text-xs font-bold text-[#ca8a04]">
                    <EditableField
                      value={fleet.price || "$195 Fixed"}
                      onChange={(val) => updateData(['items', idx.toString(), 'price'], val)}
                    />
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  <EditableField
                    value={fleet.title}
                    onChange={(val) => updateData(['items', idx.toString(), 'title'], val)}
                  />
                </h3>

                <p className="text-white/60 text-xs leading-relaxed mb-6">
                  <EditableField
                    value={fleet.description}
                    onChange={(val) => updateData(['items', idx.toString(), 'description'], val)}
                    multiline
                  />
                </p>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-white/50 border-t border-white/[0.08] pt-4 mb-6">
                  <div>👥 {(fleet as any).passengers || "3 Guests"}</div>
                  <div>🧳 {(fleet as any).luggage || "2 Bags"}</div>
                </div>

                <button 
                  onClick={() => setSelectedFleet(idx)}
                  className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    selectedFleet === idx 
                      ? 'bg-[#ca8a04] text-black shadow-md' 
                      : 'bg-white/[0.06] hover:bg-white/[0.12] text-white'
                  }`}
                >
                  {selectedFleet === idx ? 'Selected Tier ✓' : 'Select Fleet'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT TESTIMONIALS */}
      <section id="testimonials" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs font-bold text-[#ca8a04] uppercase tracking-widest mb-3">
            <Star size={14} className="fill-[#ca8a04]" /> EXECUTIVE ENDORSEMENTS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Trusted by Global C-Suite Executives
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(data.testimonials || []).map((t, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-[#0c0e18] border border-white/[0.08] flex flex-col justify-between">
              <div className="flex gap-1 text-[#ca8a04] mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#ca8a04]" />
                ))}
              </div>
              <p className="text-white/80 text-sm italic leading-relaxed mb-6">
                "{t.quote}"
              </p>
              <div className="border-t border-white/[0.06] pt-4">
                <div className="font-bold text-white text-sm">{t.author}</div>
                <div className="text-white/40 text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6 lg:px-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-white text-center mb-12">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {(data.faqs || []).map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0c0e18] border border-white/[0.08]">
              <h3 className="font-bold text-white text-base mb-2">{faq.question}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.08] bg-black/40 py-12 px-6 lg:px-12 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/50">
        <div>© 2026 Blacklane Executive Mobility. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Chauffeur Transit</a>
          <a href="#" className="hover:text-white">Global Dispatch Radar</a>
        </div>
      </footer>
    </div>
  );
};
