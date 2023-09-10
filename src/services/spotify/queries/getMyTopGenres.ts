import { objectToQuerystring, uppercaseWholeText } from 'utils'
import { destroyAuthenticationCookie, setupSpotifyApiClient } from '../config'
import { SpotifyArtist } from '../types'
import { GetMyTopArtistsParams } from './getMyTopArtists'
import { TimeRange } from 'config/topItemsGenerator'
import { AxiosError } from 'axios'
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
  ctx,
  timeRange
}: GetMyTopArtistsParams): Promise<GlobalTrackItem[]> => {
  try {
    const spotifyClient = setupSpotifyApiClient(ctx)
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

    return genres.map(item => ({
      id: item,
      title: '# ' + uppercaseWholeText(item),
      type: 'genres'
    }))
  } catch (err) {
    if (err instanceof AxiosError) {
      if (Number(err.response?.status) >= 401) {
        destroyAuthenticationCookie(ctx)
        throw err
      }
    }
    throw err
  }
}
