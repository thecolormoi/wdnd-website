import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Player from './components/Player'
import Schedule from './components/Schedule'
import About from './components/About'
import LiveSessions from './components/LiveSessions'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function SectionDivider({ from = 'white', to = 'gray-50' }) {
  const colors = {
    'white': '#ffffff',
    'gray-50': '#f9fafb',
    'navy': '#002868',
    'navy-dark': '#001a45',
  }
  return (
    <div className="w-full h-16 -mt-1 relative" style={{ background: colors[from] }}>
      <svg viewBox="0 0 1440 64" fill="none" className="absolute bottom-0 w-full h-full" preserveAspectRatio="none">
        <path d="M0 32C240 64 480 64 720 48C960 32 1200 0 1440 16V64H0V32Z" fill={colors[to]} />
      </svg>
    </div>
  )
}

function App() {
  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Player />
      <SectionDivider from="navy" to="gray-50" />
      <Schedule />
      <SectionDivider from="gray-50" to="white" />
      <About />
      <SectionDivider from="white" to="gray-50" />
      <LiveSessions />
      <SectionDivider from="gray-50" to="white" />
      <Team />
      <SectionDivider from="white" to="gray-50" />
      <Contact />
      <SectionDivider from="gray-50" to="navy-dark" />
      <Footer />
    </div>
  )
}

export default App
