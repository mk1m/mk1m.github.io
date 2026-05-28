import { featuredProjects } from '../content/researchContent'

export default function Projects() {
  return (
    <section id="projects" className="section-block">
      <div className="section-grid">
        <div>
          <p className="section-kicker">Projects</p>
          <h2>Selected technical work</h2>
        </div>
        <div className="project-list">
          {featuredProjects.map((project) => (
            <article className="project-entry" key={project.title}>
              <div>
                <p className="entry-label">{project.subtitle}</p>
                <h3>{project.title}</h3>
                <p className="entry-text">{project.description}</p>
                <p className="tag-line">{project.tags.join(' / ')}</p>
              </div>
              <div className="project-links">
                {project.links.map((link) => (
                  <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
