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
      <div className="hero-layout">
        <div className="hero-inner">
          <p className="eyebrow">AI safety / mechanistic interpretability / model evaluation</p>
          <h1>Minoo Kim</h1>
          <p className="hero-title">MSc Data Science and Machine Learning @ UCL.</p>
          <p className="hero-summary">
            Studying LLM behavior, alignment failures, and representation-level interventions. My current work centers on
            sleeper agent behavior, activation steering, safety evaluations, and whether model internals can be changed
            in ways that produce robust behavioral improvements.
          </p>
          <div className="link-row" aria-label="Contact and profile links">
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
        </div>
      </div>

      <section id="about" className="about-intro" aria-labelledby="about-heading">
        <h2 id="about-heading">Technical Bio</h2>
        <div>
          <p>
            I am an <b>MSc student at University College London</b> and a <b>UC Berkeley Data Science</b> alum. I work across AI
            safety, model evaluation, interpretability, and applied ML systems, with a preference for small experiments
            that make model behavior easier to inspect and falsify.
          </p>
          <p>
            At Locai Labs, I am researching language model reliability, sleeper-agent behavior, robustness under
            different attack profiles, and inference-time interventions. This site is organized as a technical notebook, containing
            research notes, experiment writeups, and project artifacts.
          </p>
        </div>
      </section>
    </main>
  )
}
