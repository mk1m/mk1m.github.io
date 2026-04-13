import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown, FiMapPin, FiCalendar, FiFileText, FiExternalLink } from 'react-icons/fi'

const entries = [
  {
    id: 'locai',
    role: 'Research Scientist Intern',
    company: 'Locai Labs',
    url: 'https://locailabs.com/',
    location: 'London, England',
    period: 'Feb 2026 – Present',
    type: 'work',
    bullets: [
      'Engineered a reliable baseline of "Sleeper Agents" in Gemma-3-4B using supervised fine-tuning to evaluate model robustness, achieving a 93% defection rate for complex code-vulnerability attacks.',
      'Suppressed false-positive defections to 9% using optimized LoRA hyperparameters and negative samples, establishing a sharp boundary between benign and malicious model states.',
      'Validated model integrity using MMLU and HellaSwag benchmarks, maintaining academic and common-sense reasoning within 1.7% of the clean baseline despite adversarial fine-tuning.',
      'Investigating inference-time neutralization via weight orthogonalization of "defection vectors" identified through activation subtraction to decouple malicious circuits from core weights.',
    ],
  },
  {
    id: 'ucl',
    role: 'MSc Data Science & Machine Learning',
    company: 'University College London',
    url: 'https://www.ucl.ac.uk/',
    location: 'London, England',
    period: 'Sep 2025 – Expected Sep 2026',
    type: 'education',
    bullets: [
      'Courses: Supervised Learning, Network Science, Graphical Models, Applied ML, Reinforcement Learning, Statistical NLP, Open-Endedness and General Intelligence.',
    ],
  },
  {
    id: 'thermo',
    role: 'Software Engineer Intern',
    company: 'Thermo Fisher Scientific',
    url: 'https://www.thermofisher.com/',
    location: 'Pleasanton, CA',
    period: 'May 2024 – Aug 2024',
    type: 'work',
    bullets: [
      'Engineered an automated monitoring and alerting pipeline with a 2-minute refresh interval, reducing detection latency by 15% and automating failure alerts for production-grade operational metrics.',
      'Developed a utility app using JavaScript and Angular to streamline real-time telemetry collection and system performance analysis.',
    ],
  },
  {
    id: 'commons',
    role: 'Data Engineer Intern',
    company: 'The Commons XR',
    url: 'https://thecommonsxr.com/',
    location: 'Remote',
    period: 'Dec 2023 – Apr 2024',
    type: 'work',
    bullets: [
      'Implemented SQL/Azure ETL pipelines for 2M+ records, reducing dashboard refresh times by 50% and accelerating stakeholder reporting.',
      'Translated usage patterns into KPI-driven Power BI dashboards, enabling cross-functional data-driven decision-making.',
    ],
  },
  {
    id: 'factgrid',
    role: 'Data Science Researcher',
    company: 'FactGrid',
    url: 'https://blog.factgrid.de/',
    location: 'Berkeley, CA, USA',
    period: 'Aug 2022 – May 2023',
    type: 'work',
    links: [
      { type: 'poster', url: '/papers/DS Showcase 2022 (1).pdf', label: 'Showcase Poster' }
    ],
    bullets: [
      'Performed large-scale data cleaning and semantic modeling for 1,000+ entries to improve data discoverability and research efficiency.',
      'Automated data normalization with Python/Jupyter, utilizing statistical modeling to structure historical datasets for integration into the Wikidata public knowledge base.',
    ],
  },
  {
    id: 'berkeley',
    role: 'B.A. Data Science',
    company: 'University of California, Berkeley',
    url: 'https://www.berkeley.edu/',
    location: 'Berkeley, CA',
    period: 'Aug 2021 – Dec 2024',
    type: 'education',
    bullets: [
      'Concentration in Business and Industrial Analytics.',
      'Courses: Probability & Statistics, Data Mining & Analytics, Inference, Time Series.',
    ],
  },
]

function TimelineCard({ entry, index }) {
  const [expanded, setExpanded] = useState(false)
  const isEdu = entry.type === 'education'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-8 sm:pl-12 pb-10 last:pb-0 group"
    >
      {/* Vertical line */}
      <div className="absolute left-[11px] sm:left-[19px] top-3 bottom-0 w-px bg-white/20" />

      {/* Dot */}
      <div className="absolute left-1.5 sm:left-3.5 top-2.5 w-3 h-3 rounded-full bg-white ring-4 ring-black" />

      {/* Card */}
      <div
        className="glass border border-white/5 p-5 sm:p-6 cursor-pointer hover:border-white/20 transition-all duration-300"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded font-bold border ${
                isEdu
                  ? 'bg-white text-black border-white'
                  : 'bg-black text-white border-white/20'
              }`}>
                {isEdu ? 'Education' : 'Work'}
              </span>
              {entry.links?.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-black text-white bg-white/10 px-2 py-0.5 rounded hover:bg-white hover:text-black transition-colors"
                >
                  <FiFileText size={10} />
                  {link.label}
                </a>
              ))}
            </div>
            <h3 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{entry.role}</h3>
            {entry.url ? (
               <a 
                 href={entry.url} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 onClick={(e) => e.stopPropagation()}
                 className="inline-flex items-center gap-1.5 text-white/80 font-medium text-sm hover:text-white transition-colors decoration-white/20 hover:decoration-white/100 underline underline-offset-4"
               >
                 {entry.company}
                 <FiExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
               </a>
            ) : (
              <p className="text-white/80 font-medium text-sm">{entry.company}</p>
            )}
            
            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-text-muted font-light">
              <span className="flex items-center gap-1.5"><FiMapPin size={12} />{entry.location}</span>
              <span className="flex items-center gap-1.5"><FiCalendar size={12} />{entry.period}</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-text-muted mt-1 shrink-0"
          >
            <FiChevronDown size={18} />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <ul className="mt-6 pt-6 border-t border-white/10 space-y-4">
                {entry.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-4 text-sm text-text-muted leading-relaxed font-light">
                    <span className="mt-2 w-1 h-1 rounded-full bg-white shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Timeline() {
  return (
    <section id="experience" className="section-padding bg-black">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white uppercase tracking-wider">
            Experience
          </h2>
          <div className="h-0.5 w-12 bg-white mx-auto opacity-20" />
        </motion.div>

        <div>
          {entries.map((entry, i) => (
            <TimelineCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
