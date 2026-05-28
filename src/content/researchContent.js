export { blogPosts, researchNotes, tagCatalog } from './writing'

export const featuredProjects = [
  {
    title: 'Morphological Safety Control',
    subtitle: 'RL safety optimization',
    description:
      'Evolved voxel-based soft robots constrained away from unsafe tasks, using Genetic Algorithms and PPO across EvoGym environments.',
    tags: ['AI safety', 'PPO', 'genetic algorithms', 'evaluations'],
    links: [
      { label: 'Code', url: 'https://github.com/mk1m/comp0258-evogym-project' },
      {
        label: 'Paper',
        url: 'https://drive.google.com/file/d/1t76-Q_4E-TbWv_Jf9ipq2WhvXLclUfph/view?usp=sharing',
      },
    ],
  },
  {
    title: 'Multilingual Hallucination Detection',
    subtitle: 'LLM evaluation',
    description:
      'Benchmarked hallucination detection across low-resource and high-resource language pairs with structured prompts.',
    tags: ['LLMs', 'evaluations', 'hallucinations', 'refusals'],
    links: [
      { label: 'Code', url: 'https://github.com/mk1m/multilingual-hallucination-detect' },
      {
        label: 'Paper',
        url: 'https://drive.google.com/file/d/1SF7M3-O-i0mKkDvtLw26D6iudFSSRbog/view?usp=sharing',
      },
    ],
  },
  {
    title: 'Agentic Forecaster',
    subtitle: 'Forecasting agents',
    description:
      'LLM-driven forecasting agents combining retrieval and probabilistic reasoning for prediction-market research.',
    tags: ['LLM agents', 'forecasting', 'evaluations'],
    links: [{ label: 'Code', url: 'https://github.com/mk1m/agentic-market-intelligence' }],
  },
]
