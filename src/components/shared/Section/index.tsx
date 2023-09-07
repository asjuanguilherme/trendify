import { ReactNode } from 'react'
import * as S from './styles'
import Container from '../Container'

export type SectionProps = {
  title?: string
  children?: ReactNode
}

const Section = ({ title, children }: SectionProps) => {
  return (
    <S.Wrapper>
      <Container>
        {title && <S.Title>{title}</S.Title>}
        {children && <S.Content>{children}</S.Content>}
      </Container>
    </S.Wrapper>
  )
}

export default Section
