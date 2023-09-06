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
      rel={isExternal ? 'noopener noreferrer' : undefined}
    >
      <Button {...props} as="a" />
    </S.LinkWrapper>
  )
}

export default ButtonLink
