import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { EntryScreen } from "./components/EntryScreen";
import { StarPlacementScreen } from "./components/StarPlacementScreen";
import { ConstellationView } from "./components/ConstellationView";
import { ExitScreen } from "./components/ExitScreen";

type Screen = "welcome" | "entry" | "placement" | "constellation" | "exit" | "info";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [isUserVisible, setIsUserVisible] = useState(false);

  const handleWelcomeEnter = () => {
    setCurrentScreen("entry");
  };

  const handleLearnMore = () => {
    setCurrentScreen("info");
  };

  const handleEntryConfirm = (visible: boolean) => {
    setIsUserVisible(visible);
    setCurrentScreen(visible ? "placement" : "constellation");
  };

  const handlePlacementContinue = () => {
    setCurrentScreen("constellation");
  };

  const handleLeave = () => {
    setCurrentScreen("exit");
  };

  const handleBackToHome = () => {
    setCurrentScreen("welcome");
    setIsUserVisible(false);
  };

  return (
    <div className="size-full overflow-hidden bg-[#2e1a1d]">
      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && (
          <WelcomeScreen
            key="welcome"
            onEnter={handleWelcomeEnter}
            onLearnMore={handleLearnMore}
          />
        )}
        {currentScreen === "entry" && (
          <EntryScreen key="entry" onEnter={handleEntryConfirm} />
        )}
        {currentScreen === "placement" && (
          <StarPlacementScreen
            key="placement"
            onContinue={handlePlacementContinue}
          />
        )}
        {currentScreen === "constellation" && (
          <ConstellationView
            key="constellation"
            isUserVisible={isUserVisible}
            onLeave={handleLeave}
          />
        )}
        {currentScreen === "exit" && (
          <ExitScreen key="exit" onBackToHome={handleBackToHome} />
        )}
        {currentScreen === "info" && (
          <InfoScreen key="info" onBack={() => setCurrentScreen("welcome")} />
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative size-full overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2e1a1d] to-[#4a2c30]" />
      <div className="relative z-10 max-w-3xl px-12 lg:px-24 text-center">
        <h2
          className="text-[#f7e7ce] mb-6 lg:mb-8"
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontVariationSettings: "'SOFT' 0, 'WONK' 1",
          }}
        >
          What Is The Quiet Gathering?
        </h2>
        <p
          className="text-[#f7e7ce] mb-4 lg:mb-6 leading-relaxed opacity-80"
          style={{
            fontFamily: "Public Sans, sans-serif",
            fontSize: "clamp(14px, 2.5vw, 18px)",
          }}
        >
          This is a quiet, trauma‑informed digital space created for gentle presence. Stars represent moments of visibility—you may observe without engaging, remain in the background, or move closer when and if it feels right.
        </p>
        <p
          className="text-[#f7e7ce] mb-4 lg:mb-6 leading-relaxed opacity-80"
          style={{
            fontFamily: "Public Sans, sans-serif",
            fontSize: "clamp(14px, 2.5vw, 18px)",
          }}
        >
          The sky is shared. It holds space with calm, softness, and care—making room for many experiences to exist at once.
        </p>
        <button
          onClick={onBack}
          className="text-[#f7e7ce] px-8 py-3 lg:px-10 lg:py-4 rounded-full border-2 border-[#f7e7ce] hover:bg-[#f7e7ce] hover:text-[#2e1a1d] transition-all duration-300"
          style={{
            fontFamily: "Public Sans, sans-serif",
            fontSize: "clamp(16px, 2.5vw, 20px)",
          }}
        >
          Return
        </button>
      </div>
    </div>
  );
}