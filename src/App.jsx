import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ResearchNotes from './components/ResearchNotes'
import BlogPosts from './components/BlogPosts'
import Projects from './components/Projects'
import SkillsAndHobbies from './components/SkillsAndHobbies'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="portfolio-shell">
      <Navbar />
      <Hero />
      <ResearchNotes />
      <BlogPosts />
      <Projects />
      <SkillsAndHobbies />
      <Footer />
    </div>
  )
}
