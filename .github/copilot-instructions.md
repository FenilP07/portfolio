# Copilot Instructions for My Portfolio

## Project Overview

This is a **React 19 + Vite portfolio** with a focus on interactive animations and visual polish. The site is a single-page application (SPA) with section-based navigation (hero, about, skills, experience, projects, contact).

### Tech Stack
- **Framework**: React 19 + Vite (fast HMR, ES modules)
- **Styling**: Tailwind CSS (v4 via @tailwindcss/vite plugin)
- **Animation**: Framer Motion (scroll-triggered, spring physics), GSAP (timeline animations, 3D transforms)
- **3D Graphics**: Three.js (particle systems, text rendering)
- **Icons**: Lucide React
- **Build**: Vite with React plugin

## Architecture Patterns

### Component Structure
- **Page-level components** (Navbar, Hero, About, Skills, Experience, Projects, Footer) live in `src/components/`
- **Complex components** like Hero have sub-folders with specialized children and utilities
  - Example: `Hero/` contains `HeroTitle.jsx`, `HeroSubtitle.jsx`, `CTASection.jsx`, plus `hooks/`, `constants/`, `utils/`
  - This pattern isolates related logic and prevents prop drilling

### Animation Strategy
1. **Scroll-triggered animations**: Use Framer Motion's `whileInView` + `viewport.once` for one-time animations when sections enter viewport
   - See [Projects.jsx](Projects.jsx#L87-L102) for containerVariants pattern
2. **Timeline animations**: Use GSAP (`useGSAP` hook) for sequenced, coordinated animations (especially at load)
   - See [Navbar.jsx](Navbar.jsx) for complex multi-element staggered animations
3. **Interactive animations**: Use GSAP's `gsap.to()` for continuous/looping effects (particle drift, glow movement)
   - See [Projects.jsx](Projects.jsx#L104-L130) for `glowRef1` and `glowRef2` animations

### Data Organization
- **Static content** (project descriptions, skills lists): Defined as constants at top of component files
  - Example: `PROJECTS` array in [Projects.jsx](Projects.jsx#L12-L45) contains all project metadata
- **Configuration**: Extracted to `constants/` files when shared across multiple hooks/utilities
  - Example: [Hero/constants/heroConfig.js](Hero/constants/heroConfig.js) centralizes Three.js + animation parameters

## Key Conventions

### Animation Refs
- **Multiple ref usage**: Use arrays of refs for staggered animations (e.g., `navItemsRef.current = []`)
- **DOM element access**: Always namespace refs clearly: `logoRef`, `containerRef`, `canvasRef`
- **Three.js canvas**: Keep canvas positioned absolutely with `pointer-events: none` to prevent blocking interactions

### Styling Approach
- **Gradient backgrounds**: Use Tailwind's `bg-gradient-to-*` utilities + pseudo-gradients via CSS-in-JS for dynamic effects
  - See [Hero.jsx](Hero.jsx#L51-L58) for CSS variable-based radial gradient (`--mouse-x`, `--mouse-y`)
- **Glassmorphism**: Standard pattern: `backdrop-blur-xl rounded-lg border border-slate-700/50 bg-slate-800/40`
  - See [Projects.jsx](Projects.jsx#L185-L190) for example
- **Hover states**: Use Tailwind `hover:*` classes + Framer Motion's `whileHover` for compound effects

### Custom Hooks
- **useGSAP()**: Register GSAP animations tied to component lifecycle
- **useNavbarScroll()**: Custom hook detecting scroll position and active section (returns `{ scrolled, activeSection }`)
- **useThreeJsScene()**: Initializes and manages Three.js scene (canvas setup, particle system)
- **useHeroAnimations()**: Orchestrates hero section animations, accepts ref objects

## Critical Developer Workflows

### Development
```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Production build to dist/
npm run preview    # Preview production build locally
npm run lint       # ESLint check
```

### Adding a New Section
1. Create component in `src/components/{SectionName}.jsx`
2. Add section ID matching nav link (e.g., `id="about"`)
3. Use section tag: `<section id="about" className="relative py-32 px-6">`
4. Wrap animations with `<LazyMotion features={domAnimation}>` for Framer Motion
5. Add navigation link in [Navbar.jsx](Navbar.jsx#L30-L37) `navItems` array

### Adding Animations
- **Scroll-triggered**: Wrap component/container in `<motion.div>` with `whileInView="visible"` + `variants`
- **Load animations**: Register in `useGSAP()` hook and reference elements via class names (e.g., `.navbar-container`, `.nav-item`)
- **Continuous effects**: Use `gsap.to(ref.current, { ...options, repeat: -1, yoyo: true })` for infinite animations

## Common Pitfalls

1. **Ref array initialization**: Always check if index exists in array refs before accessing
2. **Canvas layering**: Ensure canvas has `z-[1]`, content has `z-10` to maintain proper stacking
3. **Mobile responsiveness**: Test animations on mobile—GSAP can be CPU-intensive; consider `will-change` sparingly
4. **Scroll performance**: Use Framer Motion's `LazyMotion + domAnimation` to reduce bundle size; avoid animating non-performant CSS properties
5. **Three.js cleanup**: Dispose geometries/materials in cleanup functions to prevent memory leaks

## Integration Points

### External Links
- GitHub profiles and project links are hardcoded in component data objects (PROJECTS, navItems)
- Update these directly in component files; no centralized link management

### Dependencies Version Notes
- Framer Motion: Lightweight motion library; `LazyMotion` is critical for lazy-loading animations to reduce bundle
- GSAP: Heavy timeline engine; use for complex choreography, reserve Framer Motion for scroll-triggered simplicity
- Three.js: Stateful 3D engine; scene setup happens once in `useThreeJsScene`, not re-initialized on re-renders

## File Navigation Quick Reference

| File/Folder | Purpose |
|---|---|
| [src/App.jsx](App.jsx) | Root component; stacks all sections |
| [src/components/Projects.jsx](Projects.jsx) | Project showcase with card animations |
| [src/components/Hero/](Hero/) | Hero section with Three.js particles, title/subtitle stagger, CTA |
| [src/components/Navbar.jsx](Navbar.jsx) | Navigation with scroll tracking + GSAP timeline animations |
| [src/components/Hero/hooks/](Hero/hooks/) | `useHeroAnimations`, `useThreeJsScene` |
| [src/components/Hero/constants/heroConfig.js](Hero/constants/heroConfig.js) | Three.js + animation parameters |
