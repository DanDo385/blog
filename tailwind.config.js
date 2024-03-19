// tailwind.config.js
module.exports = {
  // ... other configurations
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        normal: '500', // Ensure that the value is a string
      },
      backgroundColor: {
        default: '#1E293B', // Default bg color bg-slate-900
      },
      textColor: {
        default: '#34D399', // Default text color text-green-400
        hover: '#059669', // Custom property for hover state text-green-600
      },
    },
  },
  plugins: [],
};
