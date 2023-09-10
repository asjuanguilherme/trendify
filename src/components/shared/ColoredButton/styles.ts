import { readableColor } from 'polished'
import styled, { css } from 'styled-components'
import Button from '../Button'

export const Wrapper = styled(Button)<{ $color: string; $active: boolean }>`
  background: ${props => props.$color} !important;
  border: 3px solid
    ${({ $color }) => readableColor($color, '#00000030', '#ffffff30')};

  ${({ $active }) =>
    $active &&
    css`
      border-color: ${props =>
        props.theme.name === 'dark' ? 'white' : 'black'} !important;
      transform: scale(1.2);

      &:hover {
        transform: scale(1.2) !important;
      }

      &:active {
      }
    `}
`
