// Types
import { AppProps } from 'next/app'
import { AppGlobalProps } from 'types'

// Providers
import { AppThemeProvider } from 'contexts/AppThemeContext'
import { ModalProvider } from 'contexts/ModalContext'
import { getThemeCookie } from 'contexts/AppThemeContext/utils'

// Components
import GlobalStyles from 'styles/GlobalStyles'
import AppLayout from 'components/layout'
import AppProgressBar from 'components/layout/AppProgressBar'

const App = ({
  Component,
  pageProps
}: AppProps<{ global?: AppGlobalProps }>) => {
  return (
    <>
      <AppThemeProvider
        storedTheme={pageProps.global?.storedTheme || getThemeCookie()}
      >
        <ModalProvider>
          <GlobalStyles />
          <AppLayout userData={pageProps.global?.userData! || null}>
            <AppProgressBar />
            <Component {...pageProps} />
          </AppLayout>
        </ModalProvider>
      </AppThemeProvider>
    </>
  )
}

export default App
