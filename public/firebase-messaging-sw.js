importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyBm_brdqUamC_kPeEbnl-nNpe3914QfBYU",
  authDomain: "notification-bd9b6.firebaseapp.com",
  projectId: "notification-bd9b6",
  storageBucket: "notification-bd9b6.firebasestorage.app",
  messagingSenderId: "221321879828",
  appId: "1:221321879828:web:afac2cd46a874457142201",
  measurementId: "G-3WY6QD46HG"
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/favicon.ico'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});