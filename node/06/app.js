const http = require("http");

const app = http.createServer((req, res) => {
  const urlObject = new URL(`http://${req.headers.host}${req.url}`);

  if (urlObject.searchParams.has("a") && urlObject.searchParams.has("b")) {
    const a = Number(urlObject.searchParams.get("a"));
    const b = Number(urlObject.searchParams.get("b"));

    if (isNaN(a) || isNaN(b)) {
      res.writeHead(400, { "Content-type": "text/plain" });
      res.write("parametry powinny być liczbami");
    } else {
      const result = a * b;
      res.writeHead(200, { "Content-type": "text/plain" });
      res.write(`Wynik mnozenia = ${result}`);
    }
  } else {
    res.writeHead(400, { "Content-type": "text/plain" });
    res.write("niepoprawna ilosc parametrow");
  }
  res.end();
});

app.listen(4700, console.log("server started"));
