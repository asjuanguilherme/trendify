import { darken, lighten } from 'polished'
import styled from 'styled-components'
import {
  borderRadius,
  font,
  spacing,
  transition
} from 'styles/designSystemConfig'
import { LayerIndex } from '../../../../styled'

export const SwitchDot = styled.div`
  display: inline-block;
  height: 1.3rem;
  width: 1.3rem;
  border-radius: ${borderRadius.circle};
  background-color: white;
  transition: ${transition.default};
  position: absolute;
  left: 5%;
  top: 50%;
  transform: translateY(-50%);
`

export const SwitchTrack = styled.span`
  display: flex;
  position: relative;
  flex-shrink: 0;
`

export const Wrapper = styled.label<{ $layer: LayerIndex }>`
  font-size: ${font.sizes.small};
  display: flex;
  align-items: center;
  gap: ${spacing.components.small};
  cursor: pointer;

  ${SwitchTrack} {
    display: inline-flex;
    height: 1.5rem;
    width: 3rem;
    border-radius: ${borderRadius.pill};
    background: ${props =>
      props.theme.name === 'dark'
        ? lighten(0.1, props.theme.colors.layers[props.$layer].border)
        : darken(0.1, props.theme.colors.layers[props.$layer].border)};
  }

  input:checked ~ ${SwitchTrack} {
    background: ${props => props.theme.colors.main.primary.normal};

    ${SwitchDot} {
      left: 100%;
      transform: translate(-110%, -50%);
    }
  }
`
