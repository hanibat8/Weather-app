module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xs':'250px',
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        'gridCol': 'repeat(auto-fit, minmax(300px,1fr))',

      }
    },
  },
  plugins: [],
}
