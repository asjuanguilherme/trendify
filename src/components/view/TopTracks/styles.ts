import { TrackItemStyle } from 'components/shared/TrackItem'
import { readableColor, rem } from 'polished'
import styled, { keyframes } from 'styled-components'
import { css } from 'styled-components'
import {
  borderRadius,
  font,
  spacing,
  transition
} from 'styles/designSystemConfig'

export const StyleOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.medium};
`

export const ProfileName = styled.span`
  font-size: ${font.sizes.large};
  font-weight: ${font.weight.bold};
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

export const LoadingBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.sections.medium};
  font-size: ${font.sizes.xxlarger};
`

export const TimeRangeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.components.small};
`

export const LimitButtons = styled.div`
  display: flex;
  gap: ${spacing.components.small};
  flex-wrap: wrap;
`

export const SettingsFormSectionTitle = styled.span`
  font-size: ${font.sizes.default};
  font-weight: ${font.weight.medium};
  margin-bottom: ${spacing.components.small};
  display: inline-block;
`

export const SettingsFormSection = styled.div`
  margin-bottom: ${spacing.components.medium};
`

export const SettingsForm = styled.div``

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

export const ItemsList = styled.ul<{ $style: TrackItemStyle }>`
  display: flex;
  flex-direction: column;

  ${({ $style }) => {
    switch ($style) {
      case 'spotify':
        return css`
          gap: ${spacing.components.small};
          list-style: none;
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
  opacity: 0.2;
  animation: ${keyframes`
          from {
            opacity: 0;
            transform: scale(1.5);
          }
        `} ${transition.default} ease;
`

export const GeneratedBox = styled.div<{
  $color: string
  $enableGradient: boolean
  $enableBlur: boolean
}>`
  background: ${props => props.$color};
  padding: ${spacing.components.medium};
  color: ${props => readableColor(props.$color, '#000000', 'white')};
  position: relative;
  z-index: 1;

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

export const Board = styled.div`
  border-radius: ${borderRadius.small};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.layers[1].border};
`

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.components.small};
  margin-top: ${spacing.components.large};
  margin-bottom: ${spacing.components.small};

  button {
    flex: 1;
  }
`

export const Wrapper = styled.div``
