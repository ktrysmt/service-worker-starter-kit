function sendMessage (message) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel()
    channel.port1.onmessage = function (e) {
      if (e.data.error) {
        reject(e.data.error)
      } else {
        resolve(e.data)
      }
    }

    navigator.serviceWorker.controller.postMessage(message, [channel.port2])
  })
}

function dispatch() {
  const submit = document.getElementById('button')
  submit.addEventListener('click', () => {
    sendMessage({
      text: "hello world!"
    }).then(data => {
      console.log("[main.js] MESSAGE(recieved worker data).", data);
    }).catch(error => {
      console.log(error)
    })
  })
}

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js').then(_ => {
    if (navigator.serviceWorker.controller) {
      return navigator.serviceWorker.controller
    }
    return new Promise(function (resolve) {
      navigator.serviceWorker.addEventListener('controllerchange', resolve)
    })
  })
    .then(dispatch)
    .catch(error => {
    console.log(error)
  })
}

