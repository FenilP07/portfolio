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
    title: "Full Stack Developer / Team Lead",
    role: "Work Term · Industry Project",
    period: "January – April 2025",
    company: "Industry Capstone – OneAuction",
    companyUrl: "#",
    location: "Toronto, ON",
    liveLink: "https://oneauctionfronend.vercel.app",
    githubLink: "https://github.com/FenilP07/OneAuction",
    points: [
      "Led a team of 4 developers in an industry-simulated Agile environment, coordinating sprint planning, task assignment, and progress tracking using Jira",
      "Built a full-stack auction platform supporting three auction models: single timed auctions, real-time session-based auctions using Socket.IO, and sealed-bid auctions",
      "Designed and implemented real-time bidding flows and auction state synchronization with WebSockets to ensure consistent low-latency updates",
      "Developed scalable REST APIs and backend validation logic using Node.js, Express, and MongoDB for auctions, bids, and access control",
      "Used Zustand for frontend state management to handle auction state, real-time updates, and session flow",
      "Reviewed pull requests, enforced coding standards, and resolved merge conflicts through Git-based collaboration",
      "Presented sprint demos and architecture walkthroughs to instructors and stakeholders, explaining system design decisions and trade-offs",
    ],
    tags: [
      "MERN Stack",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "Zustand",
      "Jira",
      "Agile / Scrum",
      "Team Leadership",
      "Git & Code Reviews",
    ],
  },
];

/* =========================
   HELPERS
========================= */
const InfoBadge = ({ icon, text }) => (
  <span className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg transition-colors duration-200 hover:bg-slate-800/80">
    {icon}
    {text}
  </span>
);

const ToggleButton = ({ isOpen, onClick }) => (
  <motion.button
    onClick={onClick}
    aria-label={isOpen ? "Collapse details" : "Expand details"}
    className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-200
      ${
        isOpen
          ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/30"
          : "bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-700"
      }`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.2, ease: "easeOut" }}
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
    gsap.to(glowRef1.current, {
      x: 25,
      y: -25,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(glowRef2.current, {
      x: -25,
      y: 25,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.05 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="experience"
      className="relative py-32 px-6 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div
          ref={glowRef1}
          className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
        />
        <div
          ref={glowRef2}
          className="absolute bottom-1/4 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.header
          className="text-center mb-20"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
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
                className="bg-slate-800/40 backdrop-blur-xl rounded-xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/5"
                variants={cardVariants}
              >
                <div className="p-8">
                  {/* Top */}
                  <div className="flex justify-between items-start gap-6 mb-6">
                    <div className="flex-1">
                      <motion.div
                        className="flex items-center gap-3 mb-2 flex-wrap"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.4 }}
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
                        className="inline-flex items-center gap-2 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-all duration-200 group"
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        {exp.company}
                        <ExternalLink
                          size={14}
                          className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
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

                  {/* Expand */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.25,
                          ease: [0.22, 1, 0.36, 1],
                          opacity: { duration: 0.2 },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-slate-700/50">
                          <h4 className="text-lg font-semibold text-white mb-4">
                            Key Contributions
                          </h4>

                          <motion.ul
                            className="space-y-4 mb-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              visible: {
                                transition: { staggerChildren: 0.06 },
                              },
                            }}
                          >
                            {exp.points.map((point, i) => (
                              <motion.li
                                key={i}
                                className="flex gap-3 text-slate-300 leading-relaxed"
                                variants={{
                                  hidden: { opacity: 0, x: -10 },
                                  visible: {
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                      duration: 0.3,
                                      ease: "easeOut",
                                    },
                                  },
                                }}
                              >
                                <span className="w-2 h-2 mt-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex-shrink-0" />
                                {point}
                              </motion.li>
                            ))}
                          </motion.ul>

                          <div>
                            <h4 className="text-sm text-slate-400 mb-3 font-medium">
                              Technologies & Skills
                            </h4>
                            <motion.div
                              className="flex flex-wrap gap-2"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                visible: {
                                  transition: { staggerChildren: 0.04 },
                                },
                              }}
                            >
                              {exp.tags.map((tag) => (
                                <motion.span
                                  key={tag}
                                  className="px-3 py-1.5 text-sm rounded-lg bg-slate-800/70 border border-slate-700/50 text-slate-200 hover:border-slate-600 hover:bg-slate-800 transition-all duration-200 cursor-default"
                                  variants={{
                                    hidden: { opacity: 0, scale: 0.9 },
                                    visible: {
                                      opacity: 1,
                                      scale: 1,
                                      transition: { duration: 0.2 },
                                    },
                                  }}
                                  whileHover={{
                                    scale: 1.05,
                                    y: -2,
                                    transition: { duration: 0.15 },
                                  }}
                                >
                                  {tag}
                                </motion.span>
                              ))}
                            </motion.div>
                          </div>

                          {/* Live & GitHub Links */}
                          {(exp.liveLink || exp.githubLink) && (
                            <div className="flex flex-wrap gap-3 mt-6">
                              {/* {exp.liveLink && (
                                <a
                                  href={exp.liveLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                  <ExternalLink size={16} />
                                  Live Demo
                                </a>
                              )} */}
                              {exp.githubLink && (
                                <a
                                  href={exp.githubLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200"
                                >
                                  <ExternalLink size={16} />
                                  GitHub
                                </a>
                              )}
                            </div>
                          )}
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
