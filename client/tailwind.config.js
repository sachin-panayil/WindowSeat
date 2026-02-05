/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Font family - Space Grotesk
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
      },
      
      // Custom colors from design system
      colors: {
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
      
      // Border radius
      borderRadius: {
        '4xl': '2rem',
      },
      
      // Animations
      animation: {
        'plane-left': 'plane-left 20s linear infinite',
        'plane-right': 'plane-right 25s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      
      keyframes: {
        'plane-left': {
          '0%': { 
            transform: 'translateX(-100px) rotate(45deg)',
            opacity: '0'
          },
          '10%': { opacity: '0.5' },
          '90%': { opacity: '0.5' },
          '100%': { 
            transform: 'translateX(calc(100vw + 100px)) rotate(45deg)',
            opacity: '0'
          },
        },
        'plane-right': {
          '0%': { 
            transform: 'translateX(calc(100vw + 100px)) rotate(-135deg)',
            opacity: '0'
          },
          '10%': { opacity: '0.5' },
          '90%': { opacity: '0.5' },
          '100%': { 
            transform: 'translateX(-100px) rotate(-135deg)',
            opacity: '0'
          },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // Box shadows
      boxShadow: {
        'glow': '0 0 30px rgba(255, 255, 255, 0.1)',
        'glow-lg': '0 0 50px rgba(255, 255, 255, 0.15)',
      },
    },
  },
  plugins: [],
}