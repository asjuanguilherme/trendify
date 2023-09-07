import { lighten } from 'polished'
import styled from 'styled-components'
import {
  borderRadius,
  font,
  spacing,
  transition
} from 'styles/designSystemConfig'

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
`

export const Wrapper = styled.label`
  font-size: ${font.sizes.default};
  font-weight: ${font.weight.medium};
  display: flex;
  align-items: center;
  gap: ${spacing.components.small};
  cursor: pointer;

  ${SwitchTrack} {
    display: inline-flex;
    height: 1.5rem;
    width: 3rem;
    border-radius: ${borderRadius.pill};
    background: ${props => lighten(0.15, props.theme.colors.layers[1].border)};
  }

  input:checked ~ ${SwitchTrack} {
    background: ${props => props.theme.colors.main.primary.normal};

    ${SwitchDot} {
      left: 100%;
      transform: translate(-110%, -50%);
    }
  }
`
