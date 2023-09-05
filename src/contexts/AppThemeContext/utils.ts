import { ThemeName } from 'styles/themes'
import Cookie from 'js-cookie'

export const APP_THEME_COOKIE_KEY = 'APP_THEME'
export const DEFAULT_THEME: ThemeName = 'light'

export const storeThemeStateToCookies = (state: ThemeName) => {
  Cookie.set(APP_THEME_COOKIE_KEY, state)
}
