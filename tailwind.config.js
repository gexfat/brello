const colors = require('./node_modules/tailwindcss/colors')

module.exports = {
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      'print': {'raw': 'print'},
    },
    fontFamily: {
      sans: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
      ],
      serif: [
      'Georgia',
      'Cambria',
      '"Times New Roman"',
      'Times',
      'serif',
      ],
      mono: [
      'Menlo',
      'Monaco',
      'Consolas',
      '"Liberation Mono"',
      '"Courier New"',
      'monospace',
      ],
    },
    fontSize: {
      '2xs': '11px',
      xs: '12px',
      sm: '13px',
      base: '14px',
      DEFAULT: '14px',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    colors: {
      // theme colors
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.coolGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.lightBlue,
      purple: colors.purple,
      orange: colors.orange,
      teal: colors.teal
    },
    borderRadius: {
      'none': '0',
      'xs': '1px',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'full': '9999px',
      'large': '12px',
    },
    extend: {
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      }
    },
  },
  variants: {
    extend: {
      animation: ['group-hover'],
      borderWidth: ['last', 'hover'],
      boxShadow: ['group-hover'],
      cursor: ['disabled'],
      display: ['group-hover'],
      inset: ['group-hover'],
      height: ['hover', 'focus', 'group-hover'],
      margin: ['last'],
      opacity: ['hover', 'focus', 'disabled'],
      scale: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      transitionDuration: ['group-hover', 'focus'],
      transitionProperty: ['group-hover', 'focus'],
      visibility: ['hover', 'focus'],
      width: ['hover', 'focus', 'group-hover']
    }
  },
  plugins: [
  require('@tailwindcss/forms')
  ]
}
