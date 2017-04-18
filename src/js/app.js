var config = {
    apiKey: "AIzaSyDpcHqGHomwkl2oNAIEFAaDr58jqW40pJg",
    authDomain: "push-example-921a8.firebaseapp.com",
    databaseURL: "https://push-example-921a8.firebaseio.com",
    storageBucket: "push-example-921a8.appspot.com",
    messagingSenderId: "415083462802"
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.requestPermission()
.then(function() {
    console.log('Have permisstion');
})
.catch(function(err) {
    console.log('Error Occured.')
})

