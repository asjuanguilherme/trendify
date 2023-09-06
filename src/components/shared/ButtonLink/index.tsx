'use client'

import * as S from './styles'
import Button, { ButtonProps } from '../Button'

export type ButtonLinkProps = ButtonProps & {
  href: string
  isExternal?: boolean
}

const ButtonLink = ({ href, isExternal, ...props }: ButtonLinkProps) => {
  if (!href) throw new Error('ButtonLink must have href prop')

  return (
    <S.LinkWrapper
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <Button {...props} as="span" />
    </S.LinkWrapper>
  )
}

export default ButtonLink
