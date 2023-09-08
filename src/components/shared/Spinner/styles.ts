import styled, { keyframes } from 'styled-components'

type Props = { $size: number; $strokeWidth: number }

const spinner = (size: number) => keyframes`
  0% {
      stroke-dashoffset: ${size * 0.66};
      transform: rotate(0deg);
    } 50% {
      stroke-dashoffset: ${size * 3.14};
      transform: rotate(720deg);
    } 100% {
      stroke-dashoffset: ${size * 0.66};
      transform: rotate(1080deg);
  }
`

export const Circle = styled.circle.attrs<Props>(props => ({
  cx: props.$size / 2,
  cy: props.$size / 2,
  r: (props.$size - props.$strokeWidth) / 2
}))`
  transform-origin: ${props =>
    `${props.$size * 0.5}px ${props.$size * 0.5}px 0px`};
  animation: ${props => spinner(props.$size)} 3s linear infinite;
`

export const Wrapper = styled.svg.attrs<Props>(props => ({
  viewBox: `0 0 ${props.$size} ${props.$size}`
}))`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  x: 0px;
  y: 0px;

  circle {
    fill: transparent;
    stroke: currentColor;
    stroke-width: ${props => props.$strokeWidth};
    stroke-linecap: round;
    stroke-dasharray: ${props => 3.14 * props.$size};
  }
`
