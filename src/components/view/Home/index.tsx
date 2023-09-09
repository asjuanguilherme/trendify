import * as S from './styles'
import Section from 'components/shared/Section'
import ButtonLink from 'components/shared/ButtonLink'
import SpotifyLogo from 'components/shared/SpotifyLogo'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import BasicPageView from '../BasicPage'

export type HomeViewProps = {}

const HomeView = ({}: HomeViewProps) => {
  const router = useRouter()

  useEffect(() => {
    console.log(router.query)
  }, [router.query])

  return (
    <S.Wrapper>
      <S.PageView showReturn={false}>
        <h1>Descubra seu sTopify</h1>
        <p>
          Descubra suas músicas e artistas favoritos com o sTopify. Uma
          abordagem simples e personalizada para explorar sua música de maneira
          elegante.
        </p>
        <ButtonLink style={{ marginTop: '1.5rem' }} href="/login">
          Entrar com
          <SpotifyLogo style={{ fontSize: '1.35rem', marginLeft: '-.3rem' }} />
        </ButtonLink>
      </S.PageView>
    </S.Wrapper>
  )
}

export default HomeView
