import * as S from './styles'
import { CSSProperties, MouseEvent, MutableRefObject, ReactNode } from 'react'
import { MainColorsKeys, LayerIndex } from '../../../../styled'

export type ButtonSize = 'smaller' | 'small' | 'default'

export type ButtonVariants = 'filled' | 'outlined' | 'basic' | 'white'

export type ButtonProps = {
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
  as?: string
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
  fillWidth,
  onlyIcon,
  ...props
}: ButtonProps) => {
  return (
    <S.Wrapper
      ref={setRef}
      $color={color}
      $size={size}
      $variant={variant}
      $layer={layer}
      $badge={badge}
      type={type}
      $fillWidth={fillWidth}
      $onlyIcon={onlyIcon}
      {...props}
    >
      {children}
    </S.Wrapper>
  )
}

export default Button
