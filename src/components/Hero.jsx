import { Play, Radio, ChevronDown } from 'lucide-react'
import AnimateIn from './AnimateIn'
import heroData from '../data/hero.json'

export default function Hero() {
  return (
    <section className="w-full relative bg-navy-dark overflow-hidden noise-overlay">
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0">
        <img
          src="/hero-radio.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ animation: 'ken-burns 25s ease-in-out infinite' }}
        />
      </div>

      {/* Dark overlay with navy tint for text readability */}
      <div className="absolute inset-0 bg-navy-dark/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-navy-dark/70" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 pt-32 md:pt-44 pb-28 md:pb-40 text-center">
        <AnimateIn delay={100}>
          {/* Shimmer badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-8 border border-white/10 relative overflow-hidden">
            <Radio className="w-4 h-4 text-crimson relative z-10" />
            <span className="relative z-10">{heroData.badge}</span>
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{ animation: 'shimmer 3s ease-in-out infinite', animationDelay: '1s' }}
            />
          </div>
        </AnimateIn>

        <AnimateIn delay={200}>
          <h1
            className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4"
            style={{ textShadow: '0 0 40px rgba(191, 10, 48, 0.3), 0 0 80px rgba(191, 10, 48, 0.1)' }}
          >
            WDND
          </h1>
        </AnimateIn>

        <AnimateIn delay={300}>
          <p
            className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(135deg, #bf0a30, #e8334e, #bf0a30)' }}
          >
            101.7 FM
          </p>
        </AnimateIn>

        <AnimateIn delay={400}>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10">
            {heroData.tagline}
          </p>
        </AnimateIn>

        <AnimateIn delay={500}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#listen"
              className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark hover:scale-105 text-white font-bold text-lg px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-crimson/25"
            >
              <Play className="w-5 h-5" fill="currentColor" />
              Listen Live
            </a>
            <a
              href="#schedule"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 hover:scale-105 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10"
            >
              View Schedule
            </a>
          </div>
        </AnimateIn>

        {/* Scroll indicator */}
        <div className="mt-14" style={{ animation: 'bounce-down 2s ease-in-out infinite' }}>
          <ChevronDown className="w-6 h-6 text-white/40 mx-auto" />
        </div>
      </div>
    </section>
  )
}
