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
import { useLocale } from 'hooks/useLocale'
import { useI18n } from 'hooks/useI18n'

export type HeaderProps = {
  userData?: SpotifyUserProfile
}

const Header = ({ userData }: HeaderProps) => {
  const i18n = useI18n()
  const locale = useLocale()
  const router = useRouter()
  const theme = useAppTheme()
  const { closeModal } = useModals()

  const logout = useCallback(() => {
    closeModal('APP_MENU')
    destroyAuthenticationCookie(null)
    router.push('/?unlogged')
  }, [closeModal, router])

  const menuModal = useModal('APP_MENU', {
    opened: false,
    title: i18n.OPTIONS_MENU_TITLE,
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
                {i18n.LOGIN_WITH_BUTTON_LABEL}
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
                      alt={i18n.PROFILE_PICTURE_ALT_TEXT}
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
                  layer={0}
                  color="secondary"
                >
                  {i18n.LOGOUT_BUTTON_LABEL}
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
                  <Link href={item.path}>{i18n.PAGES[item.name]}</Link>
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
            {i18n.THEMES[theme.name]} {theme.icon}
          </Button>
          <S.LanguageOptions>
            {router.locales!.map(localeOption => (
              <Link
                key={localeOption}
                href={router.pathname}
                locale={localeOption}
              >
                <S.LanguageOptionButton
                  $active={localeOption === locale}
                  $lang={localeOption}
                />
              </Link>
            ))}
          </S.LanguageOptions>
          <DevSign />
        </S.MenuOptions>
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logout, theme.icon, theme.themeToggle, theme.title, userData, i18n])

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
              <Link href={item.path}>{i18n.PAGES[item.name]}</Link>
            </S.PagesNavItem>
          ))}
        </S.PagesNavList>
        <Button onClick={menuModal.open} onlyIcon size="small">
          <EllipsisIcon />
        </Button>
      </S.Container>
    </S.Wrapper>
  )
}

export default Header
