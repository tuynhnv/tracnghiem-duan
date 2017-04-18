'use strict';

//Cache polyfil to support cacheAPI in all browsers
importScripts('./cache-polyfill.js');

var cacheName = 'cache-tracnghiem';

//Files to save in cache
var files = [
  './',
    './app/quiz/question.js',
    './app/quiz/answer.js',
    './app/app.component.css',
    './app/app.component.html',
    './app/app.component.js',
    './app/main.js',
    './index.html',
    './index.html?utm=homescreen', //SW treats query string as new page
    './styles.css',
    //'https://fonts.googleapis.com/css?family=Roboto:200,300,400,500,700', //caching 3rd party content
    './manifest.json'

  
];

//Adding `install` event listener
self.addEventListener('install', function (event) {
  console.info('Event: Install');

  event.waitUntil(
    caches.open(cacheName)
    .then(function (cache) {
      //[] of files to cache & if any of the file not present `addAll` will fail
      return cache.addAll(files)
      .then(function () {
        console.info('All files are cached');
        return self.skipWaiting(); //To forces the waiting service worker to become the active service worker
      })
      .catch(function (error) {
        console.error('Failed to cache', error);
      })
    })
  );
});

/*
  FETCH EVENT: triggered for every request made by index page, after install.
*/

//Adding `fetch` event listener
self.addEventListener('fetch', function (event) {
  console.info('Event: Fetch');

  var request = event.request;

  //Tell the browser to wait for newtwork request and respond with below
  event.respondWith(
    //If request is already in cache, return it
    caches.match(request).then(function(response) {
      if (response) {
        return response;
      }

      //if request is not cached, add it to cache
      return fetch(request).then(function(response) {
        var responseToCache = response.clone();
        caches.open(cacheName).then(
          function(cache) {
            cache.put(request, responseToCache).catch(function(err) {
              console.warn(request.url + ': ' + err.message);
            });
          });

        return response;
      });
    })
  );
});

/*
  ACTIVATE EVENT: triggered once after registering, also used to clean up caches.
*/

//Adding `activate` event listener
self.addEventListener('activate', function (event) {
  console.info('Event: Activate');

  //Remove old and unwanted caches
  event.waitUntil( 
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cache) {
          if (cache !== cacheName) {     //cacheName = 'cache-tracnghiem'
            return caches.delete(cache); //Deleting the cache
          }
        })
      );
    })
  );
});

/*
  PUSH EVENT: triggered everytime, when a push notification is received.
*/

//Adding `push` event listener
self.addEventListener('push', function(event) {
  console.info('Event: Push');

  var title = 'Push notification demo';
  var body = {
    'body': 'click to return to application',
    'tag': 'demo',
    'icon': './images/icons/apple-touch-icon.png',
    'badge': './images/icons/apple-touch-icon.png',
  //Custom actions buttons
    'actions': [
      { "action": "yes", "title": "I ♥ this app!"},
      { "action": "no", "title": "I don\'t like this app"}
    ]
  };
//
//
//  event.waitUntil(self.registration.showNotification(title, body));
});


//   self.addEventListener('push', function(event) {
//   var apiPath = 'browser_push_notification?endpoint=';

//   event.waitUntil(
//     registration.pushManager.getSubscription()
//     .then(function(subscription) {
//       if (!subscription || !subscription.endpoint) {
//         throw new Error();
//       }

//       apiPath = apiPath + encodeURI(subscription.endpoint);

//       return fetch(apiPath)
//       .then(function(response) {
//         if (response.status !== 200){
//           console.log("Problem Occurred:"+response.status);
//           throw new Error();
//         }

//         return response.json();
//       })
//       .then(function(data) {
//         if (data.status == 0) {
//           console.error('The API returned an error.', data.error.message);
//           throw new Error();
//         }
//         var data = data.data;
//         var title = data.notification.title;
//         var message = data.notification.message;
//         var icon = data.notification.icon;
//         var data = {
//           url: data.notification.url
//         };

//         return self.registration.showNotification(title, {
//           body: message,
//           icon: icon,
//           data: data
//         });
//       })
//       .catch(function(err) {
//         return self.registration.showNotification('Notification', {
//           body: 'Có một sự kiện sắp diễn ra',
//           icon: 'image/pn_logo.png',
//           data: {
//             url: "/"
//           }
//         });
//       });
//     })
//   );
// });



/*
  BACKGROUND SYNC EVENT: triggers after `bg sync` registration and page has network connection.
  It will try and fetch github username, if its fulfills then sync is complete. If it fails,
  another sync is scheduled to retry (will will also waits for network connection)
*/

self.addEventListener('sync', function(event) {
  console.info('Event: Sync');

  //Check registered sync name or emulated sync from devTools
  if (event.tag === 'github' || event.tag === 'test-tag-from-devtools') {
    event.waitUntil(
      //To check all opened tabs and send postMessage to those tabs
      self.clients.matchAll().then(function (all) {
        return all.map(function (client) {
          return client.postMessage('online'); //To make fetch request, check app.js - line no: 122
        })
      })
      .catch(function (error) {
        console.error(error);
      })
    );
  }
});

/*
  NOTIFICATION EVENT: triggered when user click the notification.
*/

//Adding `notification` click event listener
// self.addEventListener('notificationclick', function(event) {
//   var url = 'https://demopwa.in';

//   //Listen to custom action buttons in push notification
//   if (event.action === 'yes') {
//     console.log('I ♥ this app!');
//   }
//   else if (event.action === 'no') {
//     console.warn('I don\'t like this app');
//   }

//   event.notification.close(); //Close the notification

//   //To open the app after clicking notification
//   event.waitUntil(
//     clients.matchAll({
//       type: 'window'
//     })
//     .then(function(clients) {
//       for (var i = 0; i < clients.length; i++) {
//         var client = clients[i];
//         //If site is opened, focus to the site
//         if (client.url === url && 'focus' in client) {
//           return client.focus();
//         }
//       }

//       //If site is cannot be opened, open in new window
//       if (clients.openWindow) {
//         return clients.openWindow('/');
//       }
//     })
//     .catch(function (error) {
//       console.error(error);
//     })
//   );
// });

    self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    var url = event.notification.data.url;
    event.waitUntil(
        clients.matchAll({
                type: 'window'
            })
            .then(function(windowClients) {
                for (var i = 0; i < windowClients.length; i++) {
                    var client = windowClients[i];
                    if (client.url === url && 'focus' in client) {
                        return client.focus();
                    }
                }
                if (clients.openWindow) {
                    return clients.openWindow(url);
                }
            })
    );
});