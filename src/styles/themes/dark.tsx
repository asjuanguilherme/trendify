import { DefaultTheme } from 'styled-components'
import Moon from 'components/shared/icons/Moon'
import mainColors from 'styles/mainColors'

const dark: DefaultTheme = {
  name: 'dark',
  title: 'Dark',
  icon: <Moon />,
  colors: {
    title: '#E3F6EA',
    text: '#D7E9DE',
    detail: '#CCDDD3',
    main: mainColors,
    layers: {
      0: {
        background: '#0D1816',
        border: '#151F1D'
      },
      1: {
        background: '#192422',
        border: '#202B29'
      }
    }
  }
}

export default dark
