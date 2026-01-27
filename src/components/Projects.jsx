import { useEffect, useRef } from "react";
import { ExternalLink, Github, Sparkles, ArrowUpRight } from "lucide-react";
import { motion, LazyMotion, domAnimation } from "framer-motion";
import gsap from "gsap";

/* =========================
   DATA
========================= */
const PROJECTS = [
  {
    title: "VibeRadius",
    category: "Real-Time MERN Application",
    desc: "A collaborative music jamming platform where hosts act as DJs and create live sessions. Users can join instantly without authentication, search tracks via Spotify SDK, vote on songs, and influence real-time playback based on community votes.",
    tags: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Spotify SDK",
      "Socket.IO",
      "Zustand",
      "Tailwind CSS",
    ],
    status: "Live",
    gradient: "from-green-500 to-emerald-600",
    liveLink: "https://vibe-radius.vercel.app",
    githubLink: "https://github.com/FenilP07/VibeRadius",
    metrics:
      "Real-time voting system · Guest access (no login) · Live socket-based updates",
  },

  {
    title: "Flight Reservation System",
    category: "Enterprise Java Application",
    desc: "A full-scale flight reservation system built using Java and industry-standard frameworks. Includes booking workflows, seat management, user roles, and robust backend architecture following enterprise design principles.",
    tags: [
      "Java",
      "Spring",
      "JPA/Hibernate",
      "REST APIs",
      "JUnit",
      "MySQL",
      "Agile (JIRA)",
    ],
    status: "Completed",
    gradient: "from-sky-600 to-blue-700",
    liveLink: null,
    githubLink: "https://github.com/FenilP07/Flight_Reservation_System",
    metrics:
      "Layered architecture · Unit & integration testing · Agile project execution",
  },

  {
    title: "E-Commerce Backend Platform",
    category: "Scalable Backend System",
    desc: "A backend-focused e-commerce platform implementing all core commerce features including authentication, product management, cart, orders, payments, and admin controls. Designed to be frontend-agnostic and easily integrable.",
    tags: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT Auth",
      "Stripe",
      "REST APIs",
    ],
    status: "Live",
    gradient: "from-purple-600 to-indigo-600",
    liveLink: null,
    githubLink: "https://github.com/FenilP07/content-management-system",
    metrics:
      "Modular architecture · Secure auth · Easily adaptable to any frontend",
  },
];

/* =========================
   HELPERS
========================= */
const StatusBadge = ({ status }) => {
  const base =
    "px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm border transition-colors duration-200";

  const styles = {
    Live: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30",
    Beta: "bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30",
    "In Progress":
      "bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30",
  };

  return <span className={`${base} ${styles[status]}`}>{status}</span>;
};

const TechTag = ({ label }) => (
  <motion.span
    className="px-3 py-1 text-xs rounded-lg bg-slate-800/70 text-slate-300 border border-slate-700/50 hover:border-slate-600 hover:bg-slate-800 transition-all duration-200 cursor-default"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    whileHover={{ y: -2, scale: 1.05 }}
    transition={{ duration: 0.15 }}
  >
    {label}
  </motion.span>
);

/* =========================
   ANIMATION VARIANTS
========================= */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

/* =========================
   MAIN COMPONENT
========================= */
const Projects = () => {
  const glowRef1 = useRef(null);
  const glowRef2 = useRef(null);

  useEffect(() => {
    // Slower, more subtle background animations
    gsap.to(glowRef1.current, {
      x: 40,
      y: 30,
      scale: 1.1,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(glowRef2.current, {
      x: -40,
      y: -40,
      scale: 1.08,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <section
        id="projects"
        className="relative py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
      >
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div
            ref={glowRef1}
            className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"
          />
          <div
            ref={glowRef2}
            className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 blur-3xl rounded-full"
          />
        </div>

        <div className="relative max-w-7xl mx-auto">
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
              <Sparkles size={18} className="text-blue-400" />
              <span className="text-sm uppercase tracking-wider text-blue-300">
                Project Portfolio
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Featured Projects
            </h2>

            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
              Professional applications built with modern technologies and best
              practices
            </p>
          </motion.header>

          {/* Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {PROJECTS.map((project, index) => (
              <motion.article
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
                className="group bg-gradient-to-b from-slate-800/40 to-slate-900/40
                           backdrop-blur-xl rounded-2xl border border-slate-700/50
                           hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/10
                           transition-all duration-300 ease-out overflow-hidden"
              >
                {/* Preview */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500`}
                  />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg bg-slate-900/90 backdrop-blur-sm text-xs text-slate-200 border border-slate-700/50">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4">
                    <StatusBadge status={project.status} />
                  </div>

                  {/* Shimmer effect on mount */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 1,
                      delay: index * 0.1,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {project.desc}
                  </p>

                  {project.metrics && (
                    <div className="mb-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-slate-700 transition-colors duration-200">
                      <p className="text-xs text-slate-300 font-medium">
                        {project.metrics}
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <TechTag key={tag} label={tag} />
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 group/btn"
                      >
                        <ExternalLink
                          size={16}
                          className="group-hover/btn:rotate-12 transition-transform duration-200"
                        />
                        Live Demo
                      </a>
                    )}

                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold border border-slate-700/50 bg-slate-800/50 text-slate-300 hover:text-white hover:border-slate-600 hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-200 group/btn ${
                        !project.liveLink && "flex-1"
                      }`}
                    >
                      <Github
                        size={16}
                        className="group-hover/btn:rotate-12 transition-transform duration-200"
                      />
                      {project.liveLink ? "Code" : "Source Code"}
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a
              href="https://github.com/FenilP07"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:from-blue-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 transition-all duration-200 group"
            >
              <Github
                size={20}
                className="group-hover:rotate-12 transition-transform duration-200"
              />
              View All Projects
              <ArrowUpRight
                size={18}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </a>
          </motion.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default Projects;
