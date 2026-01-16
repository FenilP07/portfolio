import { useRef } from "react";
import { useThreeJsScene } from "./Hero/hooks/useThreeJsScene";
import { useHeroAnimations } from "./Hero/hooks/useHeroAnimations";
import { BackgroundLayers } from "./Hero/BackgroundLayers";
import { HeroTitle } from "./Hero/HeroTitle";
import { HeroSubtitle } from "./Hero/HeroSubtitle";
import { CTASection } from "./Hero/CTASection";
import AnimatedGridOverlay from "./Hero/AnimatedGridOverlay";

const Hero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const canvasRef = useRef(null);

  const bgRefs = {
    layer1: useRef(null),
    layer2: useRef(null),
    layer3: useRef(null),
  };

  useThreeJsScene(canvasRef);
  useHeroAnimations({
    containerRef,
    titleRef,
    subtitleRef,
    ctaRef,
    bgRefs,
  });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="
        relative flex items-center justify-center
        overflow-hidden text-center
        px-4 sm:px-6
      "
      style={{
        height: "100vh",
        minHeight: "100dvh",
        // 🎨 NEW: Ambient light that follows mouse
        background: `
          radial-gradient(
            800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(99, 102, 241, 0.15),
            transparent 40%
          ),
          linear-gradient(to bottom, #0f172a, #1e1b4b)
        `,
        // Initialize CSS variables
        "--mouse-x": "50%",
        "--mouse-y": "50%"
      }}
    >
      {/* Background */}
      <BackgroundLayers refs={bgRefs} />
      <AnimatedGridOverlay />

      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        style={{ pointerEvents: "none" }}
      />

      {/* Content */}
      <div
        className="
          relative z-10
          w-full max-w-4xl mx-auto
          flex flex-col items-center
          gap-6 sm:gap-8
        "
      >
        <HeroTitle titleRef={titleRef} />

        <HeroSubtitle subtitleRef={subtitleRef} />

        <CTASection ctaRef={ctaRef} />
      </div>
    </section>
  );
};

export default Hero;