import * as S from './styles'
import Button, { ButtonProps } from '../Button'

export type ButtonLinkProps = ButtonProps & {
  href: string
  isExternal?: boolean
  download?: boolean
}

const ButtonLink = ({
  href,
  isExternal,
  download,
  ...props
}: ButtonLinkProps) => {
  if (!href) throw new Error('ButtonLink must have href prop')

  return (
    <S.LinkWrapper
      href={href}
      target={isExternal ? '_blank' : '_self'}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={e => {
        props.disabled && e.preventDefault()
      }}
      download={download}
    >
      <Button {...props} as="span" />
    </S.LinkWrapper>
  )
}

export default ButtonLink
