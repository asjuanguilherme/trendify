import { useEffect, useState } from 'react'

type ScreenSize = {
  height: number
  width: number
}

export type UseScreenProps = () => ScreenSize

const useScreen: UseScreenProps = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenSize>({
    height: 720,
    width: 1250
  })

  useEffect(() => {
    setCurrentScreen({
      width: window.innerWidth,
      height: window.innerHeight
    })

    window.addEventListener('resize', () => {
      const size = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      setCurrentScreen(size)
    })
  }, [])

  return currentScreen
}

export default useScreen
