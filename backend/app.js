const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const { BigPromise } = require("./utils/BigPromise.js");
const {
  errorLogger,
  errorResponder,
  invalidPathHandler,
} = require("./middlewares/error-handlers");

// route imports
const routes = require("./routes/routes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.static("../frontend/index.html"));

app.use(morgan("tiny"));
// app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// root route to deliver the react bundle
app.get("/", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
});

// routes of the application goes here
app.use("/app", routes);

// fallback route
app.get("*", (req, res) => {
  // console.log(path.resolve(__dirname, "./public/index.html"));
  res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
});

// error handler middlewares
app.use(errorLogger);
app.use(errorResponder);
app.use(invalidPathHandler);

module.exports = app;
