import mainColors from 'styles/mainColors'
import dark from 'styles/themes/dark'

export type TimeRange = keyof (typeof topItemsGeneratorConfig)['timeOptions']

export type GeneratorType =
  keyof (typeof topItemsGeneratorConfig)['typeOptions']

export const topItemsGeneratorConfig = {
  boxWidth: 420,
  limitOptions: [3, 5, 10],
  suggestedColorsOptions: [
    '#191414',
    '#ffffff',
    dark.colors.layers[1].background,
    '#A9E400',
    mainColors.primary.normal,
    '#1DA6B9',
    '#1D49B9',
    '#4A15E2',
    '#A115E2',
    '#E21590',
    mainColors.secondary.normal,
    '#FFC700'
  ],
  typeOptions: {
    tracks: 'tracks',
    artists: 'artists',
    genres: 'genres'
  },
  timeOptions: {
    lastMonth: 'lastMonth',
    lastSixMonths: 'lastSixMonths',
    allTime: 'allTime'
  }
} as const
