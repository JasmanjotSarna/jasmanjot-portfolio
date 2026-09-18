'use client'

import { useState } from 'react'
import { PERSONAL_INFO } from '@/lib/content'
import { contactSchema } from '@/lib/contact-schema'
import { Mail, FileDown, Send, CheckCircle2, AlertCircle, ArrowUpRight, Loader2 } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot field
  })
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [serverError, setServerError] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PERSONAL_INFO.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFieldErrors({})
    setServerError(null)

    // 1. Client-side Zod validation
    const clientValidation = contactSchema.safeParse(formData)
    if (!clientValidation.success) {
      const errors: Record<string, string> = {}
      clientValidation.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[String(issue.path[0])] = issue.message
        }
      })
      setFieldErrors(errors)
      return
    }

    setStatus('submitting')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 400 && data.errors) {
          setFieldErrors(data.errors)
          setStatus('idle')
          return
        }
        if (res.status === 429) {
          throw new Error(data.error || 'Too many submissions. Please wait before submitting again.')
        }
        throw new Error(data.error || 'Unable to deliver message right now.')
      }

      setStatus('success')
      // Reset form fields on successful delivery only
      setFormData({ name: '', email: '', message: '', website: '' })
    } catch (err: any) {
      setStatus('error')
      setServerError(
        err.message || 'Unable to deliver message. Please email directly at jasmanjotsinghsarna@gmail.com'
      )
      // Note: Message and name are intentionally preserved so user does not lose their typed text!
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-24 border-t border-border relative">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 sm:gap-14 items-start">
          {/* Left Column: Direct Communication Channels */}
          <div>
            <div className="font-mono text-xs text-accent font-semibold tracking-wider uppercase mb-2">
              Communication // Channel 01
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-normal text-ink tracking-tight mb-4">
              Get in Touch
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
              I am open to full-time AI/ML engineering, full-stack, and data roles starting upon graduation in 2027,
              as well as high-impact remote internships and collaborative research.
            </p>

            <div className="space-y-4">
              {/* Primary Email Card with Copy-to-Clipboard */}
              <div className="p-4 rounded-sm border border-border bg-surface flex items-center justify-between gap-3">
                <div className="overflow-hidden">
                  <span className="font-mono text-xs text-muted uppercase tracking-wider block mb-1">
                    Direct Email
                  </span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="font-mono text-sm sm:text-base text-ink font-semibold hover:text-accent transition-colors flex items-center gap-1.5 link-draw truncate"
                    data-cursor="Email"
                  >
                    <Mail size={16} className="text-accent flex-shrink-0" />
                    <span className="truncate">{PERSONAL_INFO.email}</span>
                  </a>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded border border-border bg-paper text-muted hover:text-ink hover:bg-surface text-xs font-mono transition-all flex items-center gap-1 flex-shrink-0"
                  data-cursor="Copy"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <span className="text-accent flex items-center gap-1 text-[11px] font-semibold">
                      <CheckCircle2 size={13} />
                      <span>Copied!</span>
                    </span>
                  ) : (
                    <span>Copy</span>
                  )}
                </button>
              </div>

              {/* Master Resume PDF */}
              <div className="p-4 rounded-sm border border-border bg-surface">
                <span className="font-mono text-xs text-muted uppercase tracking-wider block mb-1">
                  Master Resume (PDF)
                </span>
                <a
                  href={PERSONAL_INFO.resumePdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm sm:text-base text-ink font-semibold hover:text-accent transition-colors flex items-center gap-1.5 link-draw"
                  data-cursor="Resume"
                >
                  <FileDown size={16} className="text-accent" />
                  <span>Download Jasmanjot Resume (PDF)</span>
                </a>
              </div>

              {/* Profiles */}
              <div className="p-4 rounded-sm border border-border bg-surface">
                <span className="font-mono text-xs text-muted uppercase tracking-wider block mb-1">
                  Verified Profiles
                </span>
                <div className="flex items-center gap-4 mt-1 font-mono text-sm">
                  <a
                    href={PERSONAL_INFO.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-accent transition-colors flex items-center gap-1 link-draw"
                    data-cursor="GitHub"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight size={13} />
                  </a>
                  <span>•</span>
                  <a
                    href={PERSONAL_INFO.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-accent transition-colors flex items-center gap-1 link-draw"
                    data-cursor="LinkedIn"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="p-6 sm:p-8 rounded-sm border border-border bg-surface shadow-xs relative">
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-ink mb-1">
              Send a Direct Message
            </h3>
            <p className="font-mono text-xs text-muted mb-6">
              Validated and delivered directly to jasmanjotsinghsarna@gmail.com
            </p>

            {/* Success State */}
            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="p-8 rounded-sm border border-accent/40 bg-accent-subtle text-center flex flex-col items-center"
              >
                <div className="w-12 h-12 rounded-full bg-paper border border-accent/40 flex items-center justify-center text-accent mb-3 shadow-xs">
                  <CheckCircle2 size={24} />
                </div>
                <h4 className="font-display font-semibold text-xl text-ink mb-2">
                  Got it. I&apos;ll reply within a couple of days.
                </h4>
                <p className="text-xs font-mono text-muted max-w-sm leading-relaxed mb-5">
                  Thank you for reaching out. A confirmation has been logged and sent to Jasmanjot.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-secondary text-xs py-1.5 px-3.5"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Honeypot field (hidden from real users, traps spam bots) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-xs text-muted uppercase tracking-wider mb-1.5"
                    >
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value })
                        if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' })
                      }}
                      placeholder="e.g. Maya Chen"
                      aria-invalid={Boolean(fieldErrors.name)}
                      aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-sm border bg-paper text-sm text-ink placeholder:text-muted/60 focus:border-accent transition-colors ${
                        fieldErrors.name ? 'border-red-500/60' : 'border-border'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" role="alert" className="mt-1 font-mono text-[11px] text-red-600 dark:text-red-400">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-xs text-muted uppercase tracking-wider mb-1.5"
                    >
                      Your Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value })
                        if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: '' })
                      }}
                      placeholder="maya@company.com"
                      aria-invalid={Boolean(fieldErrors.email)}
                      aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-sm border bg-paper text-sm text-ink placeholder:text-muted/60 focus:border-accent transition-colors ${
                        fieldErrors.email ? 'border-red-500/60' : 'border-border'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p id="email-error" role="alert" className="mt-1 font-mono text-[11px] text-red-600 dark:text-red-400">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-xs text-muted uppercase tracking-wider mb-1.5"
                  >
                    Message (10–2,000 characters) <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value })
                      if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' })
                    }}
                    placeholder="Describe the opportunity, technical challenge, or project..."
                    aria-invalid={Boolean(fieldErrors.message)}
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                    className={`w-full px-3.5 py-2.5 rounded-sm border bg-paper text-sm text-ink placeholder:text-muted/60 focus:border-accent transition-colors resize-y ${
                      fieldErrors.message ? 'border-red-500/60' : 'border-border'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p id="message-error" role="alert" className="mt-1 font-mono text-[11px] text-red-600 dark:text-red-400">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Server Error Display with Mailto Fallback */}
                {serverError && (
                  <div
                    role="alert"
                    className="p-3.5 rounded-sm border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-600 dark:text-red-400 flex items-start gap-2.5"
                  >
                    <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <p>{serverError}</p>
                      <p className="mt-1 text-[11px]">
                        Alternatively, email directly at{' '}
                        <a
                          href={`mailto:${PERSONAL_INFO.email}?subject=Direct Portfolio Message`}
                          className="underline hover:text-ink font-semibold"
                        >
                          {PERSONAL_INFO.email}
                        </a>
                      </p>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="btn-editorial w-full justify-center py-2.5"
                  data-cursor="Transmit"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>

                {/* One-Line Privacy Guarantee */}
                <p className="font-mono text-[11px] text-muted text-center pt-2">
                  Details are used solely to reply to your inquiry and are never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
