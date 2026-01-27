import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export const Card3D = ({ 
  children, 
  className,
  glowColor = 'var(--primary)',
  intensity = 15 
}: Card3DProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -intensity;
    const rotateYValue = (mouseX / (rect.width / 2)) * intensity;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative perspective-1000 preserve-3d cursor-pointer',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 blur-2xl -z-10"
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        style={{ background: `hsl(${glowColor})` }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Card Content */}
      <div className="glass-card p-6 lg:p-8 rounded-2xl h-full">
        {children}
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        initial={false}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(
              ${105 + rotateY}deg,
              transparent 40%,
              rgba(255, 255, 255, 0.1) 50%,
              transparent 60%
            )`,
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};
