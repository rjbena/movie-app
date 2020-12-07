import { useRouter } from "next/router";

import { getMovieById, getMovies, deleteMovie } from "../../../actions";

const Movie = ({ movie }) => {
  const router = useRouter();

  const handleDeleteMovie = (id) => {
    deleteMovie(id).then(() => {
      router.push("/");
    });
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <h1 className="display-4">{movie.name}</h1>
        <p className="lead">{movie.description}</p>
        <hr className="my-4" />
        <p>{movie.genres.map((g) => g + " ")}</p>
        <button
          onClick={() => handleDeleteMovie(movie.id)}
          className="btn btn-danger btn-lg"
        >
          Delete
        </button>
      </div>
      <p className="desc-text" style={{ fontSize: "21px" }}>
        {movie.longDesc}
      </p>
    </div>
  );
};

// Movie.getInitialProps = async () => {
//   const movie = await getMovieById("2");
//   return {
//     movie,
//   };
// };

export async function getStaticPaths() {
  const movies = await getMovies();

  const paths = movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movie = await getMovieById(params.id);
  return {
    props: {
      movie,
    },
  };
}

export default Movie;
