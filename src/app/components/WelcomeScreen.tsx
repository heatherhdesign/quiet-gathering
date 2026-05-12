import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgBackground from "../../imports/MacBookPro161/dfa5f8da6f5f9c8ad9fa8ff338272c56fea12ec5.png";

interface WelcomeScreenProps {
  onEnter: () => void;
  onLearnMore: () => void;
}

export function WelcomeScreen({ onEnter, onLearnMore }: WelcomeScreenProps) {
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
      <div className="relative z-10 flex flex-col items-center justify-between size-full px-8 py-20">
        <div className="flex-1" />

        <div className="flex flex-col items-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-[#f7e7ce] text-center max-w-[1836px]"
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: "clamp(48px, 8vw, 128px)",
              lineHeight: "1.2",
              fontVariationSettings: "'SOFT' 0, 'WONK' 1",
            }}
          >
            You're welcome here.
            <br />
            Join the quiet gathering.
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="text-[#f7e7ce] text-center mt-6"
            style={{
              fontFamily: "Public Sans, sans-serif",
              fontSize: "clamp(18px, 2.5vw, 28px)",
              opacity: 0.8,
            }}
          >
            You're welcome to just be. You’re not alone.
          </motion.h3>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          onClick={onEnter}
          className="bg-[#f7e7ce] text-[#5a3437] rounded-full px-12 py-4 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(247,231,206,0.3)]"
          style={{
            fontFamily: "Public Sans, sans-serif",
            fontSize: "clamp(24px, 3vw, 32px)",
            fontWeight: "normal",
          }}
        >
          Step Inside
        </motion.button>

        <div className="flex-1 flex items-end pb-8 pt-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ opacity: 0.7, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={onLearnMore}
            className="text-[#f7e7ce] border-b border-[#f7e7ce] pb-1"
            style={{
              fontFamily: "Public Sans, sans-serif",
              fontSize: "clamp(15px, 2.25vw, 27px)",
            }}
          >
            What is this space?
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
