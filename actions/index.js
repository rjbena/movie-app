import axios from "axios";

const BASE_URL = "http://localhost:3000";

const CATEGORY_DATA = [
  { id: "0", name: "all" },
  { id: "1", name: "drama" },
  { id: "2", name: "action" },
  { id: "3", name: "adventure" },
  { id: "4", name: "historical" },
];

export const getMovies = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/movies`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieById = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/api/v1/movies/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(CATEGORY_DATA);
      reject([]);
    }, 50);
  });
};

export const createMovie = (movie) => {
  movie.id = Math.random().toString(36).substr(2, 7);
  return axios.post(`${BASE_URL}/api/v1/movies`, movie).then((res) => res.data);

  // return new Promise((resolve, reject) => {
  //   movie.id = Math.random().toString(36).substr(2, 7);
  //   MOVIE_DATA.push(movie);
  //   setTimeout(() => {
  //     resolve(MOVIE_DATA);
  //   }, 50);
  // });
};

export const deleteMovie = async (id) => {
  try {
    const { data } = await axios.delete(`${BASE_URL}/api/v1/movies/${id}`);

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editMovie = async (movie) => {
  try {
    const { data } = await axios.patch(
      `${BASE_URL}/api/v1/movies/${movie.id}`,
      movie
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};
