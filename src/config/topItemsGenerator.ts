import mainColors from 'styles/mainColors'
import dark from 'styles/themes/dark'

export type TimeRange = keyof (typeof topItemsGeneratorConfig)['timeOptions']

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
  timeOptions: {
    lastMonth: {
      label: 'Último mês',
      value: 'short_term',
      text: {
        tracks: {
          short: 'Top {{limit}} no último mês',
          large: 'Seu Top {{limit}} músicas mais ouvidas no último mês'
        }
      }
    },
    lastSixMonths: {
      value: 'medium_term',
      label: 'Último semestre',
      text: {
        tracks: {
          short: 'Top {{limit}} do semestre',
          large: 'Seu Top {{limit}} músicas mais ouvidas no último semestre'
        }
      }
    },
    allTime: {
      label: 'Desde o início',
      value: 'long_term',
      text: {
        tracks: {
          short: 'Top {{limit}} até hoje',
          large: 'Seu Top {{limit}} músicas mais ouvidas até hoje'
        }
      }
    }
  }
} as const
