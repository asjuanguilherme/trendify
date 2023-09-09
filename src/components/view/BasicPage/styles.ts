import styled from 'styled-components'
import { spacing } from 'styles/designSystemConfig'
import { screens } from 'styles/screens'

export const Return = styled.div`
  margin-bottom: ${spacing.sections.small};
`

export const Content = styled.div``

export const Wrapper = styled.article`
  padding: ${spacing.sections.smaller} 0;

  ${screens.tablet} {
    padding: ${spacing.sections.medium} 0;
  }
`
