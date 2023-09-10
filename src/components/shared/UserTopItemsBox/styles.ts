import { opacify, readableColor, rem } from 'polished'
import styled, { css, keyframes } from 'styled-components'
import {
  borderRadius,
  font,
  spacing,
  transition
} from 'styles/designSystemConfig'
import { TrackItemStyle } from '../TrackItem'
import {
  GeneratorType,
  topItemsGeneratorConfig
} from 'config/topItemsGenerator'

export const CreatedByLink = styled.span`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: ${spacing.components.small};
  font-size: ${font.sizes.smaller};
`

export const CreatedByText = styled.span<{ $itemsBoxColor: string }>`
  font-size: ${font.sizes.smaller};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.components.smaller};
  font-weight: ${font.weight.medium};

  svg {
    position: relative;
    bottom: 0.2rem;
    font-size: 1.3rem;

    * {
      fill: currentColor;
    }
  }
`

export const Footer = styled.footer`
  margin-top: ${spacing.sections.small};
`

export const LoadingWrapper = styled.div`
  padding: ${spacing.sections.larger} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.layers[1].background};
  border: 1px solid ${props => props.theme.colors.layers[1].border};
  border-radius: ${borderRadius.small};
  color: ${props => props.theme.colors.main.primary.normal};
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
`

export const EmptyText = styled.div``

export const Empty = styled.div`
  background-color: ${props => props.theme.colors.layers[1].background};
  font-size: ${font.sizes.default};
  opacity: 0.75;
  line-height: 1.5em;
  padding: ${spacing.components.large};
  display: flex;
  gap: ${spacing.components.medium};
  align-items: center;

  svg {
    font-size: ${font.sizes.xxlarger};
    opacity: 0.5;
  }
`

export const SpotifyInfoProfileName = styled.span`
  display: inline-flex;
  font-size: ${font.sizes.large};
  font-weight: ${font.weight.bold};
`

export const SpotifyInfoProfileImagePlaceholder = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${rem(32)};
  height: ${rem(32)};
  border-radius: ${borderRadius.circle};
  background-color: ${props => props.theme.colors.layers[0].background};

  svg {
    opacity: 0.5;
  }
`

export const SpotifyInfoProfileImage = styled.img`
  width: ${rem(32)};
  height: ${rem(32)};
  border-radius: ${borderRadius.circle};
`

export const SpotifyInfoProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.components.medium};
`

export const SpotifyInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing.components.small};
  padding-bottom: ${spacing.components.large};
  width: 100%;
  flex-shrink: 0;

  svg {
    height: 1.5rem;
    width: unset !important;
    opacity: 0.75;
  }
`

export const ItemsList = styled.ul<{
  $style: TrackItemStyle
  $backgroundColor: string
  $itemsLength?: number
  $generatorType: GeneratorType
}>`
  display: flex;
  flex-direction: column;

  ${({ $style, $backgroundColor, $itemsLength, $generatorType }) => {
    switch ($style) {
      case 'spotify':
        return css`
          gap: ${spacing.components.small};
          list-style: none;
        `
      case 'apple-music':
        return css`
          list-style: none;
          gap: ${$itemsLength && $itemsLength > 5
            ? ''
            : spacing.components.smaller};

          li:not(:last-child) {
            &::after {
              content: '';
              display: block;
              width: ${$generatorType == 'genres'
                ? '100%'
                : $itemsLength == 10
                ? '86.5%'
                : $itemsLength == 5
                ? '83%'
                : '80%'};
              margin-left: auto;
              height: 1px;
              background: ${readableColor(
                $backgroundColor,
                '#00000020',
                '#ffffff20'
              )};
            }
          }
        `
      default:
        return css`
          list-style: none;
          gap: ${spacing.components.smaller};
        `
    }
  }}
`

export const Main = styled.main``

export const HeaderInfoRowItem = styled.span<{
  $itemsBoxColor: string
}>`
  display: flex;
  align-items: flex;
  gap: ${spacing.components.smaller};

  ${props => {
    const color = readableColor(props.$itemsBoxColor, '#000000', '#ffffff')
    const isLight = color === '#000000'

    return css`
      font-weight: ${isLight ? font.weight.bold : font.weight.light};
    `
  }}
`

export const HeaderInfoRow = styled.div`
  display: flex;
  font-size: ${font.sizes.small};
  opacity: 0.75;
  align-items: flex-end;
  gap: ${spacing.components.large};

  svg {
    font-size: ${font.sizes.large};
  }
`

export const Title = styled.h2`
  font-size: ${font.sizes.xlarger};
  font-weight: ${font.weight.bold};
  width: max-content;
  max-width: 100%;
`

export const Header = styled.header`
  margin-bottom: ${spacing.components.larger};
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.small};
`

export const GeneratedBoxImage = styled.img<{ $enableBlur: boolean }>`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  object-fit: cover;
  object-position: center;
  opacity: 0.1;
  animation: ${keyframes`
  from {
    opacity: 0;
    transform: scale(1.5);
  }
  `} ${transition.default} ease;

  ${props =>
    props.$enableBlur &&
    css`
      filter: blur(6px);
    `}
`

export const Wrapper = styled.div<{
  $color: string
  $enableGradient: boolean
  $roundedCorners: boolean
}>`
  background: ${props => props.$color};
  padding: ${spacing.components.larger};
  color: ${props => readableColor(props.$color, '#000000', 'white')};
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin: 0 auto;
  width: ${topItemsGeneratorConfig.boxWidth}px;
  border-radius: ${props =>
    props.$roundedCorners ? borderRadius.large : 'initial'};

  transition: ${transition.default};
  transition-property: background, border-radius;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: ${transition.default};
    background: linear-gradient(
      transparent,
      ${props =>
        opacify(-0.7, readableColor(props.$color, '#ffffff', '#000000'))}
    );
    opacity: 0;
  }

  ${props =>
    props.$enableGradient &&
    css`
      &::after {
        opacity: 1;
      }
    `}
`
