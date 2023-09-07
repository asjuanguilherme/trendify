import * as S from './styles'
import { SpotifyUserProfile } from 'services/spotify/types'
import Section from 'components/shared/Section'
import ButtonLink from 'components/shared/ButtonLink'

export type AuthenticatedHomeViewProps = {
  userData: SpotifyUserProfile
}

const AuthenticatedHomeView = ({ userData }: AuthenticatedHomeViewProps) => {
  return (
    <S.Wrapper>
      <Section title={`Bem vindo(a), ${userData.display_name}`}>
        <S.ButtonsWrapper>
          {/* <ButtonLink
            color="secondary"
            fillWidth
            href="/my-top-artists"
            disabled
          >
            Top artistas
          </ButtonLink> */}
          <ButtonLink fillWidth href="/my-top-tracks">
            Minhas top músicas
          </ButtonLink>
        </S.ButtonsWrapper>
      </Section>
    </S.Wrapper>
  )
}

export default AuthenticatedHomeView
