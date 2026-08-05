/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: {
          DEFAULT: '#06B6D4',
          50: '#ECFEFF',
          100: '#CFFAFE',
          600: '#0891B2',
          700: '#0E7490',
        },
        amber: {
          DEFAULT: '#F59E0B',
          50: '#FFFBEB',
          100: '#FEF3C7',
          600: '#D97706',
        },
        ink: {
          DEFAULT: '#111111',
          secondary: '#6B7280',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#FAFAFA',
        },
        line: '#E5E7EB',
      },
     fontFamily: {
  display: ['"Bricolage Grotesque"', 'sans-serif'],
  sans: ['Manrope', 'sans-serif'],
  mono: ['"JetBrains Mono"', 'monospace'],
},
      maxWidth: {
        content: '1280px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,17,17,0.04), 0 8px 24px -12px rgba(17,17,17,0.08)',
        'card-hover': '0 4px 8px rgba(17,17,17,0.04), 0 16px 32px -12px rgba(17,17,17,0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
