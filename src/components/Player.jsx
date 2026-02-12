import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, Radio, ListMusic, Send, Check, Music } from 'lucide-react'
import AnimateIn from './AnimateIn'
import playerData from '../data/player.json'

export default function Player() {
  const [playing, setPlaying] = useState(false)
  const [showRequest, setShowRequest] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef(null)

  const { tracks } = playerData

  const waveBars = [
    0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 0.45, 1, 0.65, 0.85,
    0.5, 0.75, 0.55, 0.9, 0.4, 0.7, 0.6, 0.95, 0.5, 0.8,
    0.45, 0.7, 0.55, 0.85, 0.6, 0.9, 0.5, 0.75, 0.65, 0.8,
  ]

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false)
        setShowRequest(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [submitted])

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
    e.target.reset()
  }

  return (
    <section id="listen" className="w-full bg-navy text-white noise-overlay">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <AnimateIn>
          <div className="bg-gradient-to-br from-navy-dark to-navy-dark/80 rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">

              {/* Station logo with glow */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-crimson/20 rounded-2xl blur-xl" style={{ animation: 'pulse-ring 3s ease-in-out infinite' }} />
                <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
                  <img src="/logo.png" alt="Sentinel Radio" className="w-full h-auto drop-shadow-2xl" />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 bg-crimson/15 text-crimson text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-pulse" />
                    Live
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-1">{playerData.showName}</h3>
                <p className="text-white/50 mb-6">with {playerData.dj} &mdash; {playerData.description}</p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-5">
                  <button
                    onClick={() => setPlaying(!playing)}
                    className="w-14 h-14 bg-crimson hover:bg-crimson-dark hover:scale-105 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg shadow-crimson/30"
                  >
                    {playing ? (
                      <Pause className="w-6 h-6 text-white" fill="currentColor" />
                    ) : (
                      <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                    )}
                  </button>

                  {/* Equalizer bars — always visible, animated when playing */}
                  <div className="flex items-end gap-[3px] h-8">
                    {[0.6, 0.9, 0.5, 1, 0.7, 0.85, 0.55, 0.95].map((intensity, i) => (
                      <span
                        key={i}
                        className="w-[3px] rounded-full bg-crimson"
                        style={playing ? {
                          animation: `eq-bar ${0.4 + intensity * 0.4}s ease-in-out infinite`,
                          animationDelay: `${i * 0.08}s`,
                        } : {
                          height: `${intensity * 40}%`,
                          opacity: 0.3,
                          transition: 'all 0.4s ease',
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-white/40">
                    <Volume2 className="w-5 h-5" />
                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-gradient-to-r from-crimson to-crimson/60 rounded-full" />
                    </div>
                  </div>

                  <button
                    onClick={() => { setShowRequest(!showRequest); setSubmitted(false) }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                      showRequest
                        ? 'bg-crimson/15 border-crimson/40 text-crimson'
                        : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white/90'
                    }`}
                  >
                    <ListMusic className="w-4 h-4" />
                    Request a Song
                  </button>
                </div>
              </div>

              {/* Right side — waveform + track list */}
              <div className="hidden lg:flex flex-col w-64 shrink-0 border-l border-white/10 pl-8">
                {/* Waveform visualizer */}
                <div className="flex items-end justify-center gap-[2px] h-12 mb-5">
                  {waveBars.map((intensity, i) => (
                    <span
                      key={i}
                      className="w-[3px] rounded-full origin-bottom"
                      style={playing ? {
                        height: '100%',
                        background: `linear-gradient(to top, rgba(191,10,48,0.6), rgba(191,10,48,${0.15 + intensity * 0.25}))`,
                        animation: `wave-bar ${0.5 + intensity * 0.6}s ease-in-out infinite`,
                        animationDelay: `${i * 0.06}s`,
                      } : {
                        height: `${intensity * 100}%`,
                        background: 'rgba(255,255,255,0.1)',
                        transition: 'all 0.6s ease',
                      }}
                    />
                  ))}
                </div>

                {/* Track list */}
                <div className="flex flex-col gap-1">
                  {tracks.map((track, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        track.status === 'current'
                          ? 'bg-white/5'
                          : 'opacity-50'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-md bg-white/5 flex items-center justify-center shrink-0">
                        {track.status === 'current' ? (
                          <div className="flex items-end gap-[2px] h-3">
                            {[0.6, 1, 0.7].map((h, j) => (
                              <span
                                key={j}
                                className="w-[2px] rounded-full bg-crimson"
                                style={playing ? {
                                  animation: `eq-bar ${0.3 + h * 0.3}s ease-in-out infinite`,
                                  animationDelay: `${j * 0.1}s`,
                                } : {
                                  height: `${h * 60}%`,
                                  opacity: 0.5,
                                }}
                              />
                            ))}
                          </div>
                        ) : (
                          <Music className="w-3.5 h-3.5 text-white/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium truncate ${
                          track.status === 'current' ? 'text-white' : 'text-white/60'
                        }`}>
                          {track.title}
                        </p>
                        <p className="text-[11px] text-white/30 truncate">{track.artist}</p>
                      </div>
                      <span className={`text-[10px] shrink-0 ${
                        track.status === 'current'
                          ? 'text-crimson font-semibold'
                          : 'text-white/25'
                      }`}>
                        {track.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Song request form */}
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: showRequest ? '400px' : '0',
                opacity: showRequest ? 1 : 0,
              }}
            >
              <div className="border-t border-white/10 px-8 md:px-12 py-8">
                {submitted ? (
                  <div className="flex items-center justify-center gap-2 text-green-400 py-4">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">Request submitted!</span>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Song name *"
                      required
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-crimson/50 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Artist *"
                      required
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-crimson/50 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-crimson/50 transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Short message (optional)"
                      className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 text-sm focus:outline-none focus:border-crimson/50 transition-colors"
                    />
                    <div className="sm:col-span-2 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 bg-crimson hover:bg-crimson-dark px-6 py-2.5 rounded-lg text-white text-sm font-semibold transition-colors duration-200"
                      >
                        <Send className="w-4 h-4" />
                        Submit Request
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
