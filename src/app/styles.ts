import { rem } from 'polished'
import { styled } from 'styled-components'
import { spacing } from 'styles/designSystemConfig'

export const appLayoutConfig = {
  headerHeight: rem(90)
}

export const Main = styled.main`
  flex: 1;
  padding-top: calc(
    ${appLayoutConfig.headerHeight} + ${spacing.components.medium}
  );
`

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${props => props.theme.colors.layers[0].background};
`
