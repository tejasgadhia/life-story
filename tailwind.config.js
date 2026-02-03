/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      colors: {
        // Existing vintage theme colors (for report themes)
        'vintage-cream': '#F5F0E8',
        'aged-paper': '#E8DCC4',
        'sepia-brown': '#8B7355',
        'dark-brown': '#3E2723',
        'muted-red': '#A4493D',
        'muted-blue': '#4A6FA5',
        'aged-black': '#1A1A1A',
        'manila': '#D4B896',
        'metal-gray': '#8B8B8B',
        // New landing page colors (Charcoal + Amber)
        'charcoal': {
          DEFAULT: '#292524',
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
          950: '#141414',
        },
        'amber': {
          DEFAULT: '#D99E46',
          dark: '#C48B35',
          light: '#E5B564',
        },
      },
      fontFamily: {
        // Existing fonts (for report themes)
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Courier Prime', 'Courier New', 'monospace'],
        'accent': ['Lora', 'Georgia', 'serif'],
        'blackletter': ['UnifrakturMaguntia', 'Old English Text MT', 'serif'],
        'typewriter': ['Special Elite', 'Courier New', 'monospace'],
        // New landing page fonts
        'heading': ['Fraunces', 'Georgia', 'serif'],
        'sans': ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
