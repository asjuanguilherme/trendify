import localFont from 'next/font/local'

export const circularFont = localFont({
  src: [
    {
      path: 'assets/CircularLight.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: 'assets/CircularBook.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: 'assets/CircularMedium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: 'assets/CircularBold.otf',
      weight: '600',
      style: 'normal'
    }
  ]
})
