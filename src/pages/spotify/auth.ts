import { GetServerSideProps } from 'next'
import * as spotifyClient from 'services/spotify/queries'

const SpotifyAuth = () => {
  return null
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const code = ctx.query.code as string | undefined
  const state = ctx.query.state as string | undefined
  const error = ctx.query.error as string | undefined
  const hasAuthParams = code && state

  if (error || !hasAuthParams)
    return {
      redirect: {
        destination: '/?error',
        permanent: true
      }
    }

  try {
    await spotifyClient.authenticateSpotifyUser({ code, ctx })

    return {
      redirect: {
        destination: '/?success',
        permanent: true
      }
    }
  } catch (err) {
    console.log(err)

    return {
      redirect: {
        destination: '/?error',
        permanent: true
      }
    }
  }
}

export default SpotifyAuth
