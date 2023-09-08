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
  color: ${props => props.theme.colors.layers[0].background};
  background: ${props => props.theme.colors.text};

  &:hover {
    color: ${props => props.theme.colors.main.secondary.normal};
  }
`

export const LogoWrapper = styled(Link)`
  font-size: 2rem;
`

export const Container = styled(DefaultContainer)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${appLayoutConfig.headerHeight};
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
