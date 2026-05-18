import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Education', href: '#education' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Interests', href: '#interests' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#top" className="site-mark" onClick={() => setMobileOpen(false)}>
          Minoo Kim
        </a>

        <div className="nav-links">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
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
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
