import { useState } from 'react'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText('minoo.kim.25@ucl.ac.uk')
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main id="top" className="hero">
      <div className="hero-inner">
        <p className="eyebrow">Palo Alto, CA / London, UK</p>
        <h1>Minoo Kim</h1>
        <p className="hero-title">
          MSc Data Science and Machine Learning, University College London
        </p>
        <p className="hero-summary">
          Data scientist and ML researcher focused on model evaluation, reliability, AI
          safety, and operational analytics. Previously studied Data Science at UC
          Berkeley.
        </p>
        <div className="link-row" aria-label="Contact links">
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
          <button type="button" onClick={copyEmail}>
            Request CV
          </button>
        </div>
      </div>

      <section id="about" className="about-intro" aria-labelledby="about-heading">
        <h2 id="about-heading">About</h2>
        <div>
          <p>
            Current DSML MSc student @ UCL. I work across machine learning evaluation, AI safety, and data systems.
            My current research at Locai Labs studies sleeper-agent behavior in
            language models, robustness under code-vulnerability settings, and
            inference-time interventions.
          </p>
          <p>
            I am interested in LLM safety evaluation, model reliability,
            interpretability, multilingual NLP, and production analytics.
            I've recently been hooked into AI safety research, specifically investigating misaligned AI and its capabilities.
          </p>
        </div>
      </section>
    </main>
  )
}
