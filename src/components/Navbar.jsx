import { useState, useEffect } from 'react'
import { Radio, Menu, X } from 'lucide-react'

const sections = ['schedule', 'about', 'team', 'contact']

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className={`w-full fixed top-0 z-50 text-white transition-all duration-300 ${
      scrolled ? 'bg-navy-dark/90 backdrop-blur-xl shadow-lg shadow-black/10' : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img src="/logo.png" alt="WDND" className="h-8 w-auto transition-transform duration-300 group-hover:scale-110" />
          <div>
            <span className="text-xl font-extrabold tracking-tight">WDND</span>
            <span className="text-sm text-white/60 ml-2">101.7 FM</span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {sections.map(id => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav-link text-sm font-medium transition ${
                activeSection === id ? 'active text-white' : 'text-white/70 hover:text-white'
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a href="#listen" className="bg-crimson hover:bg-crimson-dark hover:scale-105 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md shadow-crimson/20">
            Listen Live
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-dark/95 backdrop-blur-xl border-t border-white/10 px-6 pb-4 flex flex-col gap-3">
          {sections.map(id => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`text-sm font-medium py-2 transition ${
                activeSection === id ? 'text-white' : 'text-white/80 hover:text-white'
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          <a href="#listen" onClick={() => setOpen(false)} className="bg-crimson hover:bg-crimson-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition text-center">
            Listen Live
          </a>
        </div>
      )}
    </nav>
  )
}
