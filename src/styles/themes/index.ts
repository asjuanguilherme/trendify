import light from './light'
import dark from './dark'

const themes = {
  light,
  dark
}

export type ThemeName = keyof typeof themes

export default themes
