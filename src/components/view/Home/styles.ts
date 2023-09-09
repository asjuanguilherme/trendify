import styled from 'styled-components'
import { font, spacing } from 'styles/designSystemConfig'
import { breakpoints, screens } from 'styles/screens'
import BasicPageView from '../BasicPage'

export const PageView = styled(BasicPageView)`
  padding-top: ${spacing.components.medium};
  max-width: ${breakpoints.tablet}px;
  margin: 0 auto;

  ${screens.tablet} {
    padding-top: ${spacing.sections.larger};
  }

  h1 {
    font-size: ${font.sizes.xxlarger};
  }

  * {
    font-size: ${font.sizes.large};
  }
`

export const Wrapper = styled.div`
  height: 100%;
  z-index: 1;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background-image: url(/assets/images/home-background.png);
    background-size: cover;
    width: 100%;
    height: 100%;
    filter: blur(5px);
    opacity: 0.2;
  }

  text-align: center;
`
