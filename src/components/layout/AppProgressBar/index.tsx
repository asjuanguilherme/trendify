import { useAppTheme } from 'contexts/AppThemeContext'
import dynamic from 'next/dynamic'

const NextNProgress = dynamic(() => import('nextjs-progressbar'), {
  ssr: false
})

const AppProgressBar = () => {
  const theme = useAppTheme()

  return (
    <NextNProgress
      color={theme.colors.main.primary.light}
      height={4}
      startPosition={0.5}
      showOnShallow
      options={{
        showSpinner: false
      }}
    />
  )
}

export default AppProgressBar
