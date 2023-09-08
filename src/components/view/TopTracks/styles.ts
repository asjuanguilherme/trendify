import styled from 'styled-components'
import {
  borderRadius,
  buttonSizes,
  font,
  spacing,
  transition
} from 'styles/designSystemConfig'

export const SuggestedColors = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.components.small};
`

export const SettingsFormGroupLabel = styled.span`
  display: inline-block;
  margin-bottom: ${spacing.components.medium};
`

export const SettingsFormGroup = styled.div``

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

  button {
    border-radius: ${borderRadius.pill} !important;
  }
`

export const LimitButtons = styled.div`
  display: flex;
  gap: ${spacing.components.small};
  flex-wrap: wrap;

  button {
    border-radius: ${borderRadius.pill} !important;
  }
`

export const SettingsFormSectionCollapseButton = styled.button`
  background: transparent;
  width: 100%;
  height: ${buttonSizes.small};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: ${spacing.sections.smaller};
  background: ${props =>
    props.theme.name === 'dark' ? '#ffffff' : '#000000'}10;
  border-radius: ${borderRadius.medium};
  transition: ${transition.default};
  transition-property: background;
  font-weight: ${font.weight.medium};

  &:hover {
    background: ${props =>
      props.theme.name === 'dark' ? '#ffffff' : '#000000'}15;
  }
`

export const SettingsFormSectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sections.smaller};
`

export const SettingsFormSectionTitle = styled.span`
  font-size: ${font.sizes.large};
  font-weight: ${font.weight.bold};
  margin-bottom: ${spacing.components.larger};
  display: inline-block;
`

export const SettingsFormSection = styled.div`
  padding: ${spacing.components.medium};
  background-color: ${props => props.theme.colors.layers[1].background};
  border: 1px solid ${props => props.theme.colors.layers[1].border};
  border-radius: ${borderRadius.small};
`

export const SettingsForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sections.smaller};
`

export const Board = styled.div`
  border-radius: ${borderRadius.small};
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.layers[1].border};
  margin-top: ${spacing.sections.smaller};
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
