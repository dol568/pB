const { logger, Response, HttpStatus, PORT } = require("./helper.js");
const ip = require("ip");
const express = require("express");
const app = express();
app.use(express.json());

let users = [
  {
    id: 1,
    firstName: "Adam",
    lastName: "adamek",
    email: "adam@adamek.abc",
  },
];

let posts = [];

// http://localhost:4700/users?firstName=Jan&lastName=janko&email=jan@nowak.abc
app.post("/users", (req, res) => {
  const { firstName, lastName, email } = req.query;

  logger.info(`${req.method} ${req.originalUrl}, Tworzenie nowego uzytkownika`);

  if (firstName === undefined || lastName === undefined || email === undefined) {
    res
      .status(HttpStatus.BAD_REQUEST.code)
      .send(
        new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `Niepoprawne lub brakujace parametry`)
      );
  } else {
    const newUser = { id: users.length + 1, firstName, lastName, email };
    users.push(newUser);
    res
      .status(HttpStatus.CREATED.code)
      .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Dodano nowego uzytkownika`, newUser));
  }
});

// http://localhost:4700/users
app.get("/users", (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, Pobieranie uzytkownikow`);

  if (users.length === 0) {
    res
      .status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Nie znaleziono uzytkownikow`));
  } else {
    res
      .status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Pobrano uzytkownikow`, users));
  }
});

// http://localhost:4700/users/1
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  logger.info(`${req.method} ${req.originalUrl}, Pobieranie uzytkownika o id '${id}'`);

  if (isNaN(id)) {
    res
      .status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `id powinno być liczbą`));
  } else {
    const foundUser = users.find((user) => user.id === id);

    if (foundUser) {
      res
        .status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Znaleziono uzytkownika`, foundUser));
    } else {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Nie znaleziono uzytkownika o id '${id}'`
          )
        );
    }
  }
});

// http://localhost:4700/users/1
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  logger.info(`${req.method} ${req.originalUrl}, Usuwanie uzytkownika o id '${id}'`);

  if (isNaN(id)) {
    res
      .status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `id powinno być liczbą`));
  } else {
    const foundUserIndex = users.findIndex((user) => user.id === id);

    if (foundUserIndex !== -1) {
      users.splice(foundUserIndex, 1);
      res
        .status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Usunieto uzytkownika o id '${id}'`));
    } else {
      res
        .status(HttpStatus.NOT_FOUND.code)
        .send(
          new Response(
            HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status,
            `Nie znaleziono uzytkownika o id '${id}'`
          )
        );
    }
  }
});

app.post("/posts", (req, res) => {
    const { title, body } = req.body;
  
    logger.info(`${req.method} ${req.originalUrl}, Tworzenie nowego postu`);
  
    if (title === undefined || body === undefined) {
      res
        .status(HttpStatus.BAD_REQUEST.code)
        .send(
          new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `Niepoprawne lub brakujace dane`)
        );
    } else {
      const newPost = { id: posts.length + 1, title, body };
      posts.push(newPost);
      res
        .status(HttpStatus.CREATED.code)
        .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Dodano nowy post`, newPost));
    }
  });

  app.get("/posts", (req, res) => {
    logger.info(`${req.method} ${req.originalUrl}, Pobieranie postow`);
  
    if (posts.length === 0) {
      res
        .status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Nie znaleziono postow`));
    } else {
      res
        .status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Pobrano posty`, posts));
    }
  });

  app.get("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
  
    logger.info(`${req.method} ${req.originalUrl}, Pobieranie postu o id '${id}'`);
  
    if (isNaN(id)) {
      res
        .status(HttpStatus.BAD_REQUEST.code)
        .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `id powinno być liczbą`));
    } else {
      const foundPost = posts.find((post) => post.id === id);
  
      if (foundPost) {
        res
          .status(HttpStatus.OK.code)
          .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Znaleziono post`, foundPost));
      } else {
        res
          .status(HttpStatus.NOT_FOUND.code)
          .send(
            new Response(
              HttpStatus.NOT_FOUND.code,
              HttpStatus.NOT_FOUND.status,
              `Nie znaleziono postu o id '${id}'`
            )
          );
      }
    }
  });

  app.delete("/posts/:id", (req, res) => {
    const id = Number(req.params.id);
  
    logger.info(`${req.method} ${req.originalUrl}, Usuwanie postu o id '${id}'`);
  
    if (isNaN(id)) {
      res
        .status(HttpStatus.BAD_REQUEST.code)
        .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `id powinno być liczbą`));
    } else {
      const foundPostIndex = posts.findIndex((post) => post.id === id);
  
      if (foundPostIndex !== -1) {
        posts.splice(foundPostIndex, 1);
        res
          .status(HttpStatus.OK.code)
          .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Usunieto post o id '${id}'`));
      } else {
        res
          .status(HttpStatus.NOT_FOUND.code)
          .send(
            new Response(
              HttpStatus.NOT_FOUND.code,
              HttpStatus.NOT_FOUND.status,
              `Nie znaleziono postu o id '${id}'`
            )
          );
      }
    }
  });

app.get("/", (req, res) => {
  res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `API dziala`));
});

app.all("*", (req, res) => {
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Nie znaleniono sciezki na serwerze`));
});

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));
