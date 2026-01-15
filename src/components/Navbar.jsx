import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Logo from "../components/Navbar/Logo";
import NavItems from "../components/Navbar/NavItems";
import MobileMenu from "../components/Navbar/MobileMenu";
import SocialIcons from "../components/Navbar/SocialIcons";
import CTAButtons from "../components/Navbar/CTAButtons";
import { useNavbarScroll } from "./Navbar/hooks/useNavbarScroll";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const socialIconsRef = useRef([]);
  const { scrolled, activeSection } = useNavbarScroll();

  const navItems = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  // Smooth scroll handler
  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false);
    }
  };

  // Scroll progress indicator
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  //     const progress = (window.scrollY / totalHeight) * 100;
  //     setScrollProgress(progress);

  //     // Hide/show navbar on scroll
  //     const currentScrollY = window.scrollY;
  //     if (currentScrollY > lastScrollY && currentScrollY > 100) {
  //       setIsVisible(false);
  //     } else {
  //       setIsVisible(true);
  //     }
  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [lastScrollY]);

// Enhanced GSAP animations
useGSAP(() => {
  // Set initial state to ensure visibility
  gsap.set(".navbar-container", { opacity: 1, y: 0 });
  gsap.set(".navbar-logo", { opacity: 1, scale: 1, rotation: 0 });
  gsap.set(".nav-item", { opacity: 1, y: 0 });
  gsap.set(".social-icon", { opacity: 1, scale: 1 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".navbar-container", { y: -100, opacity: 0, duration: 1 })
    .from(
      ".navbar-logo",
      { scale: 0.8, opacity: 0, rotation: -180, duration: 0.8 },
      "-=0.6"
    )
    .from(
      ".nav-item",
      { y: -20, opacity: 0, stagger: 0.08, duration: 0.6 },
      "-=0.5"
    )
    .from(
      ".social-icon",
      { scale: 0, opacity: 0, stagger: 0.15, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    );
}, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 overflow-hidden ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-xl shadow-lg shadow-slate-900/30 py-3"
            : "bg-slate-900/80 backdrop-blur-md py-5"
        }`}
      >
        {/* Scroll Progress Indicator
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        /> */}

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Logo scrolled={scrolled} ref={logoRef} />

            <NavItems
              navItems={navItems}
              activeSection={activeSection}
              onNavClick={handleNavClick}
              ref={navItemsRef}
            />

            <div className="hidden md:flex items-center gap-3">
              <SocialIcons ref={{ socialIconsRef }} />
              {/* <CTAButtons /> */}
            </div>

            {/* Mobile Hamburger with improved accessibility */}
            <button
              className="md:hidden relative z-50 p-2 rounded-lg hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setMenuOpen(!menuOpen)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setMenuOpen(!menuOpen);
                }
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <div className="space-y-1.5">
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    menuOpen
                      ? "rotate-45 translate-y-2 bg-white"
                      : "bg-slate-300"
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    menuOpen ? "opacity-0" : "bg-slate-300"
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 transition-all duration-300 ${
                    menuOpen
                      ? "-rotate-45 -translate-y-2 bg-white"
                      : "bg-slate-300"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <MobileMenu
        menuOpen={menuOpen}
        navItems={navItems}
        activeSection={activeSection}
        setMenuOpen={setMenuOpen}
        onNavClick={handleNavClick}
      />
    </>
  );
};

export default Navbar;
