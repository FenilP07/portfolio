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

    // 🎨 ENHANCED: Title with 3D flip and subtle glitch
    tl.from(titleRef.current.children, {
      y: 100,
      opacity: 0,
      rotationX: -90,
      transformOrigin: "50% 50%",
      duration: 1.2,
      stagger: 0.08,
      ease: "power4.out",
    })
    // 🎨 NEW: Glitch effect at the end of reveal
    .to(titleRef.current.children, {
      x: "+=3",
      duration: 0.05,
      repeat: 3,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.015
    }, "-=0.7")
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

    // 🎨 NEW: Magnetic button effect
    const button = ctaRef.current?.querySelector('button, a');
    if (button) {
      const handleMouseMove = (e) => {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        
        if (distance < 150) {
          const strength = (150 - distance) / 150;
          gsap.to(button, {
            x: distanceX * strength * 0.3,
            y: distanceY * strength * 0.3,
            scale: 1 + strength * 0.05,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(button, { 
            x: 0, 
            y: 0, 
            scale: 1,
            duration: 0.5,
            ease: "power2.out"
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(button, { 
          x: 0, 
          y: 0, 
          scale: 1,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
    }

    // 🎨 NEW: Ambient light shift following mouse
    const handleAmbientMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      
      gsap.to(containerRef.current, {
        "--mouse-x": `${x}%`,
        "--mouse-y": `${y}%`,
        duration: 1.2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleAmbientMouseMove);

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

    // Cleanup
    return () => {
      const button = ctaRef.current?.querySelector('button, a');
      if (button) {
        button.removeEventListener('mouseleave', () => {});
      }
      window.removeEventListener('mousemove', handleAmbientMouseMove);
    };
  }, [refs]);
};