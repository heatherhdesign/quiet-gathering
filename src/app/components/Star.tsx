import { useState } from "react";
import { motion } from "motion/react";

interface StarProps {
  x: number;
  y: number;
  size: number;
  brightness: number;
  color: string;
  onClick?: () => void;
  showExampleLabel?: boolean;
}

export function Star({ x, y, size, brightness, color, onClick, showExampleLabel = false }: StarProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseOpacity = brightness * 0.7;
  const glowSize = size * 10;

  // Convert hex to rgb for gradient
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 247, g: 197, b: 173 };
  };

  const rgb = hexToRgb(color);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [baseOpacity * 0.7, baseOpacity, baseOpacity * 0.7],
        scale: 1
      }}
      transition={{
        duration: 2,
        delay: Math.random() * 2,
        ease: "easeOut",
        opacity: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }
      }}
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        cursor: onClick ? "pointer" : "default",
        padding: "20px",
        margin: "-20px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Glow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.5 : 0.2,
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: `${glowSize}px`,
          height: `${glowSize}px`,
          background: `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 70%)`,
          pointerEvents: "none",
        }}
      />

      {/* Star point */}
      <motion.div
        animate={{
          scale: isHovered ? 1.3 : 1,
          opacity: isHovered ? 1 : baseOpacity,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: color,
          borderRadius: "50%",
          boxShadow: isHovered
            ? `0 0 ${size * 3}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`
            : "none",
        }}
      />

      {/* Hover tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#f7e7ce] text-sm pointer-events-none"
          style={{
            fontFamily: "Public Sans, sans-serif",
          }}
        >
          A quiet presence
        </motion.div>
      )}

      {/* Example label (auto-shown once) */}
      {showExampleLabel && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.8, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[#f7e7ce] text-sm pointer-events-none"
          style={{
            fontFamily: "Public Sans, sans-serif",
          }}
        >
          A quiet presence
        </motion.div>
      )}
    </motion.div>
  );
}
