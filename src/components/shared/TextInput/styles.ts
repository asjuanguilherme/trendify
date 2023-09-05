import styled, { css, keyframes } from 'styled-components'
import {
  borderRadius,
  buttonSizes,
  font,
  spacing,
  transition
} from 'styles/designSystemConfig'
import { LayerIndex } from '../../../../styled'
import DefaultButton from '../Button'

export const Error = styled.span`
  font-size: ${font.sizes.smaller};
  color: ${props => props.theme.colors.main.error.light};
  display: flex;
  gap: ${spacing.components.small};
  align-items: center;
  padding-top: ${spacing.components.smaller};
  padding-left: ${spacing.components.small};
`

const appearButtonKeyframes = keyframes`
  from {
    transform: translate(100%);
    width: 0px;
    overflow: hidden;
    padding: 0;
  }
`

export const Button = styled(DefaultButton)`
  animation: ${appearButtonKeyframes} ease;
  animation-duration: ${transition.fast};
  flex-shrink: 0;
`

export const Sufix = styled.span`
  height: 100%;
  display: inline-flex;
  align-items: center;
  padding: 0 ${spacing.components.larger};
  color: ${props => props.theme.colors.detail};
`

export const Prefix = styled(Sufix)``

export const Input = styled.input<{
  hasPrefix: boolean
  hasSufix: boolean
  layer: LayerIndex
}>`
  flex: 1;
  height: ${buttonSizes.default};
  font-size: ${font.sizes.default};
  font-weight: ${font.weight.medium};
  padding-left: ${props =>
    props.hasPrefix ? 'initial' : spacing.components.large};
  background: transparent;
  color: ${props => props.theme.colors.title};

  &::placeholder {
    font-weight: ${font.weight.regular};
    color: ${props => props.theme.colors.detail};
  }
`

export const Label = styled.span`
  font-size: ${font.sizes.small};
  font-weight: ${font.weight.medium};
  padding-left: ${spacing.components.smaller};
  padding-bottom: ${spacing.components.small};
`

export const FieldWrapper = styled.span<{
  layer: LayerIndex
  focused: boolean
  hasError: boolean
  disabled?: boolean
}>`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.text};
  background-color: ${props =>
    props.theme.colors.layers[props.layer].background};
  border: 1px solid
    ${props =>
      props.focused
        ? props.theme.colors.main.primary.normal
        : props.theme.colors.layers[props.layer].border};
  border-radius: ${borderRadius.medium};
  overflow: hidden;

  transition: ${transition.fast};
  transition-property: border-color;

  ${({ theme, hasError }) =>
    hasError &&
    css`
      border-color: ${theme.colors.main.error.normal};
    `}

  ${({ theme, disabled, layer }) =>
    disabled &&
    css`
      background: ${theme.colors.layers[layer].border};
      color: ${theme.colors.detail};
    `}
`

export const Wrapper = styled.span<{ fillWidth?: boolean }>`
  display: ${props => (props.fillWidth ? 'flex' : 'inline-flex')};
  width: ${props => (props.fillWidth ? '100%' : 'auto')};
  flex-direction: column;
`
