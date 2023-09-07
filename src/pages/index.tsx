import AuthenticatedHomeView from 'components/view/AuthenticatedHome'
import UnauthenticatedViewHome from 'components/view/UnauthenticatedHome'
import { withGlobalData } from 'hoc/withGlobalData'
import { AppGlobalProps } from 'types'

export type IndexPageProps = {
  global: AppGlobalProps
}

const IndexPage = ({ global }: IndexPageProps) => {
  if (global.userData)
    return <AuthenticatedHomeView userData={global.userData!} />

  return <UnauthenticatedViewHome />
}

export const getServerSideProps = withGlobalData(async ctx => {
  return {
    props: {}
  }
})

export default IndexPage
