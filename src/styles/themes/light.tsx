import { DefaultTheme } from 'styled-components'
import Sun from 'components/shared/icons/Sun'
import mainColors from 'styles/mainColors'

const light: DefaultTheme = {
  name: 'light',
  title: 'Light',
  icon: <Sun />,
  colors: {
    title: '#0D1816',
    text: '#121D1B',
    detail: '#192422',
    main: mainColors,
    layers: {
      0: {
        background: '#E3F6EA',
        border: '#DCEEE3'
      },
      1: {
        background: '#D7E9DE',
        border: '#D0E2D7'
      }
    }
  }
}

export default light
