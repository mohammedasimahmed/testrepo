import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { urlB64ToUint8Array } from "./Utility";

let swRegistration = null;

const WebPush = ({
  subscriveUserEnabled,
  applicationServerPublicKey,
  onUpdateSubscriptionOnServer,
  onSubscribeFailed,
}) => {
  const onSubscribeUser = async () => {
    if (swRegistration == null) {
      return;
    }
    const readyServiceWorker = await navigator.serviceWorker.ready;
    console.log("readyServiceWorker", readyServiceWorker);
    readyServiceWorker.pushManager
      .getSubscription()
      .then(async (subscription) => {
        const isSubscribed = !(subscription === null);
        if (isSubscribed) {
          onUpdateSubscriptionOnServer(subscription);
          console.log("subscribe");
        } else {
          const applicationServerKey = urlB64ToUint8Array(
            "BJ6HHwwCBTSBsm7xvX3x_5k5lDpMpmwLKksLGeN1k9oUBW9ohRdsO7-VwXmimx9U3yvN6a6nmQ1lmwWeLRbTHgU"
          );
          // console.log("key", applicationServerKey);
          console.log("key ", applicationServerKey);
          // console.log("swReg",serviceWorkerReg)
          try {
            const subscription = await readyServiceWorker.pushManager.subscribe(
              {
                userVisibleOnly: true,
                applicationServerKey: applicationServerKey,
              }
            );
            console.log("User is subscribed.");
            if (onUpdateSubscriptionOnServer) {
              onUpdateSubscriptionOnServer(subscription);
            }
          } catch (err) {
            console.log("Failed to subscribe the user: ", err);
            if (onSubscribeFailed) {
              onSubscribeFailed(err);
            }
          }
        }
      });
  };

  const onRegisterServiceWorker = async () => {
    try {
      const swReg = await navigator.serviceWorker.register(
        "firebase-messaging-sw.js"
      );

      if (swReg.active) {
        swRegistration = swReg;
        onSubscribeUser();

        // console.log('Service worker active');
      } else {
        console.log("not active");
      }

      console.log("Service Worker is registered", swReg);
    } catch (error) {
      console.log("service worker not registered", error);
    }
  };

  useEffect(() => {
    
    if (swRegistration === null) {
      onRegisterServiceWorker();
    }
  }, []);

  // useEffect(() => {
  //   if (subscriveUserEnabled) {
  //     onSubscribeUser();
  //   }
  // }, [subscriveUserEnabled]);

  return <div></div>;
};

WebPush.propTypes = {
  subscriveUserEnabled: PropTypes.bool.isRequired,
  applicationServerPublicKey: PropTypes.string.isRequired,
  onUpdateSubscriptionOnServer: PropTypes.func,
  onSubscribeFailed: PropTypes.func,
};

export default WebPush;
