import { Locale, i18n } from 'i18n'
import { useRouter } from 'next/router'

export const useI18n = () => {
  const { locale, defaultLocale = 'pt-BR' } = useRouter()
  const siteLocale = (locale || defaultLocale) as Locale

  return i18n[siteLocale]
}
