import { CSSProperties } from 'react'
import * as S from './styles'

export type SpinnerProps = {
  className?: string
  style?: CSSProperties
}

const Spinner = ({ className, style }: SpinnerProps) => {
  return <S.Wrapper className={className} style={style} />
}

export default Spinner
