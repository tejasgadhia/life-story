/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'vintage-cream': '#F5F0E8',
        'aged-paper': '#E8DCC4',
        'sepia-brown': '#8B7355',
        'dark-brown': '#3E2723',
        'muted-red': '#A4493D',
        'muted-blue': '#4A6FA5',
        'aged-black': '#1A1A1A',
        'manila': '#D4B896',
      },
      fontFamily: {
        'display': ['Playfair Display', 'Georgia', 'serif'],
        'body': ['Courier Prime', 'Courier New', 'monospace'],
        'accent': ['Lora', 'Georgia', 'serif'],
        'blackletter': ['UnifrakturMaguntia', 'Old English Text MT', 'serif'],
        'typewriter': ['Special Elite', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
}
