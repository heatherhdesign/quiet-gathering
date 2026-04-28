import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface PresenceOverlayProps {
  onClose: () => void;
}

export function PresenceOverlay({ onClose }: PresenceOverlayProps) {
  const [stage, setStage] = useState<"acknowledge" | "received">("acknowledge");

  const handleAcknowledge = () => {
    setStage("received");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute inset-0 z-50"
    >
      {/* Blurred background with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 backdrop-blur-[18.6px]"
          style={{
            backgroundColor: "rgba(169, 138, 143, 0.21)",
          }}
        />
      </div>

      {/* Light ripple animation */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <radialGradient id="rippleGradient">
            <stop offset="0%" stopColor="#F7C5AD" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#F7C5AD" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#F7C5AD" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ripple circles */}
        <motion.circle
          cx="50%"
          cy="35%"
          r="0"
          fill="url(#rippleGradient)"
          initial={{ r: 0, opacity: 0 }}
          animate={{
            r: [0, 150, 300],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
        <motion.circle
          cx="50%"
          cy="35%"
          r="0"
          fill="url(#rippleGradient)"
          initial={{ r: 0, opacity: 0 }}
          animate={{
            r: [0, 150, 300],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: 1.5,
          }}
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 flex flex-col size-full">
        <AnimatePresence mode="wait">
          {stage === "acknowledge" && (
            <motion.div
              key="acknowledge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col size-full"
            >
              {/* Heading below the pulse */}
              <div className="flex-1 flex items-center justify-center pt-32">
                <h2
                  className="text-[#f7e7ce] px-4 text-center"
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "clamp(24px, 4vw, 48px)",
                    fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                  }}
                >
                  A presence near you
                </h2>
              </div>

              {/* Buttons at bottom */}
              <div className="pb-12 flex flex-col items-center gap-6">
                <button
                  onClick={handleAcknowledge}
                  className="text-[#f7e7ce] transition-all duration-300 hover:text-[#F7C5AD] px-4"
                  style={{
                    fontFamily: "Public Sans, sans-serif",
                    fontSize: "clamp(18px, 3vw, 24px)",
                  }}
                >
                  Send a quiet acknowledgement
                </button>

                <button
                  onClick={onClose}
                  className="text-[#f7e7ce] opacity-70 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    fontFamily: "Public Sans, sans-serif",
                    fontSize: "clamp(14px, 2vw, 16px)",
                  }}
                >
                  Return to Sky
                </button>
              </div>
            </motion.div>
          )}

          {stage === "received" && (
            <motion.div
              key="received"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col size-full"
            >
              {/* Heading below the pulse */}
              <div className="flex-1 flex items-center justify-center pt-32">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  className="text-[#f7e7ce] px-4 text-center"
                  style={{
                    fontFamily: "Fraunces, serif",
                    fontSize: "clamp(24px, 4vw, 48px)",
                    fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                  }}
                >
                  Your light was received
                </motion.h2>
              </div>

              {/* Button at bottom */}
              <div className="pb-12 flex flex-col items-center">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  onClick={onClose}
                  className="text-[#f7e7ce] transition-opacity duration-300"
                  style={{
                    fontFamily: "Public Sans, sans-serif",
                    fontSize: "clamp(14px, 2vw, 16px)",
                  }}
                >
                  Return to Sky
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
