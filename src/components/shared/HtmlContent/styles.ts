import styled from 'styled-components'
import { font, spacing } from 'styles/designSystemConfig'
import { screens } from 'styles/screens'

export const Wrapper = styled.div`
  font-size: ${font.sizes.default};
  line-height: 1.5em;

  p {
    margin-bottom: ${spacing.components.medium};
  }

  a {
    color: ${props =>
      props.theme.name === 'dark'
        ? props.theme.colors.main.secondary.light
        : props.theme.colors.main.secondary.dark};
    text-decoration: none;
  }

  h1 {
    line-height: 1.3em;
    font-weight: ${font.weight.bold};
    font-size: ${font.sizes.larger};
    margin-bottom: ${spacing.sections.small};

    ${screens.tablet} {
      font-size: ${font.sizes.xxlarger};
    }
  }

  h2 {
    line-height: 1.3em;
    font-weight: ${font.weight.bold};
    font-size: ${font.sizes.larger};
    margin-bottom: ${spacing.components.medium};
  }

  h3 {
    line-height: 1.3em;
    font-weight: ${font.weight.bold};
    font-size: ${font.sizes.default};
  }
`
