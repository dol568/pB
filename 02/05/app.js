const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const router = express.Router();

const fileName = "data.txt";

const forbiddenWords = ["piwo", "hazard", "cukierki"];

app.use(bodyParser.text());
app.use(express.static("./"));
app.use(express.json());

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
};

const saveToFile = (text, req, res) => {
  fs.appendFile(fileName, text + "\n", "utf-8", (err) => {
    if (err) {
      next(err);
    } else {
      res.send("ok");
    }
  });
};

// http://localhost:4700
// POST: ala ma cukierki
router.post("/", (req, res) => {
  const hasForbiddenWord = forbiddenWords.some((word) => req.body.includes(word));

  if (hasForbiddenWord) {
    res.status(400).send("forbidden word");
  } else {
    saveToFile(req.body, req, res);
  }
});

// GET: http://localhost:4700/forbiddenWords
router.get("/forbiddenWords", (req, res) => {
  res.json(forbiddenWords);
});

// GET: http://localhost:4700/data.txt
router.get("/:filename", (req, res) => {
    res.send(`file ${req.params.filename} does not exists`);
});

app.use("/", router);

app.all("*", (req, res) => {
  res.status(404).send("Not found");
});

app.use(errorHandler);

app.listen(4700, console.log("server started"));
