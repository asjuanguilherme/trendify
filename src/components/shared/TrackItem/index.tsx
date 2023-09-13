import * as S from './styles'
import { GlobalTrackItem } from 'types/TrackItem'

export type TrackItemSize = 'small' | 'medium' | 'large'

export type TrackItemStyle = 'default' | 'spotify' | 'apple-music'

export type TrackItemProps = GlobalTrackItem & {
  itemsBoxColor: string
  size?: TrackItemSize
  style?: TrackItemStyle
  badgeNumber?: number
}

const TrackItem = ({
  title,
  description,
  image,
  size = 'medium',
  style = 'default',
  badgeNumber,
  itemsBoxColor,
  type,
  href
}: TrackItemProps) => {
  return (
    <S.Wrapper
      as={href ? 'a' : 'div'}
      href={href}
      $size={size}
      $style={style}
      $itemsBoxColor={itemsBoxColor}
      $generatorType={type}
    >
      {badgeNumber && (
        <S.BadgeNumber
          $itemsBoxColor={itemsBoxColor}
          $badgeNumber={badgeNumber}
        >
          {badgeNumber}
        </S.BadgeNumber>
      )}
      {image && (
        <S.Image
          src={image}
          $size={size}
          $style={style}
          $generatorType={type}
        />
      )}
      <S.Info $style={style} $generatorType={type}>
        <S.Title $size={size} $nameLength={title.length} $generatorType={type}>
          {title}
        </S.Title>
        {description && (
          <S.Description
            $size={size}
            $generatorType={type}
            $itemsBoxColor={itemsBoxColor}
          >
            {description}
          </S.Description>
        )}
      </S.Info>
    </S.Wrapper>
  )
}

export default TrackItem
