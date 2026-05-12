import { useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgBackground from "../../imports/MacBookPro164-1/744304efce34358975b6a2838dc4c5ff6485daa4.png";

interface StarPlacementScreenProps {
  onContinue: () => void;
}

export function StarPlacementScreen({ onContinue }: StarPlacementScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onContinue();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative size-full overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#2e1a1d]">
        <ImageWithFallback
          src={imgBackground}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center size-full px-8">
        {/* User's star */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="relative mb-32"
        >
          {/* Outer glow */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
            style={{
              background:
                "radial-gradient(circle, rgba(247, 197, 173, 0.4) 0%, rgba(247, 197, 173, 0) 70%)",
              filter: "blur(20px)",
            }}
          />

          {/* 8-pointed compass star */}
          <motion.svg
            animate={{
              filter: [
                "drop-shadow(0 0 20px rgba(247, 197, 173, 0.6))",
                "drop-shadow(0 0 35px rgba(247, 197, 173, 0.9))",
                "drop-shadow(0 0 20px rgba(247, 197, 173, 0.6))",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            width="80"
            height="80"
            viewBox="0 0 200 200"
            fill="none"
            className="relative z-10"
          >
            <defs>
              <linearGradient
                id="starGradientPlacement"
                x1="100"
                y1="0"
                x2="100"
                y2="200"
              >
                <stop offset="0%" stopColor="#F7E7CE" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#F7C5AD" stopOpacity="1" />
                <stop offset="100%" stopColor="#F7E7CE" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* 8-pointed compass star: thinner points with smaller, rounded center */}
            <path
              d="M 100 10 L 106 88 L 142.4 57.6 L 112 94 L 190 100 L 112 106 L 142.4 142.4 L 106 112 L 100 190 L 94 112 L 57.6 142.4 L 88 106 L 10 100 L 88 94 L 57.6 57.6 L 94 88 Z"
              fill="url(#starGradientPlacement)"
              opacity="0.95"
            />
          </motion.svg>
        </motion.div>

        {/* Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          className="text-[#f7e7ce] text-center"
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(24px, 4vw, 48px)",
            fontVariationSettings: "'SOFT' 0, 'WONK' 1",
          }}
        >
          Your light is here
        </motion.p>
      </div>
    </motion.div>
  );
}
