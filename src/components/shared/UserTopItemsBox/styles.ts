import { readableColor, rem } from 'polished'
import styled, { css, keyframes } from 'styled-components'
import {
  borderRadius,
  font,
  spacing,
  transition
} from 'styles/designSystemConfig'
import { TrackItemStyle } from '../TrackItem'

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

export const ProfileName = styled.span`
  font-size: ${font.sizes.large};
  font-weight: ${font.weight.bold};
`

export const ProfileImagePlaceholder = styled.span`
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

export const ProfileImage = styled.img`
  width: ${rem(32)};
  height: ${rem(32)};
  border-radius: ${borderRadius.circle};
`

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.components.small};
  margin-bottom: ${spacing.components.medium};
  padding-bottom: ${spacing.components.medium};
`

export const CreatedBy = styled.span`
  font-size: ${font.sizes.smaller};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.components.smaller};
  margin-top: ${spacing.components.medium};
  font-weight: ${font.weight.medium};

  svg {
    position: relative;
    font-size: 1.3rem;
  }
`

export const ItemsList = styled.ul<{
  $style: TrackItemStyle
  $backgroundColor: string
}>`
  display: flex;
  flex-direction: column;

  ${({ $style, $backgroundColor }) => {
    switch ($style) {
      case 'spotify':
        return css`
          gap: ${spacing.components.small};
          list-style: none;
        `
      case 'apple-music':
        return css`
          list-style: none;

          li:not(:last-child) {
            border-bottom: 1px solid
              ${readableColor($backgroundColor, '#00000020', '#ffffff20')};
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

export const Date = styled.span`
  display: block;
  font-size: ${font.sizes.small};
  opacity: 0.75;
  margin-bottom: ${spacing.components.larger};
`

export const Title = styled.h2`
  font-size: ${font.sizes.larger};
  font-weight: ${font.weight.bold};
  margin-bottom: ${spacing.components.small};
`

export const GeneratedBoxImage = styled.span<{ $src: string }>`
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  z-index: -1;
  background-image: url(${props => props.$src});
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  animation: ${keyframes`
          from {
            opacity: 0;
            transform: scale(1.5);
          }
        `} ${transition.default} ease;
`

export const Wrapper = styled.div<{
  $color: string
  $enableGradient: boolean
  $enableBlur: boolean
}>`
  background: ${props => props.$color};
  padding: ${spacing.components.medium};
  color: ${props => readableColor(props.$color, '#000000', 'white')};
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin: 0 auto;
  width: 360px;

  @media screen and (max-width: 390px) {
    transform-origin: 30% top;
    transform: scale(0.8);
  }

  @media screen and (max-width: 360px) {
    transform-origin: 15% top;
  }

  @media screen and (max-width: 350px) {
    transform-origin: 3% top;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    transition: ${transition.default};
    background: linear-gradient(
      transparent,
      ${props => readableColor(props.$color, '#00000070', '#ffffff70')}
    );
    opacity: 0;
    backdrop-filter: ${props => (props.$enableBlur ? 'blur(5px)' : 'initial')};
  }

  ${props =>
    props.$enableGradient &&
    css`
      ${CreatedBy} {
        color: white;
      }

      &::after {
        opacity: 1;
      }
    `}
`
