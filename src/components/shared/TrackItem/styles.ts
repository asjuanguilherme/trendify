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
import { GeneratorType } from 'config/topItemsGenerator'

const configBySize: Record<
  TrackItemSize,
  Record<
    GeneratorType,
    {
      imageSize: number
      titleFontSize: string
      descriptionFontSize: string
    }
  >
> = {
  small: {
    artists: {
      imageSize: 50,
      titleFontSize: font.sizes.small,
      descriptionFontSize: font.sizes.smaller
    },
    tracks: {
      imageSize: 40,
      titleFontSize: font.sizes.small,
      descriptionFontSize: font.sizes.smaller
    },
    genres: {
      imageSize: 40,
      titleFontSize: font.sizes.large,
      descriptionFontSize: font.sizes.smaller
    }
  },
  medium: {
    artists: {
      imageSize: 60,
      titleFontSize: font.sizes.default,
      descriptionFontSize: font.sizes.small
    },
    tracks: {
      imageSize: 52,
      titleFontSize: font.sizes.small,
      descriptionFontSize: font.sizes.small
    },
    genres: {
      imageSize: 52,
      titleFontSize: font.sizes.larger,
      descriptionFontSize: font.sizes.small
    }
  },
  large: {
    artists: {
      imageSize: 70,
      titleFontSize: font.sizes.large,
      descriptionFontSize: font.sizes.small
    },
    tracks: {
      imageSize: 64,
      titleFontSize: font.sizes.default,
      descriptionFontSize: font.sizes.small
    },
    genres: {
      imageSize: 85,
      titleFontSize: font.sizes.xlarger,
      descriptionFontSize: font.sizes.small
    }
  }
}

export const Description = styled.span<{
  $size: TrackItemSize
  $generatorType: GeneratorType
  $itemsBoxColor: string
}>`
  font-size: ${props =>
    configBySize[props.$size][props.$generatorType].descriptionFontSize};
  opacity: 0.75;
  font-weight: ${font.weight.book};
`

export const Title = styled.span<{
  $size: TrackItemSize
  $nameLength: number
  $generatorType: GeneratorType
}>`
  font-size: ${props =>
    configBySize[props.$size][props.$generatorType].titleFontSize};
  font-weight: ${font.weight.bold};
  text-overflow: ellipsis;

  ${props =>
    props.$nameLength > 40 &&
    css`
      font-size: calc(
        ${configBySize[props.$size][props.$generatorType].titleFontSize} -
          0.1rem
      );
    `}

  ${props =>
    props.$nameLength > 60 &&
    css`
      font-size: calc(
        ${configBySize[props.$size][props.$generatorType].titleFontSize} -
          0.25rem
      );
    `}
`

export const Info = styled.div<{
  $style: TrackItemStyle
  $generatorType: GeneratorType
}>`
  display: flex;
  flex-direction: column;

  ${props =>
    props.$generatorType &&
    css`
      justify-content: center;
    `}

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

export const Image = styled.img<{
  $size: TrackItemSize
  $style: TrackItemStyle
  $generatorType: GeneratorType
}>`
  width: ${({ $size, $generatorType }) =>
    rem(configBySize[$size][$generatorType].imageSize)};

  height: ${({ $size, $generatorType }) =>
    rem(configBySize[$size][$generatorType].imageSize)};

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
          border-radius: ${borderRadius.smaller};
        `
    }
  }}

  ${({ $generatorType }) => {
    switch ($generatorType) {
      case 'artists':
        return css`
          border-radius: ${borderRadius.circle};
        `
      case 'genres':
        return css``
      case 'tracks':
        return css``
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
      color: ${readableColor(backgroundColor, '#191414', '#ffffff')};
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
  $generatorType: GeneratorType
}>`
  text-decoration: none;
  display: flex;
  gap: ${spacing.components.small};
  position: relative;

  ${({ $style, $itemsBoxColor }) => {
    const backgroundColor = readableColor(
      $itemsBoxColor,
      rgba(0, 0, 0, 0.05),
      rgba(255, 255, 255, 0.1)
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
          padding: ${rem(4)};
          background: ${backgroundColor};
          border-radius: ${borderRadius.small};
        `
    }
  }}

  ${({ $generatorType }) => {
    switch ($generatorType) {
      case 'artists':
        return css`
          border-radius: ${borderRadius.pill} !important;
        `
      case 'genres':
        return css`
          padding: ${spacing.components.small};
        `
      case 'tracks':
        return css``
    }
  }}
`
