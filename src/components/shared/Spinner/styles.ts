import styled, { keyframes } from 'styled-components'
import { borderRadius } from 'styles/designSystemConfig'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Wrapper = styled.span`
  display: inline-flex;
  width: 1em;
  height: 1em;
  border-radius: ${borderRadius.circle};
  border: 2px solid transparent;
  border-top-color: currentColor;
  animation: ${spin} linear infinite 1s;
`
