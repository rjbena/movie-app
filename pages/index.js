import { useState } from "react";

import SideMenu from "../components/Sidemenu";
import Carousel from "../components/Carousel";
import MovieList from "../components/MovieList";

import { getMovies } from "../actions";

const Home = ({ movies }) => {
  //const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const resMovies = await getMovies();
  //       setMovies(resMovies);
  //     } catch (error) {
  //       setMessage(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="home-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <SideMenu />
            </div>
            <div className="col-lg-9">
              <Carousel />
            </div>
            {message ? (
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            ) : (
              <MovieList movies={movies} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const movies = await getMovies();
  return {
    movies,
  };
};

export default Home;
