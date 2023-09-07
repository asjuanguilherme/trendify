import { readableColor, rem } from 'polished'
import styled from 'styled-components'
import { borderRadius, buttonSizes } from 'styles/designSystemConfig'

export const SelectedColor = styled.label<{ $color: string }>`
  display: inline-block;
  height: ${buttonSizes.small};
  width: ${buttonSizes.small};
  border-radius: ${borderRadius.small};
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.15);
  background-color: ${props => props.$color};
  border: ${rem(3)} solid
    ${props => readableColor(props.$color, '#000000', '#ffffff')}50;
`

export const Wrapper = styled.div``
