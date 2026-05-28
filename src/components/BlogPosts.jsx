import { blogPosts } from '../content/researchContent'
import { tagHref } from './TagLinks'

export default function BlogPosts() {
  return (
    <section id="posts" className="section-block">
      <div className="section-grid">
        <div>
          <p className="section-kicker">Blog Posts</p>
          <h2>Technical essays</h2>
        </div>
        <div className="stack">
          <a className="text-link" href="./blog-posts.html">
            View all blog posts
          </a>

          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <article className="entry" key={post.title}>
                <div className="entry-main">
                  <h3>{post.title}</h3>
                  <p className="entry-text">{post.summary}</p>
                  <p className="tag-line">
                    {post.tags.map((tag, index) => (
                      <span key={tag}>
                        {index > 0 && ' / '}
                        <a href={tagHref('./blog-posts.html', tag)}>{tag}</a>
                      </span>
                    ))}
                  </p>
                </div>
                <div className="entry-meta">
                  <span>{post.date}</span>
                  <a href={`./blog-posts.html#${post.slug}`}>Read</a>
                </div>
              </article>
            ))
          ) : (
            <p className="empty-state">Blog posts will appear here.</p>
          )}
        </div>
      </div>
    </section>
  )
}
