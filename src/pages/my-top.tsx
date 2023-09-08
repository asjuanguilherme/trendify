import TopTracksView from 'components/view/TopTracks'
import { withGlobalData } from 'hoc/withGlobalData'
import { getMyTopTracks } from 'services/spotify/queries/getMyTopTracks'
import { SpotifyTrack } from 'services/spotify/types/Track'
import { AppGlobalProps } from 'types'
import Head from 'next/head'

export type MyTopTracksPageProps = {
  global: AppGlobalProps
  items: SpotifyTrack[]
}

const MyTopTracksPage = ({ items, global }: MyTopTracksPageProps) => {
  return (
    <>
      <TopTracksView items={items} userData={global.userData!} />
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

export default MyTopTracksPage
