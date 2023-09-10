import { GeneratorType } from 'config/topItemsGenerator'

export type GlobalTrackItem = {
  id: string
  title: string
  type: GeneratorType
  description?: string
  image?: string
}
