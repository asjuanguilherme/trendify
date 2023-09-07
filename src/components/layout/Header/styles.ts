import { appLayoutConfig } from '../styles'
import Link from 'next/link'
import { rem } from 'polished'
import styled from 'styled-components'
import {
  borderRadius,
  font,
  spacing,
  transition,
  zIndex
} from 'styles/designSystemConfig'
import DefaultContainer from 'components/shared/Container'

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

export const MenuOptionsGroup = styled.div``

export const MenuOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.small};

  ${MenuOptionsGroup}:not(:last-child) {
    border-bottom: 1px solid ${props => props.theme.colors.layers[1].border};
  }
`

export const MenuButton = styled.button`
  width: ${rem(40)};
  height: ${rem(40)};
  font-size: ${font.sizes.large};
  border-radius: ${borderRadius.circle};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: ${transition.fast};

  &:hover {
    color: ${props => props.theme.colors.main.secondary.normal};
  }
`

export const LogoWrapper = styled(Link)`
  font-size: 2.5rem;
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
  background: ${props => props.theme.colors.layers[0].background};
  border-bottom: 1px solid ${props => props.theme.colors.layers[0].border};
  border-radius: 0 0 ${borderRadius.medium} ${borderRadius.medium};
`
