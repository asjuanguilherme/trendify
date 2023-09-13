import localFont from 'next/font/local'

export const appFont = localFont({
  src: [
    {
      path: 'assets/Light.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: 'assets/Book.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: 'assets/Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: 'assets/Bold.otf',
      weight: '600',
      style: 'normal'
    }
  ]
})
