import { GetServerSidePropsContext } from 'next'
import { destroyAuthenticationCookie, setupSpotifyApiClient } from '../config'
import { AxiosError } from 'axios'
import { objectToQuerystring, uppercaseWholeText } from 'utils'
import { SpotifyArtist } from '../types/Artist'
import { TimeRange } from 'config/topItemsGenerator'
import { GlobalTrackItem } from 'types/TrackItem'

export type GetMyTopArtistsParams = {
  timeRange: TimeRange
  limit: number
  ctx: GetServerSidePropsContext | null
}

const spotifyAcceptedTimeRange: Record<TimeRange, string> = {
  allTime: 'long_term',
  lastSixMonths: 'medium_term',
  lastMonth: 'short_term'
}

export const getMyTopArtists = async ({
  ctx,
  timeRange = 'lastMonth',
  limit = 5
}: GetMyTopArtistsParams): Promise<GlobalTrackItem[]> => {
  try {
    if (limit <= 0) throw new Error('The minimum accepted value for limit is 1')
    if (limit >= 50)
      throw new Error('The maximum accepted value for limit is 50')

    const spotifyClient = setupSpotifyApiClient(ctx)
    const { data } = await spotifyClient.get<{ items: SpotifyArtist[] }>(
      'v1/me/top/artists?' +
        objectToQuerystring({
          time_range: spotifyAcceptedTimeRange[timeRange],
          offset: 0,
          limit
        })
    )
    return data.items.map(item => ({
      id: item.id,
      title: item.name,
      description: item.genres.slice(0, 2).map(uppercaseWholeText).join(', '),
      image: item.images[0].url,
      type: 'artists'
    }))
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
