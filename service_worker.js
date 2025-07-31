// Service Worker for はむぴよ
const CACHE_NAME = 'hamupiyo-v1';
const urlsToCache = [
  './',
  './index.html',
  './hamupiyo-icon.png',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css'
];

// インストール時
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// フェッチ時
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // キャッシュにある場合はキャッシュから返す
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});