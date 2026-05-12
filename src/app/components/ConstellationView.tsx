import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "./Star";
import { PresenceOverlay } from "./PresenceOverlay";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import imgBackground from "../../imports/MacBookPro165/74ab02cc8af099874d86d4822223316b07b0658d.png";
import imgExit from "../../imports/MacBookPro165/aef579dd32303b01ce098ab84d0937d8eb439326.png";

interface ConstellationViewProps {
  isUserVisible: boolean;
  onLeave: () => void;
}

interface StarData {
  id: string;
  x: number;
  y: number;
  size: number;
  brightness: number;
  color: string;
}

const affirmationMessages = [
  "Nothing is asked of you.",
  "There is no expectation.",
  "You decide how visible you are.",
  "Staying silent is allowed.",
  "You don't have to explain yourself.",
  "You're not late.",
  "There is no timeline.",
  "This moment doesn't need fixing.",
  "This space will remain.",
  "You can stay as long as you like.",
];

export function ConstellationView({
  isUserVisible,
  onLeave,
}: ConstellationViewProps) {
  const [stars, setStars] = useState<StarData[]>([]);
  const [showHint, setShowHint] = useState(true);
  const [showPresenceOverlay, setShowPresenceOverlay] = useState(false);
  const [isCloserView, setIsCloserView] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState<string | null>(null);
  const [hasShownAffirmation, setHasShownAffirmation] = useState(false);
  const [showExampleLabel, setShowExampleLabel] = useState(false);

  useEffect(() => {
    // Color palette from darkest to brightest for atmospheric depth
    const colorPalette = [
      "#B76E79", // darkest - smallest stars
      "#C6A4A4",
      "#DEA193",
      "#F7C5AD",
      "#F7E7CE", // brightest - largest stars
    ];

    // Generate stars with varying sizes and colors
    const generatedStars: StarData[] = [];
    const starCount = 60;
    const minSize = 2.5;
    const maxSize = 6.5;

    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * (maxSize - minSize) + minSize;

      // Map size to color - smaller stars get darker colors
      const normalized = (size - minSize) / (maxSize - minSize);
      let colorIndex;

      if (normalized < 0.2) {
        colorIndex = 0; // #B76E79 - darkest
      } else if (normalized < 0.4) {
        colorIndex = 1; // #C6A4A4
      } else if (normalized < 0.6) {
        colorIndex = 2; // #DEA193
      } else if (normalized < 0.8) {
        colorIndex = 3; // #F7C5AD
      } else {
        colorIndex = 4; // #F7E7CE - brightest
      }

      generatedStars.push({
        id: `star-${i}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size,
        brightness: Math.random() * 0.4 + 0.6,
        color: colorPalette[colorIndex],
      });
    }

    setStars(generatedStars);

    // Hide hint after 8 seconds
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 8000);

    // Show example label after 1.5 seconds, then hide after 3 seconds
    const exampleLabelTimer = setTimeout(() => {
      setShowExampleLabel(true);
      setTimeout(() => {
        setShowExampleLabel(false);
      }, 3000);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(exampleLabelTimer);
    };
  }, []);

  // Affirmation timer - shows one random message after 5 minutes, only once per session
  useEffect(() => {
    if (hasShownAffirmation) return;

    const affirmationTimer = setTimeout(() => {
      // Pick a random message from the list
      const randomIndex = Math.floor(Math.random() * affirmationMessages.length);
      setCurrentAffirmation(affirmationMessages[randomIndex]);
      setHasShownAffirmation(true);

      // Auto-dismiss after 8 seconds with slow dissolve
      setTimeout(() => {
        setCurrentAffirmation(null);
      }, 8000);
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearTimeout(affirmationTimer);
  }, [hasShownAffirmation]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
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

      {/* Stars */}
      <motion.div
        animate={{
          scale: isCloserView ? 1.5 : 1,
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {stars
          .filter((_, index) => !isCloserView || index % 2 === 0)
          .map((star) => {
            // Find first star in the upper-middle area for the example label
            const isInUpperMiddle = star.y >= 25 && star.y <= 45 && star.x >= 35 && star.x <= 65;
            const exampleStar = stars.find(s => s.y >= 25 && s.y <= 45 && s.x >= 35 && s.x <= 65);
            const showLabel = exampleStar?.id === star.id && showExampleLabel;

            return (
              <Star
                key={star.id}
                x={star.x}
                y={star.y}
                size={star.size}
                brightness={star.brightness}
                color={star.color}
                onClick={() => setShowPresenceOverlay(true)}
                showExampleLabel={showLabel}
              />
            );
          })}
      </motion.div>

      {/* User's star (only if visible) */}
      {isUserVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: isCloserView ? 1.6 : 1
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 z-20"
        >
          <div className="relative flex items-center justify-center">
            {/* Outer glow */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
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
                duration: 3,
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
                  id="starGradient"
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
                fill="url(#starGradient)"
                opacity="0.95"
              />
            </motion.svg>
          </div>
        </motion.div>
      )}

      {/* Hint overlay */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <motion.p
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[#f7e7ce] text-center px-4"
              style={{
                fontFamily: "Public Sans, sans-serif",
                fontSize: "clamp(16px, 3vw, 32px)",
              }}
            >
              Move gently near a star to notice its light
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        className="absolute bottom-4 lg:bottom-8 left-0 right-0 px-8 lg:px-16"
      >
        {/* Mobile layout - stacked */}
        <div className="flex flex-col items-center gap-2 lg:hidden">
          <div className="flex justify-center items-center gap-16 mb-2">
            <AnimatePresence mode="wait">
              {!isCloserView ? (
                <motion.button
                  key="closer"
                  initial={{ opacity: 0.6 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  onClick={() => setIsCloserView(true)}
                  className="text-[#f7e7ce] opacity-60 hover:opacity-100 transition-opacity duration-300"
                  aria-label="Move a little closer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 11V6a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5" />
                    <path d="M6 11V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
                    <path d="M12 2v9" />
                    <path d="M8 11l4 4 4-4" />
                  </svg>
                </motion.button>
              ) : (
                <motion.button
                  key="return"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ opacity: 1, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setIsCloserView(false)}
                  className="text-[#f7e7ce] opacity-60"
                  style={{
                    fontFamily: "Public Sans, sans-serif",
                    fontSize: "12px",
                  }}
                >
                  Return to full sky
                </motion.button>
              )}
            </AnimatePresence>

            <button
              onClick={onLeave}
              className="text-[#f7e7ce] opacity-60 hover:opacity-100 transition-all duration-300"
              aria-label="Leave Constellation"
            >
              <ImageWithFallback src={imgExit} alt="" className="w-[20px] h-[26px]" />
            </button>
          </div>

          <p
            className="text-[#f7e7ce] opacity-60 cursor-default text-center"
            style={{
              fontFamily: "Public Sans, sans-serif",
              fontSize: "12px",
            }}
          >
            You are not required to engage
          </p>
        </div>

        {/* Desktop layout - horizontal */}
        <div className="hidden lg:flex justify-between items-center">
          <p
            className="text-[#f7e7ce] opacity-60 cursor-default"
            style={{
              fontFamily: "Public Sans, sans-serif",
              fontSize: "16px",
            }}
          >
            You are not required to engage
          </p>

          <AnimatePresence mode="wait">
            {!isCloserView ? (
              <motion.button
                key="closer"
                initial={{ opacity: 0.6 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ opacity: 1, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsCloserView(true)}
                className="text-[#f7e7ce] opacity-60"
                style={{
                  fontFamily: "Public Sans, sans-serif",
                  fontSize: "16px",
                }}
              >
                Move a little closer
              </motion.button>
            ) : (
              <motion.button
                key="return"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                whileHover={{ opacity: 1, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsCloserView(false)}
                className="text-[#f7e7ce] opacity-60"
                style={{
                  fontFamily: "Public Sans, sans-serif",
                  fontSize: "16px",
                }}
              >
                Return to full sky
              </motion.button>
            )}
          </AnimatePresence>

          <button
            onClick={onLeave}
            className="flex items-center gap-2 text-[#f7e7ce] opacity-60 hover:opacity-100 transition-all duration-300"
            style={{
              fontFamily: "Public Sans, sans-serif",
              fontSize: "16px",
            }}
          >
            Leave Constellation
            <ImageWithFallback src={imgExit} alt="" className="w-[20px] h-[26px]" />
          </button>
        </div>
      </motion.div>

      {/* Affirmation message */}
      <AnimatePresence>
        {currentAffirmation && (
          <motion.div
          initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -2, filter: "blur(2px)" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-30"
          >
            <motion.p
              className="text-[#f7e7ce] text-center max-w-2xl px-8"
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(32px, 4vw, 56px)",
                fontVariationSettings: "'SOFT' 0, 'WONK' 1",
                opacity: 0.9,
              }}
            >
              {currentAffirmation}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Presence overlay */}
      <AnimatePresence>
        {showPresenceOverlay && (
          <PresenceOverlay onClose={() => setShowPresenceOverlay(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
