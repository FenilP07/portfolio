import { useRef } from "react";
import { useThreeJsScene } from "./Hero/hooks/useThreeJsScene";
import { useHeroAnimations } from "./Hero/hooks/useHeroAnimations";
import { BackgroundLayers } from "./Hero/BackgroundLayers";
import { HeroTitle } from "./Hero/HeroTitle";
import { HeroSubtitle } from "./Hero/HeroSubtitle";
import { CTASection } from "./Hero/CTASection";
import { TechStack } from "./Hero/TechStack";
import { ScrollIndicator } from "./Hero/ScrollIndicator";
import AmbientLightOrbs from "./Hero/AmbientlightOrbs";
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
      className="relative flex items-center justify-center overflow-hidden text-center px-4 sm:px-6"
      style={{
        height: "100vh",
        minHeight: "100dvh",
        maxHeight: "100vh",
      }}
    >
      {/* <AmbientLightOrbs /> */}
      <BackgroundLayers refs={bgRefs} />
      <AnimatedGridOverlay />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        style={{ pointerEvents: "none" }}
      />
      <div
        className="relative z-10 w-full max-w-3xl mx-auto px-6 py-10
                rounded-2xl backdrop-blur-md
                bg-white/5 border border-white/10
                shadow-[0_0_60px_rgba(0,0,0,0.1)]
                space-y-6"
      >
        <HeroTitle titleRef={titleRef} />
        <HeroSubtitle subtitleRef={subtitleRef} />
        <CTASection ctaRef={ctaRef} />
        {/* <TechStack /> */}
      </div>

      <ScrollIndicator />
    </section>
  );
};

export default Hero;
