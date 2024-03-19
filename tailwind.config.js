// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        slate: {
          900: '#2d3748',
        },
        green: {
          400: '#48bb78',
        },
      },
      fontWeight: {
        normal: 500,
      },
    },
  },
  variants: {
    extend: {
      textColor: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};