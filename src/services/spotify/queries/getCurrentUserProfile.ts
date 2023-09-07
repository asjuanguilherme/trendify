import { AxiosError } from 'axios'
import { destroyAuthenticationCookie, setupSpotifyApiClient } from '../config'
import { SpotifyUserProfile } from '../types'
import { GetServerSidePropsContext } from 'next'

export const getCurrentUserProfile = async (ctx: GetServerSidePropsContext) => {
  try {
    const spotifyApiClient = setupSpotifyApiClient(ctx)
    const { data } = await spotifyApiClient.get<SpotifyUserProfile>('v1/me')

    return data
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status == 401) {
        destroyAuthenticationCookie()
        throw err
      }
      throw err
    }
    throw err
  }
}
