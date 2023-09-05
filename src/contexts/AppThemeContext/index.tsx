import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import {
  ThemeProvider as StyledComponentsThemeProvider,
  DefaultTheme
} from 'styled-components'
import { DEFAULT_THEME, storeThemeStateToCookies } from './utils'
import themes, { ThemeName } from 'styles/themes'
import Head from 'next/head'

type AppThemeContextProps = DefaultTheme & {
  themeToggle: () => void
}

type AppThemeProviderProps = {
  children: ReactNode
  storedTheme: ThemeName
}

export const AppThemeContext = createContext<AppThemeContextProps>(
  {} as AppThemeContextProps
)

export const useAppTheme = () => {
  const context = useContext(AppThemeContext)

  if (!context) throw new Error('useTheme must be used within a ThemeProvider.')

  return context
}

export const AppThemeProvider = ({
  children,
  storedTheme = DEFAULT_THEME
}: AppThemeProviderProps) => {
  const [selectedTheme, setSelectedTheme] = useState<ThemeName>(storedTheme)

  const themeToggle = () => {
    const newTheme = selectedTheme === 'dark' ? 'light' : 'dark'
    setSelectedTheme(newTheme)
  }

  useEffect(() => {
    storeThemeStateToCookies(selectedTheme)
  }, [selectedTheme])

  return (
    <AppThemeContext.Provider value={{ ...themes[selectedTheme], themeToggle }}>
      <Head>
        <meta
          name="theme-color"
          content={themes[selectedTheme].colors.layers[0].background}
        />
      </Head>
      <StyledComponentsThemeProvider theme={themes[selectedTheme]}>
        {children}
      </StyledComponentsThemeProvider>
    </AppThemeContext.Provider>
  )
}

export default AppThemeProvider
