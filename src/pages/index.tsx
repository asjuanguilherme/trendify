import UnauthenticatedViewHome from 'components/view/UnauthenticatedHome'
import { withGlobalData } from 'hoc/withGlobalData'

const IndexPage = () => {
  return <UnauthenticatedViewHome />
}

export const getServerSideProps = withGlobalData(async ctx => {
  return {
    props: {}
  }
})

export default IndexPage
