/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        'Nunito',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    },
    // extend: {
    colors: {
      bg: {
        100: '#0c0c0c',
        200: '#121212'
      },
      fg: {
        100: '#bebebe',
        200: '#d3c2c3',
        300: '#404040'
      },
      primary: {
        100: '#b7976a',
        200: '#c1a174'
      },
      secondary: {
        100: '#9d7b7d',
        200: '#a78587'
      }
    }
    // }
  },
  plugins: []
}
