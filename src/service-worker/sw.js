importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.0.0/workbox-sw.js');
import 'regenerator-runtime/runtime'
import ResinIcon from "../../public/ResinIcon.png"
workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.core.setCacheNameDetails({
    prefix: 'Proms-cache',
    precache: 'Proms-precache',
    runtime: 'Proms-runtime'

})

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (event.data && event.data.type === 'CLIENTS_CLAIM') {
    self.clients.claim();
  }
});

self.addEventListener('push', event => {
  const data = event.data.json()
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body:data.text,
      data: data.url,
      badge: ResinIcon,
      image: data.image,
      actions: [{action: "Show", title: "Accéder", icon: ResinIcon}]
    })
  );
})

self.addEventListener("notificationclick", event => {
  
  console.log("[Service Worker] Notification click Received.", event.notification.data);
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data));

});

self.addEventListener('fetch', event => {
 
  if (event.request.url.indexOf('upload') !== -1) {
    return;
  }

  // Prevent the default, and handle the request ourselves.
  event.respondWith(async function() {
    // Try to get the response from a cache.
    const cachedResponse = await caches.match(event.request);
    // Return it if we found one.
    if (cachedResponse) return cachedResponse;
    // If we didn't find a match in the cache, use the network.
    return fetch(event.request);
  }());
});

workbox.routing.registerRoute(
  new RegExp('\.css$'),
  new workbox.strategies.NetworkOnly({
    cacheName:"css",
    plugins: [
      new workbox.expiration.CacheExpiration("css",{
        maxAgeSeconds: 60*60*24,
        purgeOnQuotaError: true
      })
    ]
  })
)

workbox.routing.registerRoute(
  new RegExp(/\.(?:png|jpg|jpeg|svg)$/),
  new workbox.strategies.NetworkOnly({
    cacheName:"images",
    plugins: [
      new workbox.expiration.CacheExpiration("images",{
        maxAgeSeconds: 60*60*24,
        purgeOnQuotaError: true
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('/.*'),
  new workbox.strategies.NetworkOnly({cacheName:"routes"})
)

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('Proms-cache-Proms-precache')
      .then(cache => cache.addAll([
        "css","images","routes"
      ]))
  );
});

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);