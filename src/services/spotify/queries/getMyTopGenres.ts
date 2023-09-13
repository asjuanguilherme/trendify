import { objectToQuerystring, uppercaseWholeText } from 'utils'
import {
  destroyAuthenticationCookie,
  getAuthenticationCookie,
  setupSpotifyApiClient
} from '../config'
import { SpotifyArtist } from '../types'
import {
  GetMyTopArtistsForClientSideParams,
  GetMyTopArtistsParams
} from './getMyTopArtists'
import { TimeRange } from 'config/topItemsGenerator'
import axios, { AxiosError } from 'axios'
import { GlobalTrackItem } from 'types/TrackItem'

const spotifyAcceptedTimeRange: Record<TimeRange, string> = {
  allTime: 'long_term',
  lastSixMonths: 'medium_term',
  lastMonth: 'short_term'
}

const getMostListenedGenresFromSpotifyArtistsList = (
  artists: SpotifyArtist[]
): string[] => {
  const genreFrequency: { [genre: string]: number } = {}

  for (const artist of artists) {
    for (const genre of artist.genres) {
      if (genreFrequency[genre]) {
        genreFrequency[genre]++
      } else {
        genreFrequency[genre] = 1
      }
    }
  }

  const genreFrequencyArray = Object.entries(genreFrequency)

  genreFrequencyArray.sort((a, b) => b[1] - a[1])

  const mostListenedGenres = genreFrequencyArray.map(pair => pair[0])

  return mostListenedGenres
}

export const getMyTopGenres = async ({
  limit,
  timeRange,
  accessToken
}: GetMyTopArtistsParams): Promise<GlobalTrackItem[]> => {
  try {
    const spotifyClient = setupSpotifyApiClient(accessToken)
    const { data } = await spotifyClient.get<{ items: SpotifyArtist[] }>(
      'v1/me/top/artists?' +
        objectToQuerystring({
          time_range: spotifyAcceptedTimeRange[timeRange],
          offset: 0,
          limit: 50
        })
    )
    const genres = getMostListenedGenresFromSpotifyArtistsList(
      data.items
    ).slice(0, limit)

    return genres.map((item, index) => ({
      id: index,
      title: '# ' + uppercaseWholeText(item),
      type: 'genres'
    }))
  } catch (err) {
    throw err
  }
}

export const getMyTopGenresForClientSide = async ({
  ctx,
  ...props
}: GetMyTopArtistsForClientSideParams) => {
  try {
    const token = getAuthenticationCookie(ctx)

    const { data } = await axios.get(
      process.env.NEXT_PUBLIC_WEBSITE_URL +
        '/api/genres?' +
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
