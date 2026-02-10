/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Font family
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
      },

      // Custom colors from Design System v2
      colors: {
        'amber-glow': {
          400: '#FBBF24',
          500: '#D4A017',
          600: '#B8860B',
          900: '#3D2E0A',
        },
        'space-black': '#000000',
        'space': {
          950: '#0f0f0f',
          900: '#1a1a1a',
          800: '#252525',
          700: '#404040',
          600: '#525252',
          500: '#737373',
          400: '#a3a3a3',
          300: '#d4d4d4',
          200: '#e5e5e5',
          100: '#f5f5f5',
        },
        'text': {
          primary: '#ffffff',
          secondary: '#e5e5e5',
          tertiary: '#a3a3a3',
          muted: '#737373',
        },
      },

      // Custom spacing (8px base)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },

      // Backdrop blur
      backdropBlur: {
        xs: '2px',
      },

      // Animations
      animation: {
        'plane-left': 'plane-left 20s linear infinite',
        'plane-right': 'plane-right 25s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
      },

      keyframes: {
        'plane-left': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        'plane-right': {
          '0%': { transform: 'translateX(100vw) scaleX(-1)' },
          '100%': { transform: 'translateX(-100%) scaleX(-1)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}