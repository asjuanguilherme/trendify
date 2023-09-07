import { ThemeName } from 'styles/themes'
import { GetServerSidePropsContext } from 'next'
import { setCookie, parseCookies } from 'nookies'

export const APP_THEME_COOKIE_KEY = 'APP_THEME'
export const DEFAULT_THEME: ThemeName = 'dark'

export const storeThemeStateToCookies = (
  themeName: ThemeName,
  ctx?: GetServerSidePropsContext
) => {
  setCookie(ctx, APP_THEME_COOKIE_KEY, themeName, {
    path: '/'
  })
}

export const getThemeCookie = (ctx?: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx)
  const storedTheme = cookies[APP_THEME_COOKIE_KEY]

  if (!storedTheme) {
    storeThemeStateToCookies(DEFAULT_THEME)

    return DEFAULT_THEME
  }

  return storedTheme
}
