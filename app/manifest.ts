import { MetadataRoute } from 'next'
import { PERSONAL_INFO } from '@/lib/content'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PERSONAL_INFO.name} — Portfolio`,
    short_name: 'Jasmanjot Sarna',
    description: 'Personal portfolio of Jasmanjot Singh Sarna. AI/ML Engineer and Full Stack Developer.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF9F5',
    theme_color: '#141413',
    icons: [
      {
        src: '/profile.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/profile.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
