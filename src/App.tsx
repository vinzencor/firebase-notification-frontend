import React, { useState, useEffect } from "react";
import NotificationButton from "./components/NotificationButton";
import NotificationForm from "./components/NotificationForm";
import { onMessageListener } from "./services/firebase";

const App: React.FC = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  // useEffect(() => {
  //   onMessageListener().then((payload: any) => {
  //     setNotification(payload);

  //     if (payload.notification) {
  //       const { title, body } = payload.notification;
  //       new Notification(title, {
  //         body,
  //         icon: '/favicon.ico',
  //       });
  //     }
  //   });
  // }, []);
  useEffect(() => {
    onMessageListener((payload: any) => {
      console.log("Foreground message received:", payload);
      setNotification(payload);
  
      if (payload.notification) {
        const { title, body } = payload.notification;
        new Notification(title, {
          body,
          icon: '/favicon.ico',
        });
      }
    });
  }, []);
  

  const handleTokenReceived = (token: string) => {
    setFcmToken(token);
    // You might want to save this token to your backend or local storage
    localStorage.setItem("fcmToken", token);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Firebase Push Notifications Demo</h1>

      <div style={{ marginBottom: "20px" }}>
        <NotificationButton onTokenReceived={handleTokenReceived} />
      </div>

      {fcmToken && (
        <div style={{ marginBottom: "20px" }}>
          <h3>Your FCM Token:</h3>
          <div
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "4px",
              wordBreak: "break-all",
              fontSize: "12px",
              fontFamily: "monospace",
            }}
          >
            {fcmToken}
          </div>
        </div>
      )}

      <NotificationForm fcmToken={fcmToken} />

      {notification && (
        <div style={{ marginTop: "20px" }}>
          <h3>Last Received Notification:</h3>
          <div
            style={{
              backgroundColor: "#e3f2fd",
              padding: "10px",
              borderRadius: "4px",
            }}
          >
            <h4>{notification.notification?.title || "No title"}</h4>
            <p>{notification.notification?.body || "No message"}</p>
            {notification.data && (
              <pre>{JSON.stringify(notification.data, null, 2)}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
