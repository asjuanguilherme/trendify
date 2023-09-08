import Home from 'components/view/Home'
import { withGlobalData } from 'hoc/withGlobalData'
import { AppGlobalProps } from 'types'

export type IndexPageProps = {
  global: AppGlobalProps
}

const IndexPage = ({}: IndexPageProps) => {
  return <Home />
}

export const getServerSideProps = withGlobalData(async ctx => {
  return {
    props: {}
  }
})

export default IndexPage
