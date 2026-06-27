import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import LoadingScreen from '@/components/LoadingScreen'
import CursorGlow from '@/components/CursorGlow'
import ScrollProgress from '@/components/ScrollProgress'
import BackToTop from '@/components/BackToTop'
import CommandPalette from '@/components/CommandPalette'

export const metadata: Metadata = {
  metadataBase: new URL('https://jasmanjotsarna.dev'),
  title: {
    default: 'Jasmanjot Singh Sarna — AI & ML Engineer',
    template: '%s | Jasmanjot Singh Sarna',
  },
  description:
    'AI/ML Engineer, Data Scientist, and Software Developer building production-ready AI applications — computer vision systems, applied ML pipelines, and LLM-driven products.',
  keywords: [
    'AI Engineer',
    'Machine Learning Engineer',
    'Data Scientist',
    'Software Developer',
    'Computer Vision',
    'LLM Engineer',
    'Jasmanjot Singh Sarna',
    'Portfolio',
  ],
  authors: [{ name: 'Jasmanjot Singh Sarna', url: 'https://jasmanjotsarna.dev' }],
  creator: 'Jasmanjot Singh Sarna',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://jasmanjotsarna.dev' },
  icons: {
    icon: '/profile.png',
    apple: '/profile.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Jasmanjot Singh Sarna — AI & ML Engineer',
    description:
      'Building production-ready AI applications, intelligent systems, and scalable software solutions.',
    type: 'website',
    url: 'https://jasmanjotsarna.dev',
    siteName: 'Jasmanjot Singh Sarna',
    images: [{ url: '/profile.png', width: 800, height: 800, alt: 'Jasmanjot Singh Sarna' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasmanjot Singh Sarna — AI & ML Engineer',
    description:
      'Building production-ready AI applications, intelligent systems, and scalable software solutions.',
    images: ['/profile.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Jasmanjot Singh Sarna',
  jobTitle: 'AI & Machine Learning Engineer',
  url: 'https://jasmanjotsarna.dev',
  sameAs: [
    'https://github.com/JasmanjotSarna',
    'https://www.linkedin.com/in/jasmanjot-singh-sarna-0a2539286/',
  ],
  knowsAbout: [
    'Artificial Intelligence',
    'Machine Learning',
    'Computer Vision',
    'Data Science',
    'Software Engineering',
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-paper font-body antialiased relative">
        <ThemeProvider>
          <LoadingScreen />
          <ScrollProgress />
          <CursorGlow />
          <CommandPalette />
          {children}
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
