import { spotifyAccountApi } from 'services/spotify/config'

type RequestUserAuthorizationResponse = {}

export const requestUserAuthorization = async () => {
  try {
    const { data } =
      await spotifyAccountApi.get<RequestUserAuthorizationResponse>('/login')
    return data
  } catch (err) {
    throw err
  }
}
