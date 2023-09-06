const brandColors = {
  primary: {
    light: '#48e07d',
    normal: '#1DB954',
    dark: '#13823b'
  },
  secondary: {
    light: '#ffa8a2',
    normal: '#FD5E54',
    dark: '#e32b1f'
  }
}

const mainColors = {
  ...brandColors,
  error: brandColors.secondary,
  success: brandColors.primary
} as const

export default mainColors
