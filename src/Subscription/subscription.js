import API from "../utils/API"
const convertedVapidKey = urlBase64ToUint8Array("BAX3nx0YNmw-kBgLdDQEWaxfyf_CJd9UcpIAM6XoBn6hMM6w2FqGefBROJ1fFLpNEtvXawaODqttHb_Pv2_GAZk")

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

function sendSubscription(subscription, data) {
  return API.post('/notifications/subscribe',{
    subscription:subscription,
    title: data.title,
    text: data.text,
    image: data.logoName,
    tag: data.tag,
    url: data.url
  })
}
//conditional render
let clicked = true

export function subscribeUser(data) {
  if(clicked) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function(registration) {
      if (!registration.pushManager) {
        console.log('Push manager unavailable.')
        return
      }

      registration.pushManager.getSubscription().then(function(existedSubscription) {
        if (existedSubscription === null) {
          console.log('No subscription detected, make a request.')
          registration.pushManager.subscribe({
            applicationServerKey: convertedVapidKey,
            userVisibleOnly: true,
          }).then(function(newSubscription) {
            console.log('New subscription added.',newSubscription)
            sendSubscription(newSubscription, data)
          }).catch(function(e) {
            if (Notification.permission !== 'granted') {
              console.log('Permission was not granted.')
            } else {
              console.error('An error ocurred during the subscription process.', e)
            }
          })
        } else {
          console.log('Existed subscription detected.')
          sendSubscription(existedSubscription, data)
        }
      })
    })
      .catch(function(e) {
        console.error('An error ocurred during Service Worker registration.', e)
      })
  }
}else{
console.log('Can not reachable to the service worker');
}}