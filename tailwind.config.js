module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        '80vh': '80vh',
       },
       maxHeight: {
        '65vh': '65vh'
       },
      minWidth: {
        '0': '0',
        'xs': '4rem',
        'sm': '6rem',
        'md': '8rem',
       },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
