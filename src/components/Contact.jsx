import { useState } from 'react'
import { Mail, MapPin, Music, Check, AlertCircle } from 'lucide-react'
import AnimateIn from './AnimateIn'
import contactData from '../data/contact.json'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('submitting')

    const form = e.target
    const data = new FormData(form)

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (!res.ok) throw new Error('Submission failed')
      setStatus('success')
      form.reset()
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 4000)
    }
  }

  return (
    <section id="contact" className="w-full bg-gray-50 py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimateIn>
          <div className="text-center mb-12">
            <span className="inline-block text-crimson text-sm font-bold uppercase tracking-wider mb-3">Say Hello</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">Get in Touch</h2>
            <p className="text-gray-500 text-lg">
              Want to join the station, request a song, or have questions? Reach out!
            </p>
          </div>
        </AnimateIn>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Contact info sidebar */}
              <AnimateIn className="md:col-span-2 bg-navy p-8 text-white" delay={100}>
                <h3 className="text-lg font-bold mb-6">Contact Info</h3>
                <div className="grid gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-crimson" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white/70 mb-0.5">Email</h4>
                      <p className="text-white">{contactData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <Music className="w-5 h-5 text-crimson" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white/70 mb-0.5">Artist Submissions</h4>
                      <p className="text-white">{contactData.artistEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-crimson" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white/70 mb-0.5">Location</h4>
                      <p className="text-white">{contactData.address}</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>

              {/* Form */}
              <AnimateIn className="md:col-span-3 p-8" delay={200}>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>Don't fill this out: <input name="bot-field" /></label>
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm transition-shadow"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm transition-shadow"
                    />
                  </div>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Your message or song request..."
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy text-sm resize-none transition-shadow"
                  />

                  {status === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <Check className="w-4 h-4" />
                      Message sent! We'll get back to you soon.
                    </div>
                  )}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 text-sm font-medium">
                      <AlertCircle className="w-4 h-4" />
                      Something went wrong. Please try again or email us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="bg-crimson hover:bg-crimson-dark hover:scale-[1.02] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-md shadow-crimson/20 w-full sm:w-auto disabled:opacity-60 disabled:hover:scale-100"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
