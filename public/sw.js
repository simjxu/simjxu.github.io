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
    "url": "webpack-runtime-e88b6e54b10baacc3aa3.js"
  },
  {
    "url": "app-22b5028de027666e0d20.js"
  },
  {
    "url": "component---node-modules-gatsby-plugin-offline-app-shell-js-7f5ab6e4f411d39ca79f.js"
  },
  {
    "url": "index.html",
    "revision": "948c81adee1435d0c323ce1f6de2d69b"
  },
  {
    "url": "offline-plugin-app-shell-fallback/index.html",
    "revision": "8d3457ebd5cc6e0f4a2e84e6188ff296"
  },
  {
    "url": "component---src-pages-index-js.a3706dfc77e6d977d0ca.css"
  },
  {
    "url": "component---src-pages-index-js-d256b12d32411c3d7ebd.js"
  },
  {
    "url": "10-0c3d30d5a41cdb929b55.js"
  },
  {
    "url": "0-dfb243de846656179d97.js"
  },
  {
    "url": "static/d/694/path---index-6a9-FzyJQlgdDV5ZW86PH8QRJzVGDgA.json",
    "revision": "b3c3ebe1fa54f84b486227f31f569e87"
  },
  {
    "url": "component---src-pages-404-js.a3706dfc77e6d977d0ca.css"
  },
  {
    "url": "component---src-pages-404-js-b6c4a6aff61d07a818cb.js"
  },
  {
    "url": "static/d/164/path---404-html-516-62a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
  },
  {
    "url": "static/d/520/path---offline-plugin-app-shell-fallback-a-30-c5a-NZuapzHg3X9TaN1iIixfv1W23E.json",
    "revision": "c2508676a2f33ea9f1f0bf472997f9a0"
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