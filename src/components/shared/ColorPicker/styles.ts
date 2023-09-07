import { readableColor, rem } from 'polished'
import styled from 'styled-components'
import {
  borderRadius,
  buttonSizes,
  spacing,
  transition
} from 'styles/designSystemConfig'

export const SelectedColor = styled.span<{ $color: string }>`
  display: inline-block;
  height: ${buttonSizes.smaller};
  width: ${buttonSizes.smaller};
  border-radius: ${borderRadius.circle};
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.15);
  background-color: ${props => props.$color};
  border: ${rem(3)} solid
    ${props => readableColor(props.$color, '#000000', '#ffffff')}50;
  transition: ${transition.fast};

  &:hover {
    transform: scale(1.1);
  }
`

export const Wrapper = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${spacing.components.small};
`
