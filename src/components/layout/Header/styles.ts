import { appLayoutConfig } from '../styles'
import Link from 'next/link'
import { rem } from 'polished'
import styled, { css } from 'styled-components'
import {
  borderRadius,
  buttonSizes,
  font,
  spacing,
  transition,
  zIndex
} from 'styles/designSystemConfig'
import DefaultContainer from 'components/shared/Container'
import { screens } from 'styles/screens'

export const LanguageOptionButton = styled.span<{
  $active: boolean
  $lang: string
}>`
  display: block;
  background-image: url(/assets/images/flags/${props => props.$lang}.png);
  background-size: cover;
  background-position: center;
  height: ${buttonSizes.small};
  width: ${buttonSizes.small};
  border-radius: ${borderRadius.circle};
  border: 4px solid white;
  box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.1);
  transition: ${transition.default};
  transition-property: transform;
  cursor: pointer;

  ${props =>
    props.$active
      ? css`
          transform: scale(1.2);
          border-color: ${props => props.theme.colors.main.primary.light};
        `
      : css`
          &:hover {
            transform: scale(1.1);
          }
        `}
`

export const LanguageOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${spacing.components.medium};
  margin-top: ${spacing.components.small};
  margin-bottom: ${spacing.components.larger};
`

export const ProfilePhotoPlaceholder = styled.span`
  display: inline-block;
  flex-shrink: 0;
  height: ${rem(48)};
  width: ${rem(48)};
  border-radius: ${borderRadius.circle};
  background: ${props => props.theme.colors.layers[0].background};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.3rem;
    opacity: 0.2;
  }
`

export const ProfilePhoto = styled.img`
  flex-shrink: 0;
  height: ${rem(48)};
  width: ${rem(48)};
  border-radius: ${borderRadius.circle};
`

export const ProfileEmail = styled.span`
  font-size: ${font.sizes.smaller};
  margin-top: -${spacing.components.smaller};
`

export const ProfileName = styled.span`
  font-size: ${font.sizes.larger};
  font-weight: ${font.weight.bold};
`

export const ProfileInfo = styled.div`
  padding-top: ${spacing.components.small};
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const ProfileResume = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.components.small};
  margin-bottom: ${spacing.sections.smaller};
`

export const MenuOptionsGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.smaller};
`
export const MenuOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.medium};
  color: ${props => props.theme.colors.title};

  ${MenuOptionsGroup}:not(:last-child) {
    padding-bottom: ${spacing.components.medium};
    border-bottom: 1px solid ${props => props.theme.colors.layers[1].border};
  }
`

export const LogoWrapper = styled(Link)`
  font-size: 2rem;
  display: inline-flex;
`

export const PagesNavItem = styled.li<{ $active?: boolean }>`
  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    height: ${buttonSizes.small};
    padding: ${spacing.components.medium};
    border-radius: ${borderRadius.pill};
    color: inherit;
    font-size: ${font.sizes.small};
    font-weight: ${font.weight.medium};
    transition: ${transition.default};
    transition-property: color, background-color;

    ${props =>
      props.$active
        ? css`
            color: ${props => props.theme.colors.main.primary.normal};
          `
        : css`
            &:hover {
              background-color: ${props =>
                props.theme.colors.main.primary.normal}10;
              color: ${props => props.theme.colors.main.primary.normal};
            }
          `}
  }
`

export const MenuPagesNavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.small};

  li {
    a {
      width: 100%;
    }
  }
`

export const PagesNavList = styled.ul`
  display: none;

  ${screens.laptop} {
    display: flex;
    gap: ${spacing.components.small};
    list-style: none;
  }
`

export const Container = styled(DefaultContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${appLayoutConfig.headerHeight.mobile};

  ${screens.laptop} {
    height: ${appLayoutConfig.headerHeight.laptop};
  }
`

export const Wrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${zIndex.navbar};
  border-radius: 0 0 ${borderRadius.medium} ${borderRadius.medium};

  ${({ theme }) => {
    switch (theme.name) {
      case 'dark':
        return css`
          background: ${theme.colors.layers[0].background};
          border-bottom: 1px solid ${theme.colors.layers[0].border};
        `
      default:
        return css`
          background: ${theme.colors.layers[1].background};
          border-bottom: 1px solid ${theme.colors.layers[1].border};
        `
    }
  }}
`
