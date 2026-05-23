import { useState, useEffect } from 'react'

export default function Navbar({ page = 'home' }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const homePrefix = page === 'home' ? '' : './'
  const navLinks = [
    { label: 'About', href: `${homePrefix}#about` },
    { label: 'Education', href: `${homePrefix}#education` },
    { label: 'Experience', href: `${homePrefix}#experience` },
    { label: 'Projects', href: `${homePrefix}#projects` },
    { label: 'Skills', href: `${homePrefix}#skills` },
    { label: 'Interests', href: `${homePrefix}#interests` },
    { label: 'Blog', href: './blog.html', featured: true },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href={page === 'home' ? '#top' : './'} className="site-mark" onClick={() => setMobileOpen(false)}>
          Minoo Kim
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={link.featured ? 'nav-featured' : undefined}>
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="nav-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {mobileOpen && (
        <div className="mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={link.featured ? 'nav-featured' : undefined}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
