import { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star } from "./Star";
import { PresenceOverlay } from "./PresenceOverlay";
import { supabase } from "../../lib/supabaseClient";

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
  isSelf?: boolean;
}

interface PresenceStarData extends StarData {
  isSelf?: boolean;
}

interface PresencePayload {
  sessionId: string;
  x: number;
  y: number;
  size: number;
  brightness: number;
  color: string;
}
interface QuietLightPayload {
  targetSessionId: string;
  sentAt: number;
}

function mapPresenceStateToStars(
  state: Record<string, PresencePayload[]>,
  currentSessionId: string
): PresenceStarData[] {
  return Object.values(state)
    .flat()
    .filter((presence) => presence?.sessionId)
    .map((presence) => ({
      id: presence.sessionId,
      x: presence.x,
      y: presence.y,
      size: presence.size,
      brightness: presence.brightness,
      color: presence.color,
      isSelf: presence.sessionId === currentSessionId,
    }));
}

const QUIET_LIGHT_EVENT = "quiet-light";

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

const colorPalette = [
  "#B76E79",
  "#C6A4A4",
  "#DEA193",
  "#F7C5AD",
  "#F7E7CE",
];

function createSessionId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function createSeededNumber(seed: string, offset: number) {
  let hash = 0;

  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash << 5) - hash + seed.charCodeAt(i) + offset;
    hash |= 0;
  }

  return Math.abs(Math.sin(hash) * 10000) % 1;
}

function createStarForSession(sessionId: string): PresencePayload {
  const xSeed = createSeededNumber(sessionId, 1);
  const ySeed = createSeededNumber(sessionId, 2);
  const sizeSeed = createSeededNumber(sessionId, 3);
  const brightnessSeed = createSeededNumber(sessionId, 4);
  const colorSeed = createSeededNumber(sessionId, 5);

  let x = xSeed * 94 + 3;
  let y = ySeed * 84 + 6;

  const inCenterProtectedZone = x >= 35 && x <= 65 && y >= 25 && y <= 55;
  const inBottomProtectedZone = y >= 78;

  if (inCenterProtectedZone) {
    x = x < 50 ? x - 18 : x + 18;
    y = y < 40 ? y - 10 : y + 10;
  }

  if (inBottomProtectedZone) {
    y = 72;
  }

  const size = sizeSeed * 4 + 2.5;
  const brightness = brightnessSeed * 0.4 + 0.6;
  const colorIndex = Math.floor(colorSeed * colorPalette.length);

  return {
    sessionId,
    x: Math.max(3, Math.min(97, x)),
    y: Math.max(6, Math.min(76, y)),
    size,
    brightness,
    color: colorPalette[colorIndex],
  };
}

