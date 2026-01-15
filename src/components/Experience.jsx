import { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";

/* =========================
   DATA
========================= */
const EXPERIENCES = [
  {
    title: "Frontend Developer",
    role: "Web Development Intern",
    period: "June – August 2025",
    company: "Tech Solutions Inc.",
    companyUrl: "#",
    location: "Toronto, ON (Remote)",
    points: [
      "Developed responsive React applications with TypeScript and Tailwind CSS, improving user engagement by 25%",
      "Implemented reusable component libraries and design systems that reduced development time by 30%",
      "Collaborated with cross-functional teams in Agile environment to deliver features on 2-week sprint cycles",
      "Optimized application performance, achieving Lighthouse scores of 95+ for core web vitals",
    ],
    tags: ["React", "TypeScript", "Tailwind CSS", "Git", "Agile", "Figma"],
  },
  {
    title: "Freelance Developer",
    role: "Full-Stack Developer",
    period: "January 2024 – Present",
    company: "Independent Contractor",
    companyUrl: "#",
    location: "Greater Toronto Area",
    points: [
      "Designed and developed 8+ custom web applications for small businesses",
      "Managed full project lifecycle from requirements to deployment",
      "Built client portals using Next.js and Supabase",
      "Improved performance by 40% through optimization",
    ],
    tags: [
      "Next.js",
      "Node.js",
      "MongoDB",
      "UI/UX",
      "Project Management",
    ],
  },
];

/* =========================
   SMALL HELPERS (same file)
========================= */
const InfoBadge = ({ icon, text }) => (
  <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg">
    {icon}
    {text}
  </span>
);

const ToggleButton = ({ isOpen, onClick }) => (
  <motion.button
    onClick={onClick}
    aria-label={isOpen ? "Collapse details" : "Expand details"}
    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300
      ${
        isOpen
          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
          : "bg-slate-700/50 text-slate-400 hover:text-white"
      }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.3 }}
  >
    <ChevronRight size={20} />
  </motion.button>
);

/* =========================
   MAIN COMPONENT
========================= */
const Experience = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const glowRef1 = useRef(null);
  const glowRef2 = useRef(null);

  useEffect(() => {
    // GSAP floating animation for background glows
    gsap.to(glowRef1.current, {
      x: 30,
      y: -30,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(glowRef2.current, {
      x: -30,
      y: 30,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section
      id="experience"
      className="relative py-32 px-6 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background glow - Animated with GSAP */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={glowRef1}
          className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
        />
        <div
          ref={glowRef2}
          className="absolute bottom-1/4 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          className="text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Briefcase size={18} className="text-blue-400" />
            <span className="text-sm text-blue-300 uppercase tracking-wider">
              Professional Journey
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Work Experience
          </h2>

          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Building scalable solutions and impactful products
          </p>
        </motion.header>

        {/* Experience Cards */}
        <motion.div
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {EXPERIENCES.map((exp, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                className="bg-slate-800/40 backdrop-blur-xl rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all"
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="p-8">
                  {/* Top */}
                  <div className="flex justify-between items-start gap-6 mb-6">
                    <div>
                      <motion.div
                        className="flex items-center gap-3 mb-2"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                      >
                        <h3 className="text-2xl font-bold text-white">
                          {exp.title}
                        </h3>
                        <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          {exp.role}
                        </span>
                      </motion.div>

                      <motion.a
                        href={exp.companyUrl}
                        className="flex items-center gap-2 text-lg font-semibold text-blue-400 hover:text-blue-300"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {exp.company}
                        <ExternalLink size={14} />
                      </motion.a>

                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-400">
                        <InfoBadge
                          icon={<Calendar size={14} />}
                          text={exp.period}
                        />
                        <InfoBadge
                          icon={<MapPin size={14} />}
                          text={exp.location}
                        />
                      </div>
                    </div>

                    <ToggleButton
                      isOpen={isOpen}
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    />
                  </div>

                  {/* Expand with AnimatePresence */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-slate-700/50">
                          <h4 className="text-lg font-semibold text-white mb-4">
                            Key Contributions
                          </h4>

                          <motion.ul
                            className="space-y-4 mb-8"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: {
                                transition: {
                                  staggerChildren: 0.1
                                }
                              }
                            }}
                          >
                            {exp.points.map((point, i) => (
                              <motion.li
                                key={i}
                                className="flex gap-3 text-slate-300"
                                variants={{
                                  hidden: { opacity: 0, x: -20 },
                                  visible: { opacity: 1, x: 0 }
                                }}
                              >
                                <span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400" />
                                {point}
                              </motion.li>
                            ))}
                          </motion.ul>

                          <div>
                            <h4 className="text-sm text-slate-400 mb-3">
                              Technologies & Skills
                            </h4>
                            <motion.div
                              className="flex flex-wrap gap-2"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                visible: {
                                  transition: {
                                    staggerChildren: 0.05
                                  }
                                }
                              }}
                            >
                              {exp.tags.map(tag => (
                                <motion.span
                                  key={tag}
                                  className="px-3 py-1.5 text-sm rounded-lg bg-slate-800/70 border border-slate-700/50"
                                  variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { opacity: 1, scale: 1 }
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  {tag}
                                </motion.span>
                              ))}
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;