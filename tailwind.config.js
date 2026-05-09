/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          50: '#f3e8ff',
          100: '#e9d5ff',
          200: '#d8b4fe',
          300: '#c084fc',
          400: '#a855f7',
          500: '#9333ea',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
          950: '#2e1065',
        },
        electric: {
          DEFAULT: '#a855f7',
          light: '#c084fc',
          dark: '#7c3aed',
          glow: '#d946ef',
        },
        surface: {
          DEFAULT: '#0d0d0d',
          card: '#141414',
          elevated: '#1a1a1a',
          border: '#2a2a2a',
          hover: '#222222',
        }
      },
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'glow-purple': 'radial-gradient(ellipse at center, rgba(168,85,247,0.15) 0%, transparent 70%)',
        'card-gradient': 'linear-gradient(135deg, rgba(168,85,247,0.05) 0%, transparent 100%)',
      },
      boxShadow: {
        'purple-glow': '0 0 20px rgba(168,85,247,0.3)',
        'purple-glow-sm': '0 0 10px rgba(168,85,247,0.2)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-purple': 'pulsePurple 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulsePurple: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(168,85,247,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(168,85,247,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
