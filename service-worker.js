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

self.addEventListener('activate', function(e) {
  console.log('[Service Worker activated]')
});

self.addEventListener('fetch', event => {
    // Let the browser do its default thing
    // for non-GET requests.
    if (event.request.method != 'GET') return;

    event.respondWith(
        caches.open('restaurants_v1').then(function(cache) {
            return cache.match(event.request).then(function (response) {
            return response || fetch(event.request).then(function(response) {
                cache.put(event.request, response.clone());
                return response;
            }).catch(e => console.error(e));
            });
        })
    );


  });
