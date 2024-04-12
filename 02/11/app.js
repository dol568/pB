const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();
const router = express.Router();

const errorLog = "error.log";
const usersAPI = "https://jsonplaceholder.typicode.com/users";

app.use(express.json());

const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};

const saveErrorToFile = (err, req, res, next) => {
  const timestamp = new Date().toISOString();
  const errorMessage = `Error occured at ${timestamp} : ${err.message}`;
  fs.appendFile(errorLog, errorMessage + "\n", "utf-8", (error) => {
    if (error) {
      next(error);
    } else {
      next(err);
    }
  });
};

const errorHandler = (err, req, res, next) => {
  res.status(err.status).send(err.message);
};

const getUserById = (req, res, next) => {
  return axios
    .get(`${usersAPI}/${req.params.userId}`)
    .then((response) => res.json(response.data))
    .catch((err) => {
      if (err.response) {
        let error;
        if (err.response.status === 404) {
          error = new Error("User not found");
          error.status = err.response.status;
        } else if (err.response.status === 500) {
          error = new Error("Internal server error");
          error.status = err.response.status;
        } else {
          error = err;
          error.status = err.response.status;
        }
        next(error);
      }
    });
};

router.get("/:userId", getUserById);

app.use("/users", router);

app.all("*", (req, res) => {
  res.status(404).send("Not found");
});

app.use(logErrors);
app.use(saveErrorToFile);
app.use(errorHandler);

app.listen(4700, console.log("server started"));
