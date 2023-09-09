import * as S from './styles'
import Button from 'components/shared/Button'
import Logo from 'components/shared/Logo'
import EllipsisIcon from 'components/shared/icons/Ellipsis'
import { useModal, useModals } from 'contexts/ModalContext'
import { useRouter } from 'next/router'
import { destroyAuthenticationCookie } from 'services/spotify/config'
import { SpotifyUserProfile } from 'services/spotify/types'
import SpotifyLogo from 'components/shared/SpotifyLogo'
import ButtonLink from 'components/shared/ButtonLink'
import { useAppTheme } from 'contexts/AppThemeContext'
import { useCallback, useEffect } from 'react'
import RightFromBracketIcon from 'components/shared/icons/RightFromBracket'
import UserIcon from 'components/shared/icons/User'
import DevSign from 'components/shared/DevSign'
import { topNavList } from 'config/topNavList'
import { isCurrentLinkActive } from 'utils'
import Link from 'next/link'

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
    title: 'Opções',
    width: 400,
    layer: 1
  })

  const userProfilePhoto =
    userData && userData.images.length > 0
      ? userData!.images[0]?.url
      : undefined

  useEffect(() => {
    menuModal.update({
      content: (
        <S.MenuOptions>
          <S.MenuOptionsGroup>
            {!userData && (
              <ButtonLink href="/login" fillWidth>
                Entrar com{' '}
                <SpotifyLogo
                  style={{ fontSize: '1.35rem', marginLeft: '-.3rem' }}
                />
              </ButtonLink>
            )}
            {userData && (
              <>
                <S.ProfileResume>
                  {userProfilePhoto ? (
                    <S.ProfilePhoto
                      src={userProfilePhoto}
                      alt="Foto de perfil do usuário"
                    />
                  ) : (
                    <S.ProfilePhotoPlaceholder>
                      <UserIcon />
                    </S.ProfilePhotoPlaceholder>
                  )}
                  <S.ProfileName>{userData.display_name}</S.ProfileName>
                </S.ProfileResume>{' '}
                <Button
                  onClick={logout}
                  fillWidth
                  size="small"
                  variant="outlined"
                  layer={0}
                  color="secondary"
                >
                  Sair da conta
                  <RightFromBracketIcon />
                </Button>
              </>
            )}
          </S.MenuOptionsGroup>
          <S.MenuOptionsGroup>
            <S.MenuPagesNavList>
              {topNavList.map(item => (
                <S.PagesNavItem
                  key={item.path}
                  $active={isCurrentLinkActive(item.path, router.asPath)}
                  onClick={menuModal.close}
                >
                  <Link href={item.path}>{item.name}</Link>
                </S.PagesNavItem>
              ))}
            </S.MenuPagesNavList>
          </S.MenuOptionsGroup>
          <Button
            onClick={theme.themeToggle}
            fillWidth
            size="small"
            variant="basic"
          >
            Tema {theme.title} {theme.icon}
          </Button>
          <DevSign />
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
        <S.PagesNavList>
          {topNavList.map(item => (
            <S.PagesNavItem
              key={item.path}
              $active={isCurrentLinkActive(item.path, router.asPath)}
            >
              <Link href={item.path}>{item.name}</Link>
            </S.PagesNavItem>
          ))}
        </S.PagesNavList>
        <S.MenuButton onClick={menuModal.open}>
          <EllipsisIcon />
        </S.MenuButton>
      </S.Container>
    </S.Wrapper>
  )
}

export default Header
