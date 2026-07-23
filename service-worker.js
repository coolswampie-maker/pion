// Пион переехал на wedding.zimermans.ru. Этот SW самоудаляется, чистит кэш
// старого PWA и уводит открытые вкладки на новый адрес.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const ks = await caches.keys();
    await Promise.all(ks.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate('https://wedding.zimermans.ru/'));
  })());
});
self.addEventListener('fetch', (e) => {
  if (e.request.mode === 'navigate') {
    e.respondWith(Response.redirect('https://wedding.zimermans.ru/', 302));
  }
});
