import { Server } from "../Server.js";

function cartridgeCard(cartridge) {
  return `
    <div class="col">
      <a href="/cartridge/${cartridge.cartridgeId}">
        <img
          src="https://raw.githubusercontent.com/${cartridge.userId}/${cartridge.cartridgeId}/main/thumbnail.png"
          class="img-fluid"
        />
        <h3 class="text-body-emphasis">
          ${cartridge.cartridgeName}
        </h3>
        <a href="/user/${cartridge.userId}">${cartridge.userId}</a>
      </a>
    </div>
  `;
}

export default (data) => {
  return `
    <div class="container">
      <div class="px-4 py-5 my-5 text-center">
        <img class="d-block mx-auto img-fluid" src="/static/img/CarriPi-rectangle.svg" height="320">
        <h1 class="display-5 fw-bold text-body-emphasis">Talk in peace</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">CarriPi（キャリピ）は軽量インスタントメッセンジャーです。</p>
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button class="btn btn-primary btn-lg px-4 gap-3" id="requestPermission">requestPermission</button>
            <button class="btn btn-secondary btn-lg px-4 gap-3" id="postMessage">postMessage</button>
          </div>
        </div>
      </div>
    </div>

    <script type="module">
      navigator.serviceWorker.register('/sw.js');

      document.getElementById('requestPermission').addEventListener('click', async () => {
        await Notification.requestPermission();
      });

      document.getElementById('postMessage').addEventListener('click', () => {
        navigator.serviceWorker.ready.then(registration => {
          setTimeout(() => {
            registration.active.postMessage('hello!!!');
          }, 0);
        });
      });
    </script>
  `;
};
