import { appFont } from 'fonts/app/config'
import { breakpoints } from 'styles/screens'

export const layout = {
  containerMaxWidht: breakpoints.desktop + 'px',
  gutter: '1.5rem'
} as const

export const spacing = {
  components: {
    smaller: '.3rem',
    small: '.5rem',
    medium: '1rem',
    large: '1.25rem',
    larger: '1.5rem'
  },
  sections: {
    smaller: '1.5rem',
    small: '2rem',
    medium: '3rem',
    large: '4rem',
    larger: '5rem'
  }
} as const

export const font = {
  family: {
    gotham: appFont.style.fontFamily
  },
  sizes: {
    smaller: '.75rem',
    small: '.875rem',
    default: '1rem',
    large: '1.25rem',
    larger: '1.5rem',
    xlarger: '2rem',
    xxlarger: '2.5rem'
  },
  weight: {
    light: 300,
    book: 400,
    medium: 500,
    bold: 600
  }
} as const

export const borderRadius = {
  smaller: '.125rem',
  small: '.35rem',
  medium: '.75rem',
  large: '1rem',
  larger: '1.5rem',
  pill: '9999px',
  circle: '100%'
} as const

export const buttonSizes = {
  smaller: '2rem',
  small: '2.25rem',
  default: '3rem'
}

export const zIndex = {
  navbar: 100,
  menuMobile: 101,
  modals: 110
} as const

export const transition = {
  fast: '.15s',
  default: '.2s',
  slow: '.3s'
} as const
