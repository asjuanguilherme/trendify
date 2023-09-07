import { SpotifyArtist } from './Artist'

export type SpotifyAlbum = {
  album_type: string
  artists: SpotifyArtist[]
  available_markets: string[]
  href: string
  id: string
  images: {
    height: number
    url: string
    width: number
  }[]
  name: string
  release_date: string
  release_date_precision: string
  total_tracks: number
  type: string
  uri: string
}
