import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/contact-schema'
import { getSupabaseServerClient } from '@/lib/supabase'
import { checkRateLimit, hashIpAddress } from '@/lib/rate-limit'
import { Resend } from 'resend'

// HTML escape helper to prevent XSS/injection in email clients
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 1. Enforce POST only
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}

export async function POST(request: Request) {
  try {
    // 2. Same-Origin Check
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')
    const isDev = process.env.NODE_ENV !== 'production'

    if (origin) {
      const allowedOrigins = [
        'https://jasmanjotsarna.dev',
        'https://jasmanjot-portfolio.vercel.app',
      ]
      const originHost = new URL(origin).host
      const isSameHost = host && originHost === host
      const isAllowedProd = allowedOrigins.some((o) => origin.startsWith(o))
      const isLocalhost = isDev && (origin.includes('localhost') || origin.includes('127.0.0.1'))

      if (!isSameHost && !isAllowedProd && !isLocalhost) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }
    }

    // 3. Content-Type Check (JSON only)
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Unsupported Media Type. Expected application/json' },
        { status: 415 }
      )
    }

    // 4. Body Size Check (Max 10KB)
    const rawBody = await request.text()
    if (Buffer.byteLength(rawBody, 'utf8') > 10 * 1024) {
      return NextResponse.json(
        { error: 'Payload Too Large. Maximum message size is 10KB' },
        { status: 413 }
      )
    }

    // Parse JSON safely
    let jsonBody: unknown
    try {
      jsonBody = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 })
    }

    // 5. Honeypot check (hidden "website" field filled by spam bots)
    if (
      typeof jsonBody === 'object' &&
      jsonBody !== null &&
      'website' in jsonBody &&
      Boolean((jsonBody as Record<string, unknown>).website)
    ) {
      // Return 200 success silently so bot learns nothing
      return NextResponse.json({
        success: true,
        message: 'Message received.',
      })
    }

    // 6. Zod Validation
    const validationResult = contactSchema.safeParse(jsonBody)
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {}
      validationResult.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[String(issue.path[0])] = issue.message
        }
      })
      return NextResponse.json(
        {
          error: 'Validation failed',
          errors: fieldErrors,
        },
        { status: 400 }
      )
    }

    const { name, email, message } = validationResult.data

    // 7. Rate Limiting by Hashed IP (Max 5 per hour)
    const forwardedFor = request.headers.get('x-forwarded-for')
    const clientIp = forwardedFor
      ? forwardedFor.split(',')[0].trim()
      : request.headers.get('x-real-ip') || '127.0.0.1'

    const hashedIp = hashIpAddress(clientIp)
    const rateLimit = await checkRateLimit(hashedIp)

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many messages sent. Please wait before submitting again.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.reset),
          },
        }
      )
    }

    // 8. Truncate User-Agent
    const rawUserAgent = request.headers.get('user-agent') || ''
    const userAgent = rawUserAgent.slice(0, 200)

    // Check available backend services lazily
    const supabase = getSupabaseServerClient()
    const resendApiKey = process.env.RESEND_API_KEY

    // In production, if required env vars are missing, return a clear 503 with mailto fallback
    // NEVER return a fake success in production
    if (!isDev && !supabase && !resendApiKey) {
      return NextResponse.json(
        {
          error:
            'Contact service is temporarily unavailable. Please reach out directly at jasmanjotsinghsarna@gmail.com.',
        },
        { status: 503 }
      )
    }

    // In local development without configured keys: log receipt without PII and return simulated success
    if (isDev && !supabase && !resendApiKey) {
      console.log('[ContactAPI:Dev] Form submitted in development mode (keys unconfigured).')
      return NextResponse.json({
        success: true,
        message: "Got it. I'll reply within a couple of days.",
      })
    }

    let dbSuccess = false
    let insertedMessageId: string | null = null

    // 9. Database Storage (Supabase)
    if (supabase) {
      try {
        const { data, error } = await supabase
          .from('contact_messages')
          .insert({
            name,
            email,
            message,
            ip_hash: hashedIp,
            user_agent: userAgent,
            status: 'new',
            email_sent: false,
          })
          .select('id')
          .single()

        if (error) {
          console.error('[ContactAPI] DB insert error code:', error.code)
        } else {
          dbSuccess = true
          insertedMessageId = data?.id || null
        }
      } catch (err) {
        console.error('[ContactAPI] DB exception:', (err as Error).name)
      }
    }

    // 10. Email Notification (Resend)
    let emailSuccess = false

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey)
        const toEmail = process.env.CONTACT_TO_EMAIL || 'jasmanjotsinghsarna@gmail.com'
        const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

        const escapedName = escapeHtml(name)
        const escapedEmail = escapeHtml(email)
        const escapedMessage = escapeHtml(message).replace(/\n/g, '<br/>')

        const emailResult = await resend.emails.send({
          from: fromEmail,
          to: [toEmail],
          replyTo: email,
          subject: 'New portfolio message received',
          text: `New Portfolio Message\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; padding: 24px; border: 1px solid #E5E0D8; border-radius: 4px; background: #FBF9F5; color: #181716;">
              <h2 style="margin-top: 0; color: #C04A26; font-size: 20px;">New Portfolio Inquiry</h2>
              <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #E5E0D8;">
                <p style="margin: 4px 0;"><strong>Sender:</strong> ${escapedName}</p>
                <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${escapedEmail}" style="color: #C04A26;">${escapedEmail}</a></p>
              </div>
              <div>
                <p style="margin: 0 0 8px 0; font-weight: bold;">Message:</p>
                <div style="white-space: pre-wrap; line-height: 1.6; background: #FFFFFF; padding: 16px; border-radius: 4px; border: 1px solid #E5E0D8;">
                  ${escapedMessage}
                </div>
              </div>
              <p style="font-size: 11px; color: #6B6760; margin-top: 24px; margin-bottom: 0;">
                Sent via Jasmanjot Singh Sarna Portfolio Contact Form
              </p>
            </div>
          `,
        })

        if (emailResult.error) {
          console.error('[ContactAPI] Resend error:', emailResult.error.name)
        } else {
          emailSuccess = true

          // Update email_sent flag in database if DB insert succeeded
          if (supabase && insertedMessageId) {
            await supabase
              .from('contact_messages')
              .update({ email_sent: true })
              .eq('id', insertedMessageId)
          }
        }
      } catch (err) {
        console.error('[ContactAPI] Email exception:', (err as Error).name)
      }
    }

    // 11. Graceful Resolution
    if (dbSuccess || emailSuccess) {
      return NextResponse.json({
        success: true,
        message: "Got it. I'll reply within a couple of days.",
      })
    }

    // If services were configured but both failed:
    return NextResponse.json(
      {
        error:
          'Unable to deliver message right now. Please email directly at jasmanjotsinghsarna@gmail.com',
      },
      { status: 503 }
    )
  } catch (err) {
    // Top-level crash safety: never leak stack trace or internal error messages
    console.error('[ContactAPI] Top-level handler error:', (err as Error).name)
    return NextResponse.json(
      {
        error:
          'An unexpected error occurred. Please email directly at jasmanjotsinghsarna@gmail.com',
      },
      { status: 500 }
    )
  }
}
