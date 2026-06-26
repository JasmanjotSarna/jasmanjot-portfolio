'use client'

import { useState } from 'react'
import { Send, MapPin, Mail, Linkedin, Github } from 'lucide-react'
import SectionHeader from './SectionHeader'
import Reveal from './Reveal'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Wire this up to an email service (e.g. Resend, Formspree) or a backend route.
    await new Promise((r) => setTimeout(r, 1100))
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  const info = [
    { icon: MapPin, label: 'Location', value: 'Jaipur, India', href: undefined },
    {
      icon: Mail,
      label: 'Email',
      value: 'jasmanjotsinghsarna@gmail.com',
      href: 'mailto:jasmanjotsinghsarna@gmail.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'jasmanjot-singh-sarna',
      href: 'https://www.linkedin.com/in/jasmanjot-singh-sarna-0a2539286/',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'JasmanjotSarna',
      href: 'https://github.com/JasmanjotSarna',
    },
  ]

  return (
    <section id="contact" className="py-24 md:py-32 container-grid">
      <SectionHeader
        index="// 06"
        kicker="Let's Talk"
        title="Get in touch"
        description="Open to internships, full-time AI/ML and data roles, and collaborations. If there's a fit, I'll respond within a day."
      />

      <div className="grid md:grid-cols-2 gap-14">
        <Reveal className="space-y-7">
          {info.map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="w-10 h-10 panel flex items-center justify-center flex-shrink-0">
                <item.icon size={16} className="text-signal" />
              </div>
              <div>
                <p className="index-label mb-1">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="text-paper hover:text-signal transition-colors text-sm"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-paper text-sm">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="inline-flex items-center gap-2 border border-signal/30 px-4 py-2 text-xs tracking-[0.12em] uppercase text-signal mt-2">
            <span className="w-1.5 h-1.5 rounded-full bg-signal animate-pulse" />
            Open to opportunities
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
              { id: 'email', label: 'Email', type: 'email', placeholder: 'you@company.com' },
              { id: 'subject', label: 'Subject', type: 'text', placeholder: 'What\u2019s this about?' },
            ].map((field) => (
              <div key={field.id}>
                <label className="text-xs tracking-[0.12em] uppercase text-muted block mb-1.5">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={form[field.id as keyof typeof form]}
                  onChange={(e) => setForm((f) => ({ ...f, [field.id]: e.target.value }))}
                  placeholder={field.placeholder}
                  required
                  className="w-full panel px-4 py-3 text-paper text-sm outline-none focus:border-signal/50 transition-colors placeholder:text-muted/50"
                />
              </div>
            ))}

            <div>
              <label className="text-xs tracking-[0.12em] uppercase text-muted block mb-1.5">Message</label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Tell me about the role or what you're building..."
                required
                className="w-full panel px-4 py-3 text-paper text-sm outline-none focus:border-signal/50 transition-colors placeholder:text-muted/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-signal w-full justify-center py-4 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent' : (
                <>Send Message <Send size={14} /></>
              )}
            </button>

            {status === 'error' && (
              <p className="text-red-400 text-sm text-center">Something went wrong — email me directly instead.</p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
