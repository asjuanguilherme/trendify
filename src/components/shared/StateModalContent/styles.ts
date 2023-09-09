import styled, { css, keyframes } from 'styled-components'
import { font, spacing, transition } from 'styles/designSystemConfig'
import { StateType } from '.'
import { opacify } from 'polished'

export const ActionButtons = styled.div`
  margin-top: ${spacing.sections.small};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.components.small};
`

export const Message = styled.div`
  font-size: ${font.sizes.small};
  line-height: 1.5em;
`

export const Title = styled.span`
  font-size: ${font.sizes.default};
  font-weight: ${font.weight.bold};
  line-height: 1.3em;
  margin-bottom: ${spacing.components.medium};
`

const iconAppearKeyframes = keyframes`
  from {
    transform: scale(.5);
    opacity: 0
  }
  to {
    transform: initial;
    opacity: 1;
  }
`

export const Icon = styled.div<{ type: StateType }>`
  font-size: 2rem;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${iconAppearKeyframes} ${transition.default} ease;
  color: white;
  margin-bottom: ${spacing.components.medium};

  ${({ type }) =>
    type !== 'loading' &&
    css`
      width: 4rem;
      height: 4rem;
    `}

  ${({ theme, type }) => {
    switch (type) {
      case 'error':
      case 'warning':
        return css`
          background: #ef880e;
        `
      case 'success':
        return css`
          background: ${theme.colors.main.primary.normal};
        `
      default:
        return css`
          background-color: ${opacify(-0.75, theme.colors.title)};
        `
    }
  }}
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${spacing.components.large};
`
