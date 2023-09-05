/* eslint-disable react/display-name */
import { createElement, CSSProperties, ReactNode } from 'react'

export type IconComponentProps = {
  color?: string
  size?: string
  className?: string
  style?: CSSProperties
}

export type IconComponent = (props: IconComponentProps) => JSX.Element

export type CreateIconComponentProps = {
  content: ReactNode
  viewBox: string
  size?: string
  color?: string
}

const createIconComponent =
  ({ content, viewBox }: CreateIconComponentProps): IconComponent =>
  ({
    size = '1em',
    color = 'currentColor',
    ...componentProps
  }: IconComponentProps) => {
    const props = {
      height: size,
      width: size,
      fill: color,
      viewBox: viewBox,
      ...componentProps,
      className: componentProps.className
    }

    return createElement('svg', props, content)
  }

export default createIconComponent
