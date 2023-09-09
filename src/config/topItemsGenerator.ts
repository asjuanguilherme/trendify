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
      label: 'Último Mês',
      value: 'short_term',
      text: {
        tracks: {
          short: 'As {{limit}} melhores no último mês',
          large: 'Suas {{limit}} músicas mais ouvidas no último mês'
        }
      }
    },
    lastSixMonths: {
      value: 'medium_term',
      label: 'Último Semestre',
      text: {
        tracks: {
          short: 'As {{limit}} melhores do último semestre',
          large: 'Suas {{limit}} músicas mais ouvidas no último semestre'
        }
      }
    },
    allTime: {
      label: 'Desde o Início',
      value: 'long_term',
      text: {
        tracks: {
          short: 'As {{limit}} melhores de todos os tempos',
          large: 'Suas {{limit}} músicas mais ouvidas de todos os tempos'
        }
      }
    }
  }
} as const
