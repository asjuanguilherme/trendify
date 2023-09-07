// Types
import { AppProps } from 'next/app'
import { AppGlobalProps } from 'types'

// Providers
import { AppThemeProvider } from 'contexts/AppThemeContext'
import { ModalProvider } from 'contexts/ModalContext'

// Components
import GlobalStyles from 'styles/GlobalStyles'
import AppLayout from 'components/layout'
import { getThemeCookie } from 'contexts/AppThemeContext/utils'

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
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ModalProvider>
      </AppThemeProvider>
    </>
  )
}

export default App
