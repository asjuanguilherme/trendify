import { TrackItemStyle } from 'components/shared/TrackItem'
import { darken, readableColor } from 'polished'
import styled from 'styled-components'
import { css } from 'styled-components'
import { borderRadius, font, spacing } from 'styles/designSystemConfig'

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

  svg {
    position: relative;
    bottom: 0.125rem;
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
  font-size: ${font.sizes.large};
  font-weight: ${font.weight.bold};
  margin-bottom: ${spacing.components.small};
`

export const GeneratedBox = styled.div<{ $color: string; $bgImageUrl: string }>`
  background: linear-gradient(
    ${props => props.$color},
    ${props => darken(0.15, props.$color)}
  );

  padding: ${spacing.components.medium};
  color: ${props => readableColor(props.$color, 'black', 'white')};
  position: relative;
  z-index: 1;

  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: -1;
    background-image: url(${props => props.$bgImageUrl});
    background-size: cover;
    background-position: center;
    opacity: 0.2;
  }
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
