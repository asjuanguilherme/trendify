import localFont from 'next/font/local'

export const gothamFont = localFont({
  src: [
    {
      path: 'assets/GothamLight.ttf',
      weight: '300',
      style: 'normal'
    },
    {
      path: 'assets/GothamBook.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: 'assets/GothamMedium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: 'assets/GothamBold.ttf',
      weight: '600',
      style: 'normal'
    }
  ]
})
