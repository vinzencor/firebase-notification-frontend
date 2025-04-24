import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm_brdqUamC_kPeEbnl-nNpe3914QfBYU",
  authDomain: "notification-bd9b6.firebaseapp.com",
  projectId: "notification-bd9b6",
  storageBucket: "notification-bd9b6.firebasestorage.app",
  messagingSenderId: "221321879828",
  appId: "1:221321879828:web:afac2cd46a874457142201",
  measurementId: "G-3WY6QD46HG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Request permission and get FCM token
export const requestNotificationPermission = async () => {
  try {
    const permission = Notification.permission;

    if (permission === "granted") {
      // Already granted, proceed to get token
      const currentToken = await getToken(messaging, {
        vapidKey:
          "BExGSWqki1abERb__WWV93F-gf6df7QErobbEq8l2Y4Vm3VQlhzwRolqvXje7R1M8ZhS-wPo4wYqTFFHkts-oVc",
      });
      console.log("FCM registration token:", currentToken);
      return currentToken;
    } else if (permission === "default") {
      // Ask for permission
      const result = await Notification.requestPermission();
      if (result === "granted") {
        const currentToken = await getToken(messaging, {
          vapidKey:
            "BExGSWqki1abERb__WWV93F-gf6df7QErobbEq8l2Y4Vm3VQlhzwRolqvXje7R1M8ZhS-wPo4wYqTFFHkts-oVc",
        });
        console.log("FCM registration token:", currentToken);
        return currentToken;
      } else {
        console.warn("Notification permission denied by the user.");
        return null;
      }
    } else if (permission === "denied") {
      console.warn("Notification permission has been blocked. Ask user to unblock in browser settings.");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
    return null;
  }
};


// Handle foreground messages
// export const onMessageListener = () => {
//   return new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log("Message received in foreground:", payload);
//       resolve(payload);
//     });
//   });
// };

// firebase.ts
export const onMessageListener = (callback: (payload: any) => void) => {
  onMessage(messaging, callback);
};
