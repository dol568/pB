const http = require("http");

const app = http.createServer((req, res) => {
  const urlObject = new URL(`http://${req.headers.host}${req.url}`);

  if (urlObject.searchParams.has("a") && urlObject.searchParams.has("b")) {
    const a = Number(urlObject.searchParams.get("a"));
    const b = Number(urlObject.searchParams.get("b"));

    if (isNaN(a) || isNaN(b)) {
      badRequestResponse(res, "parametry powinny być liczbami");
    } else {
      if (urlObject.pathname === "/mnozenie") {
        const result = a * b;
        successResponse(res, result);
      } else if (urlObject.pathname === "/dzielenie") {
        if (b === 0) {
          badRequestResponse(res, "nie mozna dzielic przez zero");
        } else {
          const result = a / b;
          successResponse(res, result);
        }
      } else if (urlObject.pathname === "/dodawanie") {
        const result = a + b;
        successResponse(res, result);
      } else if (urlObject.pathname === "/odejmowanie") {
        const result = a - b;
        successResponse(res, result);
      }
    }
  } else {
    badRequestResponse(res, "niepoprawna ilosc parametrow");
  }
  res.end();
});

successResponse = (res, result) => {
  res.writeHead(200, { "Content-type": "text/plain" });
  res.write(`Wynik = ${result}`);
};

badRequestResponse = (res, message) => {
  res.writeHead(400, { "Content-type": "text/plain" });
  res.write(message);
};

app.listen(4700, console.log("server started"));
