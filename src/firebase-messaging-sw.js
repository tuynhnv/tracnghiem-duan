importScripts('https://www.gstatic.com/firebasejs/3.7.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.7.5/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyDpcHqGHomwkl2oNAIEFAaDr58jqW40pJg",
    authDomain: "push-example-921a8.firebaseapp.com",
    databaseURL: "https://push-example-921a8.firebaseio.com",
    storageBucket: "push-example-921a8.appspot.com",
    messagingSenderId: "415083462802"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});

// {
//   "notification": {
//     "body": "Notification",
//     "title" "Tile",
//     "priority": "high"
//   },
//   "data":  {
//     "id": 1
//   },
//   "to": "eyEQrZZiSMs:APA91bEk0I3xjnf6nXqcUGHSuyJ7Yyy8vWWW6JKXl53A7oGuk56WYOKfL6NDVFz8mTylT0hj8JHqfRzelka6D9yWOS7zJF38Q5LFm6VOfTbbcfl-YUX2qWEVFPmOV7_SINGrmCGNyi9X"
// }


