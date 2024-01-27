const payloadFromSubscription = function (subscription) {
  var key = subscription.getKey ? subscription.getKey("p256dh") : "";
  var auth = subscription.getKey ? subscription.getKey("auth") : "";
  // NOTE: p256dg and auth are encoded into std base64, NOT urlsafe base64
  return {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: key
        ? btoa(String.fromCharCode.apply(null, new Uint8Array(key)))
        : "",
      auth: auth
        ? btoa(String.fromCharCode.apply(null, new Uint8Array(auth)))
        : "",
    },
  };
};

const urlB64ToUint8Array = function (base64String) {
  try {
    const normalizedBase64 = base64String.replace(/-/g, '+').replace(/_/g, '/');
    const paddedBase64 = normalizedBase64 + '=='.substring(0, (4 - normalizedBase64.length % 4) % 4);


    const rawData = window.atob(paddedBase64);

    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  } catch (error) {
    console.error("Error decoding base64 string:", error);
    throw error;
  }
};

exports.payloadFromSubscription = payloadFromSubscription;
exports.urlB64ToUint8Array = urlB64ToUint8Array;
