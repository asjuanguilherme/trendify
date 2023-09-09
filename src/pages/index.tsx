import Home from 'components/view/Home'
import { withGlobalData } from 'hoc/withGlobalData'
import { AppGlobalProps } from 'types'
import AppHead from 'components/infra/AppHead'
import { useI18n } from 'hooks/useI18n'

export type IndexPageProps = {
  global: AppGlobalProps
}

const IndexPage = ({}: IndexPageProps) => {
  const i18n = useI18n()

  return (
    <>
      <AppHead
        title={i18n.HOME_PAGE.TITLE}
        description={i18n.HOME_PAGE.SEO_DESCRIPTION}
        pathname="/"
      />
      <Home />
    </>
  )
}

export const getServerSideProps = withGlobalData(async ctx => {
  return {
    props: {}
  }
})

export default IndexPage
