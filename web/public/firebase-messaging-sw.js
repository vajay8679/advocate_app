importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.2/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDntU78Z8qEK8Qs5H7BAg-75BaxiTiqFAQ",
  projectId: "chatappdemo-7301e",
  messagingSenderId: "835122346412",
  appId: "1:835122346412:web:48f1f0df894538692f2209",
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function({data:{title,body,icon}}) {
  return self.registration.showNotification(title,{body,icon});
});
