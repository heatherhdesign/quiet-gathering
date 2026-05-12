import { useState } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgBackground from "../../imports/MacBookPro162-1/dfa5f8da6f5f9c8ad9fa8ff338272c56fea12ec5.png";

interface EntryScreenProps {
  onEnter: (isVisible: boolean) => void;
}

export function EntryScreen({ onEnter }: EntryScreenProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-[#f7e7ce] text-center mb-8 lg:mb-12 max-w-[1939px]"
          style={{
            fontFamily: "Fraunces, serif",
            fontVariationSettings: "'SOFT' 0, 'WONK' 1",
          }}
        >
          <p className="mb-6" style={{ fontSize: "clamp(48px, 8vw, 128px)", lineHeight: "1.2" }}>
            This is a shared sky.
          </p>
          <p
            className="mb-0"
            style={{
              fontSize: "clamp(18px, 3vw, 48px)",
              lineHeight: "1.15",
            }}
          >
            Here, you may observe quietly
            <br />and choose how visible you are.
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          onClick={() => onEnter(isVisible)}
          className="bg-[#f7e7ce] text-[#5a3437] rounded-full px-8 py-3 lg:px-12 lg:py-4 mb-6 lg:mb-8 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(247,231,206,0.3)]"
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(18px, 2.5vw, 32px)",
            fontWeight: "normal",
          }}
        >
          Enter Quietly
        </motion.button>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-3"
        >
          <button
            onClick={() => setIsVisible(!isVisible)}
            className="relative w-[56px] h-[30px] rounded-[15px] transition-all duration-300 hover:shadow-[0_0_20px_rgba(110,63,68,0.4)] flex-shrink-0"
            style={{
              backgroundColor: isVisible ? "#C6A4A4" : "#6e3f44",
            }}
          >
            <motion.div
              animate={{
                x: isVisible ? 16 : 0,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute left-0 top-0 bg-[#f7e7ce] w-[40px] h-[30px] rounded-[15px] shadow-lg"
            />
          </button>
          <p
            className="text-[#f7e7ce] text-[18px] leading-normal text-center"
            style={{
              fontFamily: "Public Sans, sans-serif",
            }}
          >
            Appear to others in the sky
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
