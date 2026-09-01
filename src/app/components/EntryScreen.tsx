import { useState } from "react";
import { motion } from "motion/react";

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
      
{/* ✅ No background layer anymore */}

      {/* Content */}
      <div className="flex flex-col items-center justify-center size-full px-8 pt-4 pb-6">
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
          onClick={() => {
            document.body.classList.add("sky-entered");
            console.log("sky-entered added", document.body.className);
            onEnter(isVisible);
          }}
          className="self-center bg-[#f7e7ce] text-[#5a3437] rounded-full px-8 py-3 lg:px-12 lg:py-4 mb-6 lg:mb-8 transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(247,231,206,0.3)]"
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
  aria-label="Appear to others in the sky"
  className="qg-toggle relative w-[56px] h-[30px] rounded-full flex-shrink-0"
  style={{
    backgroundColor: "rgba(70,40,42,0.7)",
  }}
>
  
<motion.div
  animate={{ x: isVisible ? 26 : 0 }}
  transition={{ type: "spring", stiffness: 400, damping: 28 }}
  className="qg-toggle-knob"
  style={{
    position: "absolute",
    top: "3px",
    left: "3px",
    width: "24px",
    height: "24px",
    borderRadius: "999px",
    backgroundColor: "#f7e7ce",
    zIndex: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.35)"
  }}
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
