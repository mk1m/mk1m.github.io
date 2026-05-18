import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Education from './components/Education'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import SkillsBento from './components/SkillsBento'
import Hobbies from './components/Hobbies'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="portfolio-shell">
      <Navbar />
      <Hero />
      <Education />
      <Timeline />
      <Projects />
      <SkillsBento />
      <Hobbies />
      <Footer />
    </div>
  )
}
