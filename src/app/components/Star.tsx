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
  showPresenceLabel?: boolean;
  isAcknowledged?: boolean;
}

export function Star({
  x,
  y,
  size,
  brightness,
  color,
  onClick,
  showExampleLabel = false,
  showPresenceLabel = false,
  isAcknowledged = false,
}: StarProps) {
  
  const [isHovered, setIsHovered] = useState(false);

  const baseOpacity = brightness * 0.7;
  const glowSize = showPresenceLabel ? size * 4.5 : size * 10;

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

  const starPointBoxShadow = isAcknowledged
  ? `0 0 ${size * 8}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1), 0 0 ${size * 16}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.55)`
  : showPresenceLabel
    ? `0 0 ${size * 6}px rgba(247, 231, 206, 0.95), 0 0 ${size * 12}px rgba(247, 197, 173, 0.55), 0 0 ${size * 20}px rgba(247, 231, 206, 0.75)`
    : isHovered
      ? `0 0 ${size * 3}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.85)`
      : `0 0 ${size * 2.2}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.65)`;

  const starPointFilter = showPresenceLabel
  ? `drop-shadow(0 0 ${size * 1.8}px rgba(247, 231, 206, 0.95)) drop-shadow(0 0 ${size * 3.6}px rgba(247, 197, 173, 0.55))`
  : "none";

  return (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{
      opacity: 1,
      scale: 1,
    }}
    transition={{
      duration: 1.2,
      delay: Math.random() * 1.5,
      ease: "easeOut",
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
            opacity: isAcknowledged
              ? [0.28, 0.75, 0.45, 0.28]
              : isHovered
                ? 0.45
                : 0.28,
            scale: isAcknowledged
              ? [1, 2.4, 1.7, 1]
              : isHovered
                ? 1.5
                : 1,
          }}
          transition={
            isAcknowledged
              ? { duration: 2.2, ease: "easeInOut" }
              : { duration: 0.6, ease: "easeOut" }
          }
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: showPresenceLabel ? `${size * 8}px` : `${glowSize}px`,
            height: showPresenceLabel ? `${size * 8}px` : `${glowSize}px`,
            background: showPresenceLabel
              ? "transparent"
              : `radial-gradient(circle, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.6) 0%, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0) 70%)`,
          }}
        />

      {/* Star point */}
        <motion.div
          animate={{
            scale: isAcknowledged
              ? [1, 2.5, 1.6, 1]
              : isHovered
                ? 1.3
                : 1,
          }}
          transition={
            isAcknowledged
              ? { duration: 2.2, ease: "easeInOut" }
              : { duration: 0.4, ease: "easeOut" }
          }

        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius: "50%",
          opacity: isAcknowledged ? 1 : 0.95,
          boxShadow: starPointBoxShadow,
          filter: starPointFilter,
        }}
        />

            {/* Hover tooltip */}
      {isHovered && showPresenceLabel && (
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
