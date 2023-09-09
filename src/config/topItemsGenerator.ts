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
      label: {
        en: 'Last Month',
        'pt-BR': 'Último Mês'
      },
      value: 'short_term',
      text: {
        tracks: {
          short: {
            en: 'Top {{limit}} in the last month',
            'pt-BR': 'As {{limit}} melhores no último mês'
          },
          large: {
            en: 'Your top {{limit}} songs in the last month',
            'pt-BR': 'Suas {{limit}} músicas mais ouvidas no último mês'
          }
        }
      }
    },
    lastSixMonths: {
      value: 'medium_term',
      label: {
        en: 'Last Six Months',
        'pt-BR': 'Último Semestre'
      },
      text: {
        tracks: {
          short: {
            en: 'Top {{limit}} in the last six months',
            'pt-BR': 'As {{limit}} melhores do último semestre'
          },
          large: {
            en: 'Your top {{limit}} songs in the last six months',
            'pt-BR': 'Suas {{limit}} músicas mais ouvidas no último semestre'
          }
        }
      }
    },
    allTime: {
      label: {
        en: 'All Time',
        'pt-BR': 'Desde o Início'
      },
      value: 'long_term',
      text: {
        tracks: {
          short: {
            en: 'Top {{limit}} of all time',
            'pt-BR': 'As {{limit}} melhores de todos os tempos'
          },
          large: {
            en: 'Your top {{limit}} songs of all time',
            'pt-BR': 'Suas {{limit}} músicas mais ouvidas de todos os tempos'
          }
        }
      }
    }
  }
} as const
