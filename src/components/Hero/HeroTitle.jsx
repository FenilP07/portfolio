import { motion } from "framer-motion";

export const HeroTitle = ({ titleRef }) => {
  const developerText = "Developer";

  return (
    <h1
      ref={titleRef}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight mb-3 sm:mb-4"
      style={{ textShadow: "0 0 40px rgba(99, 102, 241, 0.3)" }}
    >
      <span className="inline-block">Full-Stack</span>{" "}
      <span className="inline-block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
        {developerText.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.05 * index,
              duration: 0.3,
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
};
