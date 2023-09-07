import Button from 'components/shared/Button'
import * as S from './styles'
import Logo from 'components/shared/Logo'
import EllipsisIcon from 'components/shared/icons/Ellipsis'
import { useModal, useModals } from 'contexts/ModalContext'
import { useRouter } from 'next/router'
import { destroyAuthenticationCookie } from 'services/spotify/config'
import { SpotifyUserProfile } from 'services/spotify/types'
import SpotifyLogo from 'components/shared/icons/SpotifyLogo'
import ButtonLink from 'components/shared/ButtonLink'
import { useAppTheme } from 'contexts/AppThemeContext'
import { useCallback, useEffect } from 'react'
import RightFromBracketIcon from 'components/shared/icons/RightFromBracket'

export type HeaderProps = {
  userData?: SpotifyUserProfile
}

const Header = ({ userData }: HeaderProps) => {
  const router = useRouter()
  const theme = useAppTheme()
  const { closeModal } = useModals()

  const logout = useCallback(() => {
    closeModal('APP_MENU')
    destroyAuthenticationCookie(null)
    router.push('/')
    router.reload()
  }, [closeModal, router])

  const menuModal = useModal('APP_MENU', {
    opened: false,
    title: 'Menu',
    width: 400
  })

  useEffect(() => {
    menuModal.update({
      content: (
        <S.MenuOptions>
          <S.MenuOptionsGroup>
            {!userData && (
              <ButtonLink href="/login" fillWidth>
                Entrar com <SpotifyLogo style={{ fontSize: '5rem' }} />
              </ButtonLink>
            )}
            {userData && (
              <>
                <S.ProfileResume>
                  <S.ProfilePhoto
                    src={userData.images[0].url}
                    alt="Foto de perfil do usuário"
                  />
                  <S.ProfileName>{userData.display_name}</S.ProfileName>
                </S.ProfileResume>{' '}
                <Button onClick={logout} fillWidth variant="basic">
                  Sair da sua conta <RightFromBracketIcon />
                </Button>
              </>
            )}
          </S.MenuOptionsGroup>
          <S.MenuOptionsGroup>
            <Button onClick={theme.themeToggle} fillWidth variant="basic">
              Tema {theme.title} {theme.icon}
            </Button>
          </S.MenuOptionsGroup>
        </S.MenuOptions>
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout, theme.icon, theme.themeToggle, theme.title, userData])

  return (
    <S.Wrapper>
      <S.Container>
        <S.LogoWrapper href="/">
          <Logo />
        </S.LogoWrapper>
        <S.MenuButton onClick={menuModal.open}>
          <EllipsisIcon />
        </S.MenuButton>
      </S.Container>
    </S.Wrapper>
  )
}

export default Header
