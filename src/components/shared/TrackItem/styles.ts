import { rem } from 'polished'
import styled, { css } from 'styled-components'
import { borderRadius, font, spacing } from 'styles/designSystemConfig'
import { TrackItemSize, TrackItemStyle } from '.'

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
  font-weight: ${font.weight.bold};
`

export const Info = styled.div<{
  $style: TrackItemStyle
}>`
  display: flex;
  flex-direction: column;

  ${({ $style }) => {
    switch ($style) {
      case 'spotify':
        return css`
          gap: ${spacing.components.smaller};
          padding-left: ${spacing.components.smaller};
        `
      default:
        return css`
          padding: ${spacing.components.smaller};
          padding-top: ${rem(2)};
          padding-left: 0;
          gap: ${spacing.components.smaller};
        `
    }
  }}
`

export const AlbumImage = styled.img<{
  $size: TrackItemSize
  $style: TrackItemStyle
}>`
  width: ${({ $size }) => rem(configBySize[$size].imageSize)};
  height: ${({ $size }) => rem(configBySize[$size].imageSize)};

  ${({ $style }) => {
    switch ($style) {
      case 'spotify':
        return css``
      default:
        return css`
          border-radius: ${borderRadius.small};
        `
    }
  }}
`

export const Wrapper = styled.div<{
  $size: TrackItemSize
  $style: TrackItemStyle
}>`
  display: flex;
  gap: ${spacing.components.small};

  ${({ $style }) => {
    switch ($style) {
      case 'spotify':
        return css``
      default:
        return css`
          padding: ${rem(2)};
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: ${borderRadius.small};
        `
    }
  }}
`
