import * as S from './styles'

// Types
import { ReactNode } from 'react'
import { useAppTheme } from 'contexts/AppThemeContext'

// Components
import Button from 'components/shared/Button'

export type LayoutProps = {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useAppTheme()

  return (
    <S.Wrapper>
      <S.Header>
        Header Component
        <Button
          onClick={theme.themeToggle}
          variant={theme.name === 'dark' ? 'basic' : 'filled'}
          color={theme.name === 'dark' ? 'secondary' : 'primary'}
          layer={2}
        >
          {theme.title} {theme.icon}
        </Button>
      </S.Header>
      <S.Main>{children}</S.Main>
      <S.Footer>Footer Component</S.Footer>
    </S.Wrapper>
  )
}

export default Layout
