import Home from 'components/view/Home'
import { withGlobalData } from 'hoc/withGlobalData'
import { AppGlobalProps } from 'types'
import AppHead from 'components/infra/AppHead'

export type IndexPageProps = {
  global: AppGlobalProps
}

const IndexPage = ({}: IndexPageProps) => {
  return (
    <>
      <AppHead
        title="Início"
        description="Bem-vindo ao sTopify! Aqui, você encontrará uma ferramenta incrível
          para explorar e descobrir suas músicas e artistas favoritos no Spotify
          de uma maneira única e envolvente."
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
