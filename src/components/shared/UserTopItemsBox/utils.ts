import { TimeRange } from 'services/spotify/queries/getMyTopArtists'

export const timeRangeOptions: {
  label: string
  value: TimeRange
  generatedText: string
}[] = [
  {
    label: 'Último mês',
    value: 'lastMonth',
    generatedText: 'do último mês'
  },
  {
    label: 'Último semestre',
    value: 'lastSixMonths',
    generatedText: 'do último semestre'
  },
  {
    label: 'Todos os tempos',
    value: 'allTime',
    generatedText: 'de todos os tempos'
  }
]
