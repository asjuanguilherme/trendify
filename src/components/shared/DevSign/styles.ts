import styled from 'styled-components'
import { borderRadius, font, spacing } from 'styles/designSystemConfig'
import NextLink from 'next/link'

export const Link = styled(NextLink)`
  font-size: ${font.sizes.small};
  font-weight: ${font.weight.medium};
  color: ${props =>
    props.theme.name === 'dark'
      ? props.theme.colors.main.primary.light
      : props.theme.colors.main.primary.normal};
  text-decoration: none;
`

export const Prefix = styled.span`
  font-size: ${font.sizes.smaller};
`

export const Wrapper = styled.span`
  display: block;
  font-size: ${font.sizes.small};
  text-align: center;
`
