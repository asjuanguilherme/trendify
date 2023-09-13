import { GetServerSidePropsContext } from 'next'
import {
  destroyAuthenticationCookie,
  getAuthenticationCookie,
  setupSpotifyApiClient
} from '../config'
import axios, { AxiosError } from 'axios'
import { objectToQuerystring, uppercaseWholeText } from 'utils'
import { SpotifyArtist } from '../types/Artist'
import { TimeRange } from 'config/topItemsGenerator'
import { GlobalTrackItem } from 'types/TrackItem'

export type GetMyTopArtistsParams = {
  timeRange: TimeRange
  limit: number
  accessToken: string
}

export type GetMyTopArtistsForClientSideParams = {
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
  timeRange = 'lastMonth',
  limit = 5,
  accessToken
}: GetMyTopArtistsParams): Promise<GlobalTrackItem[]> => {
  try {
    if (limit <= 0) throw new Error('The minimum accepted value for limit is 1')
    if (limit >= 50)
      throw new Error('The maximum accepted value for limit is 50')

    const spotifyClient = setupSpotifyApiClient(accessToken)
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
      type: 'artists',
      href: item.uri
    }))
  } catch (err) {
    throw err
  }
}

export const getMyTopArtistsForClientSide = async ({
  ctx,
  ...props
}: GetMyTopArtistsForClientSideParams) => {
  try {
    const token = getAuthenticationCookie(ctx)

    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_WEBSITE_URL +
        '/api/artists?' +
        objectToQuerystring({ ...props, token })
    )
    return data as GlobalTrackItem[]
  } catch (err) {
    if (err instanceof AxiosError) {
      destroyAuthenticationCookie(ctx)
      throw err
    }
    throw err
  }
}
