import { SpotifyTrack } from 'services/spotify/types/Track'
import * as S from './styles'

export type TrackItemSize = 'small' | 'medium' | 'large'

export type TrackItemStyle = 'default' | 'spotify' | 'apple-music'

export type TrackItemProps = {
  itemsBoxColor: string
  data: SpotifyTrack
  size?: TrackItemSize
  style?: TrackItemStyle
  badgeNumber?: number
}

const TrackItem = ({
  data,
  size = 'medium',
  style = 'default',
  badgeNumber,
  itemsBoxColor
}: TrackItemProps) => {
  return (
    <S.Wrapper $size={size} $style={style}>
      {badgeNumber && (
        <S.BadgeNumber
          $itemsBoxColor={itemsBoxColor}
          $badgeNumber={badgeNumber}
        >
          {badgeNumber}
        </S.BadgeNumber>
      )}
      <S.AlbumImage
        src={data.album.images[0].url}
        $size={size}
        $style={style}
      />
      <S.Info $style={style}>
        <S.Title $size={size} $nameLength={data.name.length}>
          {data.name}
        </S.Title>
        <S.ArtistName $size={size}>{data.artists[0].name}</S.ArtistName>
      </S.Info>
    </S.Wrapper>
  )
}

export default TrackItem
