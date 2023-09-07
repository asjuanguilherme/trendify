type ExternalUrls = {
  spotify: string
}

type Followers = {
  href: null | string
  total: number
}

type Image = {
  height: number
  url: string
  width: number
}

export type SpotifyArtist = {
  external_urls: ExternalUrls
  followers: Followers
  genres: string[]
  href: string
  id: string
  images: Image[]
  name: string
  popularity: number
  type: string
  uri: string
}
