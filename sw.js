//Asignar nombre y version de la cache
const CACHE_NAME = 'pwa_login';
//ficheros a cachear en la aplicacion;
var urlsToCache = [
    './'
    
];

//EVENTO INSTALL

self.addEventListener('install', e => {
    e.waitUntil(
            caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                        .then(() => {
                            self.skipWaiting();
                        })
                        .catch(err => {
                            console.log('No se ha registrado el cache', err);
                        })
            })
            );
});

//EVENTO ACTIVATED

self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME];
    e.waitUntil(
            caches.keys()
            .then(cacheNames => {
                return Promise.all(
                        cacheNames.map(cacheName => {

                            if (cacheWhitelist.indexOf(cacheName) === -1) {
                                //Borrar elementos que no se necesitan
                                return caches.delete(cacheName);
                            }
                        })
                        )
            })
            .then(() => {
                //Activar cache
                self.clients.claim();
            })
            )
});

//EVENTO FETCH

self.addEventListener('fetch', e => {

    e.respondWith(
            caches.match(e.request)
            .then(res => {
                if (res) {
                    //devuelvo datos desde cache
                    return res;
                }
                return fetch(e.request);
            }))
})
