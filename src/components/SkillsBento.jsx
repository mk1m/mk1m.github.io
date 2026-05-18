const skillGroups = [
  {
    title: 'Data Science and Experimentation',
    items: ['Statistical Modeling', 'Causal Inference', 'A/B Testing', 'Measurement Design', 'Feature Engineering', 'Time Series Forecasting'],
  },
  {
    title: 'Machine Learning and AI',
    items: ['Supervised Learning', 'Deep Learning', 'Reinforcement Learning', 'PPO', 'LLM Evaluation', 'AI Safety', 'Model Reliability', 'Interpretability', 'Multilingual NLP'],
  },
  {
    title: 'Languages and Tools',
    items: ['Python', 'SQL', 'Pandas', 'NumPy', 'scikit-learn', 'PyTorch', 'Azure', 'Power BI', 'Docker', 'Git', 'JavaScript', 'Angular'],
  },
]

export default function SkillsBento() {
  return (
    <section id="skills" className="section-block">
      <div className="section-grid">
        <h2>Skills</h2>
        <div className="stack">
          {skillGroups.map((group) => (
            <article className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.items.join(' / ')}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
