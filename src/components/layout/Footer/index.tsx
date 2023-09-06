import * as S from './styles'
import Container from 'components/shared/Container'

export type FooterProps = {}

const Footer = ({}: FooterProps) => {
  return (
    <S.Wrapper>
      <Container>
        <S.DevSignText>
          <S.DevSignPrefix>Desenvolvido por </S.DevSignPrefix>
          <S.DevSignLink href="https://juanguilher.me" target="_blank">
            juanguilher.me
          </S.DevSignLink>
        </S.DevSignText>
      </Container>
    </S.Wrapper>
  )
}

export default Footer
