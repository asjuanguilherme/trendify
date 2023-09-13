import { AxiosError } from 'axios'
import {
  destroyAuthenticationCookie,
  getAuthenticationCookie,
  setupSpotifyApiClient
} from '../config'
import { SpotifyUserProfile } from '../types'
import { GetServerSidePropsContext } from 'next'

export const getCurrentUserProfile = async (
  ctx: GetServerSidePropsContext | null
) => {
  try {
    const accessToken = getAuthenticationCookie(ctx)
    const spotifyApiClient = setupSpotifyApiClient(accessToken)
    const { data } = await spotifyApiClient.get<SpotifyUserProfile>('v1/me')

    return data
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status == 401) {
        destroyAuthenticationCookie(ctx)
        throw err
      }
      throw err
    }
    throw err
  }
}
