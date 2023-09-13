import { withGlobalData } from 'hoc/withGlobalData'
import {
  getMyTopTracks,
  getMyTopTracksForClientSide
} from 'services/spotify/queries/getMyTopTracks'
import { AppGlobalProps } from 'types'
import GeneratorView from 'components/view/Generator'
import { useI18n } from 'hooks/useI18n'
import AppHead from 'components/infra/AppHead'
import { GlobalTrackItem } from 'types/TrackItem'
import { getAuthenticationCookie } from 'services/spotify/config'

export type GeneratorPageProps = {
  global: AppGlobalProps
  items: GlobalTrackItem[]
}

const GeneratorPage = ({ items, global }: GeneratorPageProps) => {
  const i18n = useI18n()

  return (
    <>
      <AppHead
        title={i18n.GENERATOR_PAGE.TITLE}
        description={i18n.HOME_PAGE.SEO_DESCRIPTION}
        pathname="/generator"
      />
      <GeneratorView items={items} userData={global.userData!} />
    </>
  )
}

export const getServerSideProps = withGlobalData(async ctx => {
  const token = getAuthenticationCookie(ctx)

  return {
    props: {
      items: await getMyTopTracks({
        limit: 5,
        timeRange: 'lastMonth',
        accessToken: token
      })
    }
  }
})

export default GeneratorPage
