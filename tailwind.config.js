const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange': '#F9A43D',
        'green': '#62A87C',
        'yellow': '#FEC659',
        'black': '#191A19',
        'white': '#FFF9D1',
        'lime': '#A8E05F', // find better variant
        'red': '#A4031F', // find better variant

      },
      fontSize: {
        "heading": ["20px", { fontWeight: "600" }],
      },
    },
  },
  plugins: [
    plugin(({ addBase, theme }) => {
      const colors = ['orange', 'yellow', 'black', 'white', 'green', 'red', 'lime']
      const baseStyles = {}

      colors.forEach((color) => {
        const colorVar = theme(`colors.${color}`)
        baseStyles[`.scrollbar-${color}`] = {
          overflowY: 'auto',
          scrollbarColor: `${colorVar} transparent`,
          scrollbarWidth: 'thin',
        }
        baseStyles[`.scrollbar-${color}::-webkit-scrollbar`] = {
          height: '6px',
          width: '6px',
        }
        baseStyles[`.scrollbar-${color}::-webkit-scrollbar-thumb`] = {
          backgroundColor: colorVar,
          borderRadius: '9999px',
        }
        baseStyles[`.scrollbar-${color}::-webkit-scrollbar-track`] = {
          backgroundColor: 'transparent',
        }
        baseStyles[`.scrollbar-${color}::-webkit-scrollbar-thumb:hover`] = {
          backgroundColor: colorVar,
        }
        baseStyles[`.scrollbar-${color}:hover::-webkit-scrollbar-thumb`] = {
          backgroundColor: colorVar,
        }
        baseStyles[`.scrollbar-${color}.hide-scrollbar::-webkit-scrollbar`] = {
          display: 'none',
        }
        baseStyles[`.scrollbar-${color}.hide-scrollbar`] = {
          scrollbarWidth: 'none',
        }
      })
      addBase(baseStyles)
    }),
  ],
  safelist: [
    'bg-green',
    'bg-yellow',
    'bg-white',
    'bg-black',
    'bg-orange',
    'bg-lime',
    'bg-red',
    'text-green',
    'text-yellow',
    'text-white',
    'text-black',
    'text-orange',
    'text-lime',
    'text-red',
  ],
}