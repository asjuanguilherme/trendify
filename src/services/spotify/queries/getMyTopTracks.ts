import { GetServerSidePropsContext } from 'next'
import { destroyAuthenticationCookie, setupSpotifyApiClient } from '../config'
import { AxiosError } from 'axios'
import { objectToQuerystring } from 'utils'
import { SpotifyTrack } from '../types/Track'

export type TimeRange = 'lastMonth' | 'lastSixMonths' | 'allTime'

export type GetMyTopTracksParams = {
  timeRange: TimeRange
  limit: number
  ctx: GetServerSidePropsContext | null
}

const timeRangeByTime: Record<TimeRange, string> = {
  lastMonth: 'short_term',
  lastSixMonths: 'medium_term',
  allTime: 'long_term'
}

export const getMyTopTracks = async ({
  ctx,
  timeRange = 'lastMonth',
  limit = 5
}: GetMyTopTracksParams) => {
  try {
    if (limit <= 0) throw new Error('The minimum accepted value for limit is 1')
    if (limit >= 50)
      throw new Error('The maximum accepted value for limit is 50')

    const spotifyClient = setupSpotifyApiClient(ctx)
    const { data } = await spotifyClient.get<{ items: SpotifyTrack[] }>(
      'v1/me/top/tracks?' +
        objectToQuerystring({
          time_range: timeRangeByTime[timeRange],
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
