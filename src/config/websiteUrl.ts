import { throwEnvError } from 'utils'

export const WEBSITE_URL = (() => {
  if (!process.env.NEXT_PUBLIC_WEBSITE_URL)
    throwEnvError('NEXT_PUBLIC_WEBSITE_URL')

  return process.env.NEXT_PUBLIC_WEBSITE_URL
})()
