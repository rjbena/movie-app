const next = require("next");
const express = require("express");
const { urlencoded } = require("express");

const movieData = require("./data.json");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.get("/api/v1/movies", (req, res) => {
    res.json(movieData);
  });
  server.post("/api/v1/movies", (req, res) => {
    const movie = req.body;

    res.json(movie);
  });
  server.patch("/api/v1/movies/:id", (req, res) => {
    res.json({ message: `Updating post of id ${req.params.id}` });
  });
  server.delete("/api/v1/movies/:id", (req, res) => {
    res.json({ message: `Deleting post of id ${req.params.id}` });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log("> Ready on port " + PORT);
  });
});
