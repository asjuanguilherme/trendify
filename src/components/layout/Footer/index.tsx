import DevSign from 'components/shared/DevSign'
import * as S from './styles'
import Container from 'components/shared/Container'

export type FooterProps = {}

const Footer = ({}: FooterProps) => {
  return (
    <S.Wrapper>
      <Container>
        <DevSign />
      </Container>
    </S.Wrapper>
  )
}

export default Footer
