// Subhan Ghafoor Portfolio — Service Worker
// Strategy: Cache First for static assets, Network First for dynamic content

const CACHE_VERSION = "v1";
const STATIC_CACHE  = `portfolio-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `portfolio-dynamic-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  "/",
  "/resume",
  "/manifest.json",
  "/offline.html",
];

// ── Install ────────────────────────────────────────────
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ── Activate ───────────────────────────────────────────
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch ──────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and cross-origin (e.g. GitHub API)
  if (request.method !== "GET" || url.origin !== location.origin) return;

  // Navigation requests — Network First, fallback to offline page
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(DYNAMIC_CACHE).then((c) => c.put(request, clone));
          return res;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match("/offline.html"))
        )
    );
    return;
  }

  // Static assets (JS, CSS, fonts, images) — Cache First
  if (
    request.destination === "script" ||
    request.destination === "style"  ||
    request.destination === "font"   ||
    request.destination === "image"
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          const clone = res.clone();
          caches.open(STATIC_CACHE).then((c) => c.put(request, clone));
          return res;
        });
      })
    );
    return;
  }

  // Everything else — Network First with dynamic cache fallback
  event.respondWith(
    fetch(request)
      .then((res) => {
        const clone = res.clone();
        caches.open(DYNAMIC_CACHE).then((c) => c.put(request, clone));
        return res;
      })
      .catch(() => caches.match(request))
  );
});
