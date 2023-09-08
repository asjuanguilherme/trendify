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
      generatedText: 'do último mês',
      value: 'short_term'
    },
    lastSixMonths: {
      value: 'medium_term',
      label: 'Último semestre',
      generatedText: 'do último semestre'
    },
    allTime: {
      label: 'Todos os tempos',
      generatedText: 'de todos os tempos',
      value: 'long_term'
    }
  }
} as const
