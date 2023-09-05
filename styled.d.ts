import 'styled-components'
import mainColors from 'styles/mainColors'
import dark from 'styles/themes/dark'

export type LayerIndex = 0 | 1 | 2 | 3

export type MainColorsKeys = keyof typeof mainColors

declare module 'styled-components' {
  export interface DefaultTheme {
    name: 'light' | 'dark'
    title: string
    icon: JSX.Element
    colors: {
      title: string
      text: string
      detail: string
      main: Record<MainColorsKeys, Record<'light' | 'normal' | 'dark', string>>
      layers: Record<
        LayerIndex,
        {
          background: string
          border: string
        }
      >
    }
  }
}
