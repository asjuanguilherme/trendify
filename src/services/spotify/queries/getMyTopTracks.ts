import { GetServerSidePropsContext } from 'next'
import {
  destroyAuthenticationCookie,
  getAuthenticationCookie,
  setupSpotifyApiClient
} from '../config'
import axios, { AxiosError } from 'axios'
import { objectToQuerystring } from 'utils'
import { SpotifyTrack } from '../types/Track'
import { TimeRange } from 'config/topItemsGenerator'
import { GlobalTrackItem } from 'types/TrackItem'

export type GetMyTopTracksParams = {
  timeRange: TimeRange
  limit: number
  accessToken: string
}

export type GetMyTopTracksForClientSide = {
  timeRange: TimeRange
  limit: number
  ctx: GetServerSidePropsContext | null
}

const spotifyAcceptedTimeRange: Record<TimeRange, string> = {
  allTime: 'long_term',
  lastSixMonths: 'medium_term',
  lastMonth: 'short_term'
}

export const getMyTopTracks = async ({
  timeRange = 'lastMonth',
  limit = 5,
  accessToken
}: GetMyTopTracksParams): Promise<GlobalTrackItem[]> => {
  try {
    if (limit <= 0) throw new Error('The minimum accepted value for limit is 1')
    if (limit >= 50)
      throw new Error('The maximum accepted value for limit is 50')

    const spotifyClient = setupSpotifyApiClient(accessToken)
    const { data } = await spotifyClient.get<{ items: SpotifyTrack[] }>(
      'v1/me/top/tracks?' +
        objectToQuerystring({
          time_range: spotifyAcceptedTimeRange[timeRange],
          offset: 0,
          limit
        })
    )
    return data.items.map(item => ({
      id: item.id,
      title: item.name,
      image: item.album.images[0].url,
      description: item.artists.map(artist => artist.name).join(', '),
      type: 'tracks'
    }))
  } catch (err) {
    throw err
  }
}

export const getMyTopTracksForClientSide = async ({
  ctx,
  ...props
}: GetMyTopTracksForClientSide) => {
  try {
    const token = getAuthenticationCookie(ctx)

    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_WEBSITE_URL +
        '/api/tracks?' +
        objectToQuerystring({ ...props, token })
    )
    return data as GlobalTrackItem[]
  } catch (err) {
    if (err instanceof AxiosError) {
      console.log(err)
      destroyAuthenticationCookie(ctx)
      throw err
    }
    throw err
  }
}
