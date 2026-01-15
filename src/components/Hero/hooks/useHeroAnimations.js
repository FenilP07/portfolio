import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HERO_CONFIG } from "../constants/heroConfig";

gsap.registerPlugin(ScrollTrigger);

export const useHeroAnimations = (refs) => {
  const { containerRef, titleRef, subtitleRef, ctaRef, bgRefs } = refs;

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: () => {
        gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
          clearProps: "all",
        });
      },
    });

    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 1,
    });

    tl.from(titleRef.current.children, {
      y: 100,
      opacity: 0,
      duration: HERO_CONFIG.animation.duration.title,
      stagger: HERO_CONFIG.animation.stagger.title,
      ease: "power4.out",
    })
      .from(
        subtitleRef.current,
        {
          y: 60,
          opacity: 0,
          duration: HERO_CONFIG.animation.duration.subtitle,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .from(
        ctaRef.current.children,
        {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: HERO_CONFIG.animation.duration.cta,
          stagger: HERO_CONFIG.animation.stagger.cta,
          ease: "back.out(1.4)",
        },
        "-=0.6"
      );

    // Parallax scrolling
    Object.entries(bgRefs).forEach(([key, ref]) => {
      const yPercent = HERO_CONFIG.parallax[key];
      gsap.to(ref.current, {
        yPercent,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, [refs]);
};
