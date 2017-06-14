importScripts('/node_modules/sw-toolbox/sw-toolbox.js');

const version = "v8";

const spCaches = {
    'static': 'static-v1',
    'dynamic': 'dynamic-v1'
};

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(spCaches.static)
            .then(function (cache) {
                return cache.addAll([
                    '/Content/452292684.jpg']);
            })
    );
    
    self.skipWaiting();
    console.log('SW %s installed at', version, new Date().toLocaleTimeString());
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        //Deletes the older caches
        caches.keys()
            .then(function (keys) {
                return Promise.all(keys.filter(function (key) {
                    return !Object.values(spCaches).includes(key);
                }).map(function (key) {
                    return caches.delete(key);
                }));
            })
    );

    console.log('SW %s activated at', version, new Date().toLocaleTimeString());
});

toolbox.router.get('/Content/*', toolbox.cacheFirst, {
    cache: {
        name: spCaches.static,
        maxAgeSeconds: 60 * 60 * 24 //1 Day
    }
});

////toolbox.router.get('https://httpbin.org/*', toolbox.networkFirst, {
toolbox.router.get('*/*', toolbox.networkFirst, {
    cache: {
        name: spCaches.dynamic,
        maxEntries: 5 //A maximum if 5 entries can be stored in the cache
    }
});

//toolbox.router.get('https://httpbin.org/*', toolbox.cacheFirst, {
//    networkTimeoutSeconds: 0.1,
//    cache: {
//        name: spCaches.static,
//        maxAgeSeconds: 60 * 60 * 24 //A maximum if 5 entries can be stored in the cache
//    }
//});