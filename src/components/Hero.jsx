export default function Hero() {
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
          <a href="mailto:minoo.kim.25@ucl.ac.uk">Email</a>
          <a href="https://linkedin.com/in/minoo-kim-7894231aa" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/mk1m" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="/Minoo_Kim_Resume.pdf" target="_blank" rel="noreferrer">
            CV
          </a>
        </div>
      </div>

      <section id="about" className="about-intro" aria-labelledby="about-heading">
        <h2 id="about-heading">About</h2>
        <div>
          <p>
            I work across machine learning evaluation, AI safety, and data systems.
            My current research at Locai Labs studies sleeper-agent behavior in
            language models, robustness under code-vulnerability settings, and
            inference-time interventions for reliability control.
          </p>
          <p>
            I am interested in practical methods that make models easier to evaluate,
            monitor, and deploy responsibly: LLM safety evaluation, model reliability,
            interpretability, multilingual NLP, and production analytics.
          </p>
        </div>
      </section>
    </main>
  )
}
