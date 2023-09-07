import { ReactNode } from 'react'
import * as S from './styles'
import Header from './Header'
import Footer from './Footer'

export type AppLayoutProps = {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <S.AppWrapper>
      <Header />
      <S.Main>{children}</S.Main>
      <Footer />
    </S.AppWrapper>
  )
}

export default AppLayout
