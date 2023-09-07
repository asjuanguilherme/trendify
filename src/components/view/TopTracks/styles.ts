import styled from 'styled-components'
import { borderRadius, font, spacing } from 'styles/designSystemConfig'

export const StyleOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.components.medium};
`

export const LoadingBoard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing.sections.medium};
  font-size: ${font.sizes.xxlarger};
`

export const TimeRangeOptions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.components.small};
`

export const LimitButtons = styled.div`
  display: flex;
  gap: ${spacing.components.small};
  flex-wrap: wrap;
`

export const SettingsFormSectionTitle = styled.span`
  font-size: ${font.sizes.default};
  font-weight: ${font.weight.medium};
  margin-bottom: ${spacing.components.small};
  display: inline-block;
`

export const SettingsFormSection = styled.div`
  margin-bottom: ${spacing.components.medium};
`

export const SettingsForm = styled.div``

export const Board = styled.div`
  border-radius: ${borderRadius.small};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.layers[1].border};
`

export const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.components.small};
  margin-top: ${spacing.components.large};
  margin-bottom: ${spacing.components.small};

  button {
    flex: 1;
  }
`

export const Wrapper = styled.div``
