import { ReactNode } from 'react'
import * as S from './styles'
import Header from './Header'
import Footer from './Footer'
import { SpotifyUserProfile } from 'services/spotify/types'

export type AppLayoutProps = {
  children: ReactNode
  userData?: SpotifyUserProfile
}

const AppLayout = ({ children, userData }: AppLayoutProps) => {
  return (
    <S.AppWrapper>
      <Header userData={userData} />
      <S.Main>{children}</S.Main>
      <Footer />
    </S.AppWrapper>
  )
}

export default AppLayout
