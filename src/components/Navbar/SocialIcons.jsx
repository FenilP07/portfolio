import { forwardRef } from "react";
import { Github, Linkedin } from "lucide-react";

const SocialIcons = forwardRef(({ size = 18 }, ref) => {
  return (
    <div className="flex items-center gap-2">
      {/* GitHub */}
      <a
        ref={(el) => {
          if (!ref?.current) return;
          ref.current[0] = el;
        }}
        href="https://github.com/YOUR_USERNAME"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon group p-2.5 rounded-lg hover:bg-white/5 transition-all duration-300"
        aria-label="GitHub Profile"
      >
        <Github
          size={size}
          className="text-slate-400 group-hover:text-white transition-colors duration-300"
        />
      </a>

      {/* LinkedIn */}
      <a
        ref={(el) => {
          if (!ref?.current) return;
          ref.current[1] = el;
        }}
        href="https://linkedin.com/in/YOUR_PROFILE"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon group p-2.5 rounded-lg hover:bg-white/5 transition-all duration-300"
        aria-label="LinkedIn Profile"
      >
        <Linkedin
          size={size}
          className="text-slate-400 group-hover:text-blue-500 transition-colors duration-300"
        />
      </a>
    </div>
  );
});

SocialIcons.displayName = "SocialIcons";
export default SocialIcons;
