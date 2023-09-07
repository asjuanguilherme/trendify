import { appLayoutConfig } from '../styles'
import Link from 'next/link'
import { rem } from 'polished'
import styled from 'styled-components'
import { borderRadius, font, transition } from 'styles/designSystemConfig'
import DefaultContainer from 'components/shared/Container'

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
`