export function ConstellationView({
  isUserVisible,
  onLeave,
}: ConstellationViewProps) {
  const [stars, setStars] = useState<StarData[]>([]);
  const [presenceStars, setPresenceStars] = useState<PresenceStarData[]>([]);
  const [showHint, setShowHint] = useState(true);
  const [showPresenceOverlay, setShowPresenceOverlay] = useState(false);
  const [selectedPresenceStar, setSelectedPresenceStar] =
    useState<PresenceStarData | null>(null);
  const [isUserStarGlowing, setIsUserStarGlowing] = useState(false);
  const [isCloserView, setIsCloserView] = useState(false);
  const [currentAffirmation, setCurrentAffirmation] = useState<string | null>(null);
  const [hasShownAffirmation, setHasShownAffirmation] = useState(false);
  const [showExampleLabel, setShowExampleLabel] = useState(false);
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const sessionId = useMemo(() => createSessionId(), []);
  const userStar = useMemo(() => createStarForSession(sessionId), [sessionId]);

  const triggerUserStarGlow = () => {
  setIsUserStarGlowing(true);

  window.setTimeout(() => {
    setIsUserStarGlowing(false);
  }, 2400);
};

const handleSendQuietAcknowledgement = async (targetSessionId: string) => {
  if (!channelRef.current) return;

  await channelRef.current.send({
    type: "broadcast",
    event: QUIET_LIGHT_EVENT,
    payload: {
      targetSessionId,
      sentAt: Date.now(),
    } satisfies QuietLightPayload,
  });
};

  useEffect(() => {
  // Color palette from darkest to brightest for atmospheric depth
  const colorPalette = [
    "#B76E79", // darkest - smallest stars
    "#C6A4A4",
    "#DEA193",
    "#F7C5AD",
    "#F7E7CE", // brightest - largest stars
  ];

  // Generate decorative atmosphere stars
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
      colorIndex = 0;
    } else if (normalized < 0.4) {
      colorIndex = 1;
    } else if (normalized < 0.6) {
      colorIndex = 2;
    } else if (normalized < 0.8) {
      colorIndex = 3;
    } else {
      colorIndex = 4;
    }

    generatedStars.push({
      id: `star-${i}`,
      x: Math.random() * 94 + 3,
      y: Math.random() * 92 + 4,
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

  useEffect(() => {
  const channel = supabase.channel("quiet-gathering-presence", {
    config: {
      presence: {
        key: sessionId,
      },
    },
  });

  channelRef.current = channel;

  const updatePresenceStars = () => {
    const presenceState = channel.presenceState() as Record<
      string,
      PresencePayload[]
    >;

    setPresenceStars(mapPresenceStateToStars(presenceState, sessionId));
  };

  channel
  .on("presence", { event: "sync" }, updatePresenceStars)
  .on("presence", { event: "join" }, updatePresenceStars)
  .on("presence", { event: "leave" }, updatePresenceStars)
  .on("broadcast", { event: QUIET_LIGHT_EVENT }, ({ payload }) => {
  const quietLightPayload = payload as QuietLightPayload;

  if (!quietLightPayload?.targetSessionId) return;

  if (quietLightPayload.targetSessionId === sessionId) {
    triggerUserStarGlow();
  }
})
  .subscribe(async (status) => {
      if (status === "SUBSCRIBED" && isUserVisible) {
        await channel.track(userStar);
      }
    });

  return () => {
  channel.untrack();
  supabase.removeChannel(channel);
  channelRef.current = null;
};
}, [isUserVisible, sessionId, userStar]);
  

  useEffect(() => {
    if (hasShownAffirmation) return;

    const affirmationTimer = setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * affirmationMessages.length);

      setCurrentAffirmation(affirmationMessages[randomIndex]);
      setHasShownAffirmation(true);

      setTimeout(() => {
        setCurrentAffirmation(null);
      }, 8000);
    }, 5 * 60 * 1000);

    return () => clearTimeout(affirmationTimer);
  }, [hasShownAffirmation]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="qg-constellation-screen relative w-full overflow-hidden"
    >

      {/* Decorative atmosphere stars */}
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
            const exampleStar = stars.find(
              (s) => s.y >= 25 && s.y <= 45 && s.x >= 35 && s.x <= 65
            );

            const showLabel = exampleStar?.id === star.id && showExampleLabel;

            return (
              <Star
                key={star.id}
                x={star.x}
                y={star.y}
                size={star.size}
                brightness={star.brightness}
                color={star.color}
                showExampleLabel={showLabel}
                showPresenceLabel={false}
              />
            );
          })}
      </motion.div>

      {/* Active anonymous visitor stars */}
        <motion.div
          animate={{
            scale: isCloserView ? 1.5 : 1,
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-10"
        >
        {presenceStars
        .filter((star) => !star.isSelf)
        .filter((_, index) => !isCloserView || index % 2 === 0)
        .map((star) => (
    <Star
      key={star.id}
      x={star.x}
      y={star.y}
      size={star.size + 5}
      brightness={1}
      color="#F7E7CE"
      showExampleLabel={false}
      showPresenceLabel={true}
      onClick={() => {
        setSelectedPresenceStar(star);
        setShowPresenceOverlay(true);
      }}
    />
  ))}

</motion.div>

{/* User's private star - only visible to this user */}
{isUserVisible && (
  <motion.div
    key={isUserStarGlowing ? "user-star-glowing" : "user-star-resting"}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: 1,
      scale: isUserStarGlowing
        ? [isCloserView ? 1.6 : 1, isCloserView ? 2.15 : 1.35, isCloserView ? 1.75 : 1.12]
        : isCloserView
          ? 1.6
          : 1,
    }}
    transition={{
      duration: isUserStarGlowing ? 2.4 : 1.5,
      ease: "easeInOut",
    }}
    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
    style={{
      left: `${userStar.x}%`,
      top: `${userStar.y}%`,
    }}
  >
    <div className="relative flex items-center justify-center">
      {/* Outer glow */}
      <motion.div
        animate={{
          opacity: isUserStarGlowing
            ? [0.35, 0.95, 0.55, 0.35]
            : [0.3, 0.6, 0.3],
          scale: isUserStarGlowing
            ? [1, 1.9, 1.35, 1]
            : [1, 1.2, 1],
        }}
        transition={{
          duration: isUserStarGlowing ? 2.4 : 3,
          repeat: isUserStarGlowing ? 0 : Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32"
        style={{
          background:
            "radial-gradient(circle, rgba(247, 197, 173, 0.62) 0%, rgba(247, 231, 206, 0.34) 34%, rgba(247, 197, 173, 0) 72%)",
          filter: isUserStarGlowing ? "blur(16px)" : "blur(20px)",
        }}
      />

      {/* 8-pointed compass star */}
      <motion.svg
        animate={{
          scale: isUserStarGlowing ? [1, 1.22, 1.08, 1] : 1,
          filter: isUserStarGlowing
            ? [
                "drop-shadow(0 0 24px rgba(247, 197, 173, 0.75))",
                "drop-shadow(0 0 58px rgba(247, 231, 206, 1))",
                "drop-shadow(0 0 38px rgba(247, 197, 173, 0.9))",
                "drop-shadow(0 0 24px rgba(247, 197, 173, 0.75))",
              ]
            : [
                "drop-shadow(0 0 20px rgba(247, 197, 173, 0.6))",
                "drop-shadow(0 0 35px rgba(247, 197, 173, 0.9))",
                "drop-shadow(0 0 20px rgba(247, 197, 173, 0.6))",
              ],
        }}
        transition={{
          duration: isUserStarGlowing ? 2.4 : 3,
          repeat: isUserStarGlowing ? 0 : Infinity,
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
            id="userStarGradient"
            x1="100"
            y1="0"
            x2="100"
            y2="200"
          >
            <stop offset="0%" stopColor="#F7E7CE" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F7C5AD" stopOpacity="1" />
            <stop offset="100%" stopColor="#F7E7CE" stopOpacity="0.85" />
          </linearGradient>
        </defs>

        <path
          d="M 100 10 L 106 88 L 142.4 57.6 L 112 94 L 190 100 L 112 106 L 142.4 142.4 L 106 112 L 100 190 L 94 112 L 57.6 142.4 L 88 106 L 10 100 L 88 94 L 57.6 57.6 L 94 88 Z"
          fill="url(#userStarGradient)"
          opacity={isUserStarGlowing ? 1 : 0.95}
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
        className="absolute bottom-6 lg:bottom-8 left-0 right-0 z-30 px-8 lg:px-16"
      >
        {/* Mobile layout */}
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
              Leave
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

        {/* Desktop layout */}
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
  {showPresenceOverlay && selectedPresenceStar && (
    <PresenceOverlay
      presenceId={selectedPresenceStar.id}
      onSendQuietAcknowledgement={handleSendQuietAcknowledgement}
      onClose={() => {
        setShowPresenceOverlay(false);
        setSelectedPresenceStar(null);
      }}
    />
  )}
</AnimatePresence>
    </motion.div>
  );
}