const CACHE = 'tejera-v1'
const SHELL = ['/', '/index.html']

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(SHELL))
  )
  self.skipWaiting()
})

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Network first — siempre intenta red, cae a caché si falla
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return
  if (e.request.url.includes('supabase')) return
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const clone = res.clone()
        caches.open(CACHE).then(c => c.put(e.request, clone))
        return res
      })
      .catch(() => caches.match(e.request))
  )
})

// ── Push notifications ─────────────────────────────────────────────────────────

self.addEventListener('push', e => {
  if (!e.data) return

  let data
  try {
    data = e.data.json()
  } catch {
    data = { title: 'Tejera Balompié', body: e.data.text() }
  }

  const options = {
    body: data.body || '',
    icon: data.icon || '/escudo.png',
    badge: data.badge || '/escudo.png',
    image: data.image || undefined,
    data: { url: data.url || '/' },
    vibrate: [100, 50, 100],
    requireInteraction: false,
    tag: 'tejera-notif', // sustituye la anterior para no acumular
  }

  e.waitUntil(
    self.registration.showNotification(data.title || 'Tejera Balompié', options)
  )
})

// Al pulsar la notificación abre la app en la URL indicada
self.addEventListener('notificationclick', e => {
  e.notification.close()
  const url = e.notification.data?.url || '/'
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
      // Si ya hay una pestaña/ventana abierta, la enfoca y navega
      for (const client of list) {
        if ('focus' in client) {
          client.focus()
          client.navigate(url)
          return
        }
      }
      // Si no, abre una nueva
      if (clients.openWindow) return clients.openWindow(url)
    })
  )
})
