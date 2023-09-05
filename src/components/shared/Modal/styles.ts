import styled, { css, keyframes } from 'styled-components'
import { ModalVariant } from '.'
import {
  borderRadius,
  font,
  layout,
  spacing,
  transition,
  zIndex
} from 'styles/designSystemConfig'
import { screens } from 'styles/screens'

export const BoxContent = styled.div`
  flex: 1;
  overflow: auto;
  padding: ${spacing.components.medium};
  padding-top: 0;
  line-height: 1.8em;
  font-size: ${font.sizes.small};

  ${screens.tablet} {
    font-size: ${font.sizes.default};
  }
`

export const Title = styled.h2`
  display: inline-flex;
  padding-left: ${spacing.components.large};
  font-size: ${font.sizes.large};
  font-weight: ${font.weight.bold};
`

export const BoxFooter = styled.div``

export const BoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing.components.large};
`

const appearBoxKeyframes = keyframes`
  from {
    transform: scale(.9);
    opacity: 0;
  }
  to {
    transform: initial;
  }
`

export const Box = styled.div<{
  width: number
  hasTitle: boolean
  positionY: string
}>`
  position: relative;
  width: 100%;
  max-height: 85vh;
  max-width: ${props => props.width}px;
  background: ${props => props.theme.colors.layers[1].background};
  border: 1px solid ${props => props.theme.colors.layers[1].border};
  border-radius: ${borderRadius.medium};
  overflow: hidden;
  animation: ${appearBoxKeyframes} ${transition.default} ease-out;
  display: flex;
  flex-direction: column;
  padding-top: ${props =>
    props.hasTitle ? 'initial' : spacing.components.medium};
  transition: ${transition.fast};
  top: ${props => props.positionY};
`

const wrapperAppearKeyframes = keyframes`from {
  backdrop-filter: initial;
}`

const modalStyleByVariants = (closed: boolean) => ({
  default: css`
    align-items: center;
    justify-content: center;
    animation: ${wrapperAppearKeyframes} ${transition.slow} ease;
    transition: ${transition.slow};
    transition-property: backdrop-filter, background, visibility;
    backdrop-filter: blur(6px);
    background: rgba(
      0,
      0,
      0,
      ${props => (props.theme.name === 'dark' ? '0.1' : '0.3')}
    );

    ${closed &&
    css`
      backdrop-filter: initial;
      background: transparent;
      visibility: hidden;

      ${Box} {
        transform: scale(0.9);
        opacity: 0;
      }
    `}
  `,
  discret: css`
    pointer-events: none;
    justify-content: flex-start;
    align-items: flex-end;

    ${Box} {
      pointer-events: initial;
      box-shadow: 0 0 3rem ${props => props.theme.title}15;
    }

    ${closed &&
    css`
      ${Box} {
        transform: scale(0.9);
        opacity: 0;
      }
    `}
  `
})

export const Wrapper = styled.div<{ opened: boolean; variant: ModalVariant }>`
  position: fixed;
  z-index: ${zIndex.modals};
  height: 100%;
  width: 100vw;
  padding: ${layout.gutter};
  display: flex;

  ${props => modalStyleByVariants(!props.opened)[props.variant]}
`
