import * as S from './styles'

export type DevSignProps = {}

const DevSign = ({}: DevSignProps) => {
  return (
    <S.Wrapper>
      <S.Prefix>Desenvolvido por </S.Prefix>
      <S.Link href="https://juanguilher.me" target="_blank">
        juanguilher.me
      </S.Link>
    </S.Wrapper>
  )
}

export default DevSign
