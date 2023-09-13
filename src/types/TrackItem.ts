import { GeneratorType } from 'config/topItemsGenerator'

export type GlobalTrackItem = {
  id: string | number
  title: string
  type: GeneratorType
  description?: string
  image?: string
  href?: string
}
