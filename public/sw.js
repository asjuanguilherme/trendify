if (!self.define) {
  let e,
    s = {}
  const n = (n, a) => (
    (n = new URL(n + '.js', a).href),
    s[n] ||
      new Promise(s => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = n), (e.onload = s), document.head.appendChild(e)
        } else (e = n), importScripts(n), s()
      }).then(() => {
        let e = s[n]
        if (!e) throw new Error(`Module ${n} didn’t register its module`)
        return e
      })
  )
  self.define = (a, c) => {
    const i =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (s[i]) return
    let t = {}
    const o = e => n(e, i),
      r = { module: { uri: i }, exports: t, require: o }
    s[i] = Promise.all(a.map(e => r[e] || o(e))).then(e => (c(...e), t))
  }
}
define(['./workbox-50de5c5d'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/Q_tjwoOj7f8b3w1hM-Mcc/_buildManifest.js',
          revision: '8c93e0299f5fd49d93eef36196f744bc'
        },
        {
          url: '/_next/static/Q_tjwoOj7f8b3w1hM-Mcc/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933'
        },
        {
          url: '/_next/static/chunks/457.cf102c5048fdfd31.js',
          revision: 'cf102c5048fdfd31'
        },
        {
          url: '/_next/static/chunks/515-c8c8859c8f0f3a05.js',
          revision: 'c8c8859c8f0f3a05'
        },
        {
          url: '/_next/static/chunks/framework-63157d71ad419e09.js',
          revision: '63157d71ad419e09'
        },
        {
          url: '/_next/static/chunks/main-29f71bcd56f65c61.js',
          revision: '29f71bcd56f65c61'
        },
        {
          url: '/_next/static/chunks/pages/_app-b1ac205867d41ca0.js',
          revision: 'b1ac205867d41ca0'
        },
        {
          url: '/_next/static/chunks/pages/_error-54de1933a164a1ff.js',
          revision: '54de1933a164a1ff'
        },
        {
          url: '/_next/static/chunks/pages/about-7eb816bbe1768397.js',
          revision: '7eb816bbe1768397'
        },
        {
          url: '/_next/static/chunks/pages/generator-4bef7ac799d7a7b9.js',
          revision: '4bef7ac799d7a7b9'
        },
        {
          url: '/_next/static/chunks/pages/index-7d5e21f8dd4d8f17.js',
          revision: '7d5e21f8dd4d8f17'
        },
        {
          url: '/_next/static/chunks/pages/login-286010f274f96852.js',
          revision: '286010f274f96852'
        },
        {
          url: '/_next/static/chunks/pages/privacy-policy-5f371915bacacc5d.js',
          revision: '5f371915bacacc5d'
        },
        {
          url: '/_next/static/chunks/pages/spotify/auth-bf8f339b4606fd69.js',
          revision: 'bf8f339b4606fd69'
        },
        {
          url: '/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js',
          revision: '79330112775102f91e1010318bae2bd3'
        },
        {
          url: '/_next/static/chunks/webpack-fd3addf7e1f4e66c.js',
          revision: 'fd3addf7e1f4e66c'
        },
        {
          url: '/_next/static/css/a2c9255aa4354820.css',
          revision: 'a2c9255aa4354820'
        },
        {
          url: '/_next/static/media/274514a59d06af59-s.p.otf',
          revision: 'ff643805f0720365c9b1699902821762'
        },
        {
          url: '/_next/static/media/2d145a6d8c645f8e-s.p.otf',
          revision: 'efda7ebbf296c232336d2c0767b9ec5a'
        },
        {
          url: '/_next/static/media/7e6a49d35dc135ab-s.p.otf',
          revision: 'f504d0ea43d81ce1da05fd80945004c3'
        },
        {
          url: '/_next/static/media/81615762e7c0afb9-s.p.otf',
          revision: '5cbb20e4db86a4b4d895ca69f82d08a7'
        },
        {
          url: '/assets/icons/favicon.ico',
          revision: '1ecab363ff34d51ff1864d6276a6407d'
        },
        {
          url: '/assets/icons/icon-128x128.png',
          revision: '64b6b11f8ab8bf5eb4aad093afffdd1a'
        },
        {
          url: '/assets/icons/icon-144x144.png',
          revision: 'cb721d7b623e0574598458c8a64c529e'
        },
        {
          url: '/assets/icons/icon-152x152.png',
          revision: 'd57528055738db5754acb5590b17d195'
        },
        {
          url: '/assets/icons/icon-192x192.png',
          revision: '806ca8008ca3b5fd3ad19d3c9be7b3b3'
        },
        {
          url: '/assets/icons/icon-384x384.png',
          revision: '8807fccc72f5d3027926dc95e116ac1c'
        },
        {
          url: '/assets/icons/icon-48x48.png',
          revision: 'ed56ad7719cca475f39b210862990850'
        },
        {
          url: '/assets/icons/icon-512x512.png',
          revision: 'f07c05a7a38778b69640a7b4f2cf4c95'
        },
        {
          url: '/assets/icons/icon-72x72.png',
          revision: '8534843067b5b12df9179cef8ede594d'
        },
        {
          url: '/assets/icons/icon-96x96.png',
          revision: 'bd719e0860bd598b1edd1ee8c1775f54'
        },
        {
          url: '/assets/images/home-background.png',
          revision: 'e11ea586ddba2bbe4b740d511b4a5815'
        },
        {
          url: '/assets/images/photo_placeholder.png',
          revision: 'bade74c991011096287010458f7b77d2'
        },
        {
          url: '/assets/site.webmanifest',
          revision: '46b7d2bc759b75d6077349d28f531c2b'
        }
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: n,
              state: a
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers
                  })
                : s
          }
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })
        ]
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })
        ]
      }),
      'GET'
    )
})
