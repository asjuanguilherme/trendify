import Document, {
  DocumentContext,
  Html,
  Main,
  NextScript,
  Head
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()]
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <link rel="favicon" href="assets/icons/favicon.ico" />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="assets/icons/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="assets/icons/icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="180x180"
            href="assets/icons/icon-180x180.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="assets/icons/icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="assets/icons/icon-144x144.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="144x144"
            href="assets/icons/icon-144x144.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="assets/icons/icon-96x96.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="assets/icons/icon-72x72.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="72x72"
            href="assets/icons/icon-72x72.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="48x48"
            href="assets/icons/icon-48x48.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="assets/icons/icon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="assets/icons/icon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#0D1816" />
          <meta
            name="msapplication-TileImage"
            content="assets/icons/icon-144x144.png"
          />
          <meta name="theme-color" content="#0D1816" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
