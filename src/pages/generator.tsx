import { withGlobalData } from 'hoc/withGlobalData'
import { getMyTopTracks } from 'services/spotify/queries/getMyTopTracks'
import { SpotifyTrack } from 'services/spotify/types/Track'
import { AppGlobalProps } from 'types'
import GeneratorView from 'components/view/Generator'
import { useI18n } from 'hooks/useI18n'
import AppHead from 'components/infra/AppHead'

export type GeneratorPageProps = {
  global: AppGlobalProps
  items: SpotifyTrack[]
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
  return {
    props: {
      items: await getMyTopTracks({ ctx, limit: 5, timeRange: 'lastMonth' })
    }
  }
})

export default GeneratorPage
