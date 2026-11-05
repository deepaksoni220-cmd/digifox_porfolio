import { motion, useScroll, type HTMLMotionProps } from "framer-motion";
import React from "react";
import { cn } from "../../lib/utils";

export interface ScrollProgressProps
  extends Omit<HTMLMotionProps<"div">, "ref"> {
  container?: React.RefObject<HTMLElement | null>;
}

export const ScrollProgress = React.forwardRef<
  HTMLDivElement,
  ScrollProgressProps
>(({ className, container, ...props }, ref) => {
  const { scrollYProgress } = useScroll(
    container ? { container } : undefined
  );

  return (
    <motion.div
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-[#3b82f6] via-[#6366f1] to-[#a855f7]",
        className
      )}
      style={{
        scaleX: scrollYProgress,
      }}
      {...props}
    />
  );
});

ScrollProgress.displayName = "ScrollProgress";

export default ScrollProgress;
