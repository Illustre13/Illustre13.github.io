/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'slideInLeft': 'animate 4s ease-in-out infinite',
        'logoAnimation': 'logoAnimation 4s ease-in-out infinite',
      },
      fontFamily: {
        'finger-paint': ['"Finger Paint"', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      keyframes: {
        animate: {
          '0%, 100%': {
            clipPath: 'polygon(0% 45%, 16% 44%, 33% 50%, 54% 40%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)',
          },
          '50%': {
            clipPath: 'polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%)',
          },
        },
        logoAnimation: {
          '0%, 100%': {
            clipPath: 'polygon(0% 45%, 16% 44%, 33% 50%, 54% 40%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%)',
          },
          '50%': {
            clipPath: 'polygon(0% 60%, 15% 65%, 34% 66%, 51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%)',
          },
        },
      },
    },
  },
  plugins: [],
}