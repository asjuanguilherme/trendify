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

export const ProfileName = styled.span`
  font-size: ${font.sizes.larger};
  font-weight: ${font.weight.bold};
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

  ${MenuOptionsGroup}:not(:last-child) {
    padding-bottom: ${spacing.components.medium};
    border-bottom: 1px solid ${props => props.theme.colors.layers[1].border};
  }
`

export const MenuButton = styled.button`
  width: ${buttonSizes.small};
  height: ${buttonSizes.small};
  font-size: ${font.sizes.large};
  border-radius: ${borderRadius.circle};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${transition.fast};
  color: white;
  background: ${props => props.theme.colors.main.primary.normal};

  &:hover {
    transform: scale(1.2);
  }
`

export const LogoWrapper = styled(Link)`
  font-size: 2rem;
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
