/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public'
})

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en', 'es']
  },
  async redirects() {
    return [
      {
        source: '/_error',
        destination: '/[locale]',
        permanent: true
      }
    ]
  }
}

module.exports = withPWA(nextConfig)
