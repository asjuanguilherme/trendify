import styled, { css } from 'styled-components'
import Button from '../Button'
import { spacing, borderRadius, zIndex, font } from 'styles/designSystemConfig'
import { screens } from 'styles/screens'
import { LayerIndex } from '../../../../styled'

export const ColorOptions = styled.div`
  display: flex;
  gap: ${spacing.components.small};
  flex-wrap: wrap;
  justify-content: center;
`

export const Switches = styled.div`
  display: grid;
  gap: ${spacing.components.medium};

  ${screens.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const BoxSectionTitle = styled.span`
  display: block;
  width: 100%;
  padding-left: ${spacing.components.smaller};
  font-weight: ${font.weight.bold};
  font-size: ${font.sizes.small};
`

export const BoxSection = styled.div`
  display: flex;
  gap: ${spacing.components.small};
  flex-wrap: wrap;
`

export const BoxTitle = styled.h2`
  font-size: ${font.sizes.large};
  font-weight: ${font.weight.book};
`

export const Box = styled.div`
  background-color: ${props => props.theme.colors.layers[1].background};
  border: 1px solid ${props => props.theme.colors.layers[1].border};
  border-radius: ${borderRadius.medium} ${borderRadius.medium} 0 0;
  padding: ${spacing.components.medium};
  display: flex;
  flex-direction: column;
  gap: ${spacing.sections.smaller};
  overflow: auto;
  height: 165px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);

  ${screens.laptop} {
    height: initial;
    border-radius: ${borderRadius.medium};
  }

  //Custom scrollbar
  &::-webkit-scrollbar {
    width: ${spacing.components.small};
    border-radius: ${borderRadius.small};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.main.primary.normal};
    background-clip: padding-box;
    -webkit-border-radius: ${borderRadius.small};
    border-radius: ${borderRadius.small};
    -webkit-box-shadow: inset -1px 1px 0 ${props => props.theme.colors.layers[0].background},
      inset 1px 1px 0 ${props => props.theme.colors.layers[0].border};
  }
  &::-webkit-scrollbar-thumb:hover {
  }
`

export const SettingsButton = styled(Button).attrs<{
  $active: boolean
  $layer: LayerIndex
}>(props => ({
  size: 'smaller',
  ...props
}))`
  ${props =>
    !props.$active &&
    css`
      color: ${props.theme.colors.title} !important;
      background-color: ${props.theme.colors.layers[props.$layer]
        .background} !important;
      border: 1px solid ${props.theme.colors.layers[props.$layer].border} !important;
    `};
`

export const TabNavigation = styled.nav`
  margin-top: ${spacing.components.small};

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${spacing.components.small};
  }
`

export const Wrapper = styled.div`
  position: fixed;
  z-index: ${zIndex.navbar};
  left: 0;
  bottom: 0;
  background-color: ${props => props.theme.colors.layers[0].background};
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.small};

  ${screens.laptop} {
    position: static;
    z-index: initial;
  }
`
