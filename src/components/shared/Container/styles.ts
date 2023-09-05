import styled from 'styled-components'
import { layout } from 'styles/designSystemConfig'
import { screens } from 'styles/screens'

export const Wrapper = styled.div`
  padding-left: ${layout.gutter};
  padding-right: ${layout.gutter};

  ${screens.tabletS} {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  max-width: ${layout.containerMaxWidht};
  margin: 0 auto;
`
