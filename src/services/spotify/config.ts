import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import * as utils from 'utils'
import { setCookie, parseCookies } from 'nookies'

export const SPOTIFY_API_URL = 'https://api.spotify.com/'
export const SPOTIFY_ACCOUNTS_URL = 'https://accounts.spotify.com/'
export const SPOTIFY_ACCOUNTS_API_URL = SPOTIFY_ACCOUNTS_URL + 'api/'
export const SPOTIFY_LOGIN_REDIRECT_URL =
  process.env.NEXT_PUBLIC_SPOTIFY_LOGIN_REDIRECT_URL
export const SPOTIFY_APP_CLIENT_ID =
  process.env.NEXT_PUBLIC_SPOTIFY_APP_CLIENT_ID
export const SPOTIFY_APP_CLIENT_SECRET =
  process.env.NEXT_PUBLIC_SPOTIFY_APP_CLIENT_SECRET

if (!SPOTIFY_APP_CLIENT_ID) utils.throwEnvError('SPOTIFY_APP_CLIENT_ID')
if (!SPOTIFY_APP_CLIENT_SECRET) utils.throwEnvError('SPOTIFY_APP_CLIENT_SECRET')
if (!SPOTIFY_LOGIN_REDIRECT_URL)
  utils.throwEnvError('SPOTIFY_LOGIN_REDIRECT_URL')

export const spotifyAccountApi = axios.create({
  baseURL: SPOTIFY_ACCOUNTS_API_URL
})

export const SPOTIFY_USER_AUTH_COOKIE_KEY = 'ACCESS_TOKEN'

export const setAuthenticationCookie = (
  accessToken: string,
  ctx?: GetServerSidePropsContext
) => {
  setCookie(ctx, SPOTIFY_USER_AUTH_COOKIE_KEY, accessToken, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/'
  })
}

export const getAuthenticationCookie = (ctx?: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx)
  return cookies[SPOTIFY_USER_AUTH_COOKIE_KEY]
}

export const destroyAuthenticationCookie = (
  ctx?: GetServerSidePropsContext
) => {
  setCookie(ctx, SPOTIFY_USER_AUTH_COOKIE_KEY, '', {
    maxAge: 0,
    path: '/'
  })
}

export const setupSpotifyApiClient = (ctx?: GetServerSidePropsContext) => {
  const accessToken = getAuthenticationCookie(ctx)

  const spotifyApiClient = axios.create({
    baseURL: SPOTIFY_API_URL
  })

  spotifyApiClient.defaults.headers.common['Authorization'] = accessToken
    ? `Bearer ${accessToken}`
    : ''

  return spotifyApiClient
}
