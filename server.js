const express = require("express");
const next = require("next");
const fs = require("fs");
const path = require("path");
const https = require("https");
const cookieParser = require("cookie-parser");

const dev = process.env.NDE_ENV !== "production";
const ports = {
  http: parseInt(process.env.HTTP_PORT, 10) || 3000,
  https: parseInt(process.env.HTTPS_PORT, 10) || 3443,
};

const app = next({ dev });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(cookieParser());

  server.all("*", (req, res) => handler(req, res));

  server.listen(ports.http, () => {
    console.log(`>>> Ready on: http://localhost:${ports.http}`);
  });

  if (process.env.NODE_ENV === "development") {
    const httpsOptions = {
      cert: fs.readFileSync(path.join(__dirname, "./.cert/server.crt")),
      key: fs.readFileSync(path.join(__dirname, "./.cert/server.key")),
    };
    https.createServer(httpsOptions, server).listen(ports.https, () => {
      console.log(`>>> Ready on: https://localhost:${ports.https}`);
    });
  }
});
