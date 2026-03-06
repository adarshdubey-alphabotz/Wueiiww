import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'div';
  strength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({ 
  children, className, strength = 0.35, as = 'button', ...props 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    setPos({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.5 }}
      className="inline-block"
    >
      {as === 'button' ? (
        <button className={className} {...props}>{children}</button>
      ) : (
        <div className={className}>{children}</div>
      )}
    </motion.div>
  );
};

export default MagneticButton;
