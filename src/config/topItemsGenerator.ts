import mainColors from 'styles/mainColors'
import dark from 'styles/themes/dark'

export type TimeRange = keyof (typeof topItemsGeneratorConfig)['timeOptions']

export type GeneratorType =
  keyof (typeof topItemsGeneratorConfig)['typeOptions']

export const topItemsGeneratorConfig = {
  boxWidth: 420,
  limitOptions: [3, 5, 10],
  suggestedColorsOptions: [
    dark.colors.layers[1].background,
    mainColors.primary.normal,
    mainColors.secondary.normal,
    '#E5C02D',
    '#2B2382',
    '#E253EF',
    '#000000',
    '#ffffff'
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
