import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BioSwitcher from './components/BioSwitcher'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import SkillsBento from './components/SkillsBento'
import Hobbies from './components/Hobbies'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <BioSwitcher />
      <Timeline />
      <Projects />
      <SkillsBento />
      <Hobbies />
      <Footer />
    </div>
  )
}
