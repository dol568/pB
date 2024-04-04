const { logger, Response, HttpStatus, PORT } = require("./helper.js");
const ip = require("ip");
const express = require("express");
const app = express();

app.get("/mnozenie/:a/:b", (req, res) => {
  a = Number(req.params.a);
  b = Number(req.params.b);

  logger.info(`${req.method} ${req.originalUrl}, Obliczanie mnozenia ${a} x ${b}`);

  if (isNaN(a) || isNaN(b)) {
    res
      .status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "parametry powinny być liczbami"));
  } else {
    const result = a * b;
    res
      .status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Wynik mnozenia = ${result}`));
  }
});

app.get("/dzielenie/:a/:b", (req, res) => {
    a = Number(req.params.a);
    b = Number(req.params.b);

  logger.info(`${req.method} ${req.originalUrl}, Obliczanie dzielenia ${a} przez ${b}`);

  if (isNaN(a) || isNaN(b)) {
    res
      .status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "parametry powinny być liczbami"));
  } else if (b === "0") {
    res
      .status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "nie mozna dzielic przez zero"));
  } else {
    const result = a / b;
    res
      .status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Wynik dzielenia = ${result}`));
  }
});

app.get("/dodawanie/:a/:b", (req, res) => {
    a = Number(req.params.a);
    b = Number(req.params.b);

  logger.info(`${req.method} ${req.originalUrl}, Obliczanie dodawania ${a} + ${b}`);

  if (isNaN(a) || isNaN(b)) {
    res
      .status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "parametry powinny być liczbami"));
  } else {
    const result = a + b;
    res
      .status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Wynik dodawania = ${result}`));
  }
});

app.get("/odejmowanie/:a/:b", (req, res) => {
    a = Number(req.params.a);
    b = Number(req.params.b);

  logger.info(`${req.method} ${req.originalUrl}, Obliczanie odejmowania ${a} - ${b}`);

  if (isNaN(a) || isNaN(b)) {
    res
      .status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, "parametry powinny być liczbami"));
  } else {
    const result = a - b;
    res
      .status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Wynik odejmowania = ${result}`));
  }
});

app.get("/", (req, res) => {
  res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `API dziala`));
});

app.get("*", (req, res) => {
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Nie znaleniono sciezki na serwerze`));
});

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));
