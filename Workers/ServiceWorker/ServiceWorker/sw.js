const version = "v4";

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(version)
            .then(function (cache) {
                //cache.keys()
                //    .then(function (data) {
                //        console.info("Keys");
                //        console.info(data);
                //    });
                //cache.delete('http://abc.com')
                //    .then(function () {
                //        console.info('Deleted');
                //        cache.put('http://abc.com', new Response("Data"))
                //            .then(function (d) {
                //                console.info("Data In");
                //            })
                //            .catch(function (err) {
                //                console.info("Data Error");
                //                console.info(err);
                //            });
                //    });
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
                    return key !== version;
                }).map(function (key) {
                    return caches.delete(key);
                }));
            })
    );

    console.log('SW %s activated at', version, new Date().toLocaleTimeString());
});

self.addEventListener('fetch', function (event) {
    console.log(event.request.url);
    if (!navigator.onLine) {
        //event.respondWith(new Response("<h1>Offline Mode</h1>"));
        event.respondWith(
            caches.open(version)
                .then(function (cache) {
                    console.log("Searching in cache for %s", event.request.url);
                    return cache.match(event.request.url)
                        .then(function (res) {
                            if (res) {
                                console.log("Response found in cache")
                                return res;
                            } else {
                                console.log("Response not found in cache");
                                return new Response("<h1>You are offline</h1>");
                            }
                        })
                })
        );
    } else {
        console.log('SW captured - %s', event.request.url);
        event.respondWith(fetchAndUpdate(event.request)); //pass through. Fetch the same URL but from Service Worker.
    }
});

function fetchAndUpdate(request) {
    return fetch(request)
        .then(function (res) {
            if (res) {
                return caches.open(version)
                    .then(function (cache) {
                        return cache.put(request, res.clone()) //Clone the response since it can be read only once
                            .then(function () {
                                return res;
                            });
                    })
            }
        })
}