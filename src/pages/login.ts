import { GetServerSideProps } from 'next'
import * as spotifyServiceConfig from 'services/spotify/config'
import * as utils from 'utils'

const state = utils.generateRandomString(16)
const scope = 'user-read-private user-read-email user-top-read'
const redirect_uri = spotifyServiceConfig.SPOTIFY_LOGIN_REDIRECT_URL
const spotifyAuthURL =
  spotifyServiceConfig.SPOTIFY_ACCOUNTS_URL +
  'authorize?' +
  utils.objectToQuerystring({
    response_type: 'code',
    client_id: spotifyServiceConfig.SPOTIFY_APP_CLIENT_ID,
    state,
    scope,
    redirect_uri
  })

const Login = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: spotifyAuthURL,
      permanent: false
    }
  }
}

export default Login
