'use-client'
import * as S from './styles'
import Logo from 'components/shared/Logo'
import EllipsisIcon from 'components/shared/icons/Ellipsis'

export type HeaderProps = {}

const Header = ({}: HeaderProps) => {
  return (
    <S.Wrapper>
      <S.Container>
        <S.LogoWrapper href="/">
          <Logo />
        </S.LogoWrapper>
        <S.MenuButton>
          <EllipsisIcon />
        </S.MenuButton>
      </S.Container>
    </S.Wrapper>
  )
}

export default Header
