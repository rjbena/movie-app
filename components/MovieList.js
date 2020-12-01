import { useState } from "react";

import Movie from "../components/Movie";

const MovieList = ({ movies }) => {
  return (
    <div>
      <div className="row">
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
