import React, { useEffect, useState } from "react";
import Home from "./Home";
import About from "./About";
import Users from "./Users";
import { messaging } from "./firebase";
import "./App.css";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getToken } from "firebase/messaging";

import WebPush from "./WebPush";
import { payloadFromSubscription } from "./Utility";

const applicationServerPublicKey =
  "BFsaZrBJbJ_nKIutcE-aVqd_CI8HT00ZczCf-PPMlPVOe91AYx1Wv0MxYDyvjIvJPpUeBhfmPzmkbhH9G8V64-Y";
const App = () => {
  const [subscriveUserEnabled, setSubscribeUserEnabled] = useState(false);
  const [subscription, setSubscription] = useState({ endpoint: "" });

  const onWebPushToggle = () => {
    setSubscribeUserEnabled(!subscriveUserEnabled);
  };

  const onUpdateSubscriptionOnServer = (newSubscription) => {
    console.log("onUpdateSubscriptionOnServer:", newSubscription);
    const payload = payloadFromSubscription(newSubscription);
    console.log("payload:", JSON.stringify(payload));
    setSubscription(newSubscription);
  };

  const onSubscriptionFailed = (error) => {
    console.log("onSubscriptionFailed:", error);
  };

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BFsaZrBJbJ_nKIutcE-aVqd_CI8HT00ZczCf-PPMlPVOe91AYx1Wv0MxYDyvjIvJPpUeBhfmPzmkbhH9G8V64-Y",
      });
      console.log("Token Gen", token);
      // Send this token  to server ( db)
    } else if (permission === "denied") {
      alert("You denied for the notification");
    }
  }

  useEffect(() => {
    // Req user for notification permission
    requestPermission();
  }, []);
  return (
    <BrowserRouter>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/about"}>About</Link>
        <Link to={"/users"}>Users</Link>
      </div>
      <WebPush
        subscriveUserEnabled={subscriveUserEnabled}
        applicationServerPublicKey={applicationServerPublicKey}
        onSubscriptionFailed={onSubscriptionFailed}
        onUpdateSubscriptionOnServer={onUpdateSubscriptionOnServer}
      />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
    // <div></div>
  );
};

export default App;
