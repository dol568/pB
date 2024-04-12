const http = require("http");

let users = [
  {
    id: 1,
    name: "Jan",
    username: "Nowak",
    email: "jannowak@gmail.com",
  },
];

const showUser = (searchParams, res) => {
  if (searchParams.has("id")) {
    const id = Number(searchParams.get("id"));
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
};

const addUser = (searchParams, res) => {
  let name = searchParams.get("name");
  let username = searchParams.get("username");
  let email = searchParams.get("email");

  if (name && username && email) {
    const userIds = users.map((u) => u.id);
    const maxUserId = Math.max(...userIds);

    const newUser = {
      id: maxUserId + 1,
      name: name,
      username: username,
      email: email,
    };
    users.push(newUser);
    res.writeHead(201, { "Content-type": "application/json" });
    res.write(JSON.stringify({ message: "dodano nowego uzytkownika", id: newUser.id }));
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.write(JSON.stringify({ message: "niepoprawne parametry" }));
  }
};

const deleteUser = (searchParams, res) => {
  if (searchParams.has("id")) {
    const id = Number(searchParams.get("id"));
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
    res.writeHead(400, { "Content-type": "application/json" });
    res.write({ message: "brak parametru id" });
  }
};

const app = http.createServer((req, res) => {
  const urlObject = new URL(`http://${req.headers.host}${req.url}`);

  if (req.method === "GET" && urlObject.pathname === "/show") {
    showUser(urlObject.searchParams, res);
  } else if (req.method === "POST" && urlObject.pathname === "/add") {
    addUser(urlObject.searchParams, res);
  } else if (req.method === "DELETE" && urlObject.pathname === "/delete") {
    deleteUser(urlObject.searchParams, res);
  } else if (urlObject.pathname === "/show" || urlObject.pathname === "/add" || urlObject.pathname === "/delete") {
    res.writeHead(405);
    res.write("Method not allowed");
  } else {
    res.writeHead(404);
    res.write("Not found");
  }

  res.end();
});

app.listen(4700, console.log("server started"));
