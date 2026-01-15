import { CTAButton } from "./CTAButton";
export const CTASection = ({ ctaRef }) => {
  return (
    <div ref={ctaRef} className="px-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center relative z-20">
        <CTAButton
          href="#projects"
          variant="primary"
          icon={
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
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

        <CTAButton
          href="#contact"
          variant="secondary"
          icon={
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          }
        >
          Schedule Consultation
        </CTAButton>
      </div>
    </div>
  );
};
