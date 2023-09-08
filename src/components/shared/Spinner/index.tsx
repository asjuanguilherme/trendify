import { CSSProperties } from 'react'
import * as S from './styles'

export type SpinnerProps = {
  size?: 'extra-small' | 'small' | 'normal' | 'large' | 'extra-large'
  className?: string
  style?: CSSProperties
}

const Spinner = ({ size = 'extra-small', className, style }: SpinnerProps) => {
  const sizes = {
    'extra-small': 16,
    small: 32,
    normal: 48,
    large: 72,
    'extra-large': 108
  }

  return (
    <S.Wrapper
      $strokeWidth={sizes[size] / 10}
      $size={sizes[size]}
      style={style}
      className={className}
    >
      <S.Circle $size={sizes[size]} $strokeWidth={sizes[size] / 10} />
    </S.Wrapper>
  )
}

export default Spinner
