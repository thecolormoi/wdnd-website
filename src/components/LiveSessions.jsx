import { Send } from 'lucide-react'
import AnimateIn from './AnimateIn'
import sessionsData from '../data/live-sessions.json'
import iconMap from '../utils/iconMap'

export default function LiveSessions() {
  return (
    <section id="sessions" className="w-full bg-gray-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="inline-block text-crimson text-sm font-bold uppercase tracking-wider mb-3">Live at WDND</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">{sessionsData.title}</h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              {sessionsData.description}
            </p>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {sessionsData.highlights.map((highlight, i) => {
            const Icon = iconMap[highlight.icon] || iconMap.Radio
            return (
              <AnimateIn key={highlight.title} delay={i * 100}>
                <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-crimson/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-crimson" />
                  </div>
                  <h3 className="font-bold text-navy text-lg mb-2">{highlight.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{highlight.description}</p>
                </div>
              </AnimateIn>
            )
          })}
        </div>

        <AnimateIn delay={300}>
          <div className="bg-navy rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">Are you an artist?</h3>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-8">
              {sessionsData.ctaText}
            </p>
            <a
              href={`mailto:${sessionsData.artistEmail}`}
              className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark hover:scale-105 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-crimson/25"
            >
              <Send className="w-5 h-5" />
              Submit Your Music
            </a>
            <p className="text-white/30 text-sm mt-4">{sessionsData.artistEmail}</p>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
