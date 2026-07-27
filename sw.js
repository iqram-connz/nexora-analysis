const CACHE_NAME = 'nexora-v1';
const ASSETS = ['/', '/index.html', '/style.css', '/script.js', '/data.js'];

// Install: Simpan semua aset ke cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch: Ambil dari cache jika offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
