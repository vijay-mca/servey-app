const http = require("http");
const https = require("https");
const express = require("express");

const app = express();

// form configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db configuration
require("./db/connection");

// cors configuration
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// router configuration
const serveyRouter = require("./router/servey");

app.use("/api/v1/servey", serveyRouter);

// express configuration here

const httpServer = http.createServer(app);
const httpsServer = https.createServer(app);

// For http
const HTTP_PORT = process.env.HTTP_PORT || 8080;
httpServer.listen(HTTP_PORT, () =>
  console.log(`http server running on ${HTTP_PORT}`)
);

// For https
const HTTPS_PORT = process.env.HTTPs_PORT || 8443;
httpsServer.listen(HTTPS_PORT, () =>
  console.log(`https server running on ${HTTPS_PORT}`)
);
