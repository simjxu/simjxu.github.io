/* Ask only the old root Gatsby worker to update to the self-retiring /sw.js. */
(() => {
  if (!("serviceWorker" in navigator)) return;

  const root = `${location.origin}/`;
  const script = `${root}sw.js`;

  navigator.serviceWorker.getRegistrations().then((registrations) => {
    return Promise.all(registrations.map((registration) => {
      const workers = [registration.active, registration.waiting, registration.installing];
      if (registration.scope !== root || !workers.some((worker) => worker && worker.scriptURL === script)) return;

      // Updating first lets the replacement claim existing pages before it
      // unregisters itself. Unregistering here would leave the stale controller.
      return registration.update().catch(() => {});
    }));
  }).catch(() => {}); // A blocked/offline update can retry on the next visit.
})();
