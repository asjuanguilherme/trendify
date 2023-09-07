import { GetServerSidePropsContext } from 'next'
import * as spotifyAPIConfig from 'services/spotify/config'

export type GetAuthenticateSpotifyUser = {
  code: string
  ctx: GetServerSidePropsContext | null
}

export const authenticateSpotifyUser = async ({
  code,
  ctx
}: GetAuthenticateSpotifyUser) => {
  try {
    const { data } = await spotifyAPIConfig.spotifyAccountApi.post<{
      access_token: string
      token_type: 'Bearer'
      expires_in: number // seconds
    }>(
      'token',
      {
        grant_type: 'authorization_code',
        code,
        redirect_uri: spotifyAPIConfig.SPOTIFY_LOGIN_REDIRECT_URL
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth: {
          username: spotifyAPIConfig.SPOTIFY_APP_CLIENT_ID,
          password: spotifyAPIConfig.SPOTIFY_APP_CLIENT_SECRET
        }
      }
    )

    spotifyAPIConfig.setAuthenticationCookie(data.access_token, ctx)
    return data
  } catch (err) {
    spotifyAPIConfig.destroyAuthenticationCookie(ctx)
    throw err
  }
}
