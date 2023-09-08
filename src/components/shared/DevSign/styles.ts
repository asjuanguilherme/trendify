import styled from 'styled-components'
import { font } from 'styles/designSystemConfig'
import NextLink from 'next/link'

export const Link = styled(NextLink)`
  font-size: ${font.sizes.small};
  font-weight: ${font.weight.medium};
  color: ${props => props.theme.colors.main.secondary.normal};
  text-decoration: none;
`

export const Prefix = styled.span``

export const Wrapper = styled.span`
  display: block;
  font-size: ${font.sizes.small};
  text-align: center;
`
