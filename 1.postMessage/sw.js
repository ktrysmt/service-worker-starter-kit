self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
  console.log('[sw.js] INSTALLED.')
})

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim())
  console.log('[sw.js] ACTIVATED.')
})

self.addEventListener('message', e => {
  console.log('[sw.js] MESSAGE(e.data): ', e.data)

  e.ports[0].postMessage({
    data: 'Re: ' + e.data.text,
    error: null
  })
})
