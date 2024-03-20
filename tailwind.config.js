// tailwind.config.js
// tailwind.config.js
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        normal: '500',
      },
      backgroundColor: {
        default: '#1E293B',
      },
      textColor: {
        default: '#34D399',
        hover: '#059669',
      },
    },
  },
  plugins: [],
};