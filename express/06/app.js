const { logger, Response, HttpStatus, PORT } = require("./helper");
const { createUser, getUsers, getUser, deleteUser } = require("./user.controller");
const { createPost, getPosts, getPost, deletePost } = require("./post.controller");

const ip = require("ip");
const express = require("express");
const app = express();
app.use(express.json());

const userRoutes = express.Router();
userRoutes.route("/").get(getUsers).post(createUser);
userRoutes.route("/:id").get(getUser).delete(deleteUser);

const postRoutes = express.Router();
postRoutes.route("/").get(getPosts).post(createPost);
postRoutes.route("/:id").get(getPost).delete(deletePost);

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.get("/", (req, res) => {
  res.status(HttpStatus.OK.code).send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, `API dziala`));
});

app.all("*", (req, res) => {
  res
    .status(HttpStatus.NOT_FOUND.code)
    .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, `Nie znaleniono sciezki na serwerze`));
});

app.listen(PORT, () => logger.info(`Server running on: ${ip.address()}:${PORT}`));
