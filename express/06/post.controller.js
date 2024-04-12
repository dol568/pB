const { logger, Response, HttpStatus } = require("./helper.js");

let posts = [];

const createPost = (req, res) => {
  const { title, body } = req.body;

  logger.info(`${req.method} ${req.originalUrl}, Tworzenie nowego postu`);

  if (title === undefined || body === undefined) {
    res
      .status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code, HttpStatus.BAD_REQUEST.status, `Niepoprawne lub brakujace dane`));
  } else {
    let postIds = posts.map(u => u.id);
    let maxPostId = Math.max(...postIds);
    let newPostId = maxPostId + 1;

    const newPost = { id: newPostId, title, body };
    posts.push(newPost);
    res
      .status(HttpStatus.CREATED.code)
      .send(new Response(HttpStatus.CREATED.code, HttpStatus.CREATED.status, `Dodano nowy post`, newPost));
  }
};

const getPosts = (req, res) => {
  logger.info(`${req.method} ${req.originalUrl}, Pobieranie postow`);

  if (posts.length === 0) {
    res
      .status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Nie znaleziono postow`));
  } else {
    res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `Pobrano posty`, posts));
  }
};

const getPost = (req, res) => {
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
          new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Nie znaleziono postu o id '${id}'`)
        );
    }
  }
};

const deletePost = (req, res) => {
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
          new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Nie znaleziono postu o id '${id}'`)
        );
    }
  }
};

module.exports = { createPost, getPosts, getPost, deletePost };
