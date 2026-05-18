const hobbies = [
  'Judo (nationally ranked)',
  'Volleyball',
  'Game development',
  'Motorsports',
]

export default function Hobbies() {
  return (
    <section id="interests" className="section-block">
      <div className="section-grid">
        <h2>Interests</h2>
        <ul className="interest-list">
          {hobbies.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
