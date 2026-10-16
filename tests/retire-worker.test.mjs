import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

const workerSource = await readFile(new URL("../sw.js", import.meta.url), "utf8");
const cleanupSource = await readFile(new URL("../assets/retire-worker.js", import.meta.url), "utf8");

function loadWorker({ cacheNames = [], failKeys = false } = {}) {
  const events = new Map();
  const calls = [];
  vm.runInNewContext(workerSource, {
    self: {
      addEventListener: (name, callback) => events.set(name, callback),
      skipWaiting: async () => { calls.push("skipWaiting"); },
      clients: { claim: async () => { calls.push("claim"); } },
      registration: { unregister: async () => { calls.push("unregister"); return true; } },
    },
    caches: {
      keys: async () => {
        if (failKeys) throw new Error("Cache storage unavailable");
        return cacheNames;
      },
      delete: async (name) => { calls.push(`delete:${name}`); return true; },
    },
  });
  return {
    calls,
    events,
    dispatch(name) {
      let lifetime;
      events.get(name)({ waitUntil: (promise) => { lifetime = promise; } });
      assert.ok(lifetime instanceof Promise || typeof lifetime?.then === "function");
      return lifetime;
    },
  };
}

test("retiring worker activates immediately and preserves unrelated caches", async () => {
  const worker = loadWorker({ cacheNames: [
    "gatsby-plugin-offline-precache-v2-https://www.simonxu.com/",
    "gatsby-plugin-offline-runtime",
    "gatsby-plugin-offline",
    "another-app-cache",
    "gatsby-plugin-offlineBackup",
  ] });

  await worker.dispatch("install");
  await worker.dispatch("activate");

  assert.deepEqual(worker.calls, [
    "skipWaiting",
    "claim",
    "delete:gatsby-plugin-offline-precache-v2-https://www.simonxu.com/",
    "delete:gatsby-plugin-offline-runtime",
    "delete:gatsby-plugin-offline",
    "unregister",
  ]);
  assert.equal(worker.events.has("fetch"), false, "Old posts that register /sw.js must continue using the network");
});

test("cache-storage failure still unregisters the legacy worker", async () => {
  const worker = loadWorker({ failKeys: true });
  await assert.rejects(worker.dispatch("activate"), /Cache storage unavailable/);
  assert.deepEqual(worker.calls, ["claim", "unregister"]);
});

function registration({ scope = "https://www.simonxu.com/", script = "https://www.simonxu.com/sw.js", state = "active", failUpdate = false } = {}) {
  const calls = [];
  return {
    scope,
    [state]: { scriptURL: script },
    calls,
    update: async () => {
      calls.push("update");
      if (failUpdate) throw new Error("Offline");
    },
    unregister: async () => { calls.push("unregister"); },
  };
}

async function runCleanup(registrations, { failLookup = false, supported = true } = {}) {
  vm.runInNewContext(cleanupSource, {
    location: { origin: "https://www.simonxu.com" },
    navigator: supported ? {
      serviceWorker: {
        getRegistrations: async () => {
          if (failLookup) throw new Error("Blocked");
          return registrations;
        },
      },
    } : {},
  });
  // Flush promise jobs, including the cleanup script's rejection handlers.
  await new Promise((resolve) => setImmediate(resolve));
}

test("page cleanup updates only the same-origin root /sw.js registration", async () => {
  const registrations = [
    registration(),
    registration({ state: "waiting" }),
    registration({ state: "installing" }),
    registration({ scope: "https://www.simonxu.com/app/" }),
    registration({ script: "https://www.simonxu.com/other-worker.js" }),
    registration({ script: "https://www.simonxu.com/sw.js?other-app" }),
    registration({ scope: "https://other.example/", script: "https://other.example/sw.js" }),
  ];

  await runCleanup(registrations);

  assert.deepEqual(registrations.map(({ calls }) => calls), [
    ["update"], ["update"], ["update"], [], [], [], [],
  ]);
});

test("page cleanup tolerates unavailable workers and failed lookups or updates", async () => {
  const failed = registration({ failUpdate: true });
  await runCleanup([failed]);
  await runCleanup([], { failLookup: true });
  await runCleanup([], { supported: false });
  assert.deepEqual(failed.calls, ["update"], "Do not unregister a stale controller before its replacement activates");
});
