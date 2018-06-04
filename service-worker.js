let cacheName = 'restaurants_v1';
const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/data/restaurants.json',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg',
];

self.addEventListener('install', function(e) {
  console.log('[Service Worker installed]')
  e.waitUntil(
    caches.open(cacheName).then( cache => cache.addAll(cacheFiles))
  )
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker fetching]');
  return e.respondWith(
    caches.match(
      e.request, 
      // ignoring the query string in the URL.
      { ignoreSearch: true }
    )
    .then(response => {
      return response || fetch( e.request );
    })
    .catch(err => console.log( err, e.request ))
  );
});
