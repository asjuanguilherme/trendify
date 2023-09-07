import { rem } from 'polished'
import styled from 'styled-components'
import { borderRadius, font, spacing } from 'styles/designSystemConfig'
import { TrackItemSize } from '.'

const configBySize: Record<
  TrackItemSize,
  {
    imageSize: number
    titleFontSize: string
    artistNameFontSize: string
  }
> = {
  small: {
    imageSize: 40,
    titleFontSize: font.sizes.small,
    artistNameFontSize: font.sizes.smaller
  },
  medium: {
    imageSize: 52,
    titleFontSize: font.sizes.small,
    artistNameFontSize: font.sizes.small
  },
  large: {
    imageSize: 64,
    titleFontSize: font.sizes.default,
    artistNameFontSize: font.sizes.small
  }
}

export const ArtistName = styled.span<{ $size: TrackItemSize }>`
  font-size: ${props => configBySize[props.$size].artistNameFontSize};
  opacity: 0.75;
`

export const Title = styled.span<{ $size: TrackItemSize }>`
  font-size: ${props => configBySize[props.$size].titleFontSize};
  font-weight: ${font.weight.medium};
  color: ${props => props.theme.colors.title};
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.smaller};
`

export const AlbumImage = styled.img<{ $size: TrackItemSize }>`
  width: ${({ $size }) => rem(configBySize[$size].imageSize)};
  height: ${({ $size }) => rem(configBySize[$size].imageSize)};
  border-radius: ${borderRadius.small};
`

export const Wrapper = styled.div<{ $size: TrackItemSize }>`
  display: flex;
  gap: ${spacing.components.small};
  padding: ${spacing.components.smaller};
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: ${borderRadius.small};
`
