import { useRouter } from 'next/router'
import { Locale } from 'i18n'

export const useLocale = () => {
  const router = useRouter()
  const locale = (router.locale || router.defaultLocale || 'en') as Locale
  return locale
}
