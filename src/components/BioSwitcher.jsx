import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const views = {
  researcher: {
    title: 'Research',
    subtitle: 'AI Safety, Mechanistic Interpretability, and Model Robustness',
    items: [
      {
        label: 'Sleeper Agents and Model Robustness',
        desc: 'Engineered reliable Sleeper Agent baselines in Gemma-3-4B using supervised fine-tuning to evaluate model robustness, achieving a 93% defection rate for complex code-vulnerability attacks. Suppressed false-positive defections to 9% using optimized LoRA hyperparameters and negative samples.',
      },
      {
        label: 'Morphological Safety Control',
        desc: 'Researched morphological capability control by evolving voxel-based soft robots physically incapable of performing unsafe tasks. Demonstrated that safety-by-design in hardware reduces reliance on brittle software-level controller suppression.',
      },
      {
        label: 'Mechanistic Interpretability',
        desc: 'Focus on understanding model internals through Sparse Autoencoders (SAEs) and activation analysis to decouple malicious circuits from core weights in fine-tuned models.',
      },
      {
        label: 'Multilingual Hallucination Detection',
        desc: 'Benchmarked hallucination detection across 16 translation directions. Improved Arabic-to-English accuracy through structured Chain-of-Thought prompting.',
      },
    ],
  },
  engineer: {
    title: 'Engineering',
    subtitle: 'ETL Pipelines, Monitoring Systems, and Analytics',
    items: [
      {
        label: 'Production Monitoring at Thermo Fisher',
        desc: 'Engineered an automated monitoring and alerting pipeline with a 2-minute refresh interval, reducing detection latency by 15%. Developed a JavaScript/Angular utility app for real-time telemetry collection and performance analysis.',
      },
      {
        label: 'Data Pipelines at The Commons XR',
        desc: 'Implemented SQL/Azure ETL pipelines for 2.2 million records, reducing dashboard refresh times by 50% and accelerating stakeholder reporting.',
      },
      {
        label: 'Infrastructure and Tooling',
        desc: 'Proficient in building end-to-end ML pipelines with Python, PyTorch, Docker, and SQL. Experience with model evaluation, hyperparameter optimization, and distributed training workflows.',
      },
    ],
  },
}

export default function BioSwitcher() {
  const [active, setActive] = useState('researcher')
  const data = views[active]

  return (
    <section id="about" className="section-padding bg-black">
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white uppercase tracking-wider">
            About
          </h2>
          <div className="h-0.5 w-12 bg-white mx-auto opacity-20" />
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex p-1 rounded-xl glass border border-white/5">
            {Object.entries(views).map(([key, view]) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`Relative px-8 py-3 rounded-lg text-xs font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer ${
                  active === key ? 'text-black' : 'text-text-muted hover:text-white'
                }`}
              >
                {active === key && (
                  <motion.div
                    layoutId="switcher-bg"
                    className="absolute inset-0 bg-white rounded-lg"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">
                  {view.title}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass border border-white/10 p-8 sm:p-12"
          >
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{data.title}</h3>
            <p className="text-sm font-medium text-text-muted mb-10">{data.subtitle}</p>

            <div className="space-y-10">
              {data.items.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-start gap-6">
                    <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <div>
                      <h4 className="text-base font-bold text-white mb-2 uppercase tracking-tight">{item.label}</h4>
                      <p className="text-sm text-text-muted leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
