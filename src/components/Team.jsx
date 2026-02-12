import { useState } from 'react'
import { Music, Clock } from 'lucide-react'
import AnimateIn from './AnimateIn'
import TiltCard from './TiltCard'
import teamData from '../data/team.json'

const djs = teamData.members
import iconMap from '../utils/iconMap'

export default function Team() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section id="team" className="w-full py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-14">
            <span className="inline-block text-crimson text-sm font-bold uppercase tracking-wider mb-3">Meet the Crew</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Our DJs & Team</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              The talented students behind the mic who bring WDND to life every week.
            </p>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {djs.map((dj, i) => {
            const Icon = iconMap[dj.icon] || iconMap.Radio
            const isExpanded = expanded === i

            return (
              <AnimateIn key={dj.name} delay={i * 75}>
                <TiltCard>
                  <div
                    className="relative bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group overflow-hidden cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : i)}
                  >
                    {/* Gradient accent bar */}
                    <div className={`h-1.5 bg-gradient-to-r ${dj.color}`} />

                    <div className="p-6">
                      {/* Avatar */}
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${dj.color} flex items-center justify-center mb-4 shadow-md group-hover:scale-105 transition-transform duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Name & role */}
                      <h3 className="text-lg font-bold text-navy group-hover:text-crimson transition-colors duration-200">
                        {dj.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">{dj.realName}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-navy/60 bg-navy/5 px-2.5 py-1 rounded-md">
                          <Music className="w-3 h-3" />
                          {dj.genre}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-crimson/70 bg-crimson/5 px-2.5 py-1 rounded-md">
                          <Clock className="w-3 h-3" />
                          {dj.schedule}
                        </span>
                      </div>

                      {/* Show name */}
                      <p className="text-sm font-medium text-navy/80">{dj.show}</p>

                      {/* Expandable bio */}
                      <div
                        className="overflow-hidden transition-all duration-300 ease-in-out"
                        style={{
                          maxHeight: isExpanded ? '200px' : '0',
                          opacity: isExpanded ? 1 : 0,
                          marginTop: isExpanded ? '12px' : '0',
                        }}
                      >
                        <p className="text-sm text-gray-500 leading-relaxed">{dj.bio}</p>
                      </div>

                      {/* Expand hint */}
                      <div className={`mt-3 text-xs font-medium transition-colors duration-200 ${isExpanded ? 'text-crimson' : 'text-gray-300 group-hover:text-gray-400'}`}>
                        {isExpanded ? 'Show less' : 'Read more'}
                      </div>
                    </div>
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
