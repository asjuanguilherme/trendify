import styled from 'styled-components'
import { font } from 'styles/designSystemConfig'

export const Wrapper = styled.a`
  font-weight: ${font.weight.medium};

  &::after {
    content: ' ';
  }

  &::before {
    content: ' ';
  }

  svg {
    font-size: 0.75em;
    margin-left: 0.35em;
  }
`
