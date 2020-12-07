import { useState } from "react";

import SideMenu from "../components/Sidemenu";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";

import { getMovies, getCategories } from "../actions";

const Home = ({ movies, images, categories }) => {
  //const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("all");

  const changeCategory = (category) => {
    setFilter(category.name);
  };

  const filterMovies = (movies) => {
    if (filter !== "all") {
      return movies.filter((movie) => {
        return movie.genres && movie.genres.includes(filter);
      });
    } else {
      return movies;
    }
  };

  return (
    <div>
      <div className="home-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SideMenu
                categories={categories}
                changeCategory={changeCategory}
                activeCategory={filter}
              />
            </div>
            <div className="col-lg-9">
              <Carousel images={images} />
              <h1>Displaying {filter} movies</h1>
            </div>
            {message ? (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            ) : (
              <MovieList movies={filterMovies(movies) || []} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Home.getInitialProps = async () => {
//   const movies = await getMovies();
//   return {
//     movies,
//   };
// };

export const getStaticProps = async () => {
  const movies = await getMovies();
  const categories = await getCategories();
  const images = movies.map((movie) => ({
    id: `image-${movie.id}`,
    url: movie.image,
    alt: movie.name,
  }));
  return {
    props: { movies, images, categories },
  };
};

export default Home;
