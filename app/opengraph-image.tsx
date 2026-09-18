import { ImageResponse } from 'next/og'

export const alt = 'Jasmanjot Singh Sarna — AI/ML Engineer & Full Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FBF9F5',
          padding: '60px 80px',
          fontFamily: 'serif',
          border: '12px solid #E5E0D8',
        }}
      >
        {/* Top Kicker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              color: '#C04A26',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Engineering Portfolio &bull; 2026 Edition
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 14,
              color: '#6B6760',
            }}
          >
            Jaipur, Rajasthan, India
          </div>
        </div>

        {/* Center Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: 64,
              color: '#181716',
              fontWeight: 600,
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            Jasmanjot Singh Sarna
          </h1>
          <p
            style={{
              fontSize: 24,
              color: '#C04A26',
              fontFamily: 'monospace',
              margin: 0,
              fontWeight: 500,
            }}
          >
            AI/ML Engineer &bull; Full Stack Developer &bull; Data Analyst
          </p>
          <p
            style={{
              fontSize: 20,
              color: '#6B6760',
              fontFamily: 'sans-serif',
              lineHeight: 1.5,
              maxWidth: 900,
              margin: '8px 0 0 0',
            }}
          >
            Building full-stack SaaS (CareerOS), multi-agent research pipelines, and computer vision systems. Final-year B.Tech CSE (AI &amp; ML) at JECRC University.
          </p>
        </div>

        {/* Bottom Feature Tags */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            fontFamily: 'monospace',
            fontSize: 14,
          }}
        >
          <div
            style={{
              backgroundColor: '#EDE8DF',
              color: '#181716',
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #D5CEBE',
            }}
          >
            CareerOS (10-Module SaaS)
          </div>
          <div
            style={{
              backgroundColor: '#EDE8DF',
              color: '#181716',
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #D5CEBE',
            }}
          >
            Multi-Agent Pipeline (LangChain)
          </div>
          <div
            style={{
              backgroundColor: '#EDE8DF',
              color: '#181716',
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #D5CEBE',
            }}
          >
            Face Emotion CNNs
          </div>
          <div
            style={{
              backgroundColor: '#EDE8DF',
              color: '#181716',
              padding: '8px 16px',
              borderRadius: '4px',
              border: '1px solid #D5CEBE',
            }}
          >
            Health Score Model
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
