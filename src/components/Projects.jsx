const projectSections = [
  {
    title: 'Machine Learning / AI Safety Research',
    projects: [
      {
        title: 'Morphological Safety Control',
        subtitle: 'RL safety optimization',
        description:
          'Evolved voxel-based soft robots physically constrained from unsafe tasks, using Genetic Algorithms and PPO across five EvoGym environments.',
        tags: ['Python', 'PPO', 'Genetic Algorithms', 'AI Safety', 'EvoGym'],
        links: [
          { type: 'github', url: 'https://github.com/mk1m/comp0258-evogym-project' },
          {
            type: 'paper',
            url: 'https://drive.google.com/file/d/1t76-Q_4E-TbWv_Jf9ipq2WhvXLclUfph/view?usp=sharing',
          },
          {
            type: 'notebook',
            url: 'https://drive.google.com/file/d/12axBkgbnyGp6A3y-lL3F4XK9Xvea3i9g/view?usp=sharing',
            label: 'Demo',
          },
        ],
      },
      {
        title: 'Multilingual Hallucination Detection',
        subtitle: 'LLM evaluation',
        description:
          'Benchmarked hallucination detection across 16 translation directions with Minos-v1, including low-resource and high-resource language performance references and structured prompting.',
        tags: ['Python', 'PyTorch', 'NLP', 'LLMs'],
        links: [
          { type: 'github', url: 'https://github.com/mk1m/multilingual-hallucination-detect' },
          {
            type: 'paper',
            url: 'https://drive.google.com/file/d/1DrRkJs3p5yyuLo1TGMup4dYz81EGMZb2/view?usp=sharing',
          },
        ],
      },
    ],
  },
  {
    title: 'Independent Software Projects',
    projects: [
      {
        title: 'Agentic Forecaster',
        subtitle: 'Forecasting agents',
        description:
          'LLM-driven forecasting agents for prediction-market research, combining retrieval and probabilistic reasoning for decision-making under uncertainty.',
        tags: ['Python', 'LLM Agents', 'Forecasting'],
        links: [{ type: 'github', url: 'https://github.com/mk1m/agentic-market-intelligence' }],
      },
      {
        title: 'Game Development',
        subtitle: 'Software projects',
        description:
          'Built and shipped 2D dodge and platformer games, including Avoirus and Coruna, using Unity and C#.',
        tags: ['C#', 'Unity'],
        links: [
          { type: 'github', url: 'https://github.com/mk1m/Avoirus', label: 'Avoirus' },
          { type: 'github', url: 'https://github.com/mk1m/Coruna', label: 'Coruna' },
        ],
      },
    ],
  },
  {
    title: 'Academic Data Science',
    projects: [
      {
        title: 'Modeling Election Outcomes',
        subtitle: 'Causal inference project',
        description:
          'Applied inverse probability weighting, GLMs, and decision trees to estimate candidate-endorsement effects and model electoral strategy.',
        tags: ['Python', 'Causal Inference', 'GLM', 'Supervised Learning'],
        links: [
          {
            type: 'paper',
            url: 'https://drive.google.com/file/d/1ft01c7rKjnjkQSw_L94jU10Dbp65zTge/view?usp=sharing',
          },
        ],
      },
    ],
  },
  {
    title: 'Earlier Exploratory Work',
    projects: [
      {
        title: 'Olfaction Device',
        subtitle: 'Hardware research',
        description:
          'Open-source prototype for identifying odorants and transmitting smell information through VOC sensors and Firebase.',
        tags: ['Arduino', 'Python'],
        links: [
          {
            type: 'paper',
            url: 'https://drive.google.com/file/d/11-zRhFhA0C8A1DJwwGf2ovr8bKF8FKUD/view?usp=sharing',
          },
        ],
      },
    ],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="section-block">
      <div className="section-grid">
        <h2>Selected Projects</h2>
        <div className="project-list">
          {projectSections.map((section) => (
            <div className="project-group" key={section.title}>
              <h3 className="project-section-title">{section.title}</h3>
              {section.projects.map((project) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
