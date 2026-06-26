/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#090B0F',
        'ink-raised': '#10131A',
        paper: '#ECEEF2',
        muted: '#7C8694',
        signal: '#4C8DFF',
        'signal-dim': 'rgba(76,141,255,0.12)',
        amber: '#FFB454',
        'amber-dim': 'rgba(255,180,84,0.12)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', '"Avenir Next"', '-apple-system', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Inter', '-apple-system', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blink: {
          '0%, 50%': { opacity: 1 },
          '51%, 100%': { opacity: 0 },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 32s linear infinite',
        blink: 'blink 1s step-end infinite',
        floatY: 'floatY 7s ease-in-out infinite',
        fadeUp: 'fadeUp 0.8s ease forwards',
      },
    },
  },
  plugins: [],
}
