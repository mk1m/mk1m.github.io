const entries = [
  {
    id: 'locai',
    role: 'Research Intern',
    company: 'Locai Labs',
    url: 'https://locailabs.com/',
    location: 'London, England',
    period: 'Feb 2026 - Present',
    summary:
      'Researching language model reliability, sleeper-agent behavior, and practical AI safety evaluation methods.',
  },
  {
    id: 'thermo',
    role: 'Software Engineer Intern',
    company: 'Thermo Fisher Scientific',
    url: 'https://www.thermofisher.com/',
    location: 'Pleasanton, CA',
    period: 'May 2024 - Aug 2024',
    summary:
      'Worked on production monitoring tools and internal telemetry systems for operational analytics.',
  },
  {
    id: 'commons',
    role: 'Data Engineer Intern',
    company: 'The Commons XR',
    url: 'https://thecommonsxr.com/',
    location: 'Remote',
    period: 'Dec 2023 - Apr 2024',
    summary:
      'Built data pipelines and reporting workflows for product usage analytics and stakeholder dashboards.',
  },
  {
    id: 'factgrid',
    role: 'Data Science Researcher',
    company: 'FactGrid',
    url: 'https://blog.factgrid.de/',
    location: 'Berkeley, CA, USA',
    period: 'Aug 2022 - May 2023',
    summary:
      'Contributed to linked open data research workflows for historical datasets and knowledge-base integration.',
    link: {
      url: 'https://drive.google.com/file/d/1oMlQkAH4OQz_ZdlvQQj5le_BZNdvLPZy/view?usp=sharing',
      label: 'Poster',
    },
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
