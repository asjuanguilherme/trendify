import * as spotifyAPIConfig from 'services/spotify/config'

export type GetAccountApiTokenResponse = {
  access_token: string
  token_type: 'Bearer'
  expires_in: number // seconds
}

export const getAccountApiToken = async () => {
  try {
    const { data } =
      await spotifyAPIConfig.spotifyAccountApi.post<GetAccountApiTokenResponse>(
        'token',
        {
          grant_type: 'client_credentials',
          client_id: spotifyAPIConfig.SPOTIFY_APP_CLIENT_ID,
          client_secret: spotifyAPIConfig.SPOTIFY_APP_CLIENT_SECRET
        }
      )

    return data
  } catch (err) {
    throw err
  }
}
