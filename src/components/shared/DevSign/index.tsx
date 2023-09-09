import { DEVELOPER_WEBSITE_URL } from 'config/developerWebsiteURL'
import * as S from './styles'
import { useI18n } from 'hooks/useI18n'

export type DevSignProps = {}

const DevSign = ({}: DevSignProps) => {
  const i18n = useI18n()

  return (
    <S.Wrapper>
      <S.Prefix>{i18n.DEVELOPED_BY} </S.Prefix>
      <S.Link href={DEVELOPER_WEBSITE_URL} target="_blank">
        {new URL(DEVELOPER_WEBSITE_URL).hostname}
      </S.Link>
    </S.Wrapper>
  )
}

export default DevSign
