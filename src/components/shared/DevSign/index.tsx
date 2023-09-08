import { DEVELOPER_WEBSITE_URL } from 'config/developerWebsiteURL'
import * as S from './styles'

export type DevSignProps = {}

const DevSign = ({}: DevSignProps) => {
  return (
    <S.Wrapper>
      <S.Prefix>Desenvolvido por </S.Prefix>
      <S.Link href={DEVELOPER_WEBSITE_URL} target="_blank">
        {new URL(DEVELOPER_WEBSITE_URL).hostname}
      </S.Link>
    </S.Wrapper>
  )
}

export default DevSign
