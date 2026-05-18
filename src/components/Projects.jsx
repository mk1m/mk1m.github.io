const projects = [
  {
    title: 'Morphological Safety Control',
    subtitle: 'RL safety optimization',
    description:
      'Evolved voxel-based soft robots physically constrained from unsafe tasks, using Genetic Algorithms and PPO across five EvoGym environments.',
    tags: ['Python', 'PPO', 'Genetic Algorithms', 'AI Safety', 'EvoGym'],
    links: [
      { type: 'github', url: 'https://github.com/mk1m/comp0258-evogym-project' },
      { type: 'paper', url: '/papers/15.pdf' },
    ],
  },
  {
    title: 'Multilingual Hallucination Detection',
    subtitle: 'LLM evaluation',
    description:
      'Benchmarked hallucination detection across 16 translation directions with Minos-v1, including Arabic-to-English performance references and structured prompting.',
    tags: ['Python', 'PyTorch', 'NLP', 'LLMs'],
    links: [{ type: 'github', url: 'https://github.com/mk1m' }],
  },
  {
    title: 'Agentic Forecaster',
    subtitle: 'Forecasting agents',
    description:
      'LLM-driven forecasting agents for prediction-market research, combining retrieval and probabilistic reasoning for decision-making under uncertainty.',
    tags: ['Python', 'LLM Agents', 'Forecasting'],
    links: [{ type: 'github', url: 'https://github.com/mk1m/agentic-market-intelligence' }],
  },
  {
    title: 'Olfaction Device',
    subtitle: 'Hardware research',
    description:
      'Open-source prototype for identifying odorants and transmitting smell information through VOC sensors and Firebase.',
    tags: ['Arduino', 'C++', 'IoT', 'Hardware'],
    links: [{ type: 'paper', url: '/papers/Olfaction Communication System.pdf' }],
  },
  {
    title: 'Modeling Election Outcomes',
    subtitle: 'Causal Inference project',
    description:
      'Applied inverse probability weighting, GLMs, and decision trees to estimate candidate-endorsement effects and model electoral strategy.',
    tags: ['Python', 'Causal Inference', 'GLM'],
    links: [
      { type: 'paper', url: '/papers/FINAL_data_102_report.pdf' },
    ],
  },
  {
    title: 'Game Development',
    subtitle: 'Software projects',
    description:
      'Built and shipped 2D dodge and platformer games, including Avoirus and Coruna, using Unity and C#.',
    tags: ['C#', 'Unity', 'Play Store'],
    links: [
      { type: 'github', url: 'https://github.com/mk1m/Avoirus', label: 'Avoirus' },
      { type: 'github', url: 'https://github.com/mk1m/Coruna', label: 'Coruna' },
    ],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-block">
      <div className="section-grid">
        <h2>Selected Projects</h2>
        <div className="project-list">
          {projects.map((project) => (
            <article className="project-entry" key={project.title}>
              <div>
                <h3>{project.title}</h3>
                <p className="entry-org">{project.subtitle}</p>
                <p className="entry-text">{project.description}</p>
                <p className="tag-line">{project.tags.join(' / ')}</p>
              </div>
              {project.links && (
                <div className="project-links">
                  {project.links.map((link) => (
                    <a key={`${project.title}-${link.url}`} href={link.url} target="_blank" rel="noreferrer">
                      {link.label || (link.type === 'paper' ? 'Paper' : 'Code')}
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
