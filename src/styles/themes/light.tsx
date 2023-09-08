import { DefaultTheme } from 'styled-components'
import Sun from 'components/shared/icons/Sun'
import mainColors from 'styles/mainColors'

const light: DefaultTheme = {
  name: 'light',
  title: 'Claro',
  icon: <Sun />,
  colors: {
    title: '#0D1816',
    text: '#121D1B',
    detail: '#192422',
    main: mainColors,
    layers: {
      0: {
        background: '#E7EEE9',
        border: '#DBE2DD'
      },
      1: {
        background: '#F3FBF6',
        border: '#E7EEE9'
      }
    }
  }
}

export default light
