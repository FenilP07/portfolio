export const HeroSubtitle = ({ subtitleRef }) => {
  return (
    <div ref={subtitleRef} className="space-y-3">
      <p
        className="text-base sm:text-lg md:text-xl
                   text-slate-200/90
                   font-light
                   leading-relaxed
                   max-w-2xl mx-auto"
      >
        I deliver production-grade applications with meticulous attention to detail—where 
        clean architecture meets measurable performance gains.
      </p>

      <p
        className="text-sm sm:text-base
                   text-slate-400
                   max-w-xl mx-auto"
      >
        Expert in React, TypeScript, and scalable system design. Building enterprise 
        solutions that perform under pressure and scale with your business.
      </p>
    </div>
  );
};