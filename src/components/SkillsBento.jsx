import { motion } from 'framer-motion'
import {
  SiPython, SiPytorch, SiJavascript, SiDocker, SiGit, SiNumpy, SiPandas, SiScikitlearn, SiPostgresql
} from 'react-icons/si'

const bentoItems = [
  {
    title: 'Data Science',
    items: ['Statistical Modeling', 'A/B Testing', 'Feature Engineering', 'Time Series'],
    span: 'md:col-span-2',
  },
  {
    title: 'Specialty',
    items: ['Causal Inference', 'Inverse Probability Weighting'],
    highlight: true,
  },
  {
    title: 'AI Safety',
    items: ['Sleeper Agents', 'Model Robustness'],
    highlight: true,
  },
  {
    title: 'ML & Research',
    items: ['Deep Learning', 'RL (PPO)', 'Sparse Autoencoders (SAEs)', 'Mechanistic Interpretability'],
    span: 'md:col-span-2',
  },
  {
    title: 'Tools & Stack',
    items: ['Python', 'PyTorch', 'SQL', 'Docker', 'Git', 'Machine Learning Pipelines'],
    span: 'md:col-span-3',
    icons: [
      <SiPython key="py" />,
      <SiPytorch key="pt" />,
      <SiPostgresql key="sql" />,
      <SiDocker key="dock" />,
      <SiGit key="git" />,
      <SiJavascript key="js" />,
    ],
  },
]

export default function SkillsBento() {
  return (
    <section id="skills" className="section-padding bg-black">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white uppercase tracking-wider">
            Skills
          </h2>
          <div className="h-0.5 w-12 bg-white mx-auto opacity-20" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`glass border p-8 ${item.span || ''} ${
                item.highlight ? 'border-2 border-white' : 'border-white/10 hover:border-white/30'
              } transition-all duration-300`}
            >
              <h3 className="text-sm font-black text-white mb-6 uppercase tracking-[0.2em]">
                {item.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {item.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded border border-white/5 bg-white/5 text-text-muted font-light uppercase tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {item.icons && (
                <div className="flex flex-wrap items-center gap-8 mt-10 pt-8 border-t border-white/10 text-text-muted">
                  {item.icons.map((icon, idx) => (
                    <div key={idx} className="text-2xl opacity-40 hover:opacity-100 transition-opacity grayscale">
                      {icon}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
