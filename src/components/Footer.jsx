import { useState } from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText('minoo.kim.25@ucl.ac.uk')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <footer id="contact" className="site-footer">
      <div>
        <h2>Minoo Kim</h2>
        <p>Data Science and Machine Learning / AI Safety </p>
      </div>
      <div className="footer-links">
        <button className="icon-link copy-email-button" type="button" onClick={copyEmail} aria-label="Copy email">
          <FiMail aria-hidden="true" />
          {copied && <span className="copy-tooltip">Email copied</span>}
        </button>
        <a
          className="icon-link"
          href="https://linkedin.com/in/minoo-kim-7894231aa"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FiLinkedin aria-hidden="true" />
        </a>
        <a
          className="icon-link"
          href="https://github.com/mk1m"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <FiGithub aria-hidden="true" />
        </a>
        <button className="text-link" type="button" onClick={copyEmail}>
          Request CV
        </button>
      </div>
    </footer>
  )
}
