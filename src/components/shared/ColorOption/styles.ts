import { readableColor } from 'polished'
import styled from 'styled-components'
import {
  borderRadius,
  buttonSizes,
  transition
} from 'styles/designSystemConfig'

export const Wrapper = styled.button<{ $color: string }>`
  background-color: ${props => props.$color};
  flex-shrink: 0;
  display: inline-flex;
  height: ${buttonSizes.smaller};
  width: ${buttonSizes.smaller};
  border-radius: ${borderRadius.circle};
  border: 3px solid
    ${({ $color }) => readableColor($color, '#00000030', '#ffffff30')};
  cursor: pointer;
  transition: ${transition.default};
  transition-property: transform;

  &:hover {
    transform: scale(1.1);
  }
`
