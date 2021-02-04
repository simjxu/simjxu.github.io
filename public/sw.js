/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.5.0/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.5.0"});

workbox.core.setCacheNameDetails({prefix: "gatsby-plugin-offline"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "webpack-runtime-ec7209389deb8a46b250.js"
  },
  {
    "url": "framework-513632b9031254dfb5ad.js"
  },
  {
    "url": "app-7ca0e52e0610a05c0383.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-9cfc042f471adb8b7421.js"
  },
  {
    "url": "index.html",
    "revision": "821f535aae5142dcba137c4007dbf4f3"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "e88c2484f8b9afd61e3a9e622a8405e8"
  },
  {
    "url": "styles.3d44ac656aca5ca4ccda.css"
  },
  {
    "url": "styles-e9d24b1846c7d6eb9685.js"
  },
  {
    "url": "907a01899e9c5216f64e0ef7b1b8e8d2d368487b-6ba01923175e815d4944.js"
  },
  {
    "url": "component---src-pages-index-js-877b418916fa80f6af91.js"
  },
  {
    "url": "page-data/index/page-data.json",
    "revision": "ed1efce49b60705a2e148eaf3c17bc12"
  },
  {
    "url": "page-data/sq/d/3649515864.json",
    "revision": "909dd62df71cc5c2497e20a761861a3f"
  },
  {
    "url": "page-data/app-data.json",
    "revision": "fcea6849b9a8d6e23c76a8ff708cfd52"
  },
  {
    "url": "polyfill-d47b21a5737d9524fa70.js"
  },
  {
    "url": "component---src-pages-404-js-99defb49b38a8f14097f.js"
  },
  {
    "url": "page-data/404.html/page-data.json",
    "revision": "a29170fe8ef354590f52831a347fc316"
  },
  {
    "url": "page-data/offline-plugin-app-shell-fallback/page-data.json",
    "revision": "c7047792c6f91b88e0d9abc0cd819e92"
  },
  {
    "url": "manifest.webmanifest",
    "revision": "55a9292126f8836e91e5d40b0a8cb54f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerNavigationRoute("/offline-plugin-app-shell-fallback/index.html", {
  whitelist: [/^[^?]*([^.?]{5}|\.html)(\?.*)?$/],
  blacklist: [/\?(.+&)?no-cache=1$/],
});

workbox.routing.registerRoute(/\.(?:png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/, workbox.strategies.staleWhileRevalidate(), 'GET');
workbox.routing.registerRoute(/^https:/, workbox.strategies.networkFirst(), 'GET');
"use strict";

/* global workbox */
self.addEventListener("message", function (event) {
  var api = event.data.api;

  if (api === "gatsby-runtime-cache") {
    var resources = event.data.resources;
    var cacheName = workbox.core.cacheNames.runtime;
    event.waitUntil(caches.open(cacheName).then(function (cache) {
      return Promise.all(resources.map(function (resource) {
        return cache.add(resource).catch(function (e) {
          // ignore TypeErrors - these are usually due to
          // external resources which don't allow CORS
          if (!(e instanceof TypeError)) throw e;
        });
      }));
    }));
  }
});