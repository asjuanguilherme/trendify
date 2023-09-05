import { DefaultTheme } from 'styled-components'
import Moon from 'components/shared/icons/Moon'
import mainColors from 'styles/mainColors'

const dark: DefaultTheme = {
  name: 'dark',
  title: 'Dark',
  icon: <Moon />,
  colors: {
    title: '#FFFFFF',
    text: '#FFFFFF90',
    detail: '#FFFFFF80',
    main: mainColors,
    layers: {
      0: {
        background: '#000000',
        border: '#141414'
      },
      1: {
        background: '#191919',
        border: '#2E2E2E'
      },
      2: {
        background: '#303030',
        border: '#404040'
      },
      3: {
        background: '#444444',
        border: '#535353'
      }
    }
  }
}

export default dark
