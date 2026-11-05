import createGlobe, { type COBEOptions } from "cobe";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

const GLOBE_CONFIG: Omit<COBEOptions, "width" | "height"> = {
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.15, 0.2, 0.35],
  markerColor: [0.38, 0.65, 0.98],
  glowColor: [0.23, 0.51, 0.96],
  markers: [
    { location: [20.5937, 78.9629], size: 0.08 }, // India
    { location: [40.7128, -74.006], size: 0.07 }, // New York
    { location: [51.5074, -0.1278], size: 0.07 }, // London
    { location: [25.2048, 55.2708], size: 0.07 }, // Dubai
    { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
    { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
  ],
};

export interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
}

export function Globe({ className, config = {} }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const widthRef = useRef(0);

  const updatePointerInteraction = (clientX: number | null) => {
    if (clientX !== null) {
      pointerInteracting.current = clientX - pointerInteractionMovement.current;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing";
      }
    } else {
      pointerInteracting.current = null;
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grab";
      }
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
    }
  };

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();

    let animationFrameId: number;
    let globeInstance: ReturnType<typeof createGlobe> | null = null;

    if (canvasRef.current) {
      const initialWidth = (widthRef.current || 300) * 2;
      const mergedConfig: COBEOptions = {
        ...GLOBE_CONFIG,
        ...config,
        width: initialWidth,
        height: initialWidth,
      };

      globeInstance = createGlobe(canvasRef.current, mergedConfig);

      const renderLoop = () => {
        if (!pointerInteracting.current) {
          phiRef.current += 0.005;
        }
        if (globeInstance) {
          const currentSize = (widthRef.current || 300) * 2;
          globeInstance.update({
            phi: phiRef.current + pointerInteractionMovement.current / 200,
            width: currentSize,
            height: currentSize,
          });
        }
        animationFrameId = requestAnimationFrame(renderLoop);
      };

      animationFrameId = requestAnimationFrame(renderLoop);

      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1";
        }
      }, 50);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (globeInstance) {
        globeInstance.destroy();
      }
    };
  }, [config, onResize]);

  return (
    <div
      className={cn(
        "relative mx-auto flex w-full max-w-[600px] items-center justify-center aspect-square",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) => updatePointerInteraction(e.clientX)}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
        className="h-full w-full opacity-0 transition-opacity duration-700 [contain:layout_paint_size] cursor-grab"
      />
    </div>
  );
}

export default Globe;
