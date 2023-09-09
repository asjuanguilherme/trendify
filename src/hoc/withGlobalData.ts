import { getThemeCookie } from 'contexts/AppThemeContext/utils'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next'

// Types
import { AppGlobalProps } from 'types'

// Services
import {
  destroyAuthenticationCookie,
  getAuthenticationCookie
} from 'services/spotify/config'
import { getCurrentUserProfile } from 'services/spotify/queries/getCurrentUserProfile'
import { AxiosError } from 'axios'

export const withGlobalData = <P extends { [key: string]: unknown }>(
  callback: GetServerSideProps<P>
) => {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P & { global: AppGlobalProps }>> => {
    try {
      const accessToken = getAuthenticationCookie(ctx)
      const userData = accessToken
        ? await getCurrentUserProfile(ctx).catch(() => {
            destroyAuthenticationCookie(ctx)
            return null
          })
        : null

      if (!userData && ctx.resolvedUrl.includes('/generator'))
        return {
          redirect: {
            destination: `/${ctx.locale}`,
            permanent: true
          }
        }

      if (userData && ctx.resolvedUrl.split('?')[0] === '/') {
        return {
          redirect: {
            destination: `/${ctx.locale}/generator`,
            permanent: true
          }
        }
      }

      const callbackProps = await callback(ctx)

      const globalProps = {
        userData,
        storedTheme: getThemeCookie(ctx)
      }

      return {
        ...callbackProps,
        props: {
          // @ts-ignore
          ...callbackProps.props,
          global: globalProps
        }
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status == 401) {
          destroyAuthenticationCookie(ctx)
          return {
            redirect: {
              destination: `${ctx.locale}/?sessionExpired`,
              permanent: true
            }
          }
        }
        if (err.response?.status == 403) {
          destroyAuthenticationCookie(ctx)
          return {
            redirect: {
              destination: `${ctx.locale}/?needsPermission`,
              permanent: true
            }
          }
        }
      }
      throw err
    }
  }
}
