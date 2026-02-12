import AnimateIn from './AnimateIn'
import TiltCard from './TiltCard'
import aboutData from '../data/about.json'
import iconMap from '../utils/iconMap'

export default function About() {
  return (
    <section id="about" className="w-full py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="inline-block text-crimson text-sm font-bold uppercase tracking-wider mb-3">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">About WDND</h2>
            <p className="text-gray-500 text-lg max-w-3xl mx-auto">
              {aboutData.intro}
            </p>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {aboutData.features.map((feature, i) => {
            const Icon = iconMap[feature.icon] || iconMap.Radio
            return (
              <AnimateIn key={feature.title} delay={i * 100}>
                <TiltCard>
                  <div className="relative bg-white border border-gray-100 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden">
                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="w-12 h-12 bg-navy/5 group-hover:bg-navy/10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-navy group-hover:text-crimson transition-colors duration-300" />
                    </div>
                    <h3 className="font-bold text-navy text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </TiltCard>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
