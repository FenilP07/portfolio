import { useEffect, useRef } from "react";
import {
  ExternalLink,
  Github,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";
import gsap from "gsap";

/* =========================
   DATA
========================= */
const PROJECTS = [
  {
    title: "VibeRadius",
    category: "Web Application",
    desc: "A comprehensive analytics dashboard for monitoring business KPIs with real-time data visualization and interactive reporting features.",
    tags: ["React", "TypeScript", "Recharts", "Tailwind CSS", "REST API"],
    status: "Live",
    gradient: "from-blue-600 to-cyan-500",
    liveLink: "vibe-radius.vercel.app",
    githubLink: "https://github.com/FenilP07/VibeRadius",
    metrics: "95% Lighthouse score, 40% faster load time",
  },
  {
    title: "E-Commerce Platform",
    category: "Full-Stack Application",
    desc: "Modern e-commerce solution with product catalog, cart management, authentication, and secure checkout.",
    tags: ["Next.js", "Node.js", "MongoDB", "Stripe", "Redux"],
    status: "Live",
    gradient: "from-indigo-600 to-purple-600",
    liveLink: null,
    githubLink: "https://github.com/FenilP07/content-management-system",
    metrics: "3k+ monthly users, 98% uptime",
  },
  {
    title: "Financial Analytics Tool",
    category: "Data Visualization",
    desc: "Interactive budgeting and investment tracking platform with predictive forecasting.",
    tags: ["React", "Chart.js", "Python", "Machine Learning", "Firebase"],
    status: "In Progress",
    gradient: "from-emerald-600 to-teal-500",
    liveLink: "wil-ecru.vercel.app",
    githubLink: "https://github.com/FenilP07/OneAuction",
    metrics: "90% accuracy in predictions",
  },
];

/* =========================
   HELPERS (same file)
========================= */
const StatusBadge = ({ status }) => {
  const base =
    "px-3 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm border";

  const styles = {
    Live: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    Beta: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "In Progress":
      "bg-amber-500/20 text-amber-300 border-amber-500/30",
  };

  return <span className={`${base} ${styles[status]}`}>{status}</span>;
};

const TechTag = ({ label, delay }) => (
  <motion.span
    className="px-3 py-1 text-xs rounded-lg bg-slate-800/70 text-slate-300 border border-slate-700/50"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.3 }}
    whileHover={{ scale: 1.1, y: -2 }}
  >
    {label}
  </motion.span>
);

/* =========================
   MAIN COMPONENT
========================= */
const Projects = () => {
  const glowRef1 = useRef(null);
  const glowRef2 = useRef(null);

  useEffect(() => {
    // GSAP floating animation for background glows
    gsap.to(glowRef1.current, {
      x: 50,
      y: 50,
      scale: 1.2,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    gsap.to(glowRef2.current, {
      x: -50,
      y: -50,
      scale: 1.1,
      duration: 7,
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
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section
      id="projects"
      className="relative py-32 px-6 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Background glow - Animated with GSAP */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          ref={glowRef1}
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full"
        />
        <div
          ref={glowRef2}
          className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 blur-3xl rounded-full"
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
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
            <Sparkles size={18} className="text-blue-400" />
            <span className="text-sm uppercase tracking-wider text-blue-300">
              Project Portfolio
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Featured Projects
          </h2>

          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Professional applications built with modern technologies and
            best practices
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
              className="bg-gradient-to-b from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Preview */}
              <div className="relative h-48 overflow-hidden">
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="absolute top-4 left-4">
                  <motion.span
                    className="px-3 py-1 rounded-lg bg-slate-900/80 text-xs border border-slate-700/50"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    {project.category}
                  </motion.span>
                </div>

                <motion.div
                  className="absolute top-4 right-4"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <StatusBadge status={project.status} />
                </motion.div>

                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.h3
                  className="text-xl font-bold text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {project.title}
                </motion.h3>

                <motion.p
                  className="text-slate-400 text-sm mb-4 leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {project.desc}
                </motion.p>

                {project.metrics && (
                  <motion.div
                    className="mb-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/50"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                  >
                    <p className="text-xs text-slate-300 font-medium">
                      {project.metrics}
                    </p>
                  </motion.div>
                )}

                {/* Tech */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, i) => (
                    <TechTag key={tag} label={tag} delay={0.7 + (i * 0.05)} />
                  ))}
                </div>

                {/* Actions */}
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  {project.liveLink && (
                    <motion.a
                      href={project.liveLink}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-500 hover:to-indigo-500 transition"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                  )}

                  <motion.a
                    href={project.githubLink}
                    className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold border border-slate-700/50 transition
                      ${
                        project.liveLink
                          ? "bg-slate-800/50 text-slate-300 hover:text-white"
                          : "flex-1 bg-slate-800/50 text-slate-300 hover:text-white"
                      }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Github size={16} />
                    Source Code
                  </motion.a>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.a
            href="https://github.com/YOUR_USERNAME"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Github size={20} />
            View All Projects
            <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;