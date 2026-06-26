import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://jasmanjotsarna.dev'),
  title: 'Jasmanjot Singh Sarna — AI & ML Engineer',
  description:
    'AI/ML Engineer and Data Analyst building computer vision systems, applied ML pipelines, and LLM-driven products. B.Tech CSE (AI & ML), Jaipur, India.',
  keywords: [
    'AI Engineer',
    'Machine Learning Engineer',
    'Data Scientist',
    'Data Analyst',
    'Computer Vision',
    'Jasmanjot Singh Sarna',
    'Portfolio',
  ],
  authors: [{ name: 'Jasmanjot Singh Sarna' }],
  openGraph: {
    title: 'Jasmanjot Singh Sarna — AI & ML Engineer',
    description:
      'Building applied AI systems — computer vision, ML pipelines, and LLM-driven products.',
    type: 'website',
    url: 'https://jasmanjotsarna.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasmanjot Singh Sarna — AI & ML Engineer',
    description:
      'Building applied AI systems — computer vision, ML pipelines, and LLM-driven products.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-ink text-paper font-body antialiased relative">{children}</body>
    </html>
  )
}
