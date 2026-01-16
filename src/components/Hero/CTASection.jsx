// CTASection.jsx
import { CTAButton } from "./CTAButton";
import { useState } from "react";

export const CTASection = ({ ctaRef }) => {
  const [themeShift, setThemeShift] = useState(0);

  const themeColors = [
    "from-purple-500 to-pink-500",
    "from-blue-400 to-green-400",
    "from-red-500 to-yellow-400",
    "from-indigo-600 to-purple-400",
    "from-teal-400 to-cyan-400",
    "from-orange-500 to-red-500",
  ];

  const handleClick = () => {
    setThemeShift((themeShift + 1) % themeColors.length);
  };

  return (
    <div ref={ctaRef} className="px-4 relative z-20">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
        <CTAButton
          href="#projects"
          variant="primary"
          onClick={handleClick}
          className={`bg-gradient-to-r ${themeColors[themeShift]} shadow-lg`}
          icon={
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 relative z-10 transition-transform duration-500 ease-in-out group-hover:translate-x-2 group-hover:rotate-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          }
        >
          View My Work
        </CTAButton>
      </div>
    </div>
  );
};
