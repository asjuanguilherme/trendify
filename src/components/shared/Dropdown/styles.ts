import styled, { css } from 'styled-components'
import DefaultButton from 'components/shared/Button'
import { LayerIndex } from '../../../../styled'
import { OptionsBoxConfig } from '.'
import { breakpoints } from 'styles/screens'
import {
  borderRadius,
  font,
  layout,
  spacing,
  transition,
  zIndex
} from 'styles/designSystemConfig'
import { rem } from 'polished'

type OptionsBoxProps = OptionsBoxConfig & {
  layer: LayerIndex
  opened: boolean
}

const screenDownForModalDropdownOptions = `@media screen and (max-width: ${breakpoints.tablet}px)`

export const Option = styled.li<{ selected: boolean }>`
  padding: ${spacing.components.small} ${spacing.components.larger};
  border-radius: ${borderRadius.small};
  cursor: pointer;
  font-size: ${font.sizes.small};
  display: inline-flex;
  gap: ${spacing.components.small};
  align-items: center;

  ${props =>
    props.selected
      ? css`
          color: white;
          background-color: ${props => props.theme.colors.main.primary.normal};
        `
      : css`
          &:hover {
            background-color: ${props =>
              props.theme.colors.main.primary.normal}10;
          }
        `}
`

export const OptionsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  min-height: ${rem(100)};
  max-height: ${rem(300)};
  gap: ${spacing.components.smaller};
  overflow-y: auto;
  padding: ${spacing.components.small};

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

export const OptionsBox = styled.div<OptionsBoxProps>`
  ${screenDownForModalDropdownOptions} {
    width: 100%;
    max-width: 100%;
    position: static;
    flex-shrink: 0;
    ${({ opened }) =>
      opened &&
      css`
        pointer-events: all;
      `}
  }

  overflow-y: hidden;
  position: absolute;
  z-index: 10;
  width: 100%;
  background: ${props => props.theme.colors.layers[props.layer].background};
  border: 1px solid ${props => props.theme.colors.layers[props.layer].border};
  border-radius: ${borderRadius.medium};
  transition: ${transition.default};
  transition-property: transform, opacity;

  ${OptionsList} {
    max-height: ${({ maxHeight }) =>
      maxHeight ? maxHeight + 'px' : 'initial'};
  }

  ${({ opened }) =>
    !opened &&
    css`
      transform: translateY(-2rem);
      opacity: 0;
      pointer-events: none;
    `}
`

export const OptionsBoxWrapper = styled.div<{ opened: boolean }>`
  ${screenDownForModalDropdownOptions} {
    background: rgba(0, 0, 0, 0.3);
    height: 100vh;
    max-height: 100%;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: ${zIndex.modals};
    padding: ${layout.gutter};
    display: flex;
    align-items: flex-end;
    transition: ${transition.default};
    transition-property: opacity;

    ${props =>
      !props.opened &&
      css`
        pointer-events: none;
        opacity: 0;
      `}
  }
`

export const DropdownSuffixWrapper = styled.span`
  display: inline-flex;
  gap: ${spacing.components.medium};
  pointer-events: none;
`

export const DropdownLabelWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${spacing.components.medium};
  pointer-events: none;
`

export const Button = styled(DefaultButton)`
  justify-content: space-between;
`

export const Label = styled.span`
  font-size: ${font.sizes.small};
  font-weight: ${font.weight.medium};
  padding-left: ${spacing.components.smaller};
  padding-bottom: ${spacing.components.small};
`

export const Wrapper = styled.div<{ fillWidth?: boolean }>`
  min-width: 200px;
  width: ${props => (props.fillWidth ? '100%' : 'max-content')};
  position: relative;
  text-align: left;
`
