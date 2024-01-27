importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyB5xK8GVMp5Kq9I1kEAVabiSHry3ShAIgY",
  authDomain: "notifi-29a87.firebaseapp.com",
  projectId: "notifi-29a87",
  storageBucket: "notifi-29a87.appspot.com",
  messagingSenderId: "415869179269",
  appId: "1:415869179269:web:8b54847bc7115693cf60ec",
  measurementId: "G-QLBNRND78S",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
