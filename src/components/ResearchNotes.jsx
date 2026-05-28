import { researchNotes } from '../content/researchContent'
import { tagHref } from './TagLinks'

export default function ResearchNotes() {
  return (
    <section id="notes" className="section-block">
      <div className="section-grid">
        <div>
          <p className="section-kicker">Research Notes</p>
          <h2>Experiments and reading notes</h2>
        </div>
        <div className="stack">
          <a className="text-link" href="./research-notes.html">
            View all research notes
          </a>

          {researchNotes.length > 0 ? (
            researchNotes.map((note) => (
              <article className="entry note-entry" key={note.title}>
                <div className="entry-main">
                  <p className="entry-label">{note.type}{note.status ? ` / ${note.status}` : ''}</p>
                  <h3>{note.title}</h3>
                  <p className="entry-text">{note.summary}</p>
                  <p className="tag-line">
                    {note.tags.map((tag, index) => (
                      <span key={tag}>
                        {index > 0 && ' / '}
                        <a href={tagHref('./research-notes.html', tag)}>{tag}</a>
                      </span>
                    ))}
                  </p>
                </div>
                <div className="entry-meta">
                  <span>{note.date}</span>
                  <a href={`./research-notes.html#${note.slug}`}>Read</a>
                  {note.github && (
                    <a href={note.github} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                  )}
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">Research notes will appear here.</p>
          )}
        </div>
      </div>
    </section>
  )
}
