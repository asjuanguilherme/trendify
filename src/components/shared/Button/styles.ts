import styled, { css } from 'styled-components'
import { ButtonSize, ButtonVariants } from '.'
import {
  borderRadius,
  buttonSizes,
  font,
  spacing,
  transition
} from 'styles/designSystemConfig'
import { MainColorsKeys, LayerIndex } from '../../../../styled'
import { rem } from 'polished'

type WrapperProps = {
  size: ButtonSize
  onlyIcon?: boolean
  fillWidth?: boolean
  color: MainColorsKeys
  variant: ButtonVariants
  layer: LayerIndex
  badge?: string | number
}

export const Wrapper = styled.button<WrapperProps>`
  flex-shrink: 0;
  display: ${props => (props.fillWidth ? 'flex' : 'inline-flex')};
  width: ${props => (props.fillWidth ? '100%' : 'max-content')};
  align-items: center;
  justify-content: center;
  font-weight: ${font.weight.medium};
  cursor: pointer;
  transition: ${transition.fast};
  transition-property: color, background-color, border;
  text-decoration: none;

  svg {
    font-size: inherit;
  }

  &:disabled {
    cursor: default;
  }

  // Badge
  position: relative;
  ${({ theme, badge }) =>
    badge !== undefined &&
    css`
      &::after {
        content: '${badge}';
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        background-color: ${theme.colors.main.secondary.normal};
        position: absolute;
        right: -${rem(4)};
        top: -${rem(4)};
        width: ${spacing.components.larger};
        height: ${spacing.components.larger};
        border-radius: ${spacing.components.larger};
        font-size: ${font.sizes.smaller};
        font-weight: ${font.weight.bold};
      }
    `}

  // Handle with colors by variant
  ${({ theme, color, variant, layer }) => {
    switch (variant) {
      case 'filled':
        return css`
          background-color: ${theme.colors.main[color].normal};
          color: white;

          &:hover:not(:disabled) {
            background-color: ${theme.colors.main[color].light};
          }

          &:active:not(:disabled) {
            background-color: ${theme.colors.main[color].dark};
          }

          &:disabled {
            background-color: ${theme.colors.layers[0].border};
            color: ${theme.colors.detail};
          }
        `
      case 'basic':
        return css`
          color: ${theme.colors.text};
          background-color: ${theme.colors.layers[layer].background};
          border: 1px solid ${theme.colors.layers[layer].border};

          &:hover {
            color: ${theme.colors.main[color].normal};
            border-color: ${theme.colors.main[color].light}40;
          }

          &:active {
            border-color: ${theme.colors.main[color].dark};
            background-color: ${theme.colors.main[color].dark};
            color: white;
          }

          &:disabled {
            background-color: ${theme.colors.layers[layer].background}80;
            border: 1px solid ${theme.colors.layers[layer].border}80;
            color: ${theme.colors.text}80;
          }
        `
      case 'outlined':
        return css`
          color: ${theme.colors.main[color].normal};
          border: 1px solid ${theme.colors.main[color].normal};
          background-color: ${theme.colors.layers[layer].background};
        `
      case 'white':
        return css`
          color: ${theme.colors.main.primary.normal};
          background: white;
        `
    }
  }}

  // Handle with sizing
  ${({ size, onlyIcon }) => {
    switch (size) {
      case 'smaller':
        return css`
          ${onlyIcon
            ? css`
                width: ${buttonSizes.smaller};
              `
            : css`
                padding: 0 ${spacing.components.large};
              `};
          height: ${buttonSizes.smaller};
          font-size: ${font.sizes.smaller};
          border-radius: ${borderRadius.smaller};
          gap: ${spacing.components.small};
        `
      case 'small':
        return css`
          ${onlyIcon
            ? css`
                width: ${buttonSizes.small};
                font-size: ${font.sizes.default};
              `
            : css`
                padding: 0 ${spacing.components.larger};
                font-size: ${font.sizes.small};
              `};
          height: ${buttonSizes.small};
          border-radius: ${borderRadius.small};
          gap: ${spacing.components.small};
        `
      case 'default':
        return css`
          ${onlyIcon
            ? css`
                width: ${buttonSizes.default};
                font-size: ${font.sizes.large};
              `
            : css`
                padding: 0 ${spacing.sections.small};
                font-size: ${font.sizes.default};
              `};
          height: ${buttonSizes.default};
          border-radius: ${borderRadius.medium};
          gap: ${spacing.components.medium};
        `
    }
  }}
`
