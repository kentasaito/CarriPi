self.addEventListener("install", (event) => {
  event.waitUntil();
});

self.addEventListener("fetch", (event) => {
  event.respondWith();
});

self.addEventListener("message", (event) => {
  self.registration.showNotification(event.data, {
    icon: "/static/img/CarriPi-mini.svg",
  });
});
