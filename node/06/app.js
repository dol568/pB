const http = require("http");

const app = http.createServer((req, res) => {
  let body = '';
  let statusCode;
  const urlObject = new URL(`http://${req.headers.host}${req.url}`);

  if (urlObject.searchParams.has("a") && urlObject.searchParams.has("b")) {
    const a = Number(urlObject.searchParams.get("a"));
    const b = Number(urlObject.searchParams.get("b"));

    if (isNaN(a) || isNaN(b)) {
      body = "parametry powinny być liczbami";
      statusCode = 400;
    } else {
      const result = a * b;
      body = `Wynik mnozenia = ${result}`;
      statusCode = 200;
    }
  } else {
    body = "niepoprawna ilosc parametrow";
    statusCode = 400;
  }
  res.writeHead(statusCode, {'Content-type' : 'text/plain;charset=utf-8'})
  res.write(body);
  res.end();
});

app.listen(4700, console.log("server started"));
