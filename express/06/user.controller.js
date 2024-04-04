const { logger, Response, HttpStatus } = require("./helper.js");

let users = [
  {
    id: 1,
    firstName: "Adam",
    lastName: "adamek",
    email: "adam@adamek.abc",
  },
];

const createUser = (req, res) => {
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
};

const getUsers = (req, res) => {
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
};

const getUser = (req, res) => {
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
};

const deleteUser = (req, res) => {
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
};

module.exports = { createUser, getUsers, getUser, deleteUser };
