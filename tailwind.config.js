/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'telekom': ['TeleNeo', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'telekom-magenta': '#E20074',
        'telekom-magenta-dark': '#B8005C',
        'telekom-gray': '#323232',
        'telekom-gray-light': '#F5F5F5',
      },
    },
  },
  plugins: [],
}

