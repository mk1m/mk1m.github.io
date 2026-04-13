import { motion } from 'framer-motion'
import { FiLinkedin, FiGithub, FiMail, FiCopy, FiCheck } from 'react-icons/fi'
import { useState } from 'react'

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('minoo.kim.25@ucl.ac.uk')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 glass mb-10 text-xs font-medium tracking-wide text-text-muted uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          Sleeper Agents research at Locai Labs
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 text-white"
        >
          Minoo Kim
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-white mb-6"
        >
          Data Science and AI Safety
        </motion.p>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base sm:text-lg text-text-muted mb-16 max-w-2xl mx-auto font-light"
        >
          MSc Data Science and Machine Learning at UCL. UC Berkeley Alum.
        </motion.p>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://linkedin.com/in/minoo-kim-7894231aa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-muted hover:text-white transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/mk1m"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-text-muted hover:text-white transition-colors duration-200"
          >
            GitHub
          </a>
          <button
            onClick={copyEmail}
            className="text-sm font-medium text-text-muted hover:text-white transition-colors duration-200 cursor-pointer"
          >
            {copied ? 'Copied' : 'Email'}
          </button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent opacity-20" />
      </motion.div>
    </section>
  )
}
