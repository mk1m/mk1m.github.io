import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MarkdownArticle from './components/MarkdownArticle'
import TagLinks, { ActiveTagFilters, tagHref, tagsFromSearch, tagsHref } from './components/TagLinks'
import { blogPosts, researchNotes, tagCatalog } from './content/researchContent'
import { useEffect, useState } from 'react'

const pageConfig = {
  notes: {
    title: 'Research Notes',
    eyebrow: 'Experiments and reading notes',
    summary:
      'Technical notes on machine learning, AI safety, and data science topics, including paper reviews and discussions I use for learning.',
    empty: 'Research notes will appear here.',
    items: researchNotes,
    path: './research-notes.html',
  },
  posts: {
    title: 'Blog Posts',
    eyebrow: 'Technical essays',
    summary:
      'Longer-form essays and reflections on alignment, model evaluation, interpretability, and research workflows.',
    empty: 'Blog posts will appear here.',
    items: blogPosts,
    path: './blog-posts.html',
  },
}

function getSelectedItem(items, hash) {
  const slug = hash.replace(/^#/, '').split('/')[0]
  return items.find((item) => item.slug === slug)
}

function WritingList({ items, empty, path, selectedTags }) {
  if (!items.length) return <p className="empty-state">{empty}</p>

  return (
    <div className="stack">
      {items.map((item) => (
        <article className="entry" key={item.slug} id={item.slug}>
          <div className="entry-main">
            <p className="entry-label">{item.type}{item.status ? ` / ${item.status}` : ''}</p>
            <h3>{item.title}</h3>
            {item.summary && <p className="entry-text">{item.summary}</p>}
            {item.tags?.length > 0 && (
              <p className="tag-line">
                {item.tags.map((tag, index) => (
                  <span key={tag}>
                    {index > 0 && ' / '}
                    <a className={selectedTags.includes(tag) ? 'is-active' : undefined} href={tagHref(path, tag, selectedTags)}>
                      {tag}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </div>
          <div className="entry-meta">
            {item.date && <span>{item.date}</span>}
            <a href={`#${item.slug}`}>Read</a>
            {item.github && (
              <a href={item.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

export default function WritingPage({ kind = 'notes' }) {
  const config = pageConfig[kind]
  const [hash, setHash] = useState(window.location.hash)
  const [search, setSearch] = useState(window.location.search)
  const selectedTags = tagsFromSearch(search)
  const selectedItem = getSelectedItem(config.items, hash)
  const filteredItems = selectedTags.length
    ? config.items.filter((item) => selectedTags.every((tag) => item.tags?.includes(tag)))
    : config.items

  useEffect(() => {
    const syncLocation = () => {
      setHash(window.location.hash)
      setSearch(window.location.search)
    }
    const onClick = (event) => {
      const link = event.target.closest?.('a[href]')
      if (!link || link.origin !== window.location.origin || link.pathname !== window.location.pathname) return
      if (link.hash) {
        window.setTimeout(syncLocation, 0)
        return
      }
      event.preventDefault()
      window.history.pushState(null, '', link.href)
      syncLocation()
    }
    const onHashChange = syncLocation
    const onPopState = syncLocation
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onPopState)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onPopState)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    if (!selectedItem) return
    const [, anchor] = hash.replace(/^#/, '').split('/')
    if (!anchor) return
    window.requestAnimationFrame(() => {
      document.getElementById(anchor)?.scrollIntoView({ block: 'start' })
    })
  }, [hash, selectedItem])

  return (
    <div className="portfolio-shell">
      <Navbar page="blog" />
      <main id="top" className="blog-page">
        <header className="blog-hero">
          <p className="eyebrow">{config.eyebrow}</p>
          <h1>{config.title}</h1>
          <p className="hero-summary">{config.summary}</p>
          <TagLinks tags={tagCatalog} basePath={config.path} selectedTags={selectedTags} />
          <ActiveTagFilters selectedTags={selectedTags} path={config.path} />
        </header>

        {selectedItem ? (
          <section className="section-block article-shell">
            <div className="section-grid">
              <a href={selectedTags.length ? tagsHref(config.path, selectedTags) : config.path} className="back-link">
                All {config.title}
              </a>
              <MarkdownArticle item={selectedItem} />
            </div>
          </section>
        ) : (
          <section className="section-block blog-section" aria-labelledby="writing-heading">
            <div className="section-grid">
              <div>
                <h2 id="writing-heading">All {config.title}</h2>
                {selectedTags.length > 0 && <a className="clear-filter-link" href={config.path}>Clear filters</a>}
              </div>
              <WritingList
                items={filteredItems}
                empty={selectedTags.length ? `No ${config.title.toLowerCase()} match the selected tags yet.` : config.empty}
                path={config.path}
                selectedTags={selectedTags}
              />
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
