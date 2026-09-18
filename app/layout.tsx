import type { Metadata } from 'next'
import { Newsreader, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import SmoothScroll from '@/components/SmoothScroll'
import { PERSONAL_INFO } from '@/lib/content'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://jasmanjotsarna.dev'),
  title: `${PERSONAL_INFO.name} — AI/ML Engineer & Full Stack Developer`,
  description:
    'Personal portfolio and projects of Jasmanjot Singh Sarna. Final-year B.Tech CSE (AI & ML) student building full-stack SaaS, multi-agent pipelines, and computer vision systems.',
  keywords: [
    'Jasmanjot Singh Sarna',
    'AI Engineer',
    'Machine Learning',
    'Full Stack Developer',
    'Data Analyst',
    'CareerOS',
    'Multi AI Agent Research System',
    'JECRC University',
  ],
  authors: [{ name: PERSONAL_INFO.name, url: 'https://jasmanjotsarna.dev' }],
  creator: PERSONAL_INFO.name,
  openGraph: {
    title: `${PERSONAL_INFO.name} — AI/ML Engineer & Full Stack Developer`,
    description:
      'Personal portfolio and projects: CareerOS, Multi AI Agent Research System, Face Emotion Recognition, and Health Score Predictor.',
    type: 'website',
    url: 'https://jasmanjotsarna.dev',
    siteName: PERSONAL_INFO.name,
    images: [{ url: '/profile.png', width: 800, height: 800, alt: PERSONAL_INFO.name }],
  },
  icons: {
    icon: '/profile.png',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSONAL_INFO.name,
  jobTitle: 'AI/ML Engineer & Full Stack Developer',
  url: 'https://jasmanjotsarna.dev',
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'JECRC University, Jaipur',
  },
  sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Multi-Agent Systems',
    'Full Stack Engineering',
    'Computer Vision',
    'Data Analytics',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${newsreader.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/profile.png"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var d=s||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',d);}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-white transition-colors duration-200">
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
