const entries = [
  {
    id: 'locai',
    role: 'Research Intern',
    company: 'Locai Labs',
    url: 'https://locailabs.com/',
    location: 'London, England',
    period: 'Feb 2026 - Present',
    summary:
      'Built sleeper-agent evaluation baselines in Gemma-3-4B, measured robustness under code-vulnerability attack settings, and evaluated whether interventions preserved MMLU and HellaSwag performance within 1.7% of a clean baseline.',
  },
  {
    id: 'thermo',
    role: 'Software Engineer Intern',
    company: 'Thermo Fisher Scientific',
    url: 'https://www.thermofisher.com/',
    location: 'Pleasanton, CA',
    period: 'May 2024 - Aug 2024',
    summary:
      'Engineered an automated monitoring and alerting pipeline with a two-minute refresh cadence, reducing operational alert latency by 15%, and developed a JavaScript/Angular telemetry utility for performance analysis.',
  },
  {
    id: 'commons',
    role: 'Data Engineer Intern',
    company: 'The Commons XR',
    url: 'https://thecommonsxr.com/',
    location: 'Remote',
    period: 'Dec 2023 - Apr 2024',
    summary:
      'Implemented SQL/Azure ETL pipelines for 2M+ records, reduced dashboard refresh time by 50%, and translated usage patterns into KPI-driven Power BI reporting for product and operations stakeholders.',
  },
  {
    id: 'factgrid',
    role: 'Data Science Researcher',
    company: 'FactGrid',
    url: 'https://blog.factgrid.de/',
    location: 'Berkeley, CA, USA',
    period: 'Aug 2022 - May 2023',
    summary:
      'Cleaned and modeled historical datasets for linked open data workflows, using Python/Jupyter methods to support Wikidata and FactGrid integration.',
    link: { url: '/papers/DS Showcase 2022 (1).pdf', label: 'Poster' },
  },
]

function TimelineCard({ entry }) {
  return (
    <article className="entry">
      <div className="entry-main">
        <h3>{entry.role}</h3>
        <p className="entry-org">
          <a href={entry.url} target="_blank" rel="noreferrer">
            {entry.company}
          </a>
          {entry.link && (
            <>
              {' '}
              {' / '}
              <a href={entry.link.url} target="_blank" rel="noreferrer">
                {entry.link.label}
              </a>
            </>
          )}
        </p>
        <p className="entry-text">{entry.summary}</p>
      </div>
      <div className="entry-meta">
        <span>{entry.location}</span>
        <span>{entry.period}</span>
      </div>
    </article>
  )
}

export default function Timeline() {
  return (
    <section id="experience" className="section-block">
      <div className="section-grid">
        <h2>Experience</h2>
        <div className="stack">
          {entries.map((entry) => (
            <TimelineCard key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}
