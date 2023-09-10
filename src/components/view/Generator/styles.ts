import styled from 'styled-components'
import {
  borderRadius,
  buttonSizes,
  font,
  layout,
  spacing,
  transition,
  zIndex
} from 'styles/designSystemConfig'
import DefaultContainer from 'components/shared/Container'
import { screens } from 'styles/screens'
import { topItemsGeneratorConfig } from 'config/topItemsGenerator'

export const VisibleTopItemsBox = styled.div`
  & > div {
    zoom: 0.6;
  }

  ${screens.mobileL} {
    & > div {
      zoom: 0.7;
    }
  }

  ${screens.tabletS} {
    & > div {
      zoom: initial;
    }
  }
`

export const HiddenTopItemsBox = styled.div`
  width: ${topItemsGeneratorConfig.boxWidth}px;
  position: fixed;
  z-index: -1;
  left: -500%;
  top: -500%;
`

export const SharingButtons = styled.div`
  position: fixed;
  z-index: ${zIndex.navbar};
  bottom: 0;
  left: 0;
  width: 100%;
  padding: ${layout.gutter};
  display: flex;
  gap: ${spacing.components.medium};

  button {
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
  }

  ${screens.laptop} {
    position: static;
    margin-top: ${spacing.components.medium};
    padding: 0;

    button {
      box-shadow: initial;
    }
  }
`

export const Switches = styled.div`
  display: grid;
  gap: ${spacing.components.medium};

  ${screens.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const SuggestedColors = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.components.medium};
`

export const SettingsFormGroupLabel = styled.span`
  display: inline-block;
  margin-bottom: ${spacing.components.medium};
`

export const SettingsFormGroup = styled.div``

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
    transform: scale(1) !important;
  }
`

export const LimitButtons = styled.div`
  display: flex;
  gap: ${spacing.components.small};
  flex-wrap: wrap;

  button {
    transform: scale(1) !important;
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

export const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing.components.small};
`
export const Container = styled(DefaultContainer)`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sections.smaller};

  ${screens.laptop} {
    display: grid;
    flex-direction: initial;
    grid-template-columns: 1fr ${topItemsGeneratorConfig.boxWidth}px;
  }
`

export const Wrapper = styled.div`
  padding: ${spacing.sections.smaller} 0;
`
