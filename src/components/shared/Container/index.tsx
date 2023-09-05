import { CSSProperties, ReactNode } from 'react'
import * as S from './styles'

export type ContainerProps = {
  children?: ReactNode
  style?: CSSProperties
  className?: string
}

const Container = ({ children, ...props }: ContainerProps) => {
  return <S.Wrapper {...props}>{children}</S.Wrapper>
}

export default Container
