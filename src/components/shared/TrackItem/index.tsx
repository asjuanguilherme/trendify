import { SpotifyTrack } from 'services/spotify/types/Track'
import * as S from './styles'

export type TrackItemSize = 'small' | 'medium' | 'large'

export type TrackItemProps = {
  data: SpotifyTrack
  size?: TrackItemSize
}

const TrackItem = ({ data, size = 'medium' }: TrackItemProps) => {
  return (
    <S.Wrapper $size={size}>
      <S.AlbumImage src={data.album.images[0].url} $size={size} />
      <S.Info>
        <S.Title $size={size}>{data.name}</S.Title>
        <S.ArtistName $size={size}>{data.artists[0].name}</S.ArtistName>
      </S.Info>
    </S.Wrapper>
  )
}

export default TrackItem
