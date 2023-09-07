import { lighten } from 'polished'
import styled from 'styled-components'
import { borderRadius } from 'styles/designSystemConfig'

export const SwitchDot = styled.div`
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: ${borderRadius.circle};
  background-color: white;
  transition: 1s;
  position: absolute;
  left: 0;
  top: 0;
`

export const SwitchTrack = styled.span`
  display: flex;
  position: relative;
`

export const Wrapper = styled.label`
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
      left: initial;
      right: 0;
    }
  }
`
