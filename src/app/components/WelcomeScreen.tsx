import { motion } from "motion/react";

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
      {/* Content */}
<div className="flex flex-col items-center justify-center size-full px-8 pt-4 pb-6">
  <div className="flex flex-col items-center mb-10">
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
    className="self-center bg-[#f7e7ce] text-[#5a3437] rounded-full px-12 py-4 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(247,231,206,0.3)]"
    style={{
      fontFamily: "Public Sans, sans-serif",
      fontSize: "clamp(24px, 3vw, 32px)",
      fontWeight: "normal",
    }}
  >
    Step Inside
  </motion.button>

  <div className="mt-8">
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
