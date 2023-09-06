'use client'

import { ReactNode } from 'react'
import * as S from './styles'
import StyledJsxRegistry from 'lib/styled-components/registry'
import GlobalStyles from 'styles/GlobalStyles'
import AppThemeProvider from 'contexts/AppThemeContext'
import Header from 'components/layout/Header'
import Footer from 'components/layout/Footer'

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html>
      <body>
        <StyledJsxRegistry>
          <AppThemeProvider storedTheme="dark">
            <GlobalStyles />
            <S.AppWrapper>
              <Header />
              <S.Main>{children}</S.Main>
              <Footer />
            </S.AppWrapper>
          </AppThemeProvider>
        </StyledJsxRegistry>
      </body>
    </html>
  )
}

export default RootLayout
