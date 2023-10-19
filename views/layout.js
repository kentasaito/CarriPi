import { Server } from "../Server.js";

function header() {
  return `
    <div class="position-sticky top-0 start-0 w-100 bg-light">
      <div class="container d-flex gap-3 align-items-center">
      
      <div class="d-flex align-items-center">
        <img src="/static/img/CarriPi-mini.svg" class="me-2" style="width:32px; height:32px;">
        <a href="/" class="link-body-emphasis link-underline-opacity-0"><h1>CarriPi</h1></a>
      </div>
      
      <div class="overflow-scroll flex-grow-1 text-end">
        <div class="text-nowrap overflow-scroll">
          <a href="/documentation/welcome/" class="link-body-emphasis link-underline-opacity-25 link-underline-opacity-75-hover">Documentation</a>
        </div>
      </div>
      
      <a href="/login" class="link-dark link-underline-opacity-25 link-underline-opacity-100-hover">Login</a>
      </div>
    </div>
  `;
}

export default async (data, childPath) => {
  return `
    <!doctype html>
    <html lang="ja">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>CarriPi</title>

<link rel="manifest" href="/static/manifest.json">

        <link rel="icon" href="/static/img/CarriPi-mini.svg" />
        <link rel="stylesheet" href="/static/bootstrap/bootstrap.min.css">
        <style>
          blockquote {
            background-color: #eee;
            padding: 8px;
          }
        </style>
      </head>
      <body>
        ${header()}
        <div class="mt-4">
          ${await Server.loadView(childPath, data)}
        </div>
        <script src="/static/bootstrap/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  `;
};
