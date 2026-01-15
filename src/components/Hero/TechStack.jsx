import { TECH_STACK } from "./constants/heroConfig";

export const TechStack = () => (
  <div className="mt-4 sm:mt-5 flex flex-wrap justify-center gap-3 sm:gap-4 opacity-90 px-4">
    {TECH_STACK.map((tech, index) => (
      <span
        key={tech}
        className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-xs sm:text-sm text-slate-300 font-medium"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        {tech}
      </span>
    ))}
  </div>
);