import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          violet:     '#C4780A', // primary saffron amber
          purple:     '#A86008', // amber hover
          gold:       '#C4780A', // alias for violet
          amber:      '#E8A020', // bright amber highlight
          cream:      '#FBF7F0', // warm parchment page bg
          pagebg:     '#F5EFE4', // section header bg (slightly darker parchment)
          charcoal:   '#2C1A0E', // dark espresso — nav, footer
          body:       '#5C3D28', // body text
          heading:    '#1A0E06', // primary headings
          sage:       '#9C7A60', // muted text
          border:     '#E8D9C4', // light card borders
          'border-md':'#D4C0A0', // medium borders
          'border-dk':'#C4A880', // dark borders
          green:      '#3D6B4F', // success / green accent
          'green-bg': '#E4F2EB', // green tint bg
          secondary:  '#7B5EA7', // secondary violet accent
          'sec-bg':   '#F0EBF8', // secondary violet tint bg
          teal:       '#2E7D8A', // teal accent
          'teal-bg':  '#E4F4F6', // teal tint bg
          hema:       '#8B5A2A', // Hemavathi practitioner colour
          shru:       '#6A3D8A', // Shruthi practitioner colour
        },
      },
      fontFamily: {
        sans:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #2C1A0E 0%, #5A3010 50%, #C4780A 100%)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
