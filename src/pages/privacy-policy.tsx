import AppHead from 'components/infra/AppHead'
import ExternalLinkWithIcon from 'components/shared/ExternalLinkWithIcon'
import BasicPageView from 'components/view/BasicPage'
import { withGlobalData } from 'hoc/withGlobalData'

const PrivacyPolicyPage = () => {
  return (
    <>
      <AppHead
        title="Política de Privacidade"
        description="Confira a política de privacidade do site e entenda como seus dados são usados."
        pathname="/privacy-policy"
      />
      <BasicPageView>
        <h1>Política de Privacidade do sTopify</h1>
        <p>
          O sTopify foi desenvolvido como um aplicativo de código privado
          alimentado pela API da Spotify. Ao escolher usar este aplicativo, você
          concorda com o uso do nome de usuário e dos dados de sua conta do
          Spotify para descobrir seus principais artistas e faixas.
        </p>
        <p>
          Nenhum dos dados utilizados pelo sTopify é armazenado ou coletado em
          qualquer lugar, e não é compartilhado com terceiros. Todas as
          informações são usadas exclusivamente para exibir seu sTopify.
        </p>

        <p>
          Embora você possa ter a certeza de que seus dados não estão sendo
          armazenados ou utilizados de forma maliciosa, se desejar revogar as
          permissões do sTopify, você pode visitar a
          <ExternalLinkWithIcon href="https://www.spotify.com/us/account/apps/?_ga=2.57194153.2059435232.1677244602-1044990631.1616788427">
            pagina de aplicativos
          </ExternalLinkWithIcon>
          e clicar em remover acesso ao sTopify.
        </p>
        <ExternalLinkWithIcon href="https://support.spotify.com/us/article/spotify-on-other-apps/">
          Guia mais detalhado para como remover o acesso.
        </ExternalLinkWithIcon>
      </BasicPageView>
    </>
  )
}

export const getServerSideProps = withGlobalData(async () => {
  return {
    props: {}
  }
})

export default PrivacyPolicyPage
