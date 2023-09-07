import { SpotifyTrack } from 'services/spotify/types/Track'
import * as S from './styles'

export type TrackItemSize = 'small' | 'medium' | 'large'

export type TrackItemStyle = 'default' | 'spotify'

export type TrackItemProps = {
  data: SpotifyTrack
  size?: TrackItemSize
  style?: TrackItemStyle
}

const TrackItem = ({
  data,
  size = 'medium',
  style = 'default'
}: TrackItemProps) => {
  return (
    <S.Wrapper $size={size} $style={style}>
      <S.AlbumImage
        src={data.album.images[0].url}
        $size={size}
        $style={style}
      />
      <S.Info $style={style}>
        <S.Title $size={size}>{data.name}</S.Title>
        <S.ArtistName $size={size}>{data.artists[0].name}</S.ArtistName>
      </S.Info>
    </S.Wrapper>
  )
}

export default TrackItem
