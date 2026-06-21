import React from 'react';
import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  as?: React.ElementType;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = "",
  as = "div"
}) => {
  // @ts-ignore - motion.create exists in newer framer-motion but might not be fully typed if using older types
  const MotionComponent = motion.create ? motion.create(as as any) : (motion as any)[as] || motion.div;

  const hasWidth = /(\bw-\S+|\b!w-\S+)/.test(className);

  return (
    <MotionComponent
      className={hasWidth ? className : `w-full ${className}`}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionComponent>
  );
};
