import {
  CSSProperties,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  useMemo
} from 'react'
import * as S from './styles'
import { MainColorsKeys, LayerIndex } from '../../../../styled'
import Link from 'next/link'

export type ButtonSize = 'smaller' | 'small' | 'default'

export type ButtonVariants = 'filled' | 'outlined' | 'basic' | 'white'

export type ButtonProps = {
  href?: string
  isExternalHref?: boolean
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  onlyIcon?: boolean
  children?: ReactNode
  size?: ButtonSize
  color?: MainColorsKeys
  variant?: ButtonVariants
  layer?: LayerIndex
  style?: CSSProperties
  className?: string
  fillWidth?: boolean
  setRef?: MutableRefObject<HTMLButtonElement | null>
  disabled?: boolean
  type?: 'button' | 'submit'
  badge?: string | number
}

const Button = ({
  children,
  type = 'button',
  size = 'default',
  color = 'primary',
  variant = 'filled',
  layer = 1,
  setRef,
  badge,
  ...props
}: ButtonProps) => {
  const ButtonComponent = useMemo(() => {
    return (
      <S.Wrapper
        ref={setRef}
        as={props.href ? 'a' : 'button'}
        color={color}
        size={size}
        variant={variant}
        layer={layer}
        {...props}
        badge={badge}
        rel={props.isExternalHref ? 'noopener noreferrer' : undefined}
        type={type}
      >
        {children}
      </S.Wrapper>
    )
  }, [setRef, props, color, size, variant, layer, badge, type, children])

  if (props.href)
    return (
      <Link
        href={props.href}
        target={props.isExternalHref ? '_blank' : '_self'}
        passHref
        legacyBehavior
      >
        {ButtonComponent}
      </Link>
    )

  return ButtonComponent
}

export default Button
