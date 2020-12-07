const next = require("next");
const express = require("express");
const { urlencoded } = require("express");
const fs = require("fs");
const path = require("path");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const filePath = "./data.json";
const movieData = require(filePath);

app.prepare().then(() => {
  const server = express();
  server.use(express.json());
  server.get("/api/v1/movies", (req, res) => {
    res.json(movieData);
  });
  server.get("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;
    const movie = movieData.find((m) => m.id === id);
    res.json(movie);
  });
  server.post("/api/v1/movies", (req, res) => {
    const movie = req.body;
    movieData.push(movie);
    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(movieData, null, 2);
    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json("Movie has been successfully added.");
    });
  });
  server.patch("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;
    const movie = movieData.find((m) => m.id === id);
    res.json(movie);
  });
  server.delete("/api/v1/movies/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    const updatedMovieData = movieData.filter((movie) => movie.id !== id);

    const pathToFile = path.join(__dirname, filePath);
    const stringifiedData = JSON.stringify(updatedMovieData, null, 2);

    fs.writeFile(pathToFile, stringifiedData, (err) => {
      if (err) {
        return res.status(422).send(err);
      }
      return res.json("Movie successfully deleted.");
    });
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
