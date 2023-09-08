import { GetServerSidePropsContext } from 'next'
import { destroyAuthenticationCookie, setupSpotifyApiClient } from '../config'
import { AxiosError } from 'axios'
import { objectToQuerystring } from 'utils'
import { SpotifyArtist } from '../types/Artist'
import { TimeRange, topItemsGeneratorConfig } from 'config/topItemsGenerator'

export type GetMyTopArtistsParams = {
  timeRange: TimeRange
  limit: number
  ctx: GetServerSidePropsContext | null
}

export const getMyTopArtists = async ({
  ctx,
  timeRange = 'lastMonth',
  limit = 5
}: GetMyTopArtistsParams) => {
  try {
    if (limit <= 0) throw new Error('The minimum accepted value for limit is 1')
    if (limit >= 50)
      throw new Error('The maximum accepted value for limit is 50')

    const spotifyClient = setupSpotifyApiClient(ctx)
    const { data } = await spotifyClient.get<{ items: SpotifyArtist[] }>(
      'v1/me/top/artists?' +
        objectToQuerystring({
          time_range: topItemsGeneratorConfig.timeOptions[timeRange],
          offset: 0,
          limit
        })
    )
    return data.items
  } catch (err) {
    if (err instanceof AxiosError) {
      if (Number(err.response?.status) >= 400) {
        destroyAuthenticationCookie(ctx)
        throw err
      }
    }
    throw err
  }
}
