import MovieEditForm from "../../../components/MovieEditForm";
import { getMovieById, getCategories, getMovies } from "../../../actions";

const EditMovie = ({ movie, categories }) => {
  return (
    <div className="container">
      <h1>Edit the Movie</h1>
      <MovieEditForm movie={movie} categories={categories} />
    </div>
  );
};

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
  const categories = await getCategories();
  return {
    props: {
      movie,
      categories,
    },
  };
}

export default EditMovie;
