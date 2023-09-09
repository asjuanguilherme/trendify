import Head from 'next/head'

export type AppHeadProps = {
  title: string
  description: string
  pathname: string
  image?: string
  twitterCard?: 'summary' | 'summary_large_image'
  twitterAltImage?: string
}

const AppHead = ({
  twitterCard = 'summary',
  twitterAltImage = '',
  image = '/assets/icons/icon-512x512.png',
  ...props
}: AppHeadProps) => {
  return (
    <Head>
      <title>sTopify{props.title && ` | ${props.title}`}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:type" content="article" />
      <meta
        property="og:url"
        content={process.env.NEXT_PUBLIC_SITE_DOMAIN_URL + props.pathname}
      />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={props.description} />

      <meta property="og:site_name" content="sTopify" />

      {twitterAltImage && (
        <meta name="twitter:image:alt" content={twitterCard} />
      )}
      <meta name="twitter:card" content={twitterCard} />
    </Head>
  )
}

export default AppHead
