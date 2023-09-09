import AppHead from 'components/infra/AppHead'
import ExternalLinkWithIcon from 'components/shared/ExternalLinkWithIcon'
import BasicPageView from 'components/view/BasicPage'
import { DEVELOPER_WEBSITE_URL } from 'config/developerWebsiteURL'
import { withGlobalData } from 'hoc/withGlobalData'

const PrivacyPolicyPage = () => {
  return (
    <>
      <AppHead
        title="Sobre"
        description="Confira a Sobre do site e entenda como seus dados são usados."
        pathname="/about"
      />

      <BasicPageView>
        <h1>Sobre o App sTopify</h1>
        <p>
          Bem-vindo ao sTopify! Aqui, você encontrará uma ferramenta incrível
          para explorar e descobrir suas músicas e artistas favoritos no Spotify
          de uma maneira única e envolvente.
        </p>

        <br />

        <h2>Como Funciona</h2>
        <p>
          O sTopify é projetado para tornar sua experiência musical no Spotify
          ainda mais emocionante. Ele oferece uma funcionalidade simples, mas
          poderosa: gerar suas listas dos artistas mais ouvidos e das músicas
          mais ouvidas na plataforma.
        </p>

        <h3>Conexão ao Spotify:</h3>
        <p>
          Para começar, você se conecta à sua conta do Spotify. O sTopify
          respeita a privacidade dos seus dados e utiliza apenas as informações
          necessárias para criar suas listas personalizadas.
        </p>

        <h3>Geração das Listas:</h3>
        <p>
          Depois de conectado, o sTopify faz uma análise rápida e gera
          automaticamente sua lista dos artistas mais ouvidos e das músicas mais
          ouvidas. Isso permite que você descubra suas preferências musicais de
          uma maneira divertida e informativa.
        </p>

        <h3>Exploração e Compartilhamento:</h3>
        <p>
          Com suas listas em mãos, você pode explorar seus artistas e músicas
          favoritas com facilidade. Além disso, o sTopify permite que você
          compartilhe suas listas com amigos, tornando a descoberta musical uma
          experiência social.
        </p>

        <br />

        <h2>Palavras do Desenvolvedor</h2>

        <p>
          Meu nome é Juan Guilherme. Minha paixão pela tecnologia e pela música
          me inspirou a desenvolver esta ferramenta. Para mim a música tem o
          poder de unir as pessoas e enriquecer nossas vidas, e o sTopify é
          minha maneira de contribuir com isso.
        </p>

        <p>
          Espero que você aproveite o app tanto quanto eu aproveitei ao criá-lo.
        </p>

        <p>
          Caso queira entrar em contato comigo, sinta-se livre para acessar as
          formas de contato disponível no meu{' '}
          <ExternalLinkWithIcon href={DEVELOPER_WEBSITE_URL}>
            website
          </ExternalLinkWithIcon>
          .
        </p>
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
