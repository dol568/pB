const http = require("http");

let users = [
  {
    id: 1,
    name: "Jan",
    username: "Nowak",
    email: "jannowak@gmail.com",
  },
];

const app = http.createServer((req, res) => {
  const urlObject = new URL(`http://${req.headers.host}${req.url}`);

  if (req.method === "GET") {
    if (urlObject.pathname === "/show") {
      if (urlObject.searchParams.has("id")) {
        const id = Number(urlObject.searchParams.get("id"));
        if (isNaN(id)) {
          res.writeHead(400, { "Content-type": "application/json" });
          res.write(JSON.stringify({ message: "id powinno być liczbą" }));
        } else {
          const foundUser = users.find((user) => user.id === id);
          if (foundUser) {
            res.writeHead(200, { "Content-type": "application/json" });
            res.write(JSON.stringify(foundUser));
          } else {
            res.writeHead(404, { "Content-type": "application/json" });
            res.write(JSON.stringify({ message: "uzytkownik o podanym id nie istnieje" }));
          }
        }
      } else {
        res.writeHead(200, { "Content-type": "application/json" });
        res.write(JSON.stringify(users));
      }
    }
  } else if (req.method === "POST") {
    if (urlObject.pathname === "/add") {
      if (
        urlObject.searchParams.has("name") &&
        urlObject.searchParams.has("username") &&
        urlObject.searchParams.has("email")
      ) {
        const newUser = {
          id: users.length + 1,
          name: urlObject.searchParams.get("name"),
          username: urlObject.searchParams.get("username"),
          email: urlObject.searchParams.get("email"),
        };
        users.push(newUser);
        res.writeHead(201, { "Content-type": "application/json" });
        res.write(JSON.stringify({ message: "dodano nowego uzytkownika", id: newUser.id }));
      } else {
        res.writeHead(400, { "Content-type": "application/json" });
        res.write(JSON.stringify({ message: "niepoprawne parametry" }));
      }
    }
  } else if (req.method === "DELETE") {
    if (urlObject.pathname === "/delete") {
      if (urlObject.searchParams.has("id")) {
        const id = Number(urlObject.searchParams.get("id"));
        if (isNaN(id)) {
          res.writeHead(400, { "Content-type": "application/json" });
          res.write(JSON.stringify({ message: "id powinno być liczbą" }));
        } else {
          const foundUserIndex = users.findIndex((user) => user.id === id);
          if (foundUserIndex !== -1) {
            users.splice(foundUserIndex, 1);
            res.writeHead(200, { "Content-type": "application/json" });
            res.write(JSON.stringify({ message: `usunieto uzykownika o id '${id}'` }));
          } else {
            res.writeHead(404, { "Content-type": "application/json" });
            res.write(JSON.stringify({ message: "uzytkownik o podanym id nie istnieje" }));
          }
        }
      } else {
        res.writeHead(200, { "Content-type": "application/json" });
        res.write(JSON.stringify(users));
      }
    }
  }
  res.end();
});

app.listen(4700, console.log("server started"));
