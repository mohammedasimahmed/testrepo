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
  const onSubscribeUser = () => {
    if (swRegistration == null) {
      return;
    }

    navigator.serviceWorker.ready.then((serviceWorkerReg) => {
      serviceWorkerReg.pushManager.getSubscription().then((subscription) => {
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
          serviceWorkerReg.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: applicationServerKey,
            })
            .then((subscription) => {
              console.log("User is subscribed.");
              if (onUpdateSubscriptionOnServer) {
                onUpdateSubscriptionOnServer(subscription);
              }
            })
            .catch((err) => {
              console.log("Failed to subscribe the user: ", err);
              if (onSubscribeFailed) {
                onSubscribeFailed(err);
              }
            }
            );
        }
      });
    });
  };


  const onRegisterServiceWorker = () => {
    navigator.serviceWorker
      .register("firebase-messaging-sw.js")
      .then((swReg) => {
        console.log("Service Worker is registered", swReg);
        swRegistration = swReg;
        onSubscribeUser();
      });
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
