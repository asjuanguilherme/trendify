import { css } from 'styled-components'
import { font } from 'styles/designSystemConfig'
import { screens } from 'styles/screens'

const resets = css`
  * {
    padding: 0;
    margin: 0;
    outline: none;
    border: 0;
    user-select: none;
    scroll-behavior: smooth;
    box-sizing: border-box;
    font-weight: ${font.weight.regular};
    font-family: ${font.family.poppins};
  }

  ::selection {
    color: white;
    background-color: ${props => props.theme.colors.main.primary.normal};
  }

  a {
    color: inherit;
  }

  html {
    color: ${props => props.theme.colors.title};
    background-color: ${props => props.theme.colors.layers[0].background};
    font-size: 12px;

    ${screens.mobileM} {
      font-size: 14px;
    }

    ${screens.tablet} {
      font-size: 16px;
    }
  }

  html,
  body,
  #__next {
    overflow-x: hidden;
    height: 100vh;
    max-height: 100%;
  }
`

export default resets
