import { rem } from 'polished'
import styled from 'styled-components'
import { borderRadius, font, spacing } from 'styles/designSystemConfig'

export const Title = styled.div`
  font-size: ${font.sizes.small};
  font-weight: ${font.weight.medium};
`

export const Content = styled.div`
  background-color: ${props => props.theme.colors.layers[2].background};
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.large};
  font-size: ${font.sizes.small};
  padding: ${spacing.components.large};
  flex: 1;
`

export const IconWrapper = styled.div`
  width: ${rem(65)};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.detail};
  color: white;
  flex-shrink: 0;
  font-size: ${font.sizes.larger};
`

export const Wrapper = styled.div<{ fillWidth?: boolean }>`
  display: ${props => (props.fillWidth ? 'flex' : 'inline-flex')};
  width: ${props => (props.fillWidth ? '100%' : 'unset')};
  border: 1px solid ${props => props.theme.colors.layers[2].border};
  border-radius: ${borderRadius.small};
  overflow: hidden;
`
