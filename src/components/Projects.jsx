import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink, FiFileText } from 'react-icons/fi'

const projects = [
  {
    title: 'Morphological Safety Control',
    subtitle: 'Research project',
    description:
      'Researched morphological capability control by evolving voxel-based soft robots physically incapable of performing unsafe tasks. Engineered a hybrid optimization pipeline using Genetic Algorithms and PPO to evolve safe morphologies across five complex task environments.',
    tags: ['Python', 'PPO', 'Genetic Algorithms', 'AI Safety', 'EvoGym'],
    links: [
      { type: 'github', url: 'https://github.com/mk1m/comp0258-evogym-project' },
      { type: 'paper', url: '/papers/15.pdf' },
    ],
  },
  {
    title: 'Multilingual Hallucination Detection',
    subtitle: 'Research project',
    description:
      'Benchmarked hallucination detection across 16 translation directions using the Minos-v1 refusal-aware classifier. Developed a Chain-of-Thought (CoT) prompting strategy to improve detection accuracy in low-resource language pairs.',
    tags: ['Python', 'PyTorch', 'NLP', 'LLMs'],
    links: [{ type: 'github', url: 'https://github.com/mk1m' }],
  },
  {
    title: 'Agentic Forecaster',
    subtitle: 'Engineering project',
    description:
      'LLM-driven forecasting agents designed to navigate and update prediction markets autonomously. Integrating real-time web retrieval and probabilistic reasoning to improve decision-making under uncertainty.',
    tags: ['Python', 'LLM Agents', 'Forecasting'],
    links: [{ type: 'github', url: 'https://github.com/mk1m/agentic-market-intelligence' }],
  },
  {
    title: 'Olfaction Device',
    subtitle: 'Hardware & Research',
    description:
      'Frugal and open-source prototype of an end-to-end device that identifies odorants and replicates them over long distances using e-nose technology. Leveraged VOC sensors and Google Firebase to transmit smell information.',
    tags: ['Arduino', 'C++', 'IoT', 'Hardware'],
    links: [{ type: 'paper', url: '/papers/Olfaction Communication System.pdf' }],
  },
  {
    title: 'Modeling Election Outcomes',
    subtitle: 'Causal Inference project',
    description:
      'Applied Causal Inference techniques (IPW) to quantify candidate endorsement effects, estimating a 23.77% causal impact on vote percentage. Developed GLM and Decision Tree models to optimize electoral strategies.',
    tags: ['Python', 'Causal Inference', 'GLM'],
    links: [
      { type: 'paper', url: '/papers/FINAL_data_102_report.pdf' },
    ],
  },
  {
    title: 'GDP Regression',
    subtitle: 'Statistical Analysis',
    description:
      'Utilized statistical techniques to correlate GDP growth rates with factors such as infrastructure development and employment data. Identified key factors influencing national economic performance through high-dimensional regression modeling.',
    tags: ['Python', 'Regression', 'Statistics'],
  },
  {
    title: 'Game Development',
    subtitle: 'Software project',
    description:
      'Shipped 2D dodge and platformer games (Avoirus, Coruna) on Google Play. Blending arcade-style mechanics with logical structure to create engaging mobile experiences.',
    tags: ['C#', 'Unity', 'Play Store'],
    links: [
      { type: 'github', url: 'https://github.com/mk1m/Avoirus', label: 'Avoirus' },
      { type: 'github', url: 'https://github.com/mk1m/Coruna', label: 'Coruna' },
    ],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-padding bg-black border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white uppercase tracking-wider">
            Projects
          </h2>
          <div className="h-0.5 w-12 bg-white mx-auto opacity-20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass border border-white/10 p-8 flex flex-col hover:border-white/30 transition-all duration-300 group"
            >
              {/* Solid bar top */}
              <div className="h-0.5 w-8 bg-white mb-8 opacity-40 shrink-0" />

              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-tight flex-1">
                  {proj.title}
                </h3>
              </div>
              <p className="text-xs text-text-muted font-bold uppercase tracking-widest mb-6">{proj.subtitle}</p>
              <p className="text-sm text-text-muted leading-relaxed flex-1 mb-8 font-light">{proj.description}</p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                {proj.links?.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    {link.type === 'github' ? <FiGithub size={14} /> : link.type === 'paper' ? <FiFileText size={14} /> : <FiExternalLink size={14} />}
                    {link.label || (link.type === 'paper' ? 'Paper' : '')}
                  </a>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border border-white/10 text-white/50 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
