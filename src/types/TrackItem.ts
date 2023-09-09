import { GeneratorType } from 'config/topItemsGenerator'

export type GlobalTrackItem = {
  id: string
  title: string
  description: string
  image: string
  type: GeneratorType
}
