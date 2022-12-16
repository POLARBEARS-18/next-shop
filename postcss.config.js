module.exports = {
  plugins: ['postcss-import', 'tailwindcss/nesting', 'postcss-nesting', 'tailwindcss', 'autoprefixer'],
}

// module.exports = {
//   plugins: {
//     'postcss-import': {},
//     'tailwindcss/nesting': 'postcss-nesting',
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }

// just for testing!
// module.exports = {
//   plugins: [
//     require('postcss-import'),
//     require('tailwindcss/nesting')(require('postcss-nesting')),
//     require('autoprefixer'),
//     require('tailwindcss'),
//   ],
// }
