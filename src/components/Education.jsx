const education = [
  {
    school: 'University College London',
    degree: 'MSc Data Science and Machine Learning',
    location: 'London, England',
    period: 'Expected Sep 2026',
    coursework:
      'Supervised Learning, Network Science, Graphical Models, Applied Machine Learning, Reinforcement Learning, Statistical NLP, Open-Endedness and General Intelligence.',
  },
  {
    school: 'University of California, Berkeley',
    degree: 'BA Data Science; Business and Industrial Analytics',
    location: 'Berkeley, CA',
    period: 'Dec 2024',
    coursework:
      'Probability and Statistics, Data Mining and Analytics, Inference, Time Series.',
  },
]

export default function Education() {
  return (
    <section id="education" className="section-block">
      <div className="section-grid">
        <h2>Education</h2>
        <div className="stack">
          {education.map((item) => (
            <article className="entry" key={item.school}>
              <div className="entry-main">
                <h3>{item.degree}</h3>
                <p className="entry-org">{item.school}</p>
                <p className="entry-text">Coursework: {item.coursework}</p>
              </div>
              <div className="entry-meta">
                <span>{item.location}</span>
                <span>{item.period}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
