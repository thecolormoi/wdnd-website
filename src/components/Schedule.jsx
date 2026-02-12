import { useState } from 'react'
import { Clock, User, Music } from 'lucide-react'
import AnimateIn from './AnimateIn'
import TiltCard from './TiltCard'
import scheduleData from '../data/schedule.json'

const shows = scheduleData.shows

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const dayAbbrevs = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri' }

export default function Schedule() {
  const [activeDay, setActiveDay] = useState('Monday')
  const filtered = shows.filter(s => s.day === activeDay)

  return (
    <section id="schedule" className="w-full bg-gray-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-12">
            <span className="inline-block text-crimson text-sm font-bold uppercase tracking-wider mb-3">On Air Weekly</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Show Schedule</h2>
            <p className="text-gray-500 text-lg">
              We broadcast 24/7. Here are our featured student-produced shows.
            </p>
          </div>
        </AnimateIn>

        <AnimateIn delay={150}>
          {/* Day tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-xl p-1.5 shadow-sm border border-gray-100">
              {days.map(day => (
                <button
                  key={day}
                  onClick={() => setActiveDay(day)}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    activeDay === day
                      ? 'bg-navy text-white shadow-md'
                      : 'text-gray-500 hover:text-navy hover:bg-gray-50'
                  }`}
                >
                  <span className="hidden sm:inline">{day}</span>
                  <span className="sm:hidden">{dayAbbrevs[day]}</span>
                </button>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Show cards */}
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {filtered.map((show, i) => (
            <AnimateIn key={`${activeDay}-${i}`} delay={i * 100}>
              <TiltCard>
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-navy/10 transition-all duration-200 group">
                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-navy/60 bg-navy/5 px-2.5 py-1 rounded-md">
                      <Music className="w-3 h-3" />
                      {show.genre}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {show.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-navy mb-1 group-hover:text-crimson transition-colors">{show.name}</h3>
                  <p className="flex items-center gap-1.5 text-sm text-gray-500">
                    <User className="w-3.5 h-3.5" />
                    {show.dj}
                  </p>
                </div>
              </TiltCard>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
