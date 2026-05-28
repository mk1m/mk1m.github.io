import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import TagLinks, { ActiveTagFilters, tagHref, tagsFromSearch } from './components/TagLinks'
import { blogPosts, researchNotes, tagCatalog } from './content/researchContent'

function filterByTags(items, selectedTags) {
  if (!selectedTags.length) return items
  return items.filter((item) => selectedTags.every((tag) => item.tags?.includes(tag)))
}

function useLocationSearch() {
  const [search, setSearch] = useState(window.location.search)

  useEffect(() => {
    const syncSearch = () => setSearch(window.location.search)
    const onClick = (event) => {
      const link = event.target.closest?.('a[href]')
      if (!link || link.origin !== window.location.origin || link.pathname !== window.location.pathname) return
      if (link.hash) return
      event.preventDefault()
      window.history.pushState(null, '', link.href)
      syncSearch()
    }
    window.addEventListener('popstate', syncSearch)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', syncSearch)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return search
}

function TagLine({ tags, selectedTags }) {
  if (!tags?.length) return null

  return (
    <p className="tag-line">
      {tags.map((tag, index) => (
        <span key={tag}>
          {index > 0 && ' / '}
          <a className={selectedTags.includes(tag) ? 'is-active' : undefined} href={tagHref('./blog.html', tag, selectedTags)}>
            {tag}
          </a>
        </span>
      ))}
    </p>
  )
}

export default function BlogPage() {
  const selectedTags = tagsFromSearch(useLocationSearch())
  const filteredNotes = filterByTags(researchNotes, selectedTags)
  const filteredPosts = filterByTags(blogPosts, selectedTags)
  const isFiltering = selectedTags.length > 0

  return (
    <div className="portfolio-shell">
      <Navbar page="blog" />
      <main id="top" className="blog-page">
        <header className="blog-hero">
          <p className="eyebrow"></p>
          <h1>Research Notes and Blog Posts</h1>
          <p className="hero-summary">
            Technical writing on LLM behavior, mechanistic interpretability, activation steering, representation
            engineering, alignment evaluations, and sleeper agent experiments.
          </p>
          <TagLinks tags={tagCatalog} basePath="./blog.html" selectedTags={selectedTags} />
          <ActiveTagFilters selectedTags={selectedTags} path="./blog.html" />
        </header>

        <section id="research-notes" className="section-block blog-section" aria-labelledby="notes-heading">
          <div className="section-grid">
            <div>
              <h2 id="notes-heading">Research Notes</h2>
              {isFiltering && <a className="clear-filter-link" href="./blog.html">Clear filters</a>}
            </div>
            <div className="stack">
              {filteredNotes.length > 0 ? (
                filteredNotes.map((note) => (
                  <article className="entry" key={note.title} id={note.slug}>
                    <div className="entry-main">
                      <p className="entry-label">{note.type}{note.status ? ` / ${note.status}` : ''}</p>
                      <h3>{note.title}</h3>
                      <p className="entry-text">{note.summary}</p>
                      <TagLine tags={note.tags} selectedTags={selectedTags} />
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
                <p className="empty-state">
                  {isFiltering ? 'No research notes match the selected tags yet.' : 'Research notes will appear here.'}
                </p>
              )}
            </div>
          </div>
        </section>

        <section id="blog-posts" className="section-block" aria-labelledby="posts-heading">
          <div className="section-grid">
            <div>
              <h2 id="posts-heading">Blog Posts</h2>
              {isFiltering && <a className="clear-filter-link" href="./blog.html">Clear filters</a>}
            </div>
            <div className="stack">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <article className="entry" key={post.title} id={post.slug}>
                    <div className="entry-main">
                      <h3>{post.title}</h3>
                      <p className="entry-org">{post.date}</p>
                      <p className="entry-text">{post.summary}</p>
                      <TagLine tags={post.tags} selectedTags={selectedTags} />
                    </div>
                    <div className="entry-meta">
                      <a href={`./blog-posts.html#${post.slug}`}>Read</a>
                      {post.github && (
                        <a href={post.github} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      )}
                    </div>
                  </article>
                ))
              ) : (
                <p className="empty-state">
                  {isFiltering ? 'No blog posts match the selected tags yet.' : 'Blog posts will appear here.'}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
