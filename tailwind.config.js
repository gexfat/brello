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
      'Lato',
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
      gray: colors.blueGray,
      indigo: colors.indigo,
      red: colors.red,
      yellow: colors.amber,
      green: colors.emerald,
      blue: colors.cyan,
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
        'xs': '0 1px 2px 0 rgba(0, 0, 0, 0.01)',
        'sm': '0 1px 3px rgba(26,53,71,.08), 0 0 0 1px rgba(26,53,71,.04), 0 1px 1px rgba(26,53,71,.06)',
        'inner': '0 1px 0 #fff, inset 0 1px 2px rgba(26, 71, 61, 0.14)'
      }
    },
  },
  variants: {
    extend: {
      animation: ['group-hover'],
      backgroundColor: ['active'],
      borderWidth: ['last', 'hover'],
      boxShadow: ['active', 'group-hover'],
      cursor: ['disabled'],
      display: ['group-hover'],
      gradientColorStops: ['active', 'group-hover'],
      height: ['hover', 'focus', 'group-hover'],
      inset: ['group-hover'],
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
