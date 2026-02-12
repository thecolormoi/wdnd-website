import { Radio, Heart } from 'lucide-react'
import footerData from '../data/footer.json'

export default function Footer() {
  return (
    <footer className="w-full bg-navy-dark text-white noise-overlay">
      {/* Gradient top edge */}
      <div className="h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="WDND" className="h-6 w-auto" />
              <span className="text-xl font-extrabold tracking-tight">WDND</span>
              <span className="text-sm text-white/50">101.7 FM</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-3">
              {footerData.description}
            </p>
            <span
              className="text-lg font-black text-crimson"
              style={{ textShadow: '0 0 7px rgba(191, 10, 48, 0.6), 0 0 20px rgba(191, 10, 48, 0.3)' }}
            >
              {footerData.hashtag}
            </span>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4">Quick Links</h4>
            <nav className="grid gap-2">
              <a href="#listen" className="text-sm text-white/40 hover:text-white transition">Listen Live</a>
              <a href="#schedule" className="text-sm text-white/40 hover:text-white transition">Show Schedule</a>
              <a href="#about" className="text-sm text-white/40 hover:text-white transition">About Us</a>
              <a href="#team" className="text-sm text-white/40 hover:text-white transition">Our DJs</a>
              <a href="#contact" className="text-sm text-white/40 hover:text-white transition">Contact</a>
            </nav>
          </div>

          {/* On air info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4">Broadcast Hours</h4>
            <p className="text-sm text-white/40 leading-relaxed">
              {footerData.broadcastHours.split('\n').map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} WDND Radio. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-crimson" /> by students
          </p>
        </div>
      </div>
    </footer>
  )
}
