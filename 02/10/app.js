const express = require("express");
const app = express();
const fs = require("fs");

const logFile = "data.log";

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
};

const requestTime = (req, res, next) => {
  let requestTime = new Date().toISOString();
  fs.appendFile(logFile, `Request time: ${requestTime}\n`, "utf-8", (err) => {
    if (err) {
      next(err);
    } else {
      next();
    }
  });
};

const responseTime = (req, res, next) => {
  let responseTime = new Date().toISOString();
  fs.appendFile(logFile, `Response time: ${responseTime}\n`, "utf-8", (err) => {
    if (err) {
      next(err);
    }
  });
};

app.use(requestTime);

app.get("*", (req, res, next) => {
  res.send("Hello World");
  next();
});

app.use(responseTime);

app.use(errorHandler);

app.listen(4700, console.log("start server"));
