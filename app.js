const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

// game handlers
const getGameStatus = require("./gameStartHandler");

app.route("/api/start").get(getGameStatus);

module.exports = app;
