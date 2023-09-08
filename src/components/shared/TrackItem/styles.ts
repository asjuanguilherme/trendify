import {
  rem,
  adjustHue,
  readableColor,
  lighten,
  saturate,
  getLuminance,
  parseToRgb,
  darken,
  rgba
} from 'polished'
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

export const Title = styled.span<{
  $size: TrackItemSize
  $nameLength: number
}>`
  font-size: ${props => configBySize[props.$size].titleFontSize};
  font-weight: ${font.weight.bold};

  ${props =>
    props.$nameLength > 35 &&
    css`
      font-size: calc(${configBySize[props.$size].titleFontSize} - 0.2rem);
    `}
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
      case 'apple-music':
        return css`
          height: 100%;
          width: 100%;
          gap: ${spacing.components.smaller};
          margin-left: ${spacing.components.smaller};
          padding-top: ${spacing.components.smaller};
          padding-bottom: ${spacing.components.small};
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
      case 'apple-music':
        return css`
          border-radius: ${borderRadius.smaller};
        `
      default:
        return css`
          border-radius: ${borderRadius.small};
        `
    }
  }}
`

export const BadgeNumber = styled.span<{
  $itemsBoxColor: string
  $badgeNumber: number
}>`
  ${props => {
    const backgroundColorInitial = saturate(
      1,
      adjustHue(-180 - 20 * (3 - props.$badgeNumber), props.$itemsBoxColor)
    )

    const backgroundLuminance = getLuminance(backgroundColorInitial)
    const rgbColor = parseToRgb(backgroundColorInitial)

    const backgroundColor = (() => {
      if (backgroundLuminance < 0.07) {
        if (rgbColor.blue < 70 && rgbColor.green < 70 && rgbColor.red < 70)
          return lighten(0.5, backgroundColorInitial)

        return lighten(0.3, backgroundColorInitial)
      }

      if (
        backgroundLuminance > 0.3 &&
        (rgbColor.red > 150 || rgbColor.green > 150 || rgbColor.blue > 150)
      )
        return adjustHue(20, darken(0.4, backgroundColorInitial))

      return backgroundColorInitial
    })()

    return css`
      position: absolute;
      left: 0;
      top: 0;
      transform: translate(-0.5rem, -0.5rem);
      width: 1.8rem;
      height: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${backgroundColor};
      font-size: ${font.sizes.default};
      font-weight: bold;
      border-radius: ${borderRadius.small};
      color: ${readableColor(backgroundColor, '#000000', '#ffffff')};
      padding-bottom: 0.2rem;

      &::before {
        content: '#';
        font-size: ${font.sizes.small};
        opacity: 0.5;
      }
    `
  }}
`

export const Wrapper = styled.div<{
  $size: TrackItemSize
  $style: TrackItemStyle
  $itemsBoxColor: string
}>`
  display: flex;
  gap: ${spacing.components.small};
  position: relative;

  ${({ $style, $itemsBoxColor }) => {
    const backgroundColor = readableColor(
      $itemsBoxColor,
      rgba(0, 0, 0, 0.05),
      rgba(255, 255, 255, 0.08)
    )

    switch ($style) {
      case 'spotify':
        return css``
      case 'apple-music':
        return css`
          align-items: center;
        `
      default:
        return css`
          padding: ${rem(2)};
          background: ${backgroundColor};
          border: 1px solid ${backgroundColor};
          border-radius: ${borderRadius.small};
        `
    }
  }}
`
