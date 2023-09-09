import es from './es.json'
import en from './en.json'
import ptBR from './pt_BR.json'

export type Locale = 'en' | 'pt-BR' | 'es'

export type I18nObject = typeof en

export const i18n: Record<Locale, I18nObject> = {
  en,
  es,
  'pt-BR': ptBR
} as const
