import { motion } from "motion/react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgBackground from "../../imports/MacBookPro169/74ab02cc8af099874d86d4822223316b07b0658d.png";

interface ExitScreenProps {
  onBackToHome: () => void;
}

export function ExitScreen({ onBackToHome }: ExitScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
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
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          className="text-[#f7e7ce] text-center max-w-[1571px] px-4"
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(24px, 4vw, 48px)",
            lineHeight: "1.2",
            fontVariationSettings: "'SOFT' 0, 'WONK' 1",
          }}
        >
          Thank you for being a quiet presence
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          className="text-[#f7e7ce] text-center mt-8 mb-8 px-4"
          style={{
            fontFamily: "Public Sans, sans-serif",
            fontSize: "clamp(14px, 2vw, 18px)",
            opacity: 0.7,
          }}
        >
          The space remains, whenever you wish to return
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
          onClick={onBackToHome}
          className="text-[#f7e7ce] px-8 py-3 lg:px-12 lg:py-4 rounded-full border-2 border-[#f7e7ce] hover:bg-[#f7e7ce] hover:text-[#2e1a1d] transition-all duration-300"
          style={{
            fontFamily: "Public Sans, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 24px)",
          }}
        >
          Return to Welcome
        </motion.button>
      </div>
    </motion.div>
  );
}
