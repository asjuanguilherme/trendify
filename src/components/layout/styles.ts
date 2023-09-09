import { rem } from 'polished'
import styled from 'styled-components'
import { screens } from 'styles/screens'

export const appLayoutConfig = {
  headerHeight: {
    mobile: rem(75),
    laptop: rem(90)
  }
}

export const Main = styled.main`
  flex: 1;
  padding-top: ${appLayoutConfig.headerHeight.mobile};

  ${screens.laptop} {
    padding-top: ${appLayoutConfig.headerHeight.laptop};
  }
`

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.layers[0].background};
`
