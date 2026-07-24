/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#0B0E14',
        signal: '#3DDC84',
        offwhite: '#FFF9E6', /* A warmer off-white for neo-brutalism */
        graphite: '#1B1F27',
        warning: '#FFC800', /* Bright yellow for neo-brutalism */
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'xl': '1.25rem',
        '2xl': '2rem',
      },
      boxShadow: {
        'neo': '4px 4px 0 #0B0E14',
        'neo-hover': '6px 6px 0 #0B0E14',
        'neo-sm': '2px 2px 0 #0B0E14',
      }
    },
  },
  plugins: [],
}
