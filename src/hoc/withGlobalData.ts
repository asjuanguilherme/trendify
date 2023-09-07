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

export const withGlobalData = <P extends { [key: string]: unknown }>(
  callback: GetServerSideProps<P>
) => {
  return async (
    ctx: GetServerSidePropsContext
  ): Promise<GetServerSidePropsResult<P & { global: AppGlobalProps }>> => {
    const accessToken = getAuthenticationCookie(ctx)
    const userData = accessToken
      ? await getCurrentUserProfile(ctx).catch(() => {
          destroyAuthenticationCookie(ctx)
          return null
        })
      : null

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
  }
}
