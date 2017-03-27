if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js').then(_ => {
    if (navigator.serviceWorker.controller) {
      return navigator.serviceWorker.controller
    }
    return new Promise(function (resolve) {
      navigator.serviceWorker.addEventListener('controllerchange', resolve)
    })
  })
    .catch(error => {
    console.log(error)
  })
}

