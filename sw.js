/* Retire the old Gatsby offline worker, including registrations from old posts. */
self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    // Replace the old controller without reloading open pages. With no fetch
    // handler, this worker lets all requests go directly to the network.
    await self.clients.claim();

    try {
      const names = await caches.keys();
      await Promise.all(names
        .filter((name) => name === "gatsby-plugin-offline" || name.startsWith("gatsby-plugin-offline-"))
        .map((name) => caches.delete(name)));
    } finally {
      // Cache storage may be unavailable; still retire the registration.
      await self.registration.unregister();
    }
  })());
});
