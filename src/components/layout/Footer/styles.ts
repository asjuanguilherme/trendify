import Link from 'next/link'
import styled from 'styled-components'
import { font, spacing } from 'styles/designSystemConfig'

export const DevSignLink = styled(Link)`
  font-size: ${font.sizes.small};
  font-weight: ${font.weight.medium};
  color: ${props => props.theme.colors.main.secondary.normal};
  text-decoration: none;
`

export const DevSignPrefix = styled.span``

export const DevSignText = styled.p`
  font-size: ${font.sizes.small};
  text-align: center;
`

export const Wrapper = styled.footer`
  padding: ${spacing.components.larger} 0;
`
