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
        'pt-BR': 'Último Mês',
        es: 'Último Mes'
      },
      value: 'short_term',
      text: {
        tracks: {
          short: {
            en: 'Top {{limit}} in the last month',
            'pt-BR': 'As {{limit}} melhores no último mês',
            es: 'Top {{limit}} en el último mes'
          },
          large: {
            en: 'Your top {{limit}} songs in the last month',
            'pt-BR': 'Suas {{limit}} músicas mais ouvidas no último mês',
            es: 'Tus mejores {{limit}} canciones del último mes'
          }
        }
      }
    },
    lastSixMonths: {
      value: 'medium_term',
      label: {
        en: 'Last Six Months',
        'pt-BR': 'Último Semestre',
        es: 'Últimos Seis Meses'
      },
      text: {
        tracks: {
          short: {
            en: 'Top {{limit}} in the last six months',
            'pt-BR': 'As {{limit}} melhores do último semestre',
            es: 'Top {{limit}} en los últimos seis meses'
          },
          large: {
            en: 'Your top {{limit}} songs in the last six months',
            'pt-BR': 'Suas {{limit}} músicas mais ouvidas no último semestre',
            es: 'Tus mejores {{limit}} canciones de los últimos seis meses'
          }
        }
      }
    },
    allTime: {
      label: {
        en: 'All Time',
        'pt-BR': 'Desde o Início',
        es: 'Todo el Tiempo'
      },
      value: 'long_term',
      text: {
        tracks: {
          short: {
            en: 'Top {{limit}} of all time',
            'pt-BR': 'As {{limit}} melhores de todos os tempos',
            es: 'Top {{limit}} de todos los tiempos'
          },
          large: {
            en: 'Your top {{limit}} songs of all time',
            'pt-BR': 'Suas {{limit}} músicas mais ouvidas de todos os tempos',
            es: 'Tus mejores {{limit}} canciones de todos los tiempos'
          }
        }
      }
    }
  }
} as const
