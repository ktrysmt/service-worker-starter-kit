self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
  console.log('[sw.js] INSTALLED.')
})

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim())
  console.log('[sw.js] ACTIVATED.')
})

self.addEventListener('fetch', e => {
  console.log('[sw.js] FETCHED(e.request.url): ', e.request.url)
})

