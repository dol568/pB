const http = require("http");

const app = http.createServer((req, res) => {
    const urlObject = new URL(`http://${req.headers.host}${req.url}`);
    const params = {};
    
    for (const [key, value] of urlObject.searchParams) {
      params[key] = value;
    }
  
    res.writeHead(200, { "Content-type": "application/json" });
    res.write(JSON.stringify(params));
    res.end();
  });

app.listen(4700, console.log("server started"));