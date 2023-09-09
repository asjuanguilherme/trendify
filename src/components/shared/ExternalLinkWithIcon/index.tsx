import * as S from './styles'
import React, { ReactNode } from 'react'
import ExternalLinkIcon from '../icons/ExternalLink'

export type ExternalLinkWithIconProps = {
  children?: ReactNode
  href?: string
}

const ExternalLinkWithIcon = ({
  children,
  href
}: ExternalLinkWithIconProps) => {
  return (
    <S.Wrapper href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ExternalLinkIcon />
    </S.Wrapper>
  )
}

export default ExternalLinkWithIcon
