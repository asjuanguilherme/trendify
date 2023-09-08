import * as S from './styles'
import Section from 'components/shared/Section'
import ButtonLink from 'components/shared/ButtonLink'
import SpotifyLogo from 'components/shared/icons/SpotifyLogo'

export type HomeViewProps = {}

const HomeView = ({}: HomeViewProps) => {
  return (
    <S.Wrapper>
      <Section title="Gere seu sTopify">
        <p>
          Descubra suas top músicas ou artistas ouvidos de um jeito fácil,
          personalizável e elegante.
        </p>
        <ButtonLink fillWidth style={{ marginTop: '1.5rem' }} href="/login">
          Entrar com
          <SpotifyLogo style={{ fontSize: '5rem', marginLeft: '-.5rem' }} />
        </ButtonLink>
      </Section>
    </S.Wrapper>
  )
}

export default HomeView
