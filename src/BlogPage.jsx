import Navbar from './components/Navbar'
import Footer from './components/Footer'

const posts = [
  {
    title: 'Coming soon',
    date: 'Research notes',
    summary:
      'Short essays on machine learning evaluation, model reliability, AI safety, and applied research workflows.',
  },
]

export default function BlogPage() {
  return (
    <div className="portfolio-shell">
      <Navbar page="blog" />
      <main id="top" className="blog-page">
        <header className="blog-hero">
          <p className="eyebrow">Machine learning research notes</p>
          <h1>Blog</h1>
          <p className="hero-summary">
            A place for concise technical writing on ML evaluation, AI safety, interpretability,
            and research ideas I am actively thinking through.
          </p>
        </header>

        <section className="section-block blog-section" aria-labelledby="posts-heading">
          <div className="section-grid">
            <h2 id="posts-heading">Posts</h2>
            <div className="stack">
              {posts.map((post) => (
                <article className="entry" key={post.title}>
                  <div className="entry-main">
                    <h3>{post.title}</h3>
                    <p className="entry-org">{post.date}</p>
                    <p className="entry-text">{post.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
