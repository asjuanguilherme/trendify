import * as S from './styles'
import Section from 'components/shared/Section'
import ButtonLink from 'components/shared/ButtonLink'
import SpotifyLogo from 'components/shared/icons/SpotifyLogo'

export type UnauthenticatedHomeViewProps = {}

const UnauthenticatedViewHome = ({}: UnauthenticatedHomeViewProps) => {
  return (
    <S.Wrapper>
      <Section title="Descubra seu topify">
        <p>Suas músicas em destaque, de um jeito rápido, fácil e elegante.</p>
        <ButtonLink fillWidth style={{ marginTop: '1.5rem' }} href="/login">
          Entrar com
          <SpotifyLogo style={{ fontSize: '5rem', marginLeft: '-.5rem' }} />
        </ButtonLink>
      </Section>
    </S.Wrapper>
  )
}

export default UnauthenticatedViewHome
