import axios from 'axios'
import * as utils from 'utils'

export const SPOTIFY_ACCOUNTS_API_URL = 'https://accounts.spotify.com/api/'
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
