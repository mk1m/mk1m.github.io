const skillGroups = [
  {
    title: 'Research',
    items: ['LLM evaluation', 'AI safety', 'mechanistic interpretability',],
  },
  {
    title: 'Engineering',
    items: ['Python', 'PyTorch', 'NumPy', 'Pandas', 'SQL', 'Git'],
  },
]

const hobbies = ['Judo (nationally ranked)', 'Volleyball', 'Game Development', 'Motorsports']

export default function SkillsAndHobbies() {
  return (
    <section id="skills" className="section-block">
      <div className="section-grid">
        <div>
          <p className="section-kicker">Skills and Hobbies</p>
          <h2>Tools and Interests</h2>
        </div>
        <div className="stack compact-stack">
          {skillGroups.map((group) => (
            <article className="skill-group compact-skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.items.join(' / ')}</p>
            </article>
          ))}
          <article className="skill-group compact-skill-group">
            <h3>Hobbies</h3>
            <p>{hobbies.join(' / ')}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
