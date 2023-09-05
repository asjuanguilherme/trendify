import { DefaultTheme } from 'styled-components'
import Sun from 'components/shared/icons/Sun'
import mainColors from 'styles/mainColors'

const light: DefaultTheme = {
  name: 'light',
  title: 'Light',
  icon: <Sun />,
  colors: {
    title: '#1B1B1B',
    text: '#676767',
    detail: '#7e7e7e',
    main: mainColors,
    layers: {
      0: {
        background: '#F2F2F2',
        border: '#EAEAEA'
      },
      1: {
        background: '#FFFFFF',
        border: '#F0F0F0'
      },
      2: {
        background: '#F2F2F2',
        border: '#EAEAEA'
      },
      3: {
        background: '#FFFFFF',
        border: '#F0F0F0'
      }
    }
  }
}

export default light
