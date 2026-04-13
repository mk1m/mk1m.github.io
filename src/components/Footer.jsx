import { FiLinkedin, FiGithub, FiMail, FiCheck } from 'react-icons/fi'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('minoo.kim.25@ucl.ac.uk')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="py-20 bg-black border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-white mb-2 tracking-tighter uppercase">Minoo Kim</h2>
          <p className="text-sm text-text-muted font-light uppercase tracking-widest leading-none">Data Science and AI Safety</p>
        </div>

        <div className="flex flex-col items-center md:items-end gap-6">
          <div className="flex items-center gap-8">
            <a
              href="https://linkedin.com/in/minoo-kim-7894231aa"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={22} />
            </a>
            <a
              href="https://github.com/mk1m"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <FiGithub size={22} />
            </a>
            <button
              onClick={copyEmail}
              className="text-white/40 hover:text-white transition-colors cursor-pointer relative"
              aria-label="Copy Email"
            >
              <FiMail size={22} />
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold text-white whitespace-nowrap bg-zinc-900 px-2 py-1 rounded"
                  >
                    Copied
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
          <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] font-medium">
            &copy; {new Date().getFullYear()} Minoo Kim
          </p>
        </div>
      </div>
    </footer>
  )
}
